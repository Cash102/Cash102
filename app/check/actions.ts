"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { VARIANTS } from "@/lib/select-questions";

/**
 * The browser proposes which variant to serve, having kept the count of the
 * student's own checks in localStorage. It is a hint from an untrusted place:
 * anything that is not a whole number in range becomes 0, which is a valid
 * paper rather than an error the student has to care about.
 */
function readVariant(value: FormDataEntryValue | null): number {
  if (typeof value !== "string") return 0;
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) return 0;
  return ((parsed % VARIANTS) + VARIANTS) % VARIANTS;
}

/**
 * Starts a check. Creates the Attempt as soon as a course is picked, so the
 * student's first answer has somewhere to land.
 *
 * No identity is recorded: the row is a course code, a timestamp and which half
 * of the question pool to draw from. The cuid it returns is the only handle to
 * it, and it goes to the student's browser.
 */
export async function startAttempt(formData: FormData): Promise<void> {
  const courseCode = formData.get("courseCode");
  if (typeof courseCode !== "string" || courseCode === "") {
    throw new Error("Pick a course.");
  }

  const course = await prisma.course.findFirst({
    where: {
      code: courseCode,
      offered: true,
      skillLinks: { some: { skill: { active: true, questions: { some: { active: true } } } } },
    },
    select: { code: true },
  });
  if (course === null) {
    throw new Error("That course has no check available.");
  }

  const attempt = await prisma.attempt.create({
    data: { courseCode: course.code, variant: readVariant(formData.get("variant")) },
    select: { id: true },
  });

  redirect(`/check/${attempt.id}`);
}

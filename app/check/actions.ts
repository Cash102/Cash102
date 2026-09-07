"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

/**
 * Starts a check. Creates the Attempt as soon as a course is picked, so the
 * student's first answer has somewhere to land.
 *
 * No identity is recorded: the row is a course code and a timestamp. The cuid
 * it returns is the only handle to it, and it goes to the student's browser.
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
    data: { courseCode: course.code },
    select: { id: true },
  });

  redirect(`/check/${attempt.id}`);
}

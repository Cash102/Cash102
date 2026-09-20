/**
 * What every course's check would actually look like.
 *
 *   npx tsx --tsconfig tsconfig.scripts.json scripts/audit-courses.mts
 *
 * Run this after adding a course or a skill. A course is only listed in the
 * picker if it has questions behind it, so the failure mode is not an error —
 * it is a course quietly serving a four-question check, or quietly not
 * appearing at all. This prints the size of every check so that shows up.
 */

import { PrismaClient } from "@prisma/client";
import { servedQuestionIds } from "../lib/attempt";

const THIN = 10;
const prisma = new PrismaClient();

const courses = await prisma.course.findMany({
  where: { offered: true, skillLinks: { some: { skill: { active: true, questions: { some: { active: true } } } } } },
  orderBy: [{ subject: "asc" }, { title: "asc" }],
  select: { code: true, title: true, _count: { select: { skillLinks: true } } },
});

console.log(`${courses.length} courses have live checks\n`);

let thin = 0;
for (const course of courses) {
  // The attempt id is only a shuffle seed here; any stable string will do.
  const served = await servedQuestionIds(`audit:${course.code}`, course.code);
  if (served.length < THIN) thin++;
  console.log(
    `  ${String(served.length).padStart(2)} questions   ${String(course._count.skillLinks).padStart(2)} skills   ` +
      `${course.title}${served.length < THIN ? "   <-- thin" : ""}`,
  );
}

const offered = await prisma.course.count({ where: { offered: true } });
const untaught = await prisma.skill.count({ where: { originCourseCode: null } });
const skills = await prisma.skill.count();

console.log(`\n${thin} course(s) serving fewer than ${THIN} questions`);
console.log(`${courses.length} of ${offered} offered courses have a check`);
console.log(`${untaught} of ${skills} canonical skills are taught by no course in the catalog`);

await prisma.$disconnect();
process.exit(thin === 0 ? 0 : 1);

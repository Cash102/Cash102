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
/** How many distinct attempt ids to simulate when measuring retake overlap. */
const SAMPLES = 8;
const prisma = new PrismaClient();

/**
 * Average number of questions two different attempts at the same course share.
 * Selection is deterministic in the attempt id, so this is measurable rather
 * than estimated: simulate a handful of ids and compare every pair.
 */
async function retakeOverlap(courseCode: string): Promise<number> {
  const runs: string[][] = [];
  for (let sample = 0; sample < SAMPLES; sample++) {
    runs.push(await servedQuestionIds(`overlap:${courseCode}:${sample}`, courseCode));
  }

  let total = 0;
  let pairs = 0;
  for (let a = 0; a < runs.length; a++) {
    for (let b = a + 1; b < runs.length; b++) {
      const second = new Set(runs[b]);
      total += runs[a].filter((id) => second.has(id)).length;
      pairs++;
    }
  }
  return pairs === 0 ? 0 : total / pairs;
}

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
  const overlap = await retakeOverlap(course.code);
  const share = served.length === 0 ? 0 : Math.round((overlap / served.length) * 100);
  console.log(
    `  ${String(served.length).padStart(2)} questions   ${String(course._count.skillLinks).padStart(2)} skills   ` +
      `retake repeats ${overlap.toFixed(1).padStart(4)} (${String(share).padStart(2)}%)   ` +
      `${course.title}${served.length < THIN ? "   <-- thin" : ""}`,
  );
}

const offered = await prisma.course.count({ where: { offered: true } });
const untaught = await prisma.skill.count({ where: { originCourseCode: null } });
const skills = await prisma.skill.count();

console.log(`\n${thin} course(s) serving fewer than ${THIN} questions`);
console.log(`"retake repeats" is how many questions two different attempts share on average.`);
console.log(`${courses.length} of ${offered} offered courses have a check`);
console.log(`${untaught} of ${skills} canonical skills are taught by no course in the catalog`);

await prisma.$disconnect();
process.exit(thin === 0 ? 0 : 1);

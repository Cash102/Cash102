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

import { createPrismaClient } from "../lib/db-driver";
import { servedQuestionIds } from "../lib/attempt";
import { VARIANTS } from "../lib/select-questions";

const THIN = 10;
/** How many distinct attempt ids to simulate when measuring retake overlap. */
const SAMPLES = 8;
const prisma = createPrismaClient();

/**
 * Two different overlaps, because the variant split trades one for the other.
 *
 *   retake      one student sitting the same check again, so a different
 *               attempt id AND the next variant. This is the number the split
 *               exists to drive to zero.
 *   classmates  two students sitting it at the same time, so different ids on
 *               the SAME variant. Halving each skill's pool costs here: where a
 *               course serves nearly everything its half holds, there is little
 *               room left to differ. More questions per skill is the only fix.
 *
 * Selection is deterministic in the attempt row, so both are measured rather
 * than estimated: simulate ids and compare every pair.
 */
async function overlaps(courseCode: string): Promise<{ retake: number; classmates: number }> {
  const runs: string[][][] = [];
  for (let variant = 0; variant < VARIANTS; variant++) {
    const forVariant: string[][] = [];
    for (let sample = 0; sample < SAMPLES; sample++) {
      forVariant.push(
        await servedQuestionIds({ id: `overlap:${courseCode}:${variant}:${sample}`, courseCode, variant }),
      );
    }
    runs.push(forVariant);
  }

  const shared = (a: string[], b: string[]): number => {
    const second = new Set(b);
    return a.filter((id) => second.has(id)).length;
  };

  let retakeTotal = 0;
  let retakePairs = 0;
  for (let v = 0; v + 1 < VARIANTS; v++) {
    for (const before of runs[v]) {
      for (const after of runs[v + 1]) {
        retakeTotal += shared(before, after);
        retakePairs++;
      }
    }
  }

  let sameTotal = 0;
  let samePairs = 0;
  for (const forVariant of runs) {
    for (let a = 0; a < forVariant.length; a++) {
      for (let b = a + 1; b < forVariant.length; b++) {
        sameTotal += shared(forVariant[a], forVariant[b]);
        samePairs++;
      }
    }
  }

  return {
    retake: retakePairs === 0 ? 0 : retakeTotal / retakePairs,
    classmates: samePairs === 0 ? 0 : sameTotal / samePairs,
  };
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
  const served = await servedQuestionIds({ id: `audit:${course.code}`, courseCode: course.code, variant: 0 });
  if (served.length < THIN) thin++;
  const { retake, classmates } = await overlaps(course.code);
  const share = (value: number): string =>
    served.length === 0 ? " 0%" : `${String(Math.round((value / served.length) * 100)).padStart(2)}%`;
  console.log(
    `  ${String(served.length).padStart(2)} questions   ${String(course._count.skillLinks).padStart(2)} skills   ` +
      `retake ${retake.toFixed(1).padStart(4)} (${share(retake)})   ` +
      `classmates ${classmates.toFixed(1).padStart(4)} (${share(classmates)})   ` +
      `${course.title}${served.length < THIN ? "   <-- thin" : ""}`,
  );
}

const offered = await prisma.course.count({ where: { offered: true } });
const untaught = await prisma.skill.count({ where: { originCourseCode: null } });
const skills = await prisma.skill.count();

console.log(`\n${thin} course(s) serving fewer than ${THIN} questions`);
console.log(`"retake" is what a student sees twice on their second attempt; "classmates" is what two`);
console.log(`students sitting it at once share. Both are averages over simulated attempts.`);
console.log(`${courses.length} of ${offered} offered courses have a check`);
console.log(`${untaught} of ${skills} canonical skills are taught by no course in the catalog`);

await prisma.$disconnect();
process.exit(thin === 0 ? 0 : 1);

/**
 * Seed: the catalog, the skill graph, and the fourteen calculus questions.
 *
 *   createdb prereq_gap
 *   export DATABASE_URL="postgresql://localhost:5432/prereq_gap"
 *   npx prisma migrate dev --name init
 *   npx prisma db seed
 *
 * Idempotent. Run it as often as you like.
 *
 * Two write strategies, on purpose:
 *   - Course, Skill and Question are UPSERTED and never deleted. Attempt
 *     history points at them, and a reseed must not orphan a student's report.
 *   - CoursePrerequisite, CourseSkill and SkillDependency are REPLACED. They
 *     carry no history, and replacing is the only way an edge you deleted from
 *     the data files actually disappears from the database.
 *
 * Everything is validated before the first write. A bad stem, a dangling skill
 * id or a cycle in the dependency graph fails the seed with a message naming
 * the row, rather than landing in a table the app trusts.
 */

import { PrismaClient, Subject } from "@prisma/client";
import { COURSES, CONCURRENT_PREREQUISITES, isOffered } from "./data/catalog";
import { SKILLS, COURSE_SKILLS, SKILL_DEPENDENCIES } from "./data/skill-graph";
import { QUESTIONS } from "./data/questions";
import { assertValidStem } from "../lib/notation";

const prisma = new PrismaClient();

/** TS catalog subject -> Prisma enum. The enum maps back to the spaced string. */
const SUBJECTS = {
  English: Subject.English,
  History: Subject.History,
  Mathematics: Subject.Mathematics,
  Science: Subject.Science,
  "College Persistence": Subject.CollegePersistence,
} as const;

function check(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(`seed: ${message}`);
}

// ---------------------------------------------------------------------------
// VALIDATION
// ---------------------------------------------------------------------------

function validate(): void {
  const courseCodes = new Set(COURSES.map((c) => c.code));
  check(courseCodes.size === COURSES.length, "duplicate course code");

  for (const course of COURSES) {
    for (const prerequisiteCode of course.prerequisiteCodes) {
      check(
        courseCodes.has(prerequisiteCode),
        `${course.code} lists prerequisite ${prerequisiteCode}, which is not in the catalog`,
      );
    }
  }

  for (const [courseCode, prerequisiteCode] of CONCURRENT_PREREQUISITES) {
    const course = COURSES.find((c) => c.code === courseCode);
    check(course !== undefined, `concurrent pair names unknown course ${courseCode}`);
    check(
      course.prerequisiteCodes.includes(prerequisiteCode),
      `${courseCode} is marked concurrent with ${prerequisiteCode}, which is not one of its prerequisites`,
    );
  }

  const skillIds = new Set(SKILLS.map((s) => s.id));
  check(skillIds.size === SKILLS.length, "duplicate skill id");

  for (const skill of SKILLS) {
    if (skill.originCourseCode !== null) {
      check(
        courseCodes.has(skill.originCourseCode),
        `skill ${skill.id} has origin course ${skill.originCourseCode}, which is not in the catalog`,
      );
    }
  }

  const links = new Set<string>();
  for (const link of COURSE_SKILLS) {
    const key = `${link.courseCode}/${link.skillId}`;
    check(!links.has(key), `duplicate CourseSkill ${key}`);
    links.add(key);
    check(courseCodes.has(link.courseCode), `CourseSkill ${key} names an unknown course`);
    check(skillIds.has(link.skillId), `CourseSkill ${key} names an unknown skill`);
    check(link.weight >= 1 && link.weight <= 5, `CourseSkill ${key} weight ${link.weight} is outside 1-5`);
    check(link.chain.length > 0, `CourseSkill ${key} has an empty chain`);
  }

  const edges = new Set<string>();
  for (const edge of SKILL_DEPENDENCIES) {
    const key = `${edge.prerequisiteId} -> ${edge.dependentId}`;
    check(!edges.has(key), `duplicate SkillDependency ${key}`);
    edges.add(key);
    check(skillIds.has(edge.prerequisiteId), `SkillDependency ${key} names an unknown prerequisite`);
    check(skillIds.has(edge.dependentId), `SkillDependency ${key} names an unknown dependent`);
    check(edge.prerequisiteId !== edge.dependentId, `SkillDependency ${key} is a self edge`);
    check(edge.strength >= 1 && edge.strength <= 5, `SkillDependency ${key} strength ${edge.strength} is outside 1-5`);
  }
  assertAcyclic();

  const questionIds = new Set<string>();
  for (const question of QUESTIONS) {
    check(!questionIds.has(question.id), `duplicate question id ${question.id}`);
    questionIds.add(question.id);
    check(skillIds.has(question.skillId), `question ${question.id} names unknown skill ${question.skillId}`);
    check(question.options.length >= 2, `question ${question.id} has fewer than two options`);

    const correct = question.options.filter((o) => o.isCorrect === true);
    check(correct.length === 1, `question ${question.id} has ${correct.length} correct options, expected exactly 1`);

    assertValidStem(question.prompt, `question ${question.id} prompt`);
    question.options.forEach((option, index) => {
      assertValidStem(option.text, `question ${question.id} option ${index}`);
      if (option.misconception) {
        assertValidStem(option.misconception, `question ${question.id} option ${index} misconception`);
      }
    });
  }
}

/** Depth-first three-colour cycle detection. A cycle here would make the
 *  remediation order meaningless and hang any future graph walk. */
function assertAcyclic(): void {
  const outgoing = new Map<string, string[]>();
  for (const edge of SKILL_DEPENDENCIES) {
    outgoing.set(edge.prerequisiteId, [...(outgoing.get(edge.prerequisiteId) ?? []), edge.dependentId]);
  }

  const state = new Map<string, "visiting" | "done">();

  const visit = (id: string, path: string[]): void => {
    const seen = state.get(id);
    if (seen === "done") return;
    check(seen !== "visiting", `SkillDependency graph has a cycle: ${[...path, id].join(" -> ")}`);

    state.set(id, "visiting");
    for (const next of outgoing.get(id) ?? []) visit(next, [...path, id]);
    state.set(id, "done");
  };

  for (const skill of SKILLS) visit(skill.id, []);
}

// ---------------------------------------------------------------------------
// WRITE
// ---------------------------------------------------------------------------

async function write(): Promise<void> {
  await prisma.$transaction(
    async (tx) => {
      // Courses first: Skill.originCourseCode points at them.
      for (const course of COURSES) {
        const data = {
          title: course.title,
          subject: SUBJECTS[course.subject],
          credits: course.credits,
          required: course.required,
          grades: course.grades,
          externalExam: course.externalExam,
          notes: course.notes ?? null,
          offered: isOffered(course),
        };
        await tx.course.upsert({
          where: { code: course.code },
          create: { code: course.code, ...data },
          update: data,
        });
      }

      await tx.coursePrerequisite.deleteMany();
      await tx.coursePrerequisite.createMany({
        data: COURSES.flatMap((course) =>
          course.prerequisiteCodes.map((prerequisiteCode) => ({
            courseCode: course.code,
            prerequisiteCode,
            concurrentOk: CONCURRENT_PREREQUISITES.some(
              ([code, prerequisite]) => code === course.code && prerequisite === prerequisiteCode,
            ),
          })),
        ),
      });

      for (const skill of SKILLS) {
        const data = {
          name: skill.name,
          chainType: skill.chainType,
          origin: skill.origin,
          originCourseCode: skill.originCourseCode,
        };
        await tx.skill.upsert({
          where: { id: skill.id },
          create: { id: skill.id, ...data },
          update: data,
        });
      }

      await tx.courseSkill.deleteMany();
      await tx.courseSkill.createMany({
        data: COURSE_SKILLS.map((link) => ({
          courseCode: link.courseCode,
          skillId: link.skillId,
          weight: link.weight,
          chain: link.chain,
          practiceQuery: link.practiceQuery,
          practiceUrl: link.practiceUrl ?? null,
        })),
      });

      await tx.skillDependency.deleteMany();
      await tx.skillDependency.createMany({ data: [...SKILL_DEPENDENCIES] });

      for (const question of QUESTIONS) {
        const data = { skillId: question.skillId, prompt: question.prompt };
        await tx.question.upsert({
          where: { id: question.id },
          create: { id: question.id, ...data },
          update: data,
        });

        for (const [position, option] of question.options.entries()) {
          const optionData = {
            text: option.text,
            isCorrect: option.isCorrect === true,
            misconception: option.misconception ?? null,
          };
          await tx.questionOption.upsert({
            where: { questionId_position: { questionId: question.id, position } },
            create: { questionId: question.id, position, ...optionData },
            update: optionData,
          });
        }

        // Drop options left behind by a question that got shorter.
        await tx.questionOption.deleteMany({
          where: { questionId: question.id, position: { gte: question.options.length } },
        });
      }
    },
    { timeout: 60_000 },
  );
}

// ---------------------------------------------------------------------------
// REPORT — printed after seeding, as a check that the data says what it should
// ---------------------------------------------------------------------------

/**
 * The headline claim, straight out of the schema: every skill whose
 * originCourseCode IS NULL, grouped by the course that leans on it.
 *
 * A null origin course means the catalog contains no course that teaches the
 * skill. Grouped this way, each block reads as "here is what this course is
 * built on that this building never teaches."
 */
async function reportUntaughtSkills(): Promise<void> {
  const courses = await prisma.course.findMany({
    where: { skillLinks: { some: { skill: { originCourseCode: null } } } },
    include: {
      skillLinks: {
        where: { skill: { originCourseCode: null } },
        include: { skill: true },
        orderBy: [{ weight: "desc" }, { skillId: "asc" }],
      },
    },
    orderBy: [{ subject: "asc" }, { title: "asc" }],
  });

  const distinct = new Set(courses.flatMap((c) => c.skillLinks.map((l) => l.skillId)));

  console.log("\nSkills with no course in the catalog that teaches them, by course");
  console.log(`${distinct.size} distinct skills across ${courses.length} courses\n`);

  for (const course of courses) {
    console.log(`${course.title}  (${course.code})`);
    for (const link of course.skillLinks) {
      console.log(
        `    weight ${link.weight}   ${link.skill.name.padEnd(44)} origin: ${link.skill.origin}`,
      );
    }
    console.log("");
  }
}

/** Kahn's algorithm over the authored edges: what the report will tell a
 *  student to fix first if every Calculus skill comes back weak. */
async function reportRemediationOrder(courseCode: string): Promise<void> {
  const links = await prisma.courseSkill.findMany({
    where: { courseCode },
    include: { skill: true },
  });
  if (links.length === 0) return;

  const inScope = new Set(links.map((link) => link.skillId));
  const edges = (
    await prisma.skillDependency.findMany({
      where: { prerequisiteId: { in: [...inScope] }, dependentId: { in: [...inScope] } },
    })
  ).map((edge) => [edge.prerequisiteId, edge.dependentId] as const);

  const remaining = new Map(links.map((link) => [link.skillId, link]));
  const indegree = new Map([...inScope].map((id) => [id, 0]));
  for (const [, dependentId] of edges) indegree.set(dependentId, (indegree.get(dependentId) ?? 0) + 1);

  const order: string[] = [];
  while (remaining.size > 0) {
    const ready = [...remaining.values()]
      .filter((link) => (indegree.get(link.skillId) ?? 0) === 0)
      // Prerequisites first; among equals, the heavier skill leads.
      .sort((a, b) => b.weight - a.weight);
    if (ready.length === 0) break; // cycle; validate() already rules this out

    for (const link of ready) {
      order.push(`${link.skill.name} (weight ${link.weight})`);
      remaining.delete(link.skillId);
      for (const [prerequisiteId, dependentId] of edges) {
        if (prerequisiteId === link.skillId) indegree.set(dependentId, (indegree.get(dependentId) ?? 1) - 1);
      }
    }
  }

  console.log(`\nRemediation order for ${courseCode} if every skill came back weak:`);
  order.forEach((name, index) => console.log(`  ${index + 1}. ${name}`));
}

async function main(): Promise<void> {
  validate();
  console.log(
    `Validated ${COURSES.length} courses, ${SKILLS.length} skills, ` +
      `${COURSE_SKILLS.length} course-skill links, ${SKILL_DEPENDENCIES.length} dependency edges, ` +
      `${QUESTIONS.length} questions.`,
  );

  await write();

  const [courses, prerequisites, skills, courseSkills, dependencies, questions, options] = await Promise.all([
    prisma.course.count(),
    prisma.coursePrerequisite.count(),
    prisma.skill.count(),
    prisma.courseSkill.count(),
    prisma.skillDependency.count(),
    prisma.question.count(),
    prisma.questionOption.count(),
  ]);
  console.log(
    `Seeded: ${courses} courses, ${prerequisites} prerequisite edges, ${skills} skills, ` +
      `${courseSkills} course-skill links, ${dependencies} dependency edges, ` +
      `${questions} questions, ${options} options.`,
  );

  await reportUntaughtSkills();
  await reportRemediationOrder("MCFYHAR");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

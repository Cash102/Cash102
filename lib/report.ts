/**
 * Turns an attempt into the report.
 *
 * The ordering is the whole point, and it is not the prototype's. The prototype
 * ranked gaps by accuracy, which tells a student to start with whatever they
 * happened to miss most. This ranks them by the dependency graph first: if
 * factoring holds up rational expressions and both came back weak, factoring
 * leads, whatever the scores were. Weight and accuracy only break ties inside a
 * tier. That is the difference between a list of gaps and an order of work.
 */

import type { ChainType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { servedQuestionIds } from "@/lib/attempt";

export interface SkillOutcome {
  skillId: string;
  name: string;
  chainType: ChainType;
  /** Where the skill is taught, verbatim: "Middle school algebra". */
  origin: string;
  /** The catalog course that teaches it, or null when nothing here does. */
  originCourseTitle: string | null;
  /** CourseSkill.weight: how much THIS course leans on the skill, 1-5. */
  weight: number;
  chain: string[];
  practiceUrl: string;
  asked: number;
  right: number;
  /** Distinct labels for the wrong moves this student actually made. */
  misconceptions: string[];
  /** Weak skills that come earlier in the order and hold this one up. */
  restsOn: string[];
}

export interface Report {
  attemptId: string;
  courseTitle: string;
  completedAt: Date | null;
  answered: number;
  /** How many questions this attempt was served, for the unfinished case. */
  total: number;
  weak: SkillOutcome[];
  solid: SkillOutcome[];
}

function practiceLink(query: string, url: string | null): string {
  if (url !== null && url !== "") return url;
  return `https://www.khanacademy.org/search?page_search_query=${encodeURIComponent(query)}`;
}

export async function buildReport(attemptId: string): Promise<Report | null> {
  const attempt = await prisma.attempt.findUnique({
    where: { id: attemptId },
    select: {
      id: true,
      courseCode: true,
      completedAt: true,
      course: { select: { title: true } },
      answers: {
        select: {
          correct: true,
          skillId: true,
          selectedOption: { select: { misconception: true } },
        },
      },
    },
  });
  if (attempt === null) return null;

  // Tally per skill. Fourteen rows: do it here rather than in three round trips.
  const tally = new Map<string, { asked: number; right: number; misconceptions: Set<string> }>();
  for (const answer of attempt.answers) {
    const row = tally.get(answer.skillId) ?? { asked: 0, right: 0, misconceptions: new Set<string>() };
    row.asked++;
    if (answer.correct) row.right++;
    const misconception = answer.selectedOption?.misconception;
    if (!answer.correct && misconception !== null && misconception !== undefined) {
      row.misconceptions.add(misconception);
    }
    tally.set(answer.skillId, row);
  }

  // Only needed to say "9 of 14" on an unfinished check.
  const total =
    attempt.completedAt === null
      ? (await servedQuestionIds(attempt.id, attempt.courseCode)).length
      : attempt.answers.length;

  if (tally.size === 0) {
    return {
      attemptId: attempt.id,
      courseTitle: attempt.course.title,
      completedAt: attempt.completedAt,
      answered: 0,
      total,
      weak: [],
      solid: [],
    };
  }

  const links = await prisma.courseSkill.findMany({
    where: { courseCode: attempt.courseCode, skillId: { in: [...tally.keys()] } },
    select: {
      skillId: true,
      weight: true,
      chain: true,
      practiceQuery: true,
      practiceUrl: true,
      skill: {
        select: {
          name: true,
          chainType: true,
          origin: true,
          originCourse: { select: { title: true } },
        },
      },
    },
  });

  const outcomes: SkillOutcome[] = links.map((link) => {
    const row = tally.get(link.skillId) ?? { asked: 0, right: 0, misconceptions: new Set<string>() };
    return {
      skillId: link.skillId,
      name: link.skill.name,
      chainType: link.skill.chainType,
      origin: link.skill.origin,
      originCourseTitle: link.skill.originCourse?.title ?? null,
      weight: link.weight,
      chain: link.chain,
      practiceUrl: practiceLink(link.practiceQuery, link.practiceUrl),
      asked: row.asked,
      right: row.right,
      misconceptions: [...row.misconceptions],
      restsOn: [],
    };
  });

  const weak = outcomes.filter((outcome) => outcome.right < outcome.asked);
  const solid = outcomes
    .filter((outcome) => outcome.asked > 0 && outcome.right === outcome.asked)
    .sort((a, b) => b.weight - a.weight || a.name.localeCompare(b.name));

  return {
    attemptId: attempt.id,
    courseTitle: attempt.course.title,
    completedAt: attempt.completedAt,
    answered: attempt.answers.length,
    total,
    weak: await orderByDependency(weak),
    solid,
  };
}

/**
 * Kahn's algorithm over the SkillDependency edges that fall inside the weak set,
 * so a prerequisite always appears before the skill it holds up. Ties — skills
 * with nothing weak underneath them — are broken by how heavily the course
 * leans on them, then by how badly they went.
 *
 * Edges outside the weak set are irrelevant: a prerequisite the student has
 * solid does not need fixing first.
 */
async function orderByDependency(weak: SkillOutcome[]): Promise<SkillOutcome[]> {
  if (weak.length < 2) return weak;

  const ids = weak.map((outcome) => outcome.skillId);
  const edges = await prisma.skillDependency.findMany({
    where: { prerequisiteId: { in: ids }, dependentId: { in: ids } },
    select: { prerequisiteId: true, dependentId: true },
  });

  const byId = new Map(weak.map((outcome) => [outcome.skillId, outcome]));
  const indegree = new Map(ids.map((id) => [id, 0]));
  const names = new Map(weak.map((outcome) => [outcome.skillId, outcome.name]));

  for (const edge of edges) {
    indegree.set(edge.dependentId, (indegree.get(edge.dependentId) ?? 0) + 1);
    byId.get(edge.dependentId)?.restsOn.push(names.get(edge.prerequisiteId) ?? edge.prerequisiteId);
  }

  const missRate = (outcome: SkillOutcome) => (outcome.asked === 0 ? 0 : 1 - outcome.right / outcome.asked);
  const remaining = new Map(byId);
  const ordered: SkillOutcome[] = [];

  while (remaining.size > 0) {
    const ready = [...remaining.values()]
      .filter((outcome) => (indegree.get(outcome.skillId) ?? 0) === 0)
      .sort((a, b) => b.weight - a.weight || missRate(b) - missRate(a) || a.name.localeCompare(b.name));

    // A cycle would leave nothing ready. The seed asserts the graph is acyclic,
    // but the report should degrade to an order rather than lose skills.
    const batch =
      ready.length > 0
        ? ready
        : [...remaining.values()].sort((a, b) => b.weight - a.weight || a.name.localeCompare(b.name)).slice(0, 1);

    for (const outcome of batch) {
      ordered.push(outcome);
      remaining.delete(outcome.skillId);
      for (const edge of edges) {
        if (edge.prerequisiteId === outcome.skillId) {
          indegree.set(edge.dependentId, (indegree.get(edge.dependentId) ?? 1) - 1);
        }
      }
    }
  }

  return ordered;
}

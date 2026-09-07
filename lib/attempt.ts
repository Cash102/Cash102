/**
 * Server-side view of what an attempt is meant to ask.
 *
 * Both the page and the answer endpoint go through here, so the endpoint can
 * reject an answer to a question this attempt was never served.
 */

import { prisma } from "@/lib/prisma";
import { selectQuestions, shuffle, type SkillPool } from "@/lib/select-questions";

export const QUESTIONS_PER_ATTEMPT = 14;

/** The question ids this attempt serves, in order. Deterministic in the id. */
export async function servedQuestionIds(attemptId: string, courseCode: string): Promise<string[]> {
  const links = await prisma.courseSkill.findMany({
    where: { courseCode, skill: { active: true } },
    select: {
      skillId: true,
      weight: true,
      skill: { select: { questions: { where: { active: true }, select: { id: true } } } },
    },
  });

  const pools: SkillPool[] = links.map((link) => ({
    skillId: link.skillId,
    weight: link.weight,
    questionIds: link.skill.questions.map((question) => question.id),
  }));

  return selectQuestions(pools, { seed: attemptId, target: QUESTIONS_PER_ATTEMPT });
}

export interface ServedOption {
  id: string;
  text: string;
}

export interface ServedQuestion {
  id: string;
  prompt: string;
  /** Where the skill under test is taught, e.g. "Middle school algebra". Shown
   *  beside the counter, as the prototype did: the reminder that the student is
   *  not being asked calculus. */
  origin: string;
  options: ServedOption[];
}

/**
 * The served questions with their options already shuffled.
 *
 * The shuffle happens here, on the server, and `isCorrect` is never part of the
 * payload — the client cannot read the answer key out of the page, and position
 * cannot leak it either. Seeding the shuffle per attempt+question means a
 * reload redraws the same order instead of scrambling under the student.
 */
export async function servedQuestions(attemptId: string, courseCode: string): Promise<ServedQuestion[]> {
  const ids = await servedQuestionIds(attemptId, courseCode);
  if (ids.length === 0) return [];

  const questions = await prisma.question.findMany({
    where: { id: { in: ids }, active: true },
    select: {
      id: true,
      prompt: true,
      skill: { select: { origin: true } },
      options: { select: { id: true, text: true }, orderBy: { position: "asc" } },
    },
  });

  const byId = new Map(questions.map((question) => [question.id, question]));

  return ids.flatMap((id) => {
    const question = byId.get(id);
    if (question === undefined) return [];
    return [
      {
        id: question.id,
        prompt: question.prompt,
        origin: question.skill.origin,
        options: shuffle(question.options, `${attemptId}:${id}`),
      },
    ];
  });
}

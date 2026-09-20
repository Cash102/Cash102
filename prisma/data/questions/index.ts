/**
 * The question bank, split by SKILL FAMILY rather than by course.
 *
 * Skills are canonical, so a question belongs to a skill, not to a class: the
 * algebra questions serve AP Calculus BC I and AP Physics C, and the
 * quantitative-science ones serve AP Biology and AP Chemistry. Filing these by
 * course would have quietly reintroduced the duplication the canonical Skill
 * model exists to avoid.
 */

export type { SeedQuestion, SeedQuestionOption } from "./types";

import type { SeedQuestion } from "./types";
import { ALGEBRA_QUESTIONS } from "./algebra";
import { QUANTITATIVE_SCIENCE_QUESTIONS } from "./quantitative-science";
import { WRITING_QUESTIONS } from "./writing";

export const QUESTIONS: SeedQuestion[] = [
  ...ALGEBRA_QUESTIONS,
  ...QUANTITATIVE_SCIENCE_QUESTIONS,
  ...WRITING_QUESTIONS,
];

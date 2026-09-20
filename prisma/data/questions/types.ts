/**
 * Question authoring types.
 *
 * NOTATION: `prompt`, `text` and `misconception` are all written in the stored
 * stem format defined in lib/notation.ts — plain text with math inside $...$,
 * never HTML. The seed validates every one of these strings before it writes,
 * so a bad stem fails the seed rather than reaching a render path. Write them
 * with String.raw so backslash commands survive: a plain "\ne" is the two
 * characters "ne".
 *
 * OPTION ORDER: the correct answer is authored first throughout. The client
 * shuffles on the server side at serve time; nothing may assume position 0.
 *
 * MISCONCEPTIONS: optional on a `content` chain, where a wrong answer is mostly
 * just wrong. Mandatory in spirit on a `skill` chain, where the distractor IS
 * the diagnosis — a student who picks the plot summary over the claim has made
 * a specific, nameable move, and naming it is the difference between a judgment
 * question and a recall question in disguise.
 */

export interface SeedQuestionOption {
  text: string;
  isCorrect?: boolean;
  misconception?: string;
}

export interface SeedQuestion {
  /** Authored id, so reseeding is idempotent and answer history survives. */
  id: string;
  skillId: string;
  prompt: string;
  options: SeedQuestionOption[];
}

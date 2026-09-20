/**
 * Which questions an attempt is served, and in what order.
 *
 * Everything here is deterministic in the attempt id. That is what makes resume
 * work without an AttemptQuestion table: reopening an attempt recomputes the
 * identical list, subtracts what has already been answered, and carries on. The
 * cost is that deactivating a question mid-attempt shifts the tail of the list;
 * answers already recorded are unaffected. If you ever need to know exactly
 * what was served — item analysis, say — that is the moment to add the table.
 */

export interface SkillPool {
  skillId: string;
  /** CourseSkill.weight, 1-5. Higher-weight skills are served first. */
  weight: number;
  questionIds: string[];
}

export interface SelectionOptions {
  /** The attempt id. Same seed in, same questions out. */
  seed: string;
  /** Which half of each skill's pool to draw from. See VARIANTS. */
  variant?: number;
  /** How many questions to aim for. */
  target?: number;
  /** How many per skill before topping up from the heaviest skills. */
  perSkill?: number;
}

/**
 * How many disjoint papers each course can produce.
 *
 * Every skill holds eight questions and a check serves at most four of any one
 * skill, so the pool splits cleanly in two and a retake can be guaranteed to
 * share nothing with the attempt before it. Two is what the arithmetic allows,
 * not a preference: raising it needs more questions per skill first.
 */
export const VARIANTS = 2;

/**
 * The slice of one skill's questions a given variant may draw from.
 *
 * The partition is seeded by the SKILL, never by the attempt. That is the whole
 * trick: every attempt cuts the pool the same way, so variant 0 and variant 1
 * are disjoint sets rather than two arbitrary shuffles that happen to differ.
 *
 * A skill with too few questions to split and still fill a check keeps its
 * whole pool — that attempt loses the guarantee instead of running short.
 */
function poolForVariant(
  questionIds: readonly string[],
  skillId: string,
  variant: number,
  need: number,
): string[] {
  const ordered = shuffle(questionIds, `variant-partition:${skillId}`);
  const size = Math.floor(ordered.length / VARIANTS);
  if (size < need) return ordered;
  const start = (((variant % VARIANTS) + VARIANTS) % VARIANTS) * size;
  return ordered.slice(start, start + size);
}

/** FNV-1a, for turning a cuid into a number. */
function hashSeed(seed: string): number {
  let hash = 0x811c9dc5;
  for (let index = 0; index < seed.length; index++) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** mulberry32: small, fast, good enough for shuffling a quiz. */
function random(seed: string): () => number {
  let state = hashSeed(seed);
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher-Yates, seeded. Never mutates the input. */
export function shuffle<T>(items: readonly T[], seed: string): T[] {
  const next = random(seed);
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const swap = Math.floor(next() * (index + 1));
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
}

/**
 * Round-robin over skills in weight order, taking one question per skill per
 * round. Two rounds is the target shape (about two per skill). If the course
 * has more skills than the budget allows, the heaviest skills get their two and
 * the lightest get fewer or none. If it has fewer, later rounds top up from the
 * heaviest skills first, capped so no single skill dominates.
 */
export function selectQuestions(pools: readonly SkillPool[], options: SelectionOptions): string[] {
  const target = options.target ?? 14;
  const perSkill = options.perSkill ?? 2;
  const maxPerSkill = perSkill * 2;
  const variant = options.variant ?? 0;

  const ordered = [...pools]
    .filter((pool) => pool.questionIds.length > 0)
    .sort((a, b) => b.weight - a.weight || a.skillId.localeCompare(b.skillId))
    .map((pool) => ({
      ...pool,
      // The variant picks the half; the seed shuffles within it, so two students
      // on the same variant still get different orders and, where the half is
      // bigger than the check needs, different questions.
      questionIds: shuffle(
        poolForVariant(pool.questionIds, pool.skillId, variant, maxPerSkill),
        `${options.seed}:${pool.skillId}`,
      ),
    }));

  const picked: string[] = [];
  for (let round = 0; round < maxPerSkill && picked.length < target; round++) {
    let progressed = false;
    for (const pool of ordered) {
      if (picked.length >= target) break;
      const questionId = pool.questionIds[round];
      if (questionId === undefined) continue;
      picked.push(questionId);
      progressed = true;
    }
    if (!progressed) break;
  }

  // Interleave skills, as the prototype did, so the check does not walk topic
  // by topic and telegraph what it is testing.
  return shuffle(picked, `${options.seed}:order`);
}

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
  /** How many questions to aim for. */
  target?: number;
  /** How many per skill before topping up from the heaviest skills. */
  perSkill?: number;
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

  const ordered = [...pools]
    .filter((pool) => pool.questionIds.length > 0)
    .sort((a, b) => b.weight - a.weight || a.skillId.localeCompare(b.skillId))
    .map((pool) => ({
      ...pool,
      // Shuffled per skill so repeat attempts on the same course differ.
      questionIds: shuffle(pool.questionIds, `${options.seed}:${pool.skillId}`),
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

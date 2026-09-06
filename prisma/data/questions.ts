/**
 * The fourteen diagnostic questions, ported from the prototype.
 *
 * None of them is a calculus question. That is the point: the student is told
 * up front that the check is looking underneath the course, not inside it.
 *
 * NOTATION: stems and option text use the stored format defined in
 * lib/notation.ts — plain text with math inside $...$. No HTML anywhere. The
 * seed validates every string here before it writes, so a bad stem fails the
 * seed rather than reaching a render path. Written with String.raw so that
 * backslash commands survive: a plain "\ne" is the two characters "ne".
 *
 * OPTION ORDER: the correct answer is authored first, as in the prototype. The
 * client shuffles at render time; nothing downstream may assume position 0.
 *
 * MISCONCEPTIONS: optional here because these are content-chain questions,
 * where a wrong answer is mostly just wrong. They are filled in where a
 * distractor represents a specific, nameable error. For the skill chains (Lit),
 * every distractor will need one — that is what makes a judgment question
 * diagnostic rather than a recall question in disguise.
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

export const QUESTIONS: SeedQuestion[] = [
  {
    id: "q-solve-for-constant-1",
    skillId: "solve-for-constant",
    prompt: String.raw`Solve for $c$:  $3c + 5 = 2c - 4$`,
    options: [
      { text: String.raw`$c = -9$`, isCorrect: true },
      { text: String.raw`$c = -1$`, misconception: "Subtracted the constants without moving the c term across" },
      { text: String.raw`$c = 9$`, misconception: "Right magnitude, lost the sign" },
      { text: String.raw`$c = 1$`, misconception: "Moved both terms the wrong way" },
    ],
  },
  {
    id: "q-factoring-quadratics-1",
    skillId: "factoring-quadratics",
    prompt: String.raw`Factor:  $x^2 - 9$`,
    options: [
      { text: String.raw`$(x - 3)(x + 3)$`, isCorrect: true },
      { text: String.raw`$(x - 3)^2$`, misconception: "Read a difference of squares as a perfect square" },
      { text: String.raw`$(x - 9)(x + 1)$`, misconception: "Treated 9 as a constant term instead of a square" },
      { text: String.raw`$(x + 3)^2$`, misconception: "Dropped the minus sign in the difference of squares" },
    ],
  },
  {
    id: "q-strict-vs-inclusive-1",
    skillId: "strict-vs-inclusive-inequalities",
    prompt:
      String.raw`A rule reads “$x + 4$ when $x < 1$”.` + "\n" +
      String.raw`Does this rule apply at exactly $x = 1$?`,
    options: [
      { text: String.raw`No — $x = 1$ is not included`, isCorrect: true },
      { text: String.raw`Yes — $x = 1$ is included`, misconception: "Reads a strict inequality as inclusive" },
      { text: `Only if the function is continuous`, misconception: "Thinks the domain depends on continuity rather than the other way round" },
      { text: `Not enough information` },
    ],
  },
  {
    id: "q-substitute-value-1",
    skillId: "substitute-value",
    prompt: String.raw`Evaluate  $3x^2 - 2$  at  $x = -2$`,
    options: [
      { text: String.raw`$10$`, isCorrect: true },
      { text: String.raw`$-14$`, misconception: "Squared before applying the sign: computed $-(2^2)$" },
      { text: String.raw`$34$`, misconception: "Applied the exponent to the coefficient as well: computed $(3x)^2$" },
      { text: String.raw`$12$`, misconception: "Dropped the constant term" },
    ],
  },
  {
    id: "q-evaluate-piecewise-1",
    skillId: "evaluate-piecewise",
    prompt:
      String.raw`$f(x) = x + 1$ when $x < 2$, and $3x$ when $x \ge 2$.` + "\n" +
      String.raw`What is $f(2)$?`,
    options: [
      { text: String.raw`$6$`, isCorrect: true },
      { text: String.raw`$3$`, misconception: "Used the piece that stops just short of the break point" },
      { text: String.raw`$5$`, misconception: "Combined the two pieces instead of choosing one" },
      { text: `Undefined`, misconception: "Assumed a break point has no value" },
    ],
  },
  {
    id: "q-simplify-rational-1",
    skillId: "simplify-rational-expressions",
    prompt: String.raw`For $x \ne 3$, simplify:  $\frac{x^2 - 9}{x - 3}$`,
    options: [
      { text: String.raw`$x + 3$`, isCorrect: true },
      { text: String.raw`$x - 3$`, misconception: "Cancelled the wrong factor" },
      { text: String.raw`$x^2 - 3$`, misconception: "Cancelled a term instead of a factor" },
      { text: String.raw`$3$` },
    ],
  },
  {
    id: "q-set-expressions-equal-1",
    skillId: "set-expressions-equal",
    prompt:
      String.raw`$f(x) = x + a$ when $x < 1$, and $3x$ when $x \ge 1$.` + "\n" +
      String.raw`Which equation makes the two pieces meet at $x = 1$?`,
    options: [
      { text: String.raw`$1 + a = 3$`, isCorrect: true },
      { text: String.raw`$a = 3$`, misconception: "Set the constant equal to the other piece without substituting" },
      { text: String.raw`$1 + a = 3 + a$`, misconception: "Carried the unknown into both sides" },
      { text: String.raw`$a = 0$`, misconception: "Guessed a value instead of writing the condition" },
    ],
  },
  {
    id: "q-solve-for-constant-2",
    skillId: "solve-for-constant",
    prompt: String.raw`Solve for $k$:  $2k + 1 = 7$`,
    options: [
      { text: String.raw`$k = 3$`, isCorrect: true },
      { text: String.raw`$k = 4$`, misconception: "Subtracted before dividing, then divided the wrong term" },
      { text: String.raw`$k = 3.5$`, misconception: "Divided before moving the constant" },
      { text: String.raw`$k = 6$`, misconception: "Moved the constant but never divided" },
    ],
  },
  {
    id: "q-factoring-quadratics-2",
    skillId: "factoring-quadratics",
    prompt: String.raw`Factor:  $x^2 - x - 6$`,
    options: [
      { text: String.raw`$(x - 3)(x + 2)$`, isCorrect: true },
      { text: String.raw`$(x - 2)(x + 3)$`, misconception: "Signs reversed — this expands to $x^2 + x - 6$" },
      { text: String.raw`$(x - 6)(x + 1)$`, misconception: "Found factors of 6 that do not sum to the middle term" },
      { text: String.raw`$(x - 1)(x + 6)$`, misconception: "Found factors of 6 that do not sum to the middle term" },
    ],
  },
  {
    id: "q-evaluate-piecewise-2",
    skillId: "evaluate-piecewise",
    prompt:
      String.raw`$g(x) = x^2$ when $x \le 5$, and $2x$ when $x > 5$.` + "\n" +
      String.raw`What is $g(5)$?`,
    options: [
      { text: String.raw`$25$`, isCorrect: true },
      { text: String.raw`$10$`, misconception: "Used the piece that starts just past the break point" },
      { text: String.raw`Both $25$ and $10$`, misconception: "Thinks both pieces can define the same point" },
      { text: `Undefined`, misconception: "Assumed a break point has no value" },
    ],
  },
  {
    id: "q-substitute-value-2",
    skillId: "substitute-value",
    prompt:
      String.raw`$f(x) = x + a$  for  $x < 1$.` + "\n" +
      String.raw`What do you get by substituting $x = 1$ into this piece?`,
    options: [
      { text: String.raw`$1 + a$`, isCorrect: true },
      { text: String.raw`$a$`, misconception: "Dropped the substituted value" },
      { text: String.raw`$1$`, misconception: "Dropped the unknown constant" },
      { text: String.raw`$1 - a$`, misconception: "Changed the sign of the constant while substituting" },
    ],
  },
  {
    id: "q-simplify-rational-2",
    skillId: "simplify-rational-expressions",
    prompt: String.raw`For $x \ne -2$, simplify:  $\frac{x^2 - x - 6}{x + 2}$`,
    options: [
      { text: String.raw`$x - 3$`, isCorrect: true },
      { text: String.raw`$x + 3$`, misconception: "Factored with the signs reversed, then cancelled" },
      { text: String.raw`$x - 2$`, misconception: "Cancelled the denominator against the wrong factor" },
      { text: String.raw`$x^2 - 3$`, misconception: "Cancelled a term instead of a factor" },
    ],
  },
  {
    id: "q-strict-vs-inclusive-2",
    skillId: "strict-vs-inclusive-inequalities",
    prompt:
      String.raw`$f(x) = x + 4$ when $x < 1$, and $2x$ when $x \ge 1$.` + "\n" +
      String.raw`Which rule gives the value at exactly $x = 1$?`,
    options: [
      { text: String.raw`$2x$`, isCorrect: true },
      { text: String.raw`$x + 4$`, misconception: "Gave the break point to the strict piece" },
      { text: `Neither`, misconception: "Thinks a break point belongs to no piece" },
      { text: `Both`, misconception: "Thinks a break point belongs to both pieces" },
    ],
  },
  {
    // NOTE: the prototype tagged this one setequal, but it reads as
    // solve-for-constant — the equation is handed to the student already
    // written. Kept on the prototype's skill so the port is faithful; worth
    // deciding before you write question 15.
    id: "q-set-expressions-equal-2",
    skillId: "set-expressions-equal",
    prompt:
      String.raw`You set up $1 + a = 3$ to make the pieces meet.` + "\n" +
      String.raw`What is $a$?`,
    options: [
      { text: String.raw`$a = 2$`, isCorrect: true },
      { text: String.raw`$a = 3$`, misconception: "Read off the right-hand side without solving" },
      { text: String.raw`$a = 4$`, misconception: "Added instead of subtracting" },
      { text: String.raw`$a = -2$`, misconception: "Solved correctly, then flipped the sign" },
    ],
  },
];

/**
 * ALGEBRA — the skills the Calculus chains rest on, and the ones AP Physics C
 * rests on too. Nothing here is a calculus question: that is the point, and the
 * student is told so up front.
 *
 * These stems are deliberately course-neutral. The skills are canonical, so the
 * same factoring question serves every course that links to factoring.
 *
 * Fourteen of these are ported from the original prototype.
 */

import type { SeedQuestion } from "./types";

export const ALGEBRA_QUESTIONS: SeedQuestion[] = [
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
    // RETAGGED. The prototype filed this under setequal, but the equation is
    // handed to the student already written, so what it actually tests is
    // solving for the constant. The id keeps its original name: ids are the
    // stable key that AttemptAnswer rows point at, and renaming one would
    // strand the old row in the pool rather than replace it.
    id: "q-set-expressions-equal-2",
    skillId: "solve-for-constant",
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
  {
    // Written to replace the question retagged above, so setting-up and
    // solving keep two questions each.
    id: "q-set-expressions-equal-3",
    skillId: "set-expressions-equal",
    prompt:
      String.raw`$f(x) = 2x + b$ when $x < 3$, and $x^2$ when $x \ge 3$.` + "\n" +
      String.raw`Which equation makes the two pieces meet at $x = 3$?`,
    options: [
      { text: String.raw`$6 + b = 9$`, isCorrect: true },
      { text: String.raw`$2 + b = 9$`, misconception: "Substituted the break point into only part of the piece" },
      { text: String.raw`$b = 9$`, misconception: "Set the constant equal to the other piece without substituting" },
      { text: String.raw`$6 + b = 3$`, misconception: "Substituted the break point into the wrong side" },
    ],
  },
  // The two skills AP Physics C leans on hardest had only two questions each,
  // which left its check three questions short of a full fourteen. These four
  // fill it out, and give Calculus more variety across retakes.
  {
    id: "q-substitute-value-3",
    skillId: "substitute-value",
    prompt: String.raw`Evaluate  $-x^2 + 4$  at  $x = 3$`,
    options: [
      { text: String.raw`$-5$`, isCorrect: true },
      { text: String.raw`$13$`, misconception: "Squared the sign along with the number" },
      { text: String.raw`$-13$`, misconception: "Negated the constant along with the square" },
      { text: String.raw`$7$`, misconception: "Dropped the exponent" },
    ],
  },
  {
    id: "q-substitute-value-4",
    skillId: "substitute-value",
    prompt:
      String.raw`$h(t) = 5 - 2t$.` + "\n" +
      String.raw`What is $h(-4)$?`,
    options: [
      { text: String.raw`$13$`, isCorrect: true },
      { text: String.raw`$-3$`, misconception: "Substituted $4$ where the value was $-4$" },
      { text: String.raw`$3$`, misconception: "Subtracted where two negatives should have added" },
      { text: String.raw`$-13$`, misconception: "Negated the whole result at the end" },
    ],
  },
  {
    id: "q-factoring-quadratics-3",
    skillId: "factoring-quadratics",
    prompt: String.raw`Factor:  $2x^2 + 7x + 3$`,
    options: [
      { text: String.raw`$(2x + 1)(x + 3)$`, isCorrect: true },
      { text: String.raw`$(2x + 3)(x + 1)$`, misconception: "Swapped the constants, which changes the middle term" },
      { text: String.raw`$(x + 1)(x + 3)$`, misconception: "Ignored the leading coefficient" },
      { text: String.raw`$(2x - 1)(x - 3)$`, misconception: "Right factors, wrong signs" },
    ],
  },
  {
    id: "q-factoring-quadratics-4",
    skillId: "factoring-quadratics",
    prompt: String.raw`Factor completely:  $x^3 - 4x$`,
    options: [
      { text: String.raw`$x(x - 2)(x + 2)$`, isCorrect: true },
      { text: String.raw`$x(x^2 - 4)$`, misconception: "Stopped before factoring the difference of squares" },
      { text: String.raw`$(x - 2)(x + 2)$`, misconception: "Dropped the common factor of $x$" },
      { text: String.raw`$x(x - 4)(x + 4)$`, misconception: "Took the square root of the wrong number" },
    ],
  },
];

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
  // ---- Second wave. Every skill is brought to eight questions so a retake
  // draws a different sample: a check serves two to four per skill, so four in
  // the pool meant a student who took it twice saw most of the same paper.

  // ===== Solving an equation for an unknown constant =====
  {
    id: "q-solve-for-constant-3",
    skillId: "solve-for-constant",
    prompt: String.raw`Solve for $m$:  $5m - 8 = 3m + 2$`,
    options: [
      { text: String.raw`$m = 5$`, isCorrect: true },
      { text: String.raw`$m = 10$`, misconception: "Collected the terms correctly, then never divided by 2" },
      { text: String.raw`$m = -5$`, misconception: "Right size, wrong sign" },
      { text: String.raw`$m = 3$`, misconception: "Subtracted the constants instead of adding them across" },
    ],
  },
  {
    id: "q-solve-for-constant-4",
    skillId: "solve-for-constant",
    prompt: String.raw`Solve for $b$:  $\frac{b}{4} + 3 = 7$`,
    options: [
      { text: String.raw`$b = 16$`, isCorrect: true },
      { text: String.raw`$b = 40$`, misconception: "Added 3 instead of subtracting it before multiplying" },
      { text: String.raw`$b = 4$`, misconception: "Stopped one step early, at the value of the fraction" },
      { text: String.raw`$b = 1$`, misconception: "Divided where the inverse operation was to multiply" },
    ],
  },
  {
    id: "q-solve-for-constant-5",
    skillId: "solve-for-constant",
    prompt: String.raw`Solve for $t$:  $7 - 2t = 1$`,
    options: [
      { text: String.raw`$t = 3$`, isCorrect: true },
      { text: String.raw`$t = -3$`, misconception: "Lost the sign when dividing by a negative" },
      { text: String.raw`$t = 4$`, misconception: "Added 7 to 1 instead of subtracting" },
      { text: String.raw`$t = -4$`, misconception: "Added 7 to 1 and lost the sign as well" },
    ],
  },
  {
    id: "q-solve-for-constant-6",
    skillId: "solve-for-constant",
    prompt: String.raw`Solve for $c$:  $2c + x = 10$`,
    options: [
      { text: String.raw`$c = \frac{10 - x}{2}$`, isCorrect: true },
      { text: String.raw`$c = 5 - x$`, misconception: "Divided only the first term by 2" },
      { text: String.raw`$c = 10 - 2x$`, misconception: "Multiplied by 2 where dividing was needed" },
      { text: String.raw`$c = 5 + x$`, misconception: "Moved x across without changing its sign" },
    ],
  },
  {
    id: "q-solve-for-constant-7",
    skillId: "solve-for-constant",
    prompt: String.raw`Solve for $k$:  $3(k - 2) = 12$`,
    options: [
      { text: String.raw`$k = 6$`, isCorrect: true },
      { text: String.raw`$k = 4$`, misconception: "Stopped after dividing by 3" },
      { text: String.raw`$k = 2$`, misconception: "Subtracted 2 where it needed adding back" },
      { text: String.raw`$k = 18$`, misconception: "Multiplied by 3 instead of dividing" },
    ],
  },

  // ===== Setting two expressions equal to each other =====
  {
    id: "q-set-expressions-equal-4",
    skillId: "set-expressions-equal",
    prompt:
      String.raw`$f(x) = 4x$ when $x < 2$, and $x + c$ when $x \ge 2$.` + "\n" +
      String.raw`Which equation makes the two pieces meet at $x = 2$?`,
    options: [
      { text: String.raw`$8 = 2 + c$`, isCorrect: true },
      { text: String.raw`$4 = 2 + c$`, misconception: "Substituted into the coefficient rather than the whole piece" },
      { text: String.raw`$8 = c$`, misconception: "Dropped the break point from the second piece" },
      { text: String.raw`$4x = x + c$`, misconception: "Never substituted the break point at all" },
    ],
  },
  {
    id: "q-set-expressions-equal-5",
    skillId: "set-expressions-equal",
    prompt:
      `One plan costs 20 up front plus 0.10 a minute. Another costs 35 flat.` + "\n" +
      String.raw`Which equation finds the number of minutes $m$ where they cost the same?`,
    options: [
      { text: String.raw`$20 + 0.1m = 35$`, isCorrect: true },
      { text: String.raw`$20 + 0.1m = 35m$`, misconception: "Made the flat fee depend on minutes too" },
      { text: String.raw`$0.1m = 35$`, misconception: "Dropped the up-front cost from the first plan" },
      { text: String.raw`$20m + 0.1 = 35$`, misconception: "Attached the minutes to the wrong number" },
    ],
  },
  {
    id: "q-set-expressions-equal-6",
    skillId: "set-expressions-equal",
    prompt:
      String.raw`Where do $y = 3x - 1$ and $y = x + 7$ meet?` + "\n" +
      String.raw`Which equation finds the $x$ value?`,
    options: [
      { text: String.raw`$3x - 1 = x + 7$`, isCorrect: true },
      { text: String.raw`$(3x - 1) + (x + 7) = 0$`, misconception: "Added the two expressions instead of equating them" },
      { text: String.raw`$(3x - 1)(x + 7) = 0$`, misconception: "Multiplied the two instead of equating them" },
      { text: String.raw`$3x = x$`, misconception: "Dropped both constants" },
    ],
  },
  {
    id: "q-set-expressions-equal-7",
    skillId: "set-expressions-equal",
    prompt:
      String.raw`$g(x) = ax$ when $x < 4$, and $x + 6$ when $x \ge 4$.` + "\n" +
      String.raw`Which equation makes the pieces meet at $x = 4$?`,
    options: [
      { text: String.raw`$4a = 10$`, isCorrect: true },
      { text: String.raw`$a = 10$`, misconception: "Left the break point out of the first piece" },
      { text: String.raw`$4 + a = 10$`, misconception: "Added the coefficient instead of multiplying by it" },
      { text: String.raw`$4a = 6$`, misconception: "Left the break point out of the second piece" },
    ],
  },
  {
    id: "q-set-expressions-equal-8",
    skillId: "set-expressions-equal",
    prompt:
      String.raw`A square of side $s$ has the same perimeter as a rectangle $3$ by $x$.` + "\n" +
      `Which equation says so?`,
    options: [
      { text: String.raw`$4s = 2(3 + x)$`, isCorrect: true },
      { text: String.raw`$4s = 6 + x$`, misconception: "Doubled only one side of the rectangle" },
      { text: String.raw`$4s = 3x$`, misconception: "Set a perimeter equal to an area" },
      { text: String.raw`$s^2 = 3x$`, misconception: "Set the two areas equal instead of the perimeters" },
    ],
  },
  {
    id: "q-set-expressions-equal-9",
    skillId: "set-expressions-equal",
    prompt:
      String.raw`$f(x) = x^2$ when $x \le 1$, and $bx$ when $x > 1$.` + "\n" +
      String.raw`Which equation makes the pieces meet at $x = 1$?`,
    options: [
      { text: String.raw`$1 = b$`, isCorrect: true },
      { text: String.raw`$1 = b + 1$`, misconception: "Added the break point to the second piece as well as multiplying" },
      { text: String.raw`$2b = 1$`, misconception: "Doubled the coefficient" },
      { text: String.raw`$b = 0$`, misconception: "Guessed a value instead of writing the condition" },
    ],
  },

  // ===== Reading strict vs. inclusive inequalities =====
  {
    id: "q-strict-vs-inclusive-3",
    skillId: "strict-vs-inclusive-inequalities",
    prompt: String.raw`Which values satisfy $x \le 3$ but not $x < 3$?`,
    options: [
      { text: String.raw`Only $x = 3$`, isCorrect: true },
      { text: String.raw`Every $x$ below 3`, misconception: "Read the two symbols as describing different directions" },
      { text: `No values at all`, misconception: "Read the two symbols as identical" },
      { text: String.raw`Every $x$ above 3`, misconception: "Read both symbols backwards" },
    ],
  },
  {
    id: "q-strict-vs-inclusive-4",
    skillId: "strict-vs-inclusive-inequalities",
    prompt:
      String.raw`A rule applies when $2 < x \le 5$.` + "\n" +
      `At which value does it apply?`,
    options: [
      { text: String.raw`$x = 5$`, isCorrect: true },
      { text: String.raw`$x = 2$`, misconception: "Treated the strict end as inclusive" },
      { text: String.raw`$x = 1.5$`, misconception: "Went below the lower bound entirely" },
      { text: String.raw`$x = 6$`, misconception: "Went above the upper bound entirely" },
    ],
  },
  {
    id: "q-strict-vs-inclusive-5",
    skillId: "strict-vs-inclusive-inequalities",
    prompt: String.raw`Which endpoints does the interval $[1, 4)$ include?`,
    options: [
      { text: String.raw`$1$ but not $4$`, isCorrect: true },
      { text: String.raw`$4$ but not $1$`, misconception: "Read the two bracket types backwards" },
      { text: `Both of them`, misconception: "Read the round bracket as inclusive" },
      { text: `Neither of them`, misconception: "Read the square bracket as exclusive" },
    ],
  },
  {
    id: "q-strict-vs-inclusive-6",
    skillId: "strict-vs-inclusive-inequalities",
    prompt:
      String.raw`$f(x) = x$ for $x \le 0$, and $f(x) = x + 1$ for $x > 0$.` + "\n" +
      String.raw`What is $f(0)$?`,
    options: [
      { text: String.raw`$0$`, isCorrect: true },
      { text: String.raw`$1$`, misconception: "Used the piece that starts just past the boundary" },
      { text: `Undefined`, misconception: "Assumed a boundary belongs to no piece" },
      { text: String.raw`Both $0$ and $1$`, misconception: "Assumed a boundary belongs to both pieces" },
    ],
  },
  {
    id: "q-strict-vs-inclusive-7",
    skillId: "strict-vs-inclusive-inequalities",
    prompt: String.raw`Which inequality says "at least 18"?`,
    options: [
      { text: String.raw`$x \ge 18$`, isCorrect: true },
      { text: String.raw`$x > 18$`, misconception: "Read 'at least' as strictly greater" },
      { text: String.raw`$x \le 18$`, misconception: "Reversed the direction" },
      { text: String.raw`$x < 18$`, misconception: "Reversed the direction and dropped the boundary" },
    ],
  },
  {
    id: "q-strict-vs-inclusive-8",
    skillId: "strict-vs-inclusive-inequalities",
    prompt: String.raw`Which inequality says "fewer than 30"?`,
    options: [
      { text: String.raw`$x < 30$`, isCorrect: true },
      { text: String.raw`$x \le 30$`, misconception: "Read 'fewer than' as including 30" },
      { text: String.raw`$x > 30$`, misconception: "Reversed the direction" },
      { text: String.raw`$x \ge 30$`, misconception: "Reversed the direction and included the boundary" },
    ],
  },

  // ===== Evaluating a piecewise function at a point =====
  {
    id: "q-evaluate-piecewise-3",
    skillId: "evaluate-piecewise",
    prompt:
      String.raw`$f(x) = 2x$ for $x < 0$, and $x^2$ for $x \ge 0$.` + "\n" +
      String.raw`What is $f(-3)$?`,
    options: [
      { text: String.raw`$-6$`, isCorrect: true },
      { text: String.raw`$9$`, misconception: "Used the piece for non-negative inputs" },
      { text: String.raw`$6$`, misconception: "Right piece, lost the sign" },
      { text: String.raw`$-9$`, misconception: "Wrong piece and lost the sign" },
    ],
  },
  {
    id: "q-evaluate-piecewise-4",
    skillId: "evaluate-piecewise",
    prompt:
      String.raw`$f(x) = 5$ for $x < 1$, and $2x$ for $x \ge 1$.` + "\n" +
      String.raw`What is $f(1)$?`,
    options: [
      { text: String.raw`$2$`, isCorrect: true },
      { text: String.raw`$5$`, misconception: "Used the piece that stops just short of 1" },
      { text: String.raw`$7$`, misconception: "Added the two pieces together" },
      { text: `Undefined`, misconception: "Assumed a break point has no value" },
    ],
  },
  {
    id: "q-evaluate-piecewise-5",
    skillId: "evaluate-piecewise",
    prompt:
      String.raw`$h(x) = x - 1$ for $x \le 2$, and $3 - x$ for $x > 2$.` + "\n" +
      String.raw`What is $h(2) + h(4)$?`,
    options: [
      { text: String.raw`$0$`, isCorrect: true },
      { text: String.raw`$2$`, misconception: "Used the first piece for both inputs" },
      { text: String.raw`$-2$`, misconception: "Used the second piece for both inputs" },
      { text: String.raw`$4$`, misconception: "Added the inputs rather than the outputs" },
    ],
  },
  {
    id: "q-evaluate-piecewise-6",
    skillId: "evaluate-piecewise",
    prompt:
      String.raw`A function is defined in three pieces: for $x < 0$, for $0 \le x < 5$, and for $x \ge 5$.` + "\n" +
      String.raw`Which piece defines $f(0)$?`,
    options: [
      { text: `The middle one`, isCorrect: true },
      { text: `The first one`, misconception: "Gave the boundary to the piece below it" },
      { text: `The last one`, misconception: "Picked a piece whose range does not contain the input" },
      { text: `None of them`, misconception: "Assumed the boundary falls through the gaps" },
    ],
  },
  {
    id: "q-evaluate-piecewise-7",
    skillId: "evaluate-piecewise",
    prompt:
      String.raw`$f(x) = x^2$ for every $x \ne 2$, and $f(2) = 7$.` + "\n" +
      String.raw`What is $f(2)$?`,
    options: [
      { text: String.raw`$7$`, isCorrect: true },
      { text: String.raw`$4$`, misconception: "Used the formula at the one point where it was overridden" },
      { text: `Undefined`, misconception: "Missed the second line of the definition" },
      { text: String.raw`Both $4$ and $7$`, misconception: "Let two rules define the same point" },
    ],
  },
  {
    id: "q-evaluate-piecewise-8",
    skillId: "evaluate-piecewise",
    prompt:
      String.raw`$g(x) = 3$ for $x < 1$, and $x + 2$ for $x \ge 1$.` + "\n" +
      String.raw`Do the two pieces meet at $x = 1$?`,
    options: [
      { text: `Yes — both give 3 there`, isCorrect: true },
      { text: `No — the rule changes, so there is a jump`, misconception: "Confused a change of rule with a break in the graph" },
      { text: `No — a constant piece cannot meet a sloped one`, misconception: "Judged by the shape of the pieces rather than their values" },
      { text: `There is no way to tell`, misconception: "Treated a fully defined function as undetermined" },
    ],
  },

  // ===== Substituting a value into an expression =====
  {
    id: "q-substitute-value-5",
    skillId: "substitute-value",
    prompt: String.raw`Evaluate  $2x^2 - 3x$  at  $x = -1$`,
    options: [
      { text: String.raw`$5$`, isCorrect: true },
      { text: String.raw`$1$`, misconception: "Dropped the exponent" },
      { text: String.raw`$-1$`, misconception: "Substituted $1$ where the value was $-1$" },
      { text: String.raw`$-5$`, misconception: "Negated the whole result at the end" },
    ],
  },
  {
    id: "q-substitute-value-6",
    skillId: "substitute-value",
    prompt:
      String.raw`$A = \frac{1}{2}bh$.` + "\n" +
      String.raw`Find $A$ when $b = 6$ and $h = 9$.`,
    options: [
      { text: String.raw`$27$`, isCorrect: true },
      { text: String.raw`$54$`, misconception: "Left out the one half" },
      { text: String.raw`$13.5$`, misconception: "Halved twice" },
      { text: String.raw`$7.5$`, misconception: "Added the two values instead of multiplying" },
    ],
  },
  {
    id: "q-substitute-value-7",
    skillId: "substitute-value",
    prompt:
      String.raw`$f(x) = 3 - x^2$.` + "\n" +
      String.raw`What is $f(-4)$?`,
    options: [
      { text: String.raw`$-13$`, isCorrect: true },
      { text: String.raw`$19$`, misconception: "Squared the negative and then subtracted a negative" },
      { text: String.raw`$13$`, misconception: "Right size, wrong sign" },
      { text: String.raw`$-5$`, misconception: "Doubled instead of squaring" },
    ],
  },
  {
    id: "q-substitute-value-8",
    skillId: "substitute-value",
    prompt:
      String.raw`$P = 2(l + w)$.` + "\n" +
      String.raw`Find $P$ when $l = 7$ and $w = 3$.`,
    options: [
      { text: String.raw`$20$`, isCorrect: true },
      { text: String.raw`$10$`, misconception: "Added inside the bracket and forgot to double" },
      { text: String.raw`$17$`, misconception: "Doubled only the first term" },
      { text: String.raw`$42$`, misconception: "Multiplied the two values instead of adding them" },
    ],
  },

  // ===== Factoring quadratics =====
  {
    id: "q-factoring-quadratics-5",
    skillId: "factoring-quadratics",
    prompt: String.raw`Factor:  $x^2 + 5x + 6$`,
    options: [
      { text: String.raw`$(x + 2)(x + 3)$`, isCorrect: true },
      { text: String.raw`$(x + 1)(x + 6)$`, misconception: "Found factors of 6 that do not add to 5" },
      { text: String.raw`$(x - 2)(x - 3)$`, misconception: "Right numbers, both signs wrong" },
      { text: String.raw`$(x + 5)(x + 1)$`, misconception: "Used the middle coefficient as one of the factors" },
    ],
  },
  {
    id: "q-factoring-quadratics-6",
    skillId: "factoring-quadratics",
    prompt: String.raw`Factor:  $x^2 - 16$`,
    options: [
      { text: String.raw`$(x - 4)(x + 4)$`, isCorrect: true },
      { text: String.raw`$(x - 4)^2$`, misconception: "Read a difference of squares as a perfect square" },
      { text: String.raw`$(x - 16)(x + 1)$`, misconception: "Treated 16 as a constant term rather than a square" },
      { text: String.raw`$(x + 4)^2$`, misconception: "Dropped the minus sign as well" },
    ],
  },
  {
    id: "q-factoring-quadratics-7",
    skillId: "factoring-quadratics",
    prompt: String.raw`Factor completely:  $3x^2 - 12x$`,
    options: [
      { text: String.raw`$3x(x - 4)$`, isCorrect: true },
      { text: String.raw`$3(x^2 - 4x)$`, misconception: "Pulled out only the number" },
      { text: String.raw`$x(3x - 12)$`, misconception: "Pulled out only the x" },
      { text: String.raw`$3x(x - 12)$`, misconception: "Forgot to divide the second term by 3 as well" },
    ],
  },
  {
    id: "q-factoring-quadratics-8",
    skillId: "factoring-quadratics",
    prompt: String.raw`Factor:  $x^2 - 5x + 6$`,
    options: [
      { text: String.raw`$(x - 2)(x - 3)$`, isCorrect: true },
      { text: String.raw`$(x + 2)(x + 3)$`, misconception: "Right numbers, both signs wrong" },
      { text: String.raw`$(x - 1)(x - 6)$`, misconception: "Found factors of 6 that do not add to 5" },
      { text: String.raw`$(x - 5)(x - 1)$`, misconception: "Used the middle coefficient as one of the factors" },
    ],
  },

  // ===== Simplifying rational expressions =====
  {
    id: "q-simplify-rational-3",
    skillId: "simplify-rational-expressions",
    prompt: String.raw`For $x \ne 4$, simplify:  $\frac{x^2 - 16}{x - 4}$`,
    options: [
      { text: String.raw`$x + 4$`, isCorrect: true },
      { text: String.raw`$x - 4$`, misconception: "Cancelled the wrong factor" },
      { text: String.raw`$x^2 - 4$`, misconception: "Cancelled a term instead of a factor" },
      { text: String.raw`$4$`, misconception: "Cancelled the variable rather than the binomial" },
    ],
  },
  {
    id: "q-simplify-rational-4",
    skillId: "simplify-rational-expressions",
    prompt: String.raw`For $x \ne 0$, simplify:  $\frac{6x^3}{2x}$`,
    options: [
      { text: String.raw`$3x^2$`, isCorrect: true },
      { text: String.raw`$3x^3$`, misconception: "Divided the coefficients but left the powers alone" },
      { text: String.raw`$3x$`, misconception: "Subtracted the exponents twice" },
      { text: String.raw`$12x^2$`, misconception: "Multiplied the coefficients instead of dividing" },
    ],
  },
  {
    id: "q-simplify-rational-5",
    skillId: "simplify-rational-expressions",
    prompt: String.raw`For $x \ne -1$, simplify:  $\frac{x^2 + 3x + 2}{x + 1}$`,
    options: [
      { text: String.raw`$x + 2$`, isCorrect: true },
      { text: String.raw`$x + 1$`, misconception: "Cancelled the wrong factor" },
      { text: String.raw`$x^2 + 2$`, misconception: "Cancelled a term instead of a factor" },
      { text: String.raw`$x + 3$`, misconception: "Read the middle coefficient as the remaining factor" },
    ],
  },
  {
    id: "q-simplify-rational-6",
    skillId: "simplify-rational-expressions",
    prompt: String.raw`Can the $x$ be cancelled in  $\frac{x + 3}{x}$?`,
    options: [
      { text: `No — on the top it is a term, not a factor`, isCorrect: true },
      { text: String.raw`Yes, leaving $3$`, misconception: "Cancelled a term instead of a factor" },
      { text: String.raw`Yes, leaving $1 + 3$`, misconception: "Cancelled part of a sum and kept the rest" },
      { text: String.raw`Only when $x = 1$`, misconception: "Made cancelling depend on the value rather than the structure" },
    ],
  },
  {
    id: "q-simplify-rational-7",
    skillId: "simplify-rational-expressions",
    prompt: String.raw`For $x \ne \pm 2$, simplify:  $\frac{x - 2}{x^2 - 4}$`,
    options: [
      { text: String.raw`$\frac{1}{x + 2}$`, isCorrect: true },
      { text: String.raw`$x + 2$`, misconception: "Inverted the result" },
      { text: String.raw`$\frac{1}{x - 2}$`, misconception: "Cancelled against the wrong factor of the difference of squares" },
      { text: String.raw`$\frac{1}{x^2 - 2}$`, misconception: "Cancelled a term out of the denominator" },
    ],
  },
  {
    id: "q-simplify-rational-8",
    skillId: "simplify-rational-expressions",
    prompt: String.raw`Simplify:  $\frac{2x + 4}{2}$`,
    options: [
      { text: String.raw`$x + 2$`, isCorrect: true },
      { text: String.raw`$2x + 2$`, misconception: "Divided only the second term" },
      { text: String.raw`$x + 4$`, misconception: "Divided only the first term" },
      { text: String.raw`$2x$`, misconception: "Cancelled the 2s and discarded the rest" },
    ],
  },
];

/**
 * COMPUTING — the arithmetic and logic under AP Computer Science Principles and
 * AP Computer Science A.
 *
 * TODO: confirm with the CS teacher before these go in front of students.
 *
 * Deliberately language-neutral: no Java, no Python, no block editor. A student
 * who cannot say which branch of a condition runs has that problem in every
 * language, and pinning these questions to one syntax would have made them
 * useless to the other course.
 */

import type { SeedQuestion } from "./types";

export const COMPUTING_QUESTIONS: SeedQuestion[] = [
  // ===== Binary and place value =====
  {
    id: "q-number-bases-1",
    skillId: "number-bases",
    prompt: String.raw`The binary number $1011$ is which number in base ten?`,
    options: [
      { text: String.raw`$11$`, isCorrect: true },
      { text: String.raw`$1011$`, misconception: "Read the bits as ordinary decimal digits" },
      { text: String.raw`$13$`, misconception: "Read the bits right to left" },
      { text: String.raw`$7$`, misconception: "Left out one of the place values" },
    ],
  },
  {
    id: "q-number-bases-2",
    skillId: "number-bases",
    prompt: `How many different values can four bits hold?`,
    options: [
      { text: String.raw`$16$`, isCorrect: true },
      { text: String.raw`$8$`, misconception: "Counted the combinations of three bits" },
      { text: String.raw`$4$`, misconception: "Counted the bits rather than the combinations" },
      { text: String.raw`$15$`, misconception: "Gave the largest value rather than the number of values" },
    ],
  },
  {
    id: "q-number-bases-3",
    skillId: "number-bases",
    prompt:
      `Eight bits are holding the largest number they can. One more is added, and the storage does not grow.` + "\n" +
      `What happens?`,
    options: [
      { text: `It wraps around to zero`, isCorrect: true },
      { text: `It becomes 256`, misconception: "Assumed the storage grows to fit the value" },
      { text: `It stays at the maximum`, misconception: "Assumed the value stops at the top instead of wrapping" },
      { text: `The program always crashes`, misconception: "Assumed an error where the value simply wraps" },
    ],
  },
  {
    id: "q-number-bases-4",
    skillId: "number-bases",
    prompt: `How many bits are needed to store any whole number from $0$ to $1000$?`,
    options: [
      { text: String.raw`$10$`, isCorrect: true },
      { text: String.raw`$9$`, misconception: "Nine bits reach 511, one doubling short" },
      { text: String.raw`$4$`, misconception: "Counted the decimal digits rather than the bits" },
      { text: String.raw`$1000$`, misconception: "Confused the value with the space it takes" },
    ],
  },

  // ===== Deciding whether a condition is true =====
  {
    id: "q-boolean-logic-1",
    skillId: "boolean-logic",
    prompt:
      String.raw`Let $x = 5$.` + "\n" +
      String.raw`Is the condition "$x > 3$ AND $x < 5$" true?`,
    options: [
      { text: `No — the second half is false, so the whole thing is false`, isCorrect: true },
      { text: `Yes — the first half is true`, misconception: "Took AND as satisfied by one side" },
      { text: String.raw`Yes — $5$ is close enough to the range`, misconception: "Read a strict inequality as inclusive" },
      { text: `There is no way to tell`, misconception: "Treated a fully specified condition as undetermined" },
    ],
  },
  {
    id: "q-boolean-logic-2",
    skillId: "boolean-logic",
    prompt: `"NOT (A AND B)" is the same as which of these?`,
    options: [
      { text: `NOT A OR NOT B`, isCorrect: true },
      { text: `NOT A AND NOT B`, misconception: "Pushed the NOT inside without flipping AND to OR" },
      { text: `A OR B`, misconception: "Dropped the negation altogether" },
      { text: `NOT A AND B`, misconception: "Negated only the first term" },
    ],
  },
  {
    id: "q-boolean-logic-3",
    skillId: "boolean-logic",
    prompt:
      `A branch runs when "raining OR cold" is true. It is not raining, and it is cold.` + "\n" +
      `Does the branch run?`,
    options: [
      { text: `Yes — OR needs only one side to be true`, isCorrect: true },
      { text: `No — both sides have to be true`, misconception: "Read OR as AND" },
      { text: `No — the first condition is the one that counts`, misconception: "Treated the first side as the deciding one" },
      { text: `Only once it starts raining`, misconception: "Waited for one named condition instead of either" },
    ],
  },
  {
    id: "q-boolean-logic-4",
    skillId: "boolean-logic",
    prompt:
      String.raw`You want a branch that runs when $n$ is OUTSIDE the range $1$ to $10$.` + "\n" +
      `Which condition does that?`,
    options: [
      { text: String.raw`$n < 1$ OR $n > 10$`, isCorrect: true },
      { text: String.raw`$n < 1$ AND $n > 10$`, misconception: "Used AND, which no number can satisfy" },
      { text: String.raw`NOT ($n > 1$)`, misconception: "Negated one bound and dropped the other" },
      { text: String.raw`$n > 1$ OR $n < 10$`, misconception: "Wrote a condition that every number satisfies" },
    ],
  },

  // ===== Following a written procedure exactly =====
  {
    id: "q-trace-a-procedure-1",
    skillId: "trace-a-procedure",
    prompt:
      String.raw`$total$ starts at $0$. For each of $3$, $5$, $2$ in turn, add it to $total$.` + "\n" +
      String.raw`What is $total$ at the end?`,
    options: [
      { text: String.raw`$10$`, isCorrect: true },
      { text: String.raw`$2$`, misconception: "Kept only the last value instead of accumulating" },
      { text: String.raw`$3$`, misconception: "Kept only the first value" },
      { text: String.raw`$0$`, misconception: "Gave the starting value as the answer" },
    ],
  },
  {
    id: "q-trace-a-procedure-2",
    skillId: "trace-a-procedure",
    prompt:
      String.raw`$x = 4$. Then $x$ becomes $x + 3$. Then $x$ becomes $x \times 2$.` + "\n" +
      String.raw`What is $x$?`,
    options: [
      { text: String.raw`$14$`, isCorrect: true },
      { text: String.raw`$11$`, misconception: "Applied the two steps in the wrong order" },
      { text: String.raw`$7$`, misconception: "Stopped after the first step" },
      { text: String.raw`$8$`, misconception: "Skipped the addition" },
    ],
  },
  {
    id: "q-trace-a-procedure-3",
    skillId: "trace-a-procedure",
    prompt:
      String.raw`$count$ starts at $0$. While $count < 3$, add $1$ to $count$.` + "\n" +
      String.raw`What is $count$ once the loop stops?`,
    options: [
      { text: String.raw`$3$`, isCorrect: true },
      { text: String.raw`$2$`, misconception: "Stopped an iteration early — the loop runs until the condition fails" },
      { text: String.raw`$4$`, misconception: "Ran one iteration too many" },
      { text: String.raw`$0$`, misconception: "Assumed the loop never ran" },
    ],
  },
  {
    id: "q-trace-a-procedure-4",
    skillId: "trace-a-procedure",
    prompt:
      String.raw`$a = 1$ and $b = 2$. Then $a$ becomes $b$. Then $b$ becomes $a$.` + "\n" +
      String.raw`What are $a$ and $b$?`,
    options: [
      { text: String.raw`Both are $2$`, isCorrect: true },
      {
        text: String.raw`$a = 2$ and $b = 1$`,
        misconception: "Assumed the two lines swap — but the first has already overwritten a",
      },
      {
        text: String.raw`$a = 1$ and $b = 2$`,
        misconception: "Assumed assignment leaves the values where they were",
      },
      {
        text: String.raw`Both are $1$`,
        misconception: "Traced the second line using the old value of a",
      },
    ],
  },
];

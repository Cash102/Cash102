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

  // ---- Second wave: four more of each, so a retake draws a different sample.

  // ===== Binary and place value =====
  {
    id: "q-number-bases-5",
    skillId: "number-bases",
    prompt: String.raw`Which binary number is $6$?`,
    options: [
      { text: String.raw`$110$`, isCorrect: true },
      { text: String.raw`$011$`, misconception: "Wrote the bits right to left" },
      { text: String.raw`$101$`, misconception: "Off by one place value — that is 5" },
      { text: String.raw`$1010$`, misconception: "Used one place too many — that is 10" },
    ],
  },
  {
    id: "q-number-bases-6",
    skillId: "number-bases",
    prompt: String.raw`What is $11111111$ in binary, written in base ten?`,
    options: [
      { text: String.raw`$255$`, isCorrect: true },
      { text: String.raw`$256$`, misconception: "Gave the number of values rather than the largest one" },
      { text: String.raw`$128$`, misconception: "Gave only the highest place value" },
      { text: String.raw`$8$`, misconception: "Counted the bits rather than reading them" },
    ],
  },
  {
    id: "q-number-bases-7",
    skillId: "number-bases",
    prompt:
      `Two bits give four combinations. Three bits give eight.` + "\n" +
      `How many do four bits give?`,
    options: [
      { text: String.raw`$16$`, isCorrect: true },
      { text: String.raw`$12$`, misconception: "Added four each time instead of doubling" },
      { text: String.raw`$10$`, misconception: "Counted in tens rather than doublings" },
      { text: String.raw`$32$`, misconception: "Doubled once too often" },
    ],
  },
  {
    id: "q-number-bases-8",
    skillId: "number-bases",
    prompt: `Why do computers use binary?`,
    options: [
      { text: `A circuit is reliably either on or off, which gives exactly two states`, isCorrect: true },
      { text: `Binary numbers are shorter than decimal ones`, misconception: "Binary is longer, not shorter" },
      { text: `People find binary easier to read`, misconception: "Chose a reason about people rather than about hardware" },
      { text: `Base ten cannot represent very large numbers`, misconception: "Assumed a limitation that base ten does not have" },
    ],
  },

  // ===== Deciding whether a condition is true =====
  {
    id: "q-boolean-logic-5",
    skillId: "boolean-logic",
    prompt:
      String.raw`Let $x = 10$.` + "\n" +
      String.raw`Is "$x > 5$ OR $x > 20$" true?`,
    options: [
      { text: `Yes — the first half is true, and OR needs only one`, isCorrect: true },
      { text: String.raw`No — $10$ is not greater than $20$`, misconception: "Read OR as requiring both halves" },
      { text: `No — the two halves contradict each other`, misconception: "Treated two conditions on the same value as a contradiction" },
      { text: `There is no way to tell`, misconception: "Treated a fully specified condition as undetermined" },
    ],
  },
  {
    id: "q-boolean-logic-6",
    skillId: "boolean-logic",
    prompt: `"NOT (A OR B)" is the same as which of these?`,
    options: [
      { text: `NOT A AND NOT B`, isCorrect: true },
      { text: `NOT A OR NOT B`, misconception: "Pushed the NOT inside without flipping OR to AND" },
      { text: `A AND B`, misconception: "Dropped the negation altogether" },
      { text: `NOT A OR B`, misconception: "Negated only the first term" },
    ],
  },
  {
    id: "q-boolean-logic-7",
    skillId: "boolean-logic",
    prompt:
      `A loop should STOP when the list is empty OR a match is found.` + "\n" +
      `Which condition should it CONTINUE on?`,
    options: [
      { text: `The list is not empty AND no match has been found`, isCorrect: true },
      { text: `The list is not empty OR no match has been found`, misconception: "Negated the two parts but left the connective alone" },
      { text: `The list is empty AND a match has been found`, misconception: "Negated the connective but not the parts" },
      { text: `The list is empty OR a match has been found`, misconception: "Used the stopping condition as the continuing one" },
    ],
  },
  {
    id: "q-boolean-logic-8",
    skillId: "boolean-logic",
    prompt: String.raw`Which condition says "$x$ is between $1$ and $10$, endpoints included"?`,
    options: [
      { text: String.raw`$x \ge 1$ AND $x \le 10$`, isCorrect: true },
      { text: String.raw`$x \ge 1$ OR $x \le 10$`, misconception: "Used OR, which every number satisfies" },
      { text: String.raw`$x > 1$ AND $x < 10$`, misconception: "Excluded the endpoints the range included" },
      { text: String.raw`$x \le 1$ AND $x \ge 10$`, misconception: "Reversed both comparisons, which nothing satisfies" },
    ],
  },

  // ===== Following a written procedure exactly =====
  {
    id: "q-trace-a-procedure-5",
    skillId: "trace-a-procedure",
    prompt:
      String.raw`A list holds $4$, $7$, $1$. Set $best$ to the first item. For each item, if the item is less than $best$, set $best$ to that item.` + "\n" +
      String.raw`What is $best$ at the end?`,
    options: [
      { text: String.raw`$1$`, isCorrect: true },
      { text: String.raw`$4$`, misconception: "Kept the starting value and never updated it" },
      { text: String.raw`$7$`, misconception: "Tracked the largest instead of the smallest" },
      { text: String.raw`$12$`, misconception: "Accumulated a total instead of comparing" },
    ],
  },
  {
    id: "q-trace-a-procedure-6",
    skillId: "trace-a-procedure",
    prompt:
      String.raw`$x = 10$. Repeat three times: subtract $2$ from $x$.` + "\n" +
      String.raw`What is $x$?`,
    options: [
      { text: String.raw`$4$`, isCorrect: true },
      { text: String.raw`$8$`, misconception: "Ran the body once" },
      { text: String.raw`$6$`, misconception: "Ran the body twice" },
      { text: String.raw`$2$`, misconception: "Ran the body four times" },
    ],
  },
  {
    id: "q-trace-a-procedure-7",
    skillId: "trace-a-procedure",
    prompt:
      String.raw`A loop runs for $i$ from $1$ to $4$.` + "\n" +
      `How many times does the body run?`,
    options: [
      { text: String.raw`$4$`, isCorrect: true },
      { text: String.raw`$3$`, misconception: "Counted the gaps between the values rather than the values" },
      { text: String.raw`$5$`, misconception: "Counted one extra pass at the end" },
      { text: String.raw`$1$`, misconception: "Assumed the body runs once regardless of the range" },
    ],
  },
  {
    id: "q-trace-a-procedure-8",
    skillId: "trace-a-procedure",
    prompt:
      String.raw`$total$ starts at $0$. For each of $2$, $4$, $6$ in turn, SET $total$ TO that item.` + "\n" +
      String.raw`What is $total$ at the end?`,
    options: [
      { text: String.raw`$6$`, isCorrect: true },
      { text: String.raw`$12$`, misconception: "Read setting a value as adding to it" },
      { text: String.raw`$2$`, misconception: "Kept the first value assigned" },
      { text: String.raw`$0$`, misconception: "Assumed the loop never ran" },
    ],
  },
];

/**
 * QUANTITATIVE SCIENCE — the arithmetic and reading skills AP Biology rests on,
 * and which AP Chemistry rests on just as hard.
 *
 * TODO: confirm with an AP Bio teacher before these go in front of students.
 * The skills came from the same unreviewed pass as the chains in
 * skill-graph.ts; the questions are mine.
 *
 * Two deliberate choices:
 *
 *   - The ratio and scientific-notation stems carry NO biology in them. Those
 *     skills are canonical and Chemistry links to the same rows, so a stem
 *     about allele frequencies would have made a Chemistry student read a
 *     genetics problem to be told their proportions are shaky.
 *   - The graph questions describe their graph in words. Question has no image
 *     field, and inventing one to ship a picture is a bigger decision than this
 *     file should make. Described axes still catch the errors that matter —
 *     axes read backwards, a truncated axis, a plateau read as a fall — but a
 *     real graph-reading item bank needs images. Flagged in CLAUDE.md.
 */

import type { SeedQuestion } from "./types";

export const QUANTITATIVE_SCIENCE_QUESTIONS: SeedQuestion[] = [
  // ===== Ratios, proportions, percentages =====
  {
    id: "q-ratios-1",
    skillId: "ratios-and-proportions",
    prompt:
      String.raw`A group of 240 splits in the ratio $5 : 3$.` + "\n" +
      String.raw`How many are in the larger share?`,
    options: [
      { text: String.raw`$150$`, isCorrect: true },
      { text: String.raw`$90$`, misconception: "Solved for the other side of the ratio" },
      { text: String.raw`$30$`, misconception: "Found the size of one part and stopped" },
      { text: String.raw`$144$`, misconception: "Applied the ratio as a fraction of the total" },
    ],
  },
  {
    id: "q-ratios-2",
    skillId: "ratios-and-proportions",
    prompt: String.raw`Solve for $x$:  $\frac{3}{8} = \frac{x}{200}$`,
    options: [
      { text: String.raw`$x = 75$`, isCorrect: true },
      { text: String.raw`$x \approx 533$`, misconception: "Cross-multiplied in the wrong direction" },
      { text: String.raw`$x = 24$`, misconception: "Multiplied the two numerators" },
      { text: String.raw`$x = 0.375$`, misconception: "Stopped at the ratio without scaling it up" },
    ],
  },
  {
    id: "q-ratios-3",
    skillId: "ratios-and-proportions",
    prompt:
      String.raw`A quantity falls from $80$ to $60$.` + "\n" +
      String.raw`By what percent did it fall?`,
    options: [
      { text: `25 percent`, isCorrect: true },
      { text: `20 percent`, misconception: "Gave the size of the drop, not the drop as a percent" },
      { text: `33 percent`, misconception: "Divided by the new value instead of the original" },
      { text: `75 percent`, misconception: "Gave what is left rather than what was lost" },
    ],
  },
  {
    id: "q-ratios-4",
    skillId: "ratios-and-proportions",
    prompt:
      String.raw`Three units of A combine with five units of B.` + "\n" +
      String.raw`How much B is needed for twelve units of A?`,
    options: [
      { text: String.raw`$20$`, isCorrect: true },
      { text: String.raw`$7.2$`, misconception: "Inverted the ratio" },
      { text: String.raw`$4$`, misconception: "Found the scale factor and stopped" },
      { text: String.raw`$14$`, misconception: "Added the difference instead of scaling" },
    ],
  },

  // ===== Scientific notation and unit conversion =====
  {
    id: "q-scientific-notation-1",
    skillId: "scientific-notation",
    prompt: String.raw`Write $0.00042$ in scientific notation.`,
    options: [
      { text: String.raw`$4.2 \times 10^{-4}$`, isCorrect: true },
      { text: String.raw`$4.2 \times 10^{4}$`, misconception: "Right digits, wrong sign on the exponent" },
      { text: String.raw`$42 \times 10^{-5}$`, misconception: "Left a coefficient outside the range 1 to 10" },
      { text: String.raw`$4.2 \times 10^{-3}$`, misconception: "Counted the decimal places one short" },
    ],
  },
  {
    id: "q-scientific-notation-2",
    skillId: "scientific-notation",
    prompt: String.raw`Evaluate  $(3 \times 10^{5})(2 \times 10^{-8})$`,
    options: [
      { text: String.raw`$6 \times 10^{-3}$`, isCorrect: true },
      { text: String.raw`$6 \times 10^{-40}$`, misconception: "Multiplied the exponents instead of adding them" },
      { text: String.raw`$5 \times 10^{-3}$`, misconception: "Added the coefficients instead of multiplying them" },
      { text: String.raw`$6 \times 10^{13}$`, misconception: "Subtracted the exponents" },
    ],
  },
  {
    id: "q-scientific-notation-3",
    skillId: "scientific-notation",
    prompt:
      String.raw`One millimetre is $1000$ micrometres.` + "\n" +
      String.raw`How many micrometres are in $0.5$ millimetres?`,
    options: [
      { text: String.raw`$500$`, isCorrect: true },
      { text: String.raw`$0.0005$`, misconception: "Converted in the wrong direction" },
      { text: String.raw`$50$`, misconception: "Lost a factor of ten in the conversion" },
      { text: String.raw`$5000$`, misconception: "Multiplied by the conversion factor twice" },
    ],
  },
  {
    id: "q-scientific-notation-4",
    skillId: "scientific-notation",
    prompt: String.raw`Which is the larger quantity, $2 \times 10^{-6}$ or $9 \times 10^{-7}$?`,
    options: [
      { text: String.raw`$2 \times 10^{-6}$`, isCorrect: true },
      { text: String.raw`$9 \times 10^{-7}$`, misconception: "Compared the coefficients and ignored the exponents" },
      { text: `They are the same size`, misconception: "Treated a difference of one power of ten as no difference" },
      { text: `There is no way to tell`, misconception: "Read two comparable numbers as incomparable" },
    ],
  },

  // ===== Reading and interpreting graphs =====
  {
    id: "q-read-graphs-1",
    skillId: "read-graphs",
    prompt:
      String.raw`Temperature runs up the vertical axis, marked every $5$ degrees from $0$ to $40$. Time runs along the horizontal axis, marked every $2$ hours from $0$ to $12$.` + "\n" +
      String.raw`A point sits halfway between the $20$ and $25$ marks, directly above the $6$. What does it show?`,
    options: [
      { text: `22.5 degrees at 6 hours`, isCorrect: true },
      { text: `6 degrees at 22.5 hours`, misconception: "Read the two axes the wrong way round" },
      { text: `20 degrees at 6 hours`, misconception: "Rounded down to the nearest labelled mark instead of reading between them" },
      { text: `2.5 degrees at 6 hours`, misconception: "Read the gap between marks as the value" },
    ],
  },
  {
    id: "q-read-graphs-2",
    skillId: "read-graphs",
    prompt:
      String.raw`An experiment measures growth at five light levels. Temperature, water and soil are kept the same throughout.` + "\n" +
      String.raw`Which is the independent variable?`,
    options: [
      { text: `Light level`, isCorrect: true },
      { text: `Growth`, misconception: "Named what was measured rather than what was changed" },
      { text: `Temperature`, misconception: "Named a variable that was deliberately held constant" },
      { text: `The number of trials`, misconception: "Named part of the design rather than a variable" },
    ],
  },
  {
    id: "q-read-graphs-3",
    skillId: "read-graphs",
    prompt:
      String.raw`A line climbs steeply from hour $0$, then runs flat from hour $8$ to the end of the graph.` + "\n" +
      String.raw`Which description is accurate?`,
    options: [
      { text: `It rose until hour 8, then stopped changing`, isCorrect: true },
      { text: `It fell after hour 8`, misconception: "Read a flat line as a decrease" },
      { text: `It rose at the same rate throughout`, misconception: "Ignored the change in slope" },
      { text: `It reached zero at hour 8`, misconception: "Confused a plateau with a value of zero" },
    ],
  },
  {
    id: "q-read-graphs-4",
    skillId: "read-graphs",
    prompt:
      String.raw`Two bars are drawn on an axis that starts at $90$ instead of $0$. One reaches $95$, the other $100$.` + "\n" +
      String.raw`What is true?`,
    options: [
      { text: `They differ by 5 units, and the cut axis makes that look bigger than it is`, isCorrect: true },
      { text: `The second bar is about twice the first`, misconception: "Compared drawn heights on an axis that does not start at zero" },
      { text: `They differ by 10 units`, misconception: "Read the difference off the axis marks rather than the values" },
      { text: `Nothing can be said without the raw numbers`, misconception: "Treated a readable axis as unreadable" },
    ],
  },

  // ===== Basic chemical bonding and polarity =====
  {
    id: "q-bonding-1",
    skillId: "bonding-and-polarity",
    prompt:
      String.raw`Two atoms meet and one gives up an electron to the other completely.` + "\n" +
      String.raw`What kind of bond is that?`,
    options: [
      { text: `Ionic`, isCorrect: true },
      { text: `Covalent`, misconception: "Confused giving an electron away with sharing one" },
      { text: `Polar covalent`, misconception: "Read a full transfer as unequal sharing" },
      { text: `Hydrogen bond`, misconception: "Named an attraction between molecules, not a bond inside one" },
    ],
  },
  {
    id: "q-bonding-2",
    skillId: "bonding-and-polarity",
    prompt:
      String.raw`A water molecule is bent rather than straight, and oxygen pulls the shared electrons harder than hydrogen does.` + "\n" +
      String.raw`What follows?`,
    options: [
      { text: `The molecule is polar: one end is slightly negative`, isCorrect: true },
      { text: `The molecule is nonpolar because the two bonds cancel`, misconception: "Assumed the bonds cancel without checking the shape" },
      { text: `The oxygen carries a full negative charge`, misconception: "Confused a partial charge with an ionic charge" },
      { text: `The molecule is ionic`, misconception: "Confused unequal sharing with transfer" },
    ],
  },
  {
    id: "q-bonding-3",
    skillId: "bonding-and-polarity",
    prompt: String.raw`Why does water boil at a much higher temperature than other molecules of similar size?`,
    options: [
      { text: `Hydrogen bonds hold the molecules to each other, and those take energy to break`, isCorrect: true },
      { text: `The bonds inside each water molecule are unusually strong`, misconception: "Confused breaking bonds within a molecule with pulling molecules apart" },
      { text: `Water molecules are heavier than similar molecules`, misconception: "Reached for mass instead of attraction between molecules" },
      { text: `Water is an ionic compound`, misconception: "Confused a polar molecule with an ionic compound" },
    ],
  },
  {
    id: "q-bonding-4",
    skillId: "bonding-and-polarity",
    prompt:
      String.raw`A molecule is a long chain of carbon and hydrogen and nothing else.` + "\n" +
      String.raw`Will it dissolve well in water?`,
    options: [
      { text: `No — it is nonpolar, and water is polar`, isCorrect: true },
      { text: `Yes — given time, water dissolves everything`, misconception: "Treated water as a universal solvent" },
      { text: `Yes — carbon and hydrogen differ, so the chain is polar`, misconception: "Treated a very small difference as enough to make a molecule polar" },
      { text: `No — the chain is ionic and water repels ions`, misconception: "Right answer, wrong mechanism" },
    ],
  },

  // ===== Telling a rate of change apart from a level =====
  // The distinction AP Macro students lose first and AP Environmental Science
  // students lose second. Kept here rather than in a course file because both
  // courses link to the same canonical skill.
  {
    id: "q-percent-change-1",
    skillId: "percent-change-vs-level",
    prompt:
      `Inflation falls from 6 percent to 3 percent.` + "\n" +
      `What happened to prices?`,
    options: [
      { text: `They kept rising, only more slowly`, isCorrect: true },
      { text: `They fell`, misconception: "Read a falling rate as a falling level" },
      { text: `They stayed where they were`, misconception: "Read a falling rate as no change at all" },
      { text: `They fell by 3 percent`, misconception: "Subtracted the two rates and applied the result to the level" },
    ],
  },
  {
    id: "q-percent-change-2",
    skillId: "percent-change-vs-level",
    prompt:
      `A quantity rises by 10 percent, then falls by 10 percent.` + "\n" +
      `Where does it end up?`,
    options: [
      { text: `Slightly below where it started`, isCorrect: true },
      { text: `Exactly where it started`, misconception: "Added and subtracted percentages as if both applied to the same base" },
      { text: `Slightly above where it started`, misconception: "Got the direction of the rounding error backwards" },
      { text: `Twenty percent below where it started`, misconception: "Combined the two changes into one large one" },
    ],
  },
  {
    id: "q-percent-change-3",
    skillId: "percent-change-vs-level",
    prompt:
      `One company grew 50 percent last year. Another grew 5 percent.` + "\n" +
      `Which added more customers?`,
    options: [
      { text: `There is no way to tell without knowing how big each one was`, isCorrect: true },
      { text: `The one that grew 50 percent`, misconception: "Compared rates as though the starting sizes matched" },
      { text: `The one that grew 5 percent`, misconception: "Assumed the smaller rate must belong to the larger company" },
      { text: `They added the same number`, misconception: "Treated percentages as counts" },
    ],
  },
  {
    id: "q-percent-change-4",
    skillId: "percent-change-vs-level",
    prompt:
      `Unemployment goes from 4 percent to 6 percent.` + "\n" +
      `Which description is right?`,
    options: [
      { text: `Up 2 percentage points, which is a 50 percent increase`, isCorrect: true },
      { text: `Up 2 percent`, misconception: "Confused percentage points with percent" },
      { text: `Up 50 percentage points`, misconception: "Swapped percentage points and percent the other way" },
      { text: `It doubled`, misconception: "Read a two-point rise as a doubling" },
    ],
  },
];

/**
 * Regression check for components/stem.tsx.
 *
 * The stem renderer walks KaTeX's internal DOM tree (__renderToDomTree) instead
 * of injecting its HTML, so a KaTeX upgrade could change node shapes underneath
 * it. This renders every seeded stem plus a handful of constructs the seed does
 * not use yet, and compares the text content and CSS classes against what
 * katex.renderToString would have produced.
 *
 *   npm run verify:stems
 */

import { renderToStaticMarkup } from "react-dom/server";
import katex from "katex";
import { Stem } from "@/components/stem";
import { KATEX_OPTIONS, parseStem } from "@/lib/notation";
import { QUESTIONS } from "@/prisma/data/questions";

const strip = (html: string) => html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const classes = (html: string) =>
  [...html.matchAll(/class="([^"]*)"/g)].flatMap((m) => m[1].split(/\s+/)).sort().join(",");

let checked = 0;
let mismatches = 0;

function compare(source: string, label: string) {
  const mine = renderToStaticMarkup(<Stem source={source} />);
  if (/dangerouslySetInnerHTML|innerHTML/.test(mine)) throw new Error("innerHTML leaked into output");

  // Rebuild the same stem the way KaTeX would, to compare against.
  const theirs = parseStem(source)
    .map((s) => (s.kind === "math" ? katex.renderToString(s.value, KATEX_OPTIONS) : s.value.replace(/\n/g, "<br/>")))
    .join("");

  const textOk = strip(mine) === strip(theirs);
  const classOk = classes(mine) === classes(theirs);
  checked++;
  if (!textOk || !classOk) {
    mismatches++;
    console.log(`MISMATCH ${label}${textOk ? "" : " [text]"}${classOk ? "" : " [classes]"}`);
    console.log("  mine  :", strip(mine).slice(0, 120));
    console.log("  katex :", strip(theirs).slice(0, 120));
  }
}

for (const q of QUESTIONS) {
  compare(q.prompt, `${q.id} prompt`);
  q.options.forEach((o, i) => compare(o.text, `${q.id} option ${i}`));
}
// Constructs beyond what the seed uses, to exercise the tree walker.
for (const tex of [
  String.raw`$\sqrt{x+1}$`,
  String.raw`$\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$`,
  String.raw`$\vec{v}$`,
  String.raw`$\begin{cases} x + 1 & x < 2 \\ 3x & x \ge 2 \end{cases}$`,
  String.raw`$\lim_{x \to 0} \frac{\sin x}{x}$`,
  String.raw`$\sum_{i=1}^{n} i^2$`,
  String.raw`$\overline{AB}$ and $\hat{x}$ and $\text{when } x \le 5$`,
]) compare(tex, tex.slice(0, 40));

console.log(`\n${checked} stems rendered, ${mismatches} mismatches`);
console.log("\nSample markup for: Evaluate $3x^2 - 2$ at $x = -2$\n");
console.log(renderToStaticMarkup(<Stem source={String.raw`Evaluate $3x^2 - 2$ at $x = -2$`} />).slice(0, 400));
if (mismatches > 0) process.exit(1);

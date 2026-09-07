/**
 * End-to-end check of the /check flow against a running server.
 *
 *   npm i -D playwright        # not a project dependency; install to run this
 *   npm run build && npm start
 *   npx tsx --tsconfig tsconfig.scripts.json scripts/e2e-check.mts
 *
 * Drives a phone-sized browser through a whole attempt and asserts the things
 * that broke, or could quietly break, in this flow:
 *
 *   - the picker only lists courses that have questions
 *   - each stem renders exactly its own math and its own words, with nothing
 *     carried over from the previous question (React will happily reconcile one
 *     stem's KaTeX elements into the next one's slot if the subtree is not keyed)
 *   - reloading mid-check resumes instead of restarting
 *   - a second tab is offered the in-progress attempt
 *   - the last answer redirects to the report, and a completed attempt stays there
 */

import { chromium } from "playwright";
import { PrismaClient } from "@prisma/client";
import { parseStem } from "../lib/notation";

const BASE = process.env.E2E_BASE ?? "http://localhost:3000";
const CHROMIUM = process.env.CHROMIUM_PATH;

const prisma = new PrismaClient();
let failures = 0;

function check(condition: boolean, label: string, detail = ""): void {
  if (!condition) {
    failures++;
    console.log(`  FAIL ${label} ${detail}`);
  } else {
    console.log(`  ok   ${label}`);
  }
}

const questions = await prisma.question.findMany({ select: { id: true, prompt: true } });
const expected = new Map(
  questions.map((question) => {
    const segments = parseStem(question.prompt);
    return [
      question.id,
      {
        mathCount: segments.filter((segment) => segment.kind === "math").length,
        textFragments: segments
          .filter((segment) => segment.kind === "text")
          .flatMap((segment) => segment.value.split("\n"))
          .map((fragment) => fragment.trim())
          .filter((fragment) => fragment.length >= 4),
      },
    ];
  }),
);
const everyFragment = [...expected].flatMap(([id, e]) => e.textFragments.map((text) => ({ id, text })));

const browser = await chromium.launch(CHROMIUM === undefined ? {} : { executablePath: CHROMIUM });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await context.newPage();
page.on("pageerror", (error) => {
  failures++;
  console.log("  FAIL page error:", error.message);
});

await page.goto(`${BASE}/check`, { waitUntil: "networkidle" });
const offered = await page.locator("form button[type=submit]").count();
check(offered > 0, "picker lists at least one course", `(${offered})`);

await page.locator("form button[type=submit]").first().click();
await page.waitForURL(/\/check\/.+/);
const attemptId = page.url().split("/").pop() ?? "";

const counter = () => page.locator("text=/Question \\d+ of \\d+/").first().innerText();
const seen: string[] = [];
let stemProblems = 0;

for (let step = 0; ; step++) {
  const card = page.locator("[data-question-id]").first();
  if ((await card.count()) === 0) break;
  await card.waitFor({ state: "visible" });

  const id = (await card.getAttribute("data-question-id")) ?? "";
  const want = expected.get(id);
  if (want === undefined) {
    stemProblems++;
    break;
  }
  const stem = card.locator("p").first();
  const mathCount = await stem.locator(":scope > .katex").count();
  const text = (await stem.innerText()).replace(/\s+/g, " ").trim();

  if (mathCount !== want.mathCount) {
    stemProblems++;
    console.log(`       ${id}: ${mathCount} math spans, expected ${want.mathCount}`);
  }
  for (const fragment of want.textFragments) {
    if (!text.includes(fragment)) {
      stemProblems++;
      console.log(`       ${id}: missing its own text "${fragment}"`);
    }
  }
  for (const other of everyFragment) {
    if (other.id !== id && text.includes(other.text) && !want.textFragments.some((f) => f.includes(other.text))) {
      stemProblems++;
      console.log(`       ${id}: leaked text from ${other.id}: "${other.text}"`);
    }
  }

  if (step === 4) {
    const before = await counter();
    await page.reload({ waitUntil: "networkidle" });
    check((await counter()) === before, "reload resumes where it left off", before);

    const tab = await context.newPage();
    await tab.goto(`${BASE}/check`, { waitUntil: "networkidle" });
    check((await tab.locator("text=/in progress/").count()) === 1, "second tab is offered the attempt");
    await tab.close();
    continue;
  }

  seen.push(id);
  await card.locator(".grid button").nth(step % 4).click();
  await page.waitForTimeout(200);
  if (/\/report\//.test(page.url())) break;
}

check(stemProblems === 0, "every stem renders only its own content", `(${stemProblems} problems)`);
check(new Set(seen).size === seen.length, "no question served twice", `(${seen.length} served)`);

await page.waitForURL(/\/report\/.+/, { timeout: 15000 });
check(page.url().endsWith(`/report/${attemptId}`), "last answer redirects to the report");

await page.goto(`${BASE}/check/${attemptId}`, { waitUntil: "networkidle" });
check(page.url().endsWith(`/report/${attemptId}`), "a completed attempt cannot be retaken");

const answers = await prisma.attemptAnswer.count({ where: { attemptId } });
const attempt = await prisma.attempt.findUniqueOrThrow({ where: { id: attemptId }, select: { completedAt: true } });
check(answers === seen.length, "every answer persisted", `(${answers})`);
check(attempt.completedAt !== null, "completedAt set on the final answer");

await browser.close();
await prisma.$disconnect();
console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} failed.`);
process.exit(failures === 0 ? 0 : 1);

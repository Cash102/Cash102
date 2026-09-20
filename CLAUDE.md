# Prerequisite gap finder

A student picks the course they are taking now, answers a short diagnostic, and
the app tells them which EARLIER skills are weak, ranked by how much the current
course depends on them, with the chain from the broken skill up to the topic it
blocks. **It diagnoses. It does not teach.** It links out to free practice.

Why it exists: HSLA has no high school algebra or geometry course. Students go
from AP Precalculus in 9th grade straight into AP Calculus BC I. The algebra
foundation comes from middle school and is never revisited, so nothing in the
building catches a student whose factoring is shaky.

Stack: Next.js 14 App Router, TypeScript, Tailwind, Prisma + Postgres (Neon).
No auth, and no student identity anywhere.

## Commands

```bash
npm run dev             # local development
npm run db:migrate      # prisma migrate dev
npm run db:seed         # idempotent; run it as often as you like
npm run typecheck
npm run verify:stems    # renders all seeded stems, compares against KaTeX
npm run verify:flow     # drives /check in a browser; see "Verification" below
npm run audit:courses   # how many questions every course's check would serve
```

Two environment variables, both required (`.env`, gitignored; see
`.env.example`):

- `DATABASE_URL` — runtime. On Neon this is the **pooled** endpoint (host
  contains `-pooler`).
- `DIRECT_URL` — migrations only. Must be Neon's **direct** endpoint: Prisma's
  migration engine needs advisory locks and prepared statements, which a
  transaction-mode pooler does not provide. Locally, set both the same.

## The data model, in one paragraph

Two layers. The **catalog** (`Course`, `CoursePrerequisite`) comes verbatim from
the HSLA Directory of Courses and is coarse: "Calculus requires Precalculus."
The **skill layer** (`Skill`, `CourseSkill`, `SkillDependency`) is written by
hand with teachers and is the actual product: "a student failing continuity is
shaky on factoring."

`Skill` is **canonical** — one row per skill for the whole school, course-neutral
by construction. Everything that varies per course (weight, the authored chain,
the practice query) lives on `CourseSkill`. Two consequences worth keeping:
the headline report is a `GROUP BY`, not a de-duplication problem; and one
question serves every course linked to its skill, which is what makes question
authoring scale.

## Invariants — do not break these without deciding to

1. **`Skill.originCourseCode IS NULL` is the finding.** Null means no course in
   the catalog teaches the skill. Every Calculus skill rooted in middle school
   algebra is null. That column is the thesis of the project, not bookkeeping.

2. **No innerHTML. Anywhere.** Stems (`Question.prompt`, `QuestionOption.text`,
   `QuestionOption.misconception`) are stored as plain text with math in `$...$`
   — never HTML. `lib/notation.ts` validates on every write path (allowlisted
   commands and environments, a real KaTeX parse with `trust:false`, no angle
   brackets outside math). `components/stem.tsx` walks KaTeX's own node tree via
   `__renderToDomTree` and builds React elements from it, so no HTML string is
   ever produced. A teacher submission form must go through the same validator.
   `npm run verify:stems` guards the KaTeX coupling on upgrade.
   `CourseSkill.chain` is the exception: plain text, NOT stem notation.

3. **Question selection is deterministic in the attempt id**
   (`lib/select-questions.ts`). That is what makes resume work without an
   `AttemptQuestion` table: reopening recomputes the identical list and subtracts
   what is answered. If you add per-attempt randomness, resume breaks. Add the
   table instead.

4. **The client never receives an answer key.** Options are shuffled on the
   server, seeded per attempt+question; `isCorrect` is not in the payload;
   correctness and `skillId` are resolved server-side at write time. Answers are
   idempotent upserts on `[attemptId, questionId]`, so retries on bad wifi are
   free.

5. **`Attempt` is anonymous by construction.** No student, no email, no IP, no
   user agent, no grade level. The cuid is the only handle and it lives in the
   student's localStorage. At this school size, course + grade + timestamp
   identifies a person: treat every proposed column on that model as
   re-identification risk first and a feature second. For teacher dashboards,
   write aggregate rollups, not a student FK.

6. **`SkillDependency` must stay acyclic.** The seed asserts it with a
   three-colour DFS. A cycle makes the remediation order meaningless and hangs
   any graph walk.

7. **The report orders by the dependency graph, not by accuracy**
   (`lib/report.ts`). Kahn's algorithm over the edges inside the weak set;
   weight then miss rate break ties within a tier. A student weak on both
   factoring and rational expressions is told to fix factoring FIRST even when
   both were missed equally. Sorting by accuracy would send them to fix a
   symptom — that is the bug this app exists to avoid.

8. **Seed write strategy is deliberate.** `Course`, `Skill`, `Question`,
   `QuestionOption` are upserted and never deleted, because attempt history
   points at them. `CoursePrerequisite`, `CourseSkill`, `SkillDependency` are
   replaced wholesale, because they carry no history and replacement is the only
   way a deleted edge actually leaves the database.

## Where things are

```
prisma/schema.prisma        the models, heavily commented
prisma/data/catalog.ts      27 courses, verbatim from the catalog
prisma/data/skill-graph.ts  canonical skills, CourseSkill links, dependency edges
prisma/data/questions/      the item bank, split by skill family, not by course:
                              algebra, quantitative-science, writing, history,
                              computing
prisma/seed.ts              validates everything before the first write
lib/notation.ts             the stem format and its validator
lib/select-questions.ts     deterministic selection
lib/attempt.ts              what an attempt is served; used by page AND endpoint
lib/report.ts               tally, then order by the dependency graph
components/stem.tsx         KaTeX node tree -> React elements
components/runner.tsx       one question at a time, no back button
app/check/                  picker and runner
app/report/[attemptId]/     the report
```

## Verification

`npm run verify:stems` needs nothing extra. `npm run verify:flow` drives a
phone-sized browser through a whole attempt and needs Playwright, which is
deliberately not a project dependency:

```bash
npm i -D playwright && npx playwright install chromium
npm run build && npm start        # in one terminal
npm run verify:flow               # in another
```

It asserts, among other things, that **each stem renders only its own content**.
That is a regression test for a real bug: without `key={question.id}` on the
question subtree, React reconciles one stem's KaTeX elements into the next
question's slot and two questions render at once.

## State, and what is open

Done: schema and migration; seed (27 courses, 8 prerequisite edges, 25 canonical
skills, 93 CourseSkill links, 18 dependency edges, 91 questions, 364 options);
the `/check` flow; the report.

**All 21 offered courses have a live check**, every one serving 12 to 14
questions (`npm run audit:courses` prints the table). Most cost no questions at
all — they are built from skills another course already owned. Adding a course
is chain text and weights; that is the return on canonical `Skill`.

Nineteen of the 25 canonical skills have `originCourseCode` NULL. The finding is
school-wide: the same middle school skills are load-bearing under maths,
science, history, economics, computing and English, and the building teaches
none of them.

Two structural notes worth keeping:

- **AP Language II does not lean on the four writing skills it teaches.** It is
  their `originCourseCode`. A student sitting in that room has not been taught
  them yet, and a report saying "last taught in AP Language and Composition II"
  about the course they are currently in would be nonsense. Lang II rests on the
  layer beneath instead: finding the argument in a text, telling support from
  assertion, sentence boundaries. Keep that distinction when adding courses —
  link a course to what it ASSUMES, never to what it teaches.
- **An edge is only live if some course leans on both of its skills.** The
  report orders the weak set, and the weak set comes from one course's
  CourseSkill links. `read-for-the-argument -> claim-vs-summary` sat inert until
  APUSH linked to both. When you author an edge, check that some course reaches
  both ends of it.

**The one thing still blocking a real pilot: no teacher has reviewed any of
this.** Every skill chain outside the original Calculus seven, every question
past the original fourteen, and every dependency edge outside Calculus is mine,
marked TODO in place. They are defensible and they are not authoritative. The
history and computing skills are grounded in the published College Board
frameworks (the APUSH historical thinking skills, the CSP computational thinking
practices) but sit deliberately one layer BELOW them — they are what a student
needs before the framework's skills are reachable, which is the same
relationship the catalog has to the skill layer everywhere else here. That
judgment needs a teacher per subject.

Also open:

- **Graph questions have no graphs.** `Question` has no image field, so the
  `read-graphs` items describe their graph in words. That still catches axes
  read backwards, a truncated axis, and a plateau read as a fall, but six
  courses now lean on that skill, so the case for images keeps getting stronger.
- **A teacher submission form.** Whatever writes questions must go through
  `assertValidStem` — that is the whole contract in invariant 2.
- **Retake variety.** Most skills have exactly four questions, so a student who
  retakes a check sees most of them again. Six to eight per skill would fix it.
- **Not-offered courses.** Six catalog entries are marked not offered for SY
  25-26 and have no links. If any comes back, Statistics and Number Theory reuse
  the maths skills and African American Studies reuses the history ones.

Recently resolved, so you do not re-discover them: the catalog has 27 entries
(all seeded; 26 was a miscount), and the question the prototype filed under
`set-expressions-equal` is retagged to `solve-for-constant` with a replacement
question written, because it hands the student the equation already set up. Its
id still reads `q-set-expressions-equal-2`: ids are the stable key
`AttemptAnswer` rows point at, and renaming one would strand the old row in the
pool rather than replace it.

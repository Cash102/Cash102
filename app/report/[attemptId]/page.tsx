import Link from "next/link";
import { notFound } from "next/navigation";
import { Stem } from "@/components/stem";
import { buildReport, type SkillOutcome } from "@/lib/report";

export const dynamic = "force-dynamic";

/**
 * The report. It diagnoses and it does not teach: it names the earlier skill,
 * shows the chain from that skill up to the topic it blocks in this course, and
 * links out to free practice. Nothing here explains how to factor.
 *
 * The order is the finding. See lib/report.ts.
 */
export default async function ReportPage({ params }: { params: { attemptId: string } }) {
  const report = await buildReport(params.attemptId);
  if (report === null) notFound();

  const unfinished = report.completedAt === null;

  return (
    <main>
      {unfinished && (
        <div className="mb-8 border border-rule bg-slate-lift p-4">
          <p className="font-sans text-sm text-dust">
            This check is not finished — {report.answered} of {report.total} answered. What is below
            is only what those answers show.
          </p>
          <Link
            href={`/check/${report.attemptId}`}
            className="mt-2 inline-flex min-h-12 items-center text-chalk underline decoration-dust underline-offset-4 hover:decoration-chalk"
          >
            Finish the check →
          </Link>
        </div>
      )}

      {report.answered === 0 ? (
        <>
          <h1 className="mb-3 text-2xl font-normal">Nothing to report yet.</h1>
          <p className="mb-8 text-dust">This check has no answers on it.</p>
        </>
      ) : report.weak.length === 0 ? (
        <>
          <h1 className="mb-3 text-3xl font-normal leading-tight tracking-tight">
            No broken links found.
          </h1>
          <p className="mb-8 text-dust">
            The foundation under {report.courseTitle} is holding. If the course still feels hard,
            the gap is in the course itself — bring a specific problem to your teacher.
          </p>
        </>
      ) : (
        <>
          <h1 className="mb-3 text-3xl font-normal leading-tight tracking-tight">
            {report.weak.length} weak {report.weak.length === 1 ? "link" : "links"} under{" "}
            {report.courseTitle}.
          </h1>
          <p className="mb-9 text-dust">
            {report.weak.some((outcome) => outcome.restsOn.length > 0)
              ? "Fix them top down. Each one holds up the ones below it, so working out of order means fixing the same thing twice."
              : "Fix them in this order. The one at the top is holding up the most."}
          </p>

          {report.weak.map((outcome, index) => (
            <Finding key={outcome.skillId} outcome={outcome} position={index + 1} />
          ))}
        </>
      )}

      {report.solid.length > 0 && (
        <div className="mb-8 border-t border-rule pt-5">
          <p className="font-sans text-sm text-dust">
            Holding steady: {report.solid.map((outcome) => outcome.name.toLowerCase()).join(", ")}.
          </p>
        </div>
      )}

      <Link
        href="/check"
        className="inline-flex min-h-12 items-center rounded-sm border border-rule px-5 py-3 font-sans text-sm text-dust hover:border-dust hover:text-chalk"
      >
        Take another check
      </Link>
    </main>
  );
}

/** Skill names are sentence-capitalised; mid-sentence they should not be. */
function lowerFirst(name: string): string {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

function Finding({ outcome, position }: { outcome: SkillOutcome; position: number }) {
  const missed = outcome.asked - outcome.right;

  return (
    <article className="mb-9 border-t border-rule pt-6">
      <div className="mb-1 flex items-baseline gap-3">
        <span className="font-sans text-xs text-dust">{position}</span>
        <h2 className="text-xl font-normal leading-snug">{outcome.name}</h2>
      </div>

      <p className="mb-1 pl-6 font-sans text-xs text-dust">
        {outcome.origin} · missed {missed} of {outcome.asked}
        {outcome.weight >= 4 ? " · this course leans on it heavily" : null}
      </p>

      {outcome.originCourseTitle === null ? (
        <p className="mb-4 pl-6 font-sans text-xs text-dust">
          No course here teaches this. It is assumed, never revisited.
        </p>
      ) : (
        <p className="mb-4 pl-6 font-sans text-xs text-dust">
          Last taught in {outcome.originCourseTitle}.
        </p>
      )}

      {outcome.restsOn.length > 0 && (
        <p className="mb-4 pl-6 font-sans text-xs text-break">
          Fix {outcome.restsOn.map(lowerFirst).join(" and ")} first — this rests on it.
        </p>
      )}

      <ol className="chain pl-6">
        {outcome.chain.map((step, index) => (
          <li key={step} className={index === 0 ? "chain-step chain-step--break" : "chain-step"}>
            {step}
          </li>
        ))}
      </ol>

      {outcome.misconceptions.length > 0 && (
        <div className="mb-4 pl-6">
          <p className="font-sans text-xs uppercase tracking-wide text-dust">What you picked</p>
          <ul className="mt-1 list-none p-0">
            {outcome.misconceptions.map((misconception) => (
              <li key={misconception} className="text-sm text-dust">
                {/* Misconceptions are authored in the stem notation format and
                    validated as such by the seed, so they can carry math:
                    "computed $-(2^2)$". Rendered like any other stem. */}
                <Stem source={misconception} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* The tap target is the full 3rem box; the rule belongs under the words. */}
      <a
        href={outcome.practiceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group ml-6 inline-flex min-h-12 items-center text-[0.95rem] text-chalk"
      >
        <span className="border-b border-dust pb-px group-hover:border-chalk">Practice this →</span>
      </a>
    </article>
  );
}

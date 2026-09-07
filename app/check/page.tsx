import type { Subject } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ResumeBanner } from "@/components/resume-banner";
import { startAttempt } from "./actions";

// Reads the catalog per request; nothing here is safe to prerender at build.
export const dynamic = "force-dynamic";

const SUBJECT_LABELS: Record<Subject, string> = {
  English: "English",
  History: "History",
  Mathematics: "Mathematics",
  Science: "Science",
  CollegePersistence: "College Persistence",
};

export default async function CheckPage() {
  /**
   * Offered courses that actually have questions behind them. Without the
   * skillLinks filter a student could pick AP Chemistry and walk into an empty
   * check — the catalog is fully seeded, the skill layer is not.
   */
  const courses = await prisma.course.findMany({
    where: {
      offered: true,
      skillLinks: { some: { skill: { active: true, questions: { some: { active: true } } } } },
    },
    orderBy: [{ subject: "asc" }, { title: "asc" }],
    select: { code: true, title: true, subject: true },
  });

  const bySubject = new Map<Subject, typeof courses>();
  for (const course of courses) {
    bySubject.set(course.subject, [...(bySubject.get(course.subject) ?? []), course]);
  }

  return (
    <main>
      <h1 className="mb-3 text-3xl font-normal leading-tight tracking-tight">
        You are probably not bad at the class you are failing.
      </h1>
      <p className="mb-6 text-dust">
        Something earlier is more likely broken. Fourteen questions, none of them from the course
        itself, to find which one.
      </p>
      <div className="mb-7 border-t border-rule pt-4 font-sans text-xs text-dust">
        Anonymous. No name, no login, no record of who you are.
      </div>

      <ResumeBanner />

      {courses.length === 0 ? (
        <p className="text-dust">
          No checks are ready yet. A course appears here once its skills and questions are written.
        </p>
      ) : (
        <>
          <h2 className="mb-4 font-sans text-sm uppercase tracking-wide text-dust">
            Which course are you taking now?
          </h2>
          {[...bySubject].map(([subject, subjectCourses]) => (
            <section key={subject} className="mb-7">
              <h3 className="mb-3 font-sans text-xs uppercase tracking-wide text-dust">
                {SUBJECT_LABELS[subject]}
              </h3>
              <div className="grid gap-3">
                {subjectCourses.map((course) => (
                  <form key={course.code} action={startAttempt}>
                    <input type="hidden" name="courseCode" value={course.code} />
                    <button
                      type="submit"
                      className="min-h-14 w-full rounded-sm border border-rule px-4 py-4 text-left text-base hover:border-dust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hold"
                    >
                      {course.title}
                      <span className="mt-1 block font-sans text-xs text-dust">{course.code}</span>
                    </button>
                  </form>
                ))}
              </div>
            </section>
          ))}
        </>
      )}
    </main>
  );
}

/**
 * The attempt cuid, kept in localStorage so a student can close the tab and
 * come back, or reopen their report later.
 *
 * This is the ONLY thing this app remembers about a person, and it lives in
 * their browser, not in the database. There is no student record to join it to.
 * Every access is wrapped: private mode and blocked site data throw rather than
 * returning null.
 */

const KEY = "prereq-gap:attempt";

export interface StoredAttempt {
  id: string;
  courseTitle: string;
  /** ISO timestamp once the check is finished; absent while it is in progress. */
  completedAt?: string;
}

export function readAttempt(): StoredAttempt | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === null) return null;
    const parsed = JSON.parse(raw) as Partial<StoredAttempt>;
    if (typeof parsed.id !== "string" || typeof parsed.courseTitle !== "string") return null;
    return {
      id: parsed.id,
      courseTitle: parsed.courseTitle,
      completedAt: typeof parsed.completedAt === "string" ? parsed.completedAt : undefined,
    };
  } catch {
    return null;
  }
}

export function writeAttempt(attempt: StoredAttempt): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(attempt));
  } catch {
    // A student with site data blocked simply loses resume. The check still works.
  }
}

export function markCompleted(id: string, courseTitle: string): void {
  writeAttempt({ id, courseTitle, completedAt: new Date().toISOString() });
}

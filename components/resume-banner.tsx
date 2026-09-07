"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readAttempt, type StoredAttempt } from "@/lib/attempt-storage";

/**
 * Offers the student their own last attempt back. Reads localStorage after
 * mount, so the server render and the first client render agree.
 */
export function ResumeBanner() {
  const [stored, setStored] = useState<StoredAttempt | null>(null);

  useEffect(() => {
    setStored(readAttempt());
  }, []);

  if (stored === null) return null;

  const finished = stored.completedAt !== undefined;

  return (
    <div className="mb-8 border border-rule bg-slate-lift p-4">
      <p className="font-sans text-sm text-dust">
        {finished ? "Your last check" : "You have a check in progress"} — {stored.courseTitle}
      </p>
      <Link
        href={finished ? `/report/${stored.id}` : `/check/${stored.id}`}
        className="mt-2 inline-flex min-h-12 items-center text-chalk underline decoration-dust underline-offset-4 hover:decoration-chalk"
      >
        {finished ? "Reopen that report →" : "Pick up where you left off →"}
      </Link>
    </div>
  );
}

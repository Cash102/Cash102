"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { markCompleted, writeAttempt } from "@/lib/attempt-storage";

export interface RunnerOption {
  id: string;
  /** Pre-rendered on the server: no math library in this bundle. */
  label: ReactNode;
}

export interface RunnerQuestion {
  id: string;
  stem: ReactNode;
  origin: string;
  options: RunnerOption[];
}

interface RunnerProps {
  attemptId: string;
  courseTitle: string;
  /** Questions in this attempt, including ones already answered. */
  total: number;
  /** How many were answered before this page load, i.e. how far a resume is in. */
  answeredBefore: number;
  /** Only the unanswered ones, in serve order. */
  questions: RunnerQuestion[];
}

interface SentAnswer {
  questionId: string;
  optionId: string;
  elapsedMs: number;
}

export function Runner({ attemptId, courseTitle, total, answeredBefore, questions }: RunnerProps) {
  const router = useRouter();
  const [cursor, setCursor] = useState(0);
  const [status, setStatus] = useState<"asking" | "finishing" | "failed">("asking");

  const askedAt = useRef(Date.now());
  const sent = useRef<SentAnswer[]>([]);
  const inFlight = useRef<Promise<unknown>[]>([]);
  const failed = useRef(false);
  const firstOption = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    writeAttempt({ id: attemptId, courseTitle });
  }, [attemptId, courseTitle]);

  useEffect(() => {
    askedAt.current = Date.now();
    firstOption.current?.focus();
  }, [cursor]);

  const post = useCallback(
    async (answer: SentAnswer, tries = 3): Promise<void> => {
      for (let attempt = 1; ; attempt++) {
        try {
          const response = await fetch(`/api/attempts/${attemptId}/answers`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(answer),
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return;
        } catch (error) {
          if (attempt >= tries) throw error;
          // School wifi. Back off and try again; the endpoint is idempotent.
          await new Promise((resolve) => setTimeout(resolve, attempt * 700));
        }
      }
    },
    [attemptId],
  );

  const finish = useCallback(async () => {
    setStatus("finishing");
    failed.current = false;
    await Promise.allSettled(inFlight.current);

    if (failed.current) {
      setStatus("failed");
      return;
    }
    markCompleted(attemptId, courseTitle);
    router.replace(`/report/${attemptId}`);
  }, [attemptId, courseTitle, router]);

  const retry = useCallback(async () => {
    setStatus("finishing");
    failed.current = false;
    // Every answer is an idempotent upsert, so resending all of them is safe
    // and simpler than tracking which one dropped.
    inFlight.current = sent.current.map((answer) =>
      post(answer).catch((error: unknown) => {
        failed.current = true;
        throw error;
      }),
    );
    inFlight.current.forEach((promise) => promise.catch(() => undefined));
    await finish();
  }, [finish, post]);

  const choose = useCallback(
    (optionId: string) => {
      if (status !== "asking") return;
      const question = questions[cursor];
      if (question === undefined) return;

      const answer: SentAnswer = {
        questionId: question.id,
        optionId,
        elapsedMs: Date.now() - askedAt.current,
      };
      sent.current.push(answer);

      const request = post(answer).catch((error: unknown) => {
        failed.current = true;
        throw error;
      });
      // Handled at the flush; this only stops an unhandled rejection warning.
      request.catch(() => undefined);
      inFlight.current.push(request);

      if (cursor + 1 >= questions.length) {
        void finish();
      } else {
        setCursor((current) => current + 1);
      }
    },
    [cursor, finish, post, questions, status],
  );

  const question = questions[cursor];
  const answered = answeredBefore + cursor;

  if (status === "failed") {
    return (
      <div>
        <h1 className="mb-3 text-2xl font-normal">Your answers did not save.</h1>
        <p className="mb-6 text-dust">
          The connection dropped. Nothing is lost — tap below and they will send again.
        </p>
        <button
          type="button"
          onClick={() => void retry()}
          className="min-h-14 w-full rounded-sm bg-chalk px-6 py-4 text-base text-slate hover:bg-white"
        >
          Send them again
        </button>
      </div>
    );
  }

  if (status === "finishing" || question === undefined) {
    return <p className="py-16 text-center font-sans text-sm text-dust">Working out what is underneath…</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-baseline justify-between font-sans text-xs text-dust">
        <span>
          Question {answered + 1} of {total}
        </span>
        <span>{question.origin}</span>
      </div>

      <div
        className="mb-7 h-0.5 bg-rule"
        role="progressbar"
        aria-valuenow={answered}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Progress through the check"
      >
        <div
          className="h-full bg-dust transition-[width] duration-200"
          style={{ width: `${(answered / total) * 100}%` }}
        />
      </div>

      {/* Keyed by question id so React tears the whole stem down between
          questions. Without this it reconciles the previous stem's KaTeX
          elements against the next one's — same positions, different content —
          and two questions bleed into each other on screen. */}
      <div key={question.id} data-question-id={question.id}>
        <p className="mb-6 text-lg">{question.stem}</p>

        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <button
              key={option.id}
              ref={index === 0 ? firstOption : undefined}
              type="button"
              onClick={() => choose(option.id)}
              className="min-h-14 w-full rounded-sm border border-rule px-4 py-4 text-left text-base text-chalk hover:border-dust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hold"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

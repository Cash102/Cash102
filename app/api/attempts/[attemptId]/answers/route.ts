/**
 * POST /api/attempts/:attemptId/answers
 *
 * Records one answer. Idempotent on [attemptId, questionId], so the client can
 * retry freely on a flaky connection without double-counting.
 *
 * Correctness and skill are resolved HERE, from the database, at write time.
 * The client sends only which option was tapped; it never receives an answer
 * key to begin with.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { servedQuestionIds } from "@/lib/attempt";

const MAX_ELAPSED_MS = 60 * 60 * 1000;

interface AnswerBody {
  questionId: string;
  optionId: string;
  elapsedMs?: number;
}

function parseBody(value: unknown): AnswerBody | null {
  if (typeof value !== "object" || value === null) return null;
  const body = value as Record<string, unknown>;
  if (typeof body.questionId !== "string" || body.questionId === "") return null;
  if (typeof body.optionId !== "string" || body.optionId === "") return null;

  const elapsed = body.elapsedMs;
  const elapsedMs =
    typeof elapsed === "number" && Number.isFinite(elapsed)
      ? Math.min(Math.max(Math.round(elapsed), 0), MAX_ELAPSED_MS)
      : undefined;

  return { questionId: body.questionId, optionId: body.optionId, elapsedMs };
}

export async function POST(
  request: Request,
  { params }: { params: { attemptId: string } },
): Promise<NextResponse> {
  const body = parseBody(await request.json().catch(() => null));
  if (body === null) {
    return NextResponse.json({ error: "Expected { questionId, optionId }." }, { status: 400 });
  }

  const attempt = await prisma.attempt.findUnique({
    where: { id: params.attemptId },
    select: { id: true, courseCode: true, completedAt: true },
  });
  if (attempt === null) {
    return NextResponse.json({ error: "No such attempt." }, { status: 404 });
  }

  const served = await servedQuestionIds(attempt.id, attempt.courseCode);
  if (!served.includes(body.questionId)) {
    return NextResponse.json({ error: "That question is not part of this check." }, { status: 409 });
  }

  const option = await prisma.questionOption.findUnique({
    where: { id: body.optionId },
    select: { id: true, isCorrect: true, questionId: true, question: { select: { skillId: true } } },
  });
  if (option === null || option.questionId !== body.questionId) {
    return NextResponse.json({ error: "That option does not belong to that question." }, { status: 409 });
  }

  const answer = {
    skillId: option.question.skillId,
    selectedOptionId: option.id,
    correct: option.isCorrect,
    elapsedMs: body.elapsedMs ?? null,
  };

  await prisma.attemptAnswer.upsert({
    where: { attemptId_questionId: { attemptId: attempt.id, questionId: body.questionId } },
    create: { attemptId: attempt.id, questionId: body.questionId, ...answer },
    update: answer,
  });

  const answered = await prisma.attemptAnswer.count({
    where: { attemptId: attempt.id, questionId: { in: served } },
  });
  const done = answered >= served.length;

  if (done && attempt.completedAt === null) {
    // Guarded so a retry of the last answer does not move the timestamp.
    await prisma.attempt.updateMany({
      where: { id: attempt.id, completedAt: null },
      data: { completedAt: new Date() },
    });
  }

  return NextResponse.json({ answered, total: served.length, done });
}

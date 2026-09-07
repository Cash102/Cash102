import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { servedQuestions } from "@/lib/attempt";
import { Runner } from "@/components/runner";
import { Stem } from "@/components/stem";

export const dynamic = "force-dynamic";

/**
 * Runs one attempt. The whole check is sent in a single response — every stem
 * and option already rendered to React elements — so moving between questions
 * costs no network round trip. On a phone on school wifi that matters more than
 * the few extra kilobytes of markup.
 *
 * Reopening this URL resumes: the served list is deterministic in the attempt
 * id, so we subtract what is already answered and hand the runner the rest.
 */
export default async function AttemptPage({ params }: { params: { attemptId: string } }) {
  const attempt = await prisma.attempt.findUnique({
    where: { id: params.attemptId },
    select: { id: true, courseCode: true, completedAt: true, course: { select: { title: true } } },
  });
  if (attempt === null) notFound();
  if (attempt.completedAt !== null) redirect(`/report/${attempt.id}`);

  const served = await servedQuestions(attempt.id, attempt.courseCode);
  if (served.length === 0) notFound();

  const answered = await prisma.attemptAnswer.findMany({
    where: { attemptId: attempt.id },
    select: { questionId: true },
  });
  const answeredIds = new Set(answered.map((row) => row.questionId));
  const remaining = served.filter((question) => !answeredIds.has(question.id));

  if (remaining.length === 0) {
    // Every question answered but the completion write never landed — finish it
    // here rather than stranding the student. Idempotent.
    await prisma.attempt.updateMany({
      where: { id: attempt.id, completedAt: null },
      data: { completedAt: new Date() },
    });
    redirect(`/report/${attempt.id}`);
  }

  return (
    <main>
      <Runner
        attemptId={attempt.id}
        courseTitle={attempt.course.title}
        total={served.length}
        answeredBefore={served.length - remaining.length}
        questions={remaining.map((question) => ({
          id: question.id,
          origin: question.origin,
          stem: <Stem source={question.prompt} />,
          options: question.options.map((option) => ({
            id: option.id,
            label: <Stem source={option.text} />,
          })),
        }))}
      />
    </main>
  );
}

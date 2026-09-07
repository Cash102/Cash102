import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * PLACEHOLDER. The real report — weak skills ranked by weight, each with its
 * chain and a practice link, ordered so prerequisites come first — is the next
 * piece of work. This page exists so the flow has somewhere to land and so the
 * attempt id in localStorage resolves to something.
 */
export default async function ReportPage({ params }: { params: { attemptId: string } }) {
  const attempt = await prisma.attempt.findUnique({
    where: { id: params.attemptId },
    select: {
      id: true,
      completedAt: true,
      course: { select: { title: true } },
      _count: { select: { answers: true } },
    },
  });
  if (attempt === null) notFound();

  return (
    <main>
      <h1 className="mb-3 text-2xl font-normal">Check recorded.</h1>
      <p className="mb-8 text-dust">
        {attempt._count.answers} answers for {attempt.course.title}
        {attempt.completedAt === null ? " — still in progress." : "."}
      </p>

      <div className="mb-8 border-t border-rule pt-5 font-sans text-sm text-dust">
        <p className="mb-2">The report itself is not built yet.</p>
        <p>
          It will rank the weak skills by how much this course leans on them, show the chain from
          each broken skill up to the topic it blocks, and order them so prerequisites come first.
        </p>
      </div>

      {attempt.completedAt === null ? (
        <Link
          href={`/check/${attempt.id}`}
          className="inline-flex min-h-12 items-center text-chalk underline decoration-dust underline-offset-4"
        >
          Finish the check →
        </Link>
      ) : (
        <Link
          href="/check"
          className="inline-flex min-h-12 items-center text-chalk underline decoration-dust underline-offset-4"
        >
          Take another check →
        </Link>
      )}
    </main>
  );
}

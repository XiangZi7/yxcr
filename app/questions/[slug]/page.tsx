import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InterviewWorkspace } from "@/components/interview/InterviewWorkspace";
import { articles } from "@/lib/interview/data";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/questions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return { title: `${article?.title ?? "题目未找到"} · Interview OS` };
}

export default async function QuestionPage({
  params,
}: PageProps<"/questions/[slug]">) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return <InterviewWorkspace key={article.slug} article={article} />;
}

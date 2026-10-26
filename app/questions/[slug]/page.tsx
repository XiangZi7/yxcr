import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InterviewWorkspace } from "@/components/interview/InterviewWorkspace";
import { articles } from "@/lib/interview/data";
import { getArticleMarkdown } from "@/lib/markdown/content";
import { articleMetadata, articleStructuredData } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/questions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return article
    ? articleMetadata(article)
    : { title: "题目未找到", robots: { index: false, follow: false } };
}

export default async function QuestionPage({
  params,
}: PageProps<"/questions/[slug]">) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return (
    <>
      <JsonLd data={articleStructuredData(article)} />
      <InterviewWorkspace
        key={article.slug}
        article={article}
        markdown={await getArticleMarkdown(article)}
      />
    </>
  );
}

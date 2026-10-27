import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { InterviewWorkspace } from "@/components/interview/InterviewWorkspace";
import { QuestionSkeleton } from "@/components/interview/QuestionSkeleton";
import { articles } from "@/lib/interview/data";
import { getArticleMarkdown } from "@/lib/markdown/content";
import { articleMetadata, articleStructuredData } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { KnowledgeWorkspace } from "@/components/resources/KnowledgeWorkspace";
import { findKnowledge, resources } from "@/lib/resources/catalog";
import { getKnowledgeMarkdown } from "@/lib/resources/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return [
    ...articles.map(({ slug }) => ({ slug })),
    ...resources
      .filter((item) => !item.originalSlug)
      .slice(0, 4)
      .map((item) => ({ slug: item.id })),
  ];
}

export async function generateMetadata({
  params,
}: PageProps<"/questions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  const knowledge = findKnowledge(slug);
  return article
    ? articleMetadata(article)
    : knowledge
      ? pageMetadata(
          knowledge.title,
          knowledge.description || `${knowledge.section}知识解析与代码示例。`,
          `/questions/${knowledge.id}`,
        )
      : { title: "题目未找到", robots: { index: false, follow: false } };
}

export default function QuestionPage({
  params,
}: PageProps<"/questions/[slug]">) {
  return (
    <Suspense fallback={<QuestionSkeleton />}>
      <QuestionContent params={params} />
    </Suspense>
  );
}

async function QuestionContent({
  params,
}: Pick<PageProps<"/questions/[slug]">, "params">) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) {
    const resource = findKnowledge(slug);
    if (!resource) notFound();
    if (resource.id !== slug) permanentRedirect(`/questions/${resource.id}`);
    const markdown = await getKnowledgeMarkdown(slug);
    if (!markdown) notFound();
    return (
      <>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: resource.title,
            description: resource.description,
            articleSection: resource.section,
            inLanguage: "zh-CN",
            url: absoluteUrl(`/questions/${slug}`),
            isAccessibleForFree: true,
          }}
        />
        <KnowledgeWorkspace resource={resource} markdown={markdown} />
      </>
    );
  }
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

import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { InterviewWorkspace } from "@/components/interview/InterviewWorkspace";
import { QuestionSkeleton } from "@/components/interview/QuestionSkeleton";
import { KnowledgeWorkspace } from "@/components/resources/KnowledgeWorkspace";
import { JsonLd } from "@/components/seo/JsonLd";
import { articles } from "@/lib/interview/data";
import { getArticleMarkdown } from "@/lib/markdown/content";
import { findKnowledgeBySlug, resources } from "@/lib/resources/catalog";
import { getKnowledgeMarkdown } from "@/lib/resources/content";
import { getKnowledgeSlug } from "@/lib/resources/links";
import { filterResources } from "@/lib/resources/query";
import { articleMetadata, articleStructuredData, knowledgeLastModified, knowledgeMetadata, knowledgeProvenance, knowledgeStructuredData } from "@/lib/seo";

export function generateStaticParams() {
  return [...resources.filter((item) => item.originalSlug), ...resources.filter((item) => !item.originalSlug).slice(0, 4)]
    .map((item) => ({ slug: getKnowledgeSlug(item.id)! }));
}
export async function generateMetadata({ params }: PageProps<"/learn/[slug]">): Promise<Metadata> {
  const resource = findKnowledgeBySlug((await params).slug);
  if (!resource) notFound();
  const article = articles.find((item) => item.slug === resource.originalSlug);
  return article ? articleMetadata(article) : knowledgeMetadata(resource);
}
export default function Page(props: PageProps<"/learn/[slug]">) {
  return <Suspense fallback={<QuestionSkeleton />}><ArticleContent {...props} /></Suspense>;
}
async function ArticleContent({ params }: PageProps<"/learn/[slug]">) {
  const resource = findKnowledgeBySlug((await params).slug);
  if (!resource) notFound();
  const article = articles.find((item) => item.slug === resource.originalSlug);
  if (article) return <>
    <JsonLd data={articleStructuredData(article)} />
    <InterviewWorkspace key={article.slug} article={article} markdown={await getArticleMarkdown(article)} />
  </>;
  const markdown = await getKnowledgeMarkdown(resource.id);
  if (!markdown) notFound();
  const related = filterResources(resources, { collection: resource.collection }).filter((item) => item.id !== resource.id).slice(0, 4);
  return <>
    <JsonLd data={knowledgeStructuredData(resource)} />
    <KnowledgeWorkspace resource={resource} markdown={markdown} relatedResources={related} lastModified={knowledgeLastModified(resource.id)} provenance={knowledgeProvenance(resource.id)} />
  </>;
}

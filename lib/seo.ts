import type { Metadata } from "next";
import type { Article } from "@/lib/interview/types";
import { absoluteUrl, author, site } from "./site";
import { knowledgeHref, knowledgePath } from "./resources/links";
import { categoryHref, collectionHref } from "./resources/sections";
import type { LearningResource } from "./resources/types";
import revisions from "./resources/content-revisions.json";
import manifest from "@/content/knowledge/manifest.json";

export function knowledgeLastModified(id: string) {
  return (revisions as Record<string, { lastModified?: string }>)[id]?.lastModified;
}

export function knowledgeProvenance(id: string) {
  const origin = (manifest as Record<string, { author: string; repository: string; license: string }>)[id];
  return origin ? { name: origin.author, url: `https://github.com/${origin.repository}`, license: origin.license } : undefined;
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  noIndex = false,
): Metadata {
  return {
    title: { absolute: `${title} · ${site.name}` },
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index: !noIndex, follow: true },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: absoluteUrl(path),
      siteName: site.name,
      locale: "zh_CN",
      type: "website",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${site.name} — Learn. Practice. Grow.`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}
export function articleMetadata(article: Article): Metadata {
  const metadata = pageMetadata(
    article.title,
    article.description,
    knowledgePath(article.slug)!,
  );
  return {
    ...metadata,
    keywords: article.tags,
    authors: [{ name: author.name, url: author.github }],
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      modifiedTime: knowledgeLastModified(article.slug),
      authors: [author.github],
      section: article.category,
      tags: article.tags,
    },
  };
}
export function articleStructuredData(article: Article) {
  const url = absoluteUrl(knowledgePath(article.slug)!);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        headline: article.title,
        dateModified: knowledgeLastModified(article.slug),
        description: article.description,
        inLanguage: "zh-CN",
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: {
          "@type": "Person",
          name: author.name,
          url: author.github,
          sameAs: [author.github, author.bilibili],
          image: absoluteUrl(author.avatar),
        },
        publisher: { "@id": absoluteUrl("/#author") },
        image: absoluteUrl("/opengraph-image"),
        articleSection: article.category,
        keywords: article.tags.join(", "),
        isAccessibleForFree: true,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "知识库",
            item: absoluteUrl("/library"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: article.category,
            item: absoluteUrl(
              categoryHref(article.category),
            ),
          },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ],
  };
}

export function knowledgeMetadata(resource: LearningResource): Metadata {
  const provenance = knowledgeProvenance(resource.id);
  const metadata = pageMetadata(resource.title, resource.description || `${resource.section}知识解析与代码示例。`, knowledgeHref(resource));
  return {
    ...metadata,
    authors: [{ name: provenance?.name || author.name, url: provenance?.url || author.github }],
    openGraph: { ...metadata.openGraph, type: "article", modifiedTime: knowledgeLastModified(resource.id), section: resource.category || resource.section },
  };
}

export function knowledgeStructuredData(resource: LearningResource) {
  const url = absoluteUrl(knowledgeHref(resource));
  const origin = knowledgeProvenance(resource.id);
  return {
    "@context": "https://schema.org", "@graph": [
      { "@type": "TechArticle", "@id": `${url}#article`, headline: resource.title,
        description: resource.description, dateModified: knowledgeLastModified(resource.id),
        author: { "@type": "Person", name: origin?.name || author.name, url: origin?.url || author.github },
        publisher: { "@id": absoluteUrl("/#author") },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        articleSection: resource.category || resource.section,
        image: absoluteUrl("/opengraph-image"), inLanguage: "zh-CN", url, isAccessibleForFree: true,
        ...(origin ? { citation: origin.url, license: absoluteUrl("/copyright") } : {}),
      },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "知识库", item: absoluteUrl("/library") },
        { "@type": "ListItem", position: 2, name: resource.section, item: absoluteUrl(collectionHref(resource.collection)) },
        { "@type": "ListItem", position: 3, name: resource.title, item: url },
      ] },
    ],
  };
}

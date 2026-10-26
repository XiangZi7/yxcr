import type { Metadata } from "next";
import type { Article } from "@/lib/interview/types";
import { absoluteUrl, author, site } from "./site";

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
          alt: "Interview OS — Learn. Practice. Grow.",
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
    `/questions/${article.slug}`,
  );
  return {
    ...metadata,
    keywords: article.tags,
    authors: [{ name: author.name, url: author.github }],
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      authors: [author.github],
      section: article.category,
      tags: article.tags,
    },
  };
}
export function articleStructuredData(article: Article) {
  const url = absoluteUrl(`/questions/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        headline: article.title,
        description: article.description,
        inLanguage: "zh-CN",
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: {
          "@type": "Person",
          name: author.name,
          url: author.github,
          sameAs: [author.github, author.bilibili],
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
            name: "题库",
            item: absoluteUrl("/library"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: article.category,
            item: absoluteUrl(
              `/library?category=${encodeURIComponent(article.category)}`,
            ),
          },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ],
  };
}

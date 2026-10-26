import type { MetadataRoute } from "next";
import { articles } from "@/lib/interview/data";
import { absoluteUrl } from "@/lib/site";
import { resources } from "@/lib/resources/catalog";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/overview"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/library"), changeFrequency: "weekly", priority: 0.9 },
    {
      url: absoluteUrl("/practice"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...articles.map((article) => ({
      url: absoluteUrl(`/questions/${article.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...resources
      .filter((item) => !item.originalSlug)
      .map((item) => ({
        url: absoluteUrl(`/questions/${item.id}`),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];
}

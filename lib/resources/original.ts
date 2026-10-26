import { articles } from "@/lib/interview/data";
import type { LearningResource } from "./types";
export const originalKnowledge: LearningResource[] = articles.map((article) => ({
    id: article.slug,
    originalSlug: article.slug,
    category: article.category,
    title: article.title,
    description: article.description,
    url: `/questions/${article.slug}`,
    source: "yxcr",
    collection: article.category === "AI / LLM" ? "ai" : "frequent",
    collections: ["curated", "frequent", "principles"],
    section: article.topic,
    kind: "knowledge" as const,
  }));

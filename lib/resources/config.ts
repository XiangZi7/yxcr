import config from "@/content/resources/sources.json";
import summary from "./summary.json";
import { articles } from "@/lib/interview/data";

export const resourceSources = config.sources;
export const resourceCollections = config.collections;
export const resourceSummary = { ...summary, total: summary.total + articles.length };
export const resourceGroups = [
  ...new Set(resourceCollections.map((collection) => collection.group)),
];
export function getResourceSource(id: string) {
  return resourceSources.find((source) => source.id === id);
}
export function getResourceCollection(id: string) {
  return resourceCollections.find((collection) => collection.id === id);
}
export function collectionResourceCount(id: string) {
  return (
    resourceSummary.collections[
      id as keyof typeof resourceSummary.collections
    ] ?? 0
  ) + articles.filter((article) => ["curated", "frequent", "principles"].includes(id) || (id === "ai" && article.category === "AI / LLM")).length;
}

export function categoryKnowledgeCount(category: string) {
  return (summary.categories[category as keyof typeof summary.categories] ?? 0) + articles.filter((article) => article.category === category).length;
}

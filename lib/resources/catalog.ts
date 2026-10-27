import "server-only";
import catalog from "./catalog.json";
import type { LearningResource } from "./types";
import { originalKnowledge } from "./original";
import { getKnowledgeSlug, knowledgeHref, normalizeKnowledgeSlug } from "./links";

export const resources: LearningResource[] = [
  ...originalKnowledge,
  ...(catalog as LearningResource[]),
].map((resource) => ({ ...resource, url: knowledgeHref(resource) }));

const bySlug = new Map(resources.map((resource) => [getKnowledgeSlug(resource.id), resource]));

export function findKnowledgeBySlug(slug: string) {
  const normalized = normalizeKnowledgeSlug(slug);
  return normalized ? bySlug.get(normalized) : undefined;
}

export function findKnowledge(id: string) {
  return resources.find((resource) => resource.id === id)
    ?? resources.find((resource) => resource.aliasIds?.includes(id));
}

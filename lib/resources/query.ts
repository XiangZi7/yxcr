import type {
  LearningResource,
  ResourceFilters,
  ResourceProgress,
} from "./types";

export function normalizeResourceSearch(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase()
    .replace(/[\s\p{P}\p{S}]+/gu, " ")
    .trim();
}

export function filterResources(
  resources: LearningResource[],
  filters: ResourceFilters,
  records: Record<string, ResourceProgress> = {},
) {
  const terms = normalizeResourceSearch(filters.query ?? "")
    .split(" ")
    .filter(Boolean);
  return resources.filter((resource) => {
    if (filters.category && resource.category !== filters.category) return false;
    if (
      filters.source &&
      filters.source !== "all" &&
      resource.source !== filters.source
    )
      return false;
    if (
      filters.collection &&
      filters.collection !== "all" &&
      resource.collection !== filters.collection &&
      !resource.collections?.includes(filters.collection)
    )
      return false;
    const progress = records[resource.id];
    if (filters.status === "saved" && !progress?.saved) return false;
    if (filters.status === "mastered" && !progress?.mastered) return false;
    if (filters.status === "unlearned" && progress?.mastered) return false;
    if (filters.status === "planned" && !progress?.inPlan) return false;
    const text = normalizeResourceSearch(
      `${resource.title} ${resource.section} ${resource.description ?? ""}`,
    );
    return terms.every((term) => text.includes(term));
  });
}

import type { LearningResource, ResourceFilters } from "./types";

export const libraryPageSize = 24;
export interface LibraryPageData {
  initialResources: LearningResource[];
  filters: ResourceFilters;
  page: number;
  total: number;
  basePath: string;
  title: string;
  description: string;
  topicQuery?: string;
}
export function parseLibraryPage(value: string | undefined) {
  if (!value || !/^[1-9]\d*$/.test(value)) return 1;
  const page = Number(value);
  return Number.isSafeInteger(page) ? page : 1;
}
export function listingHref(basePath: string, filters: ResourceFilters = {}, page = 1) {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (basePath.startsWith("/library/") && filters.category) params.set("category", filters.category);
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  if (page > 1) params.set("page", String(page));
  return `${basePath}${params.size ? `?${params}` : ""}`;
}
export function paginateKnowledge(resources: LearningResource[], page: number) {
  return resources.slice((page - 1) * libraryPageSize, page * libraryPageSize);
}

import type { LearningResource } from "./types";

export function knowledgeHref(resource: LearningResource) {
  // Earlier saved directory entries may not have an imported body yet.
  // Preserve those records and take the reader to matching local knowledge.
  return resource.originalSlug
    ? `/questions/${resource.originalSlug}`
    : resource.url.startsWith("/questions/")
      ? resource.url
      : `/library?q=${encodeURIComponent(resource.title)}`;
}

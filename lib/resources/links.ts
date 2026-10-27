import type { LearningResource } from "./types";
import routes from "./route-map.json" with { type: "json" };

const slugs: Record<string, string> = routes;

export function normalizeKnowledgeSlug(value: string) {
  try {
    // Route params can arrive encoded when a cached/partial route is resumed.
    // Decode a single segment once, keeping lookup identical to the URL guard.
    const slug = decodeURIComponent(value);
    return /^[\p{L}\p{N}-]+$/u.test(slug) ? slug : undefined;
  } catch {
    return undefined;
  }
}

export function getKnowledgeSlug(id: string) {
  return Object.hasOwn(slugs, id) ? slugs[id] : undefined;
}

export function knowledgePath(id: string) {
  const slug = getKnowledgeSlug(id);
  return slug ? `/learn/${encodeURIComponent(slug)}` : undefined;
}

export function knowledgeHref(resource: LearningResource) {
  // Resolve by the stable ID, including records saved before URL migration.
  return knowledgePath(resource.originalSlug || resource.id)
    ?? `/library?q=${encodeURIComponent(resource.title)}`;
}

export function resolveKnowledgeLink(href: string | undefined) {
  if (!href) return href;
  const match = /^\/questions\/([^?#]+)(.*)$/.exec(href);
  if (!match) return href;
  return knowledgePath(match[1]) ? `${knowledgePath(match[1])}${match[2]}` : href;
}

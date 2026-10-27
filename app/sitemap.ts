import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { resources } from "@/lib/resources/catalog";
import { policyUpdatedAt, sitePages } from "@/lib/site-pages";
import { knowledgeHref } from "@/lib/resources/links";
import { collectionHref, learningTopics } from "@/lib/resources/sections";
import { resourceCollections } from "@/lib/resources/config";
import { filterResources } from "@/lib/resources/query";
import { libraryPageSize, listingHref, paginateKnowledge } from "@/lib/resources/listing";
import { knowledgeLastModified } from "@/lib/seo";

function listingEntries(path: string, items: typeof resources): MetadataRoute.Sitemap {
  return Array.from({ length: Math.max(1, Math.ceil(items.length / libraryPageSize)) }, (_, index) => {
    const dates = paginateKnowledge(items, index + 1).map((item) => knowledgeLastModified(item.id)).filter((date): date is string => Boolean(date)).sort((a, b) => Date.parse(a) - Date.parse(b));
    return { url: absoluteUrl(listingHref(path, {}, index + 1)), ...(dates.length ? { lastModified: dates.at(-1) } : {}) };
  });
}
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/") },
    ...sitePages.map((page) => ({
      url: absoluteUrl(page.href),
      lastModified: policyUpdatedAt,
    })),
    { url: absoluteUrl("/practice") },
    ...listingEntries("/library", resources),
    ...learningTopics.flatMap((topic) => listingEntries(`/topics/${topic.slug}`, filterResources(resources, { category: topic.category, query: topic.query }))),
    ...resourceCollections.flatMap((collection) => listingEntries(collectionHref(collection.id), filterResources(resources, { collection: collection.id }))),
    ...resources.map((item) => ({
      url: absoluteUrl(knowledgeHref(item)),
      lastModified: knowledgeLastModified(item.id),
    })),
  ];
  return [...new Map(entries.map((entry) => [entry.url, entry])).values()];
}

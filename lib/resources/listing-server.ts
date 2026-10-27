import "server-only";
import { notFound } from "next/navigation";
import { resources } from "./catalog";
import { filterResources } from "./query";
import { libraryPageSize, paginateKnowledge, parseLibraryPage, listingHref, type LibraryPageData } from "./listing";
import { pageMetadata } from "../seo";
import type { ResourceFilters, ResourceStatus } from "./types";
import { collectionHref, getCategoryBySlug, getCollectionBySlug } from "./sections";

export type SearchValues = Record<string, string | string[] | undefined>;
export interface LibraryLanding {
  basePath: string;
  title: string;
  description: string;
  category?: string;
  collection?: string;
  topicQuery?: string;
}
export const libraryLanding: LibraryLanding = {
  basePath: "/library", title: "编程与 AI 知识库",
  description: "按主题学习前端开发、计算机网络、Python、算法与 AI 应用。阅读原理解析和代码示例，记录笔记，用实践与复习建立知识体系。",
};
export function getCollectionLanding(section: string): LibraryLanding {
  const collection = getCollectionBySlug(section);
  if (!collection) notFound();
  return { basePath: collectionHref(collection.id), title: `${collection.title} · 学习专题`, description: collection.description, collection: collection.id };
}
export function getTopicLanding(topic: string): LibraryLanding {
  const category = getCategoryBySlug(topic);
  if (!category) notFound();
  return { basePath: `/topics/${category.slug}`, title: category.title, description: category.description, category: category.category, topicQuery: category.query };
}
export function getListingStaticPages(landing = libraryLanding) {
  const { total } = getLibraryPage({}, landing);
  return Array.from({ length: Math.max(0, Math.ceil(total / libraryPageSize) - 1) }, (_, index) => ({ page: String(index + 2) }));
}
export function getStaticListingPage(page: string, landing = libraryLanding) {
  const number = parseLibraryPage(page);
  if (number < 2 || String(number) !== page) notFound();
  return getLibraryPage({ page }, landing);
}
const scalar = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;
export function getLibraryPage(query: SearchValues, landing = libraryLanding): LibraryPageData {
  const requestedStatus = scalar(query.status);
  const status: ResourceStatus = ["saved", "mastered", "unlearned", "planned"].includes(requestedStatus || "") ? requestedStatus as ResourceStatus : "all";
  const filters: ResourceFilters = {
    query: (scalar(query.q) || "").trim().slice(0, 200),
    category: landing.category || scalar(query.category) || "", collection: landing.collection || "all", status,
  };
  const matches = filterResources(resources, { ...filters, query: [landing.topicQuery, filters.query].filter(Boolean).join(" "), status: "all" });
  const page = parseLibraryPage(scalar(query.page));
  if (status === "all" && page > Math.max(1, Math.ceil(matches.length / libraryPageSize))) notFound();
  return { ...landing, filters, page, total: matches.length, initialResources: paginateKnowledge(matches, page) };
}
export function libraryMetadata(data: LibraryPageData) {
  const privateView = Boolean(data.filters.query || data.filters.status !== "all" || (data.filters.category && data.filters.collection !== "all"));
  return pageMetadata(
    `${data.title}${data.page > 1 ? ` · 第 ${data.page} 页` : ""}`,
    data.description,
    listingHref(data.basePath, {}, privateView ? 1 : data.page),
    privateView,
  );
}

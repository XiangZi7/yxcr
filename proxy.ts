import { NextResponse, type NextRequest } from "next/server";
import sourceConfig from "./content/resources/sources.json";
import catalog from "./lib/resources/catalog.json";
import routes from "./lib/resources/route-map.json";
import { originalKnowledge } from "@/lib/resources/original";
import { categoryHref, collectionHref, topicCategories, getCollectionBySlug, getCategoryBySlug } from "@/lib/resources/sections";
import { filterResources } from "@/lib/resources/query";
import { libraryPageSize, parseLibraryPage } from "@/lib/resources/listing";
import type { LearningResource } from "@/lib/resources/types";
import { normalizeKnowledgeSlug } from "@/lib/resources/links";

const publishedSlugs = new Set(Object.values(routes));
const resources = [...originalKnowledge, ...catalog] as LearningResource[];

function missingPage() {
  // Check before starting the App Router stream so the HTTP status remains 404.
  return new NextResponse(`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>页面未找到 · YXCR OS</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#eff3fa;color:#192437;font:15px/1.9 system-ui,sans-serif}main{max-width:480px;margin:24px;padding:40px;border:1px solid #e7ecf5;border-radius:16px;background:#fafbfe}small{color:#40516d}h1{font-size:26px}a{display:inline-block;margin:16px 20px 0 0;color:#2877db;text-underline-offset:4px}</style></head><body><main><small>404 · YXCR OS</small><h1>这个知识点，还没到这里</h1><p>页面可能已移动，或页码超出了当前栏目。回到知识库，继续探索值得理解的问题。</p><nav aria-label="返回学习"><a href="/">学习首页</a><a href="/library">浏览知识库</a></nav></main></body></html>`, {
    status: 404, headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex, follow" },
  });
}

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname.startsWith("/learn/")) {
    const slug = normalizeKnowledgeSlug(url.pathname.slice(7));
    return slug && publishedSlugs.has(slug) ? NextResponse.next() : missingPage();
  }
  const collection = url.searchParams.get("collection");
  const category = url.searchParams.get("category");
  if (url.pathname === "/library" && collection && sourceConfig.collections.some((item) => item.id === collection)) {
    url.pathname = collectionHref(collection);
    url.searchParams.delete("collection");
    return NextResponse.redirect(url, 308);
  } else if (url.pathname === "/library" && category && topicCategories.some((item) => item.category === category)) {
    url.pathname = categoryHref(category);
    url.searchParams.delete("category");
    url.searchParams.delete("collection");
    return NextResponse.redirect(url, 308);
  }
  const section = url.pathname.startsWith("/library/") ? getCollectionBySlug(url.pathname.slice(9)) : undefined;
  const topic = url.pathname.startsWith("/topics/") ? getCategoryBySlug(url.pathname.slice(8)) : undefined;
  if (url.pathname !== "/library" && !section && !topic) return missingPage();
  const status = url.searchParams.get("status");
  if (!["saved", "mastered", "unlearned", "planned"].includes(status || "")) {
    const page = parseLibraryPage(url.searchParams.get("page") || undefined);
    if (page > 1) {
      const matches = filterResources(resources, {
        query: [topic?.query, (url.searchParams.get("q") || "").trim().slice(0, 200)].filter(Boolean).join(" "),
        category: topic?.category || category || "", collection: section?.id || "all",
      });
      if (page > Math.max(1, Math.ceil(matches.length / libraryPageSize))) return missingPage();
    }
  }
  return NextResponse.next();
}
export const config = { matcher: ["/learn/:slug", "/library/:path*", "/topics/:path*"] };

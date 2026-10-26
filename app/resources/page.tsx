import { Suspense } from "react";
import {
  ResourceLibraryPage,
  ResourceLibraryPreview,
} from "@/components/resources/ResourcesPage";
import { resources } from "@/lib/resources/catalog";
import { resourceSources, resourceSummary } from "@/lib/resources/config";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata(
  "资源知识库：前端面试、计算机网络与 AI",
  "汇集前端进阶之旅、冰可乐网络面试专题与 AI Future 的学习目录，覆盖基础、进阶、手写、原理、算法和 AI 工程，支持搜索、收藏、学习计划与 Markdown 笔记。",
  "/resources",
);

export default function ResourcesPage() {
  const initialResources = resources.slice(0, 24);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "YXCR OS 资源知识库",
          url: absoluteUrl("/resources"),
          inLanguage: "zh-CN",
          about: ["前端面试", "计算机网络", "AI Agent"],
          citation: resourceSources.map((source) => ({
            "@type": "WebSite",
            name: source.name,
            url: source.url,
          })),
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: resourceSummary.total,
            itemListElement: initialResources.map((resource, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: resource.title,
              url: resource.url,
            })),
          },
        }}
      />
      <Suspense
        fallback={
          <ResourceLibraryPreview initialResources={initialResources} />
        }
      >
        <ResourceLibraryPage initialResources={initialResources} />
      </Suspense>
    </>
  );
}

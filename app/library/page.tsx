import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { resources } from "@/lib/resources/catalog";
import {
  ResourceLibraryPage,
  ResourceLibraryPreview,
} from "@/components/resources/ResourcesPage";
export const metadata = pageMetadata(
  "全部知识库：前端、网络与 AI",
  "按分类浏览技术知识，站内阅读 Markdown 正文、代码示例与原理解析，收藏、记录笔记并安排复习。",
  "/library",
);
export default function Page() {
  const initialResources = resources.slice(0, 24);
  return (
    <Suspense
      fallback={<ResourceLibraryPreview initialResources={initialResources} />}
    >
      <ResourceLibraryPage initialResources={initialResources} />
    </Suspense>
  );
}

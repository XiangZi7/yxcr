import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { LibraryPage, LibraryPreview } from "@/components/learning/LibraryPage";
export const metadata = pageMetadata(
  "技术面试题库：前端、后端与 AI",
  "浏览 JavaScript、TypeScript、Vue、React、Python 与大模型精选面试题，阅读原理解析和代码示例，按技术分类查找与复习。",
  "/library",
);
export default function Page() {
  return (
    <Suspense fallback={<LibraryPreview />}>
      <LibraryPage />
    </Suspense>
  );
}

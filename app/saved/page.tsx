import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { LibraryPage } from "@/components/learning/LibraryPage";
import { PageSkeleton } from "@/components/learning/PageHeading";
export const metadata = pageMetadata(
  "我的收藏与错题",
  "整理收藏的学习内容，复盘错题与待掌握知识点，让每一次复习更有方向。",
  "/saved",
  true,
);
export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <LibraryPage savedOnly />
    </Suspense>
  );
}

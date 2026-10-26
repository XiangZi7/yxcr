import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { NotesPage } from "@/components/learning/NotesPage";
import { PageSkeleton } from "@/components/learning/PageHeading";
export const metadata = pageMetadata(
  "我的 Markdown 学习笔记",
  "导入、编辑、预览与导出 Markdown 文档，用代码高亮、表格和任务列表记录自己的学习思考。笔记保存在当前浏览器。",
  "/notes",
  true,
);
export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <NotesPage />
    </Suspense>
  );
}

import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import {
  PracticePage,
  PracticePreview,
} from "@/components/learning/PracticePage";
export const metadata = pageMetadata(
  "自测练习与知识复盘",
  "按技术方向选择练习，进行限时自测、梳理知识，结合参考解析复盘薄弱知识点。",
  "/practice",
);
export default function Page() {
  return (
    <Suspense fallback={<PracticePreview />}>
      <PracticePage />
    </Suspense>
  );
}

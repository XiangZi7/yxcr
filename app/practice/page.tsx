import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import {
  PracticePage,
  PracticePreview,
} from "@/components/learning/PracticePage";
export const metadata = pageMetadata(
  "模拟面试与限时自测",
  "按技术方向选择面试题，进行限时自测、整理回答思路，结合参考解析复盘薄弱知识点。",
  "/practice",
);
export default function Page() {
  return (
    <Suspense fallback={<PracticePreview />}>
      <PracticePage />
    </Suspense>
  );
}

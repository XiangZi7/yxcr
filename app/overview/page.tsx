import { pageMetadata } from "@/lib/seo";
import { OverviewPage } from "@/components/learning/OverviewPage";
export const metadata = pageMetadata(
  "学习概览",
  "用精选面试题、每日计划与知识版图系统准备技术面试，循序渐进学习前端、后端与 AI 核心知识。",
  "/overview",
);
export default function Page() {
  return <OverviewPage />;
}

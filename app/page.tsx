import { OverviewPage } from "@/components/learning/OverviewPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "学习概览",
  "用知识讲解、每日计划与知识版图建立学习体系，循序渐进学习前端、后端与 AI 核心知识。",
  "/",
);

export default function Home() {
  return <OverviewPage />;
}

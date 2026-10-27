import { pageMetadata } from "@/lib/seo";
import { TodayPage } from "@/components/learning/TodayPage";
export const metadata = pageMetadata(
  "今日学习计划",
  "设定每日学习目标，安排知识复习计划，记录今天掌握的知识点。",
  "/today",
  true,
);
export default function Page() {
  return <TodayPage />;
}

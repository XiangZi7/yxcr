import type { Metadata } from "next";
import { TodayPage } from "@/components/learning/TodayPage";
export const metadata: Metadata = { title: "今日学习 · Interview OS" };
export default function Page() {
  return <TodayPage />;
}

import type { Metadata } from "next";
import { OverviewPage } from "@/components/learning/OverviewPage";
export const metadata: Metadata = { title: "学习概览 · Interview OS" };
export default function Page() {
  return <OverviewPage />;
}

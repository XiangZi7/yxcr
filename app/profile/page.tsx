import type { Metadata } from "next";
import { ProfilePage } from "@/components/learning/ProfilePage";
export const metadata: Metadata = { title: "我的学习档案 · Interview OS" };
export default function Page() {
  return <ProfilePage />;
}

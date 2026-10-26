import type { Metadata } from "next";
import "./globals.css";
import "./workspace.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Interview OS · 让面试更有底气",
  description: "系统整理前端、后端和 AI 面试知识，记录思考，每天进步一点点。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

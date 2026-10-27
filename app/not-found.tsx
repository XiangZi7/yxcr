import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Search } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `页面未找到 · ${site.name}` },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="dashboard-page flex min-h-[calc(100dvh-64px)] items-center justify-center">
      <section className="panel w-full max-w-lg py-14 text-center">
        <span
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-line text-brand"
          aria-hidden="true"
        >
          <Search size={28} />
        </span>
        <p className="mb-3 font-mono text-xs tracking-[0.3em] text-muted">
          404 · NOT FOUND
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          这个知识点，还没到这里
        </h1>
        <p className="mx-auto mb-8 mt-4 max-w-xs text-sm leading-7 text-muted">
          页面可能已移动，或链接暂不可用。回到知识库，继续探索下一个值得理解的问题。
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="outline-button">
            <ArrowLeft size={15} />
            学习概览
          </Link>
          <Link href="/library" className="solid-button">
            <BookOpen size={15} />
            浏览知识库
          </Link>
        </div>
      </section>
    </main>
  );
}

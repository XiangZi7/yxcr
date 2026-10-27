"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Download,
  ListTree,
  NotebookPen,
  Plus,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import { downloadMarkdown, getMarkdownHeadings } from "@/lib/markdown/utils";
import { getResourceCollection } from "@/lib/resources/config";
import { useKnowledgeProgress } from "@/lib/resources/progress";
import type { LearningResource } from "@/lib/resources/types";
import { ResourceNoteDialog } from "./ResourceCard";

export function KnowledgeWorkspace({
  resource,
  markdown,
}: {
  resource: LearningResource;
  markdown: string;
}) {
  const progress = useKnowledgeProgress(resource);
  const [editing, setEditing] = useState(false);
  const headings = useMemo(() => getMarkdownHeadings(markdown), [markdown]);
  const [active, setActive] = useState(headings[0]?.id ?? "");
  const collection = getResourceCollection(resource.collection);
  const minutes = Math.max(1, Math.ceil(markdown.length / 650));
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -60% 0px" },
    );
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [headings]);
  return (
    <div className="content-layout grid min-w-0 items-start">
      <main id="article" className="article-card min-w-0 rounded-xl">
        <article aria-labelledby="knowledge-title">
          <div className="article-topline flex flex-wrap items-center justify-between gap-3">
            <nav
              className="breadcrumbs flex items-center gap-2"
              aria-label="面包屑"
            >
              <Link href="/library">题库</Link>
              <ChevronRight size={13} />
              <Link href={`/library?collection=${resource.collection}`}>
                {collection?.title ?? resource.section}
              </Link>
            </nav>
            <div className="article-actions flex items-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`article-action flex items-center gap-1.5 ${progress.saved ? "text-brand" : ""}`}
                onClick={progress.toggleSaved}
                aria-pressed={progress.saved}
              >
                <Star
                  size={16}
                  fill={progress.saved ? "currentColor" : "none"}
                />
                {progress.saved ? "已收藏" : "收藏"}
              </motion.button>
              <button
                className="article-action flex items-center gap-1.5"
                onClick={() => setEditing(true)}
              >
                <NotebookPen size={16} />
                记笔记
              </button>
              <button
                className="article-action"
                aria-label="导出 Markdown"
                onClick={() =>
                  downloadMarkdown(
                    resource.title,
                    `# ${resource.title}\n\n${markdown}`,
                  )
                }
              >
                <Download size={16} />
              </button>
            </div>
          </div>
          <header className="knowledge-header">
            <span className="tag tag-blue">{resource.section}</span>
            <h1 id="knowledge-title">{resource.title}</h1>
            <p className="knowledge-reading-time">
              <BookOpen size={14} />
              知识笔记<span>·</span>
              <Clock3 size={14} />约 {minutes} 分钟
            </p>
          </header>
          <MarkdownRenderer content={markdown} className="article-markdown" />
          <footer className="knowledge-footer">
            <div>
              <strong>理解之后，记得巩固</strong>
              <p>用自己的语言复述，再试着写一个例子。</p>
            </div>
            <button
              className={
                progress.mastered ? "outline-button text-brand" : "solid-button"
              }
              onClick={progress.toggleMastered}
              aria-pressed={progress.mastered}
            >
              <Check size={16} />
              {progress.mastered ? "已掌握" : "标记为已掌握"}
            </button>
          </footer>
          <Link
            href="/library"
            className="subtle-link mt-5 inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} />
            继续探索知识
          </Link>
          <a
            href="/licenses/NOTICE.txt"
            className="ml-5 text-[10px] text-muted"
          >
            内容许可
          </a>
        </article>
      </main>
      <aside
        className="right-sidebar flex min-w-0 flex-col"
        aria-label="文章辅助信息"
      >
        {headings.length > 0 && (
          <section className="side-card toc-card">
            <div className="mb-3 flex items-center justify-between">
              <h2>文章目录</h2>
              <ListTree size={15} className="text-muted" />
            </div>
            <nav
              className="toc knowledge-toc flex flex-col"
              aria-label="文章目录"
            >
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`${heading.depth >= 3 ? "toc-child" : ""} ${active === heading.id ? "is-active" : ""}`}
                  onClick={() => setActive(heading.id)}
                >
                  {heading.title}
                </a>
              ))}
            </nav>
          </section>
        )}
        <section className="side-card">
          <h2>让知识留下来</h2>
          <p className="my-4 text-xs leading-6 text-muted">
            收藏、实践、复习，把读过的内容变成自己的能力。
          </p>
          <button
            className="outline-button w-full"
            onClick={progress.togglePlan}
            aria-pressed={progress.inPlan}
          >
            <Plus size={14} />
            {progress.inPlan ? "已加入学习计划" : "加入学习计划"}
          </button>
          <button
            className="subtle-link mt-4 inline-flex items-center gap-2 text-xs"
            onClick={() => setEditing(true)}
          >
            <NotebookPen size={14} />
            {progress.note.trim() ? "查看我的笔记" : "写下我的理解"}
          </button>
        </section>
      </aside>
      {editing && (
        <ResourceNoteDialog
          resource={resource}
          onClose={() => setEditing(false)}
        />
      )}
    </div>
  );
}

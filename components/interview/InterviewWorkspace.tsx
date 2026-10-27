"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Download,
  Flame,
  Link2,
  MoreHorizontal,
  NotebookPen,
  Printer,
  Shapes,
  Star,
  CircleAlert,
} from "lucide-react";
import { motion } from "motion/react";
import type { Article } from "@/lib/interview/types";
import { useLearningStore } from "@/lib/learning/store";
import { downloadMarkdown, getMarkdownHeadings } from "@/lib/markdown/utils";
import { ArticleContent } from "./ArticleContent";
import { RightSidebar } from "./RightSidebar";
import { WorkspaceDialog } from "./WorkspaceDialog";
import { author } from "@/lib/site";

export function InterviewWorkspace({
  article,
  markdown,
}: {
  article: Article;
  markdown: string;
}) {
  const saved = useLearningStore((state) => state.saved);
  const mastered = useLearningStore((state) => state.mastered);
  const note = useLearningStore((state) => state.notes[article.slug] ?? "");
  const isMistake = useLearningStore((state) =>
    state.mistakes.includes(article.slug),
  );
  const { toggleSaved, toggleMastered, toggleMistake, setNote, notify } =
    useLearningStore();
  const [notesOpen, setNotesOpen] = useState(false);
  const [practiceQuestion, setPracticeQuestion] = useState("");
  const headings = useMemo(() => getMarkdownHeadings(markdown), [markdown]);
  const [activeSection, setActiveSection] = useState(headings[0]?.id ?? "");
  const isSaved = saved.includes(article.slug);
  const isMastered = mastered.includes(article.slug);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-85px 0px -55% 0px" },
    );
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [headings]);
  function jump(id: string) {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  }
  function openNotes() {
    setNotesOpen(true);
    requestAnimationFrame(() =>
      document
        .getElementById("personal-notes")
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
    );
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      notify("文章链接已复制");
    } catch {
      notify("复制失败，请从地址栏复制链接");
    }
  }
  return (
    <div className="content-layout grid min-w-0 items-start">
      <main id="article" className="article-card min-w-0 rounded-xl">
        <article aria-labelledby="question-title">
          <div className="article-topline flex items-center justify-between gap-3">
            <nav
              className="breadcrumbs flex items-center gap-2"
              aria-label="面包屑"
            >
              <Link href="/library">知识库</Link>
              <ChevronRight size={13} />
              <Link
                href={`/library?category=${encodeURIComponent(article.category)}`}
              >
                {article.category}
              </Link>
              <ChevronRight size={13} />
              <span aria-current="page">{article.topic}</span>
            </nav>
            <div className="article-actions flex items-center">
              <motion.button
                className={`article-action flex items-center gap-1.5 ${isSaved ? "text-brand" : ""}`}
                onClick={() => toggleSaved(article.slug)}
                aria-pressed={isSaved}
                whileTap={{ scale: 0.94 }}
              >
                <Star size={16} fill={isSaved ? "currentColor" : "none"} />
                <span>{isSaved ? "已收藏" : "收藏"}</span>
              </motion.button>
              <motion.button
                className={`article-action flex items-center gap-1.5 ${!isMastered ? "text-muted" : ""}`}
                onClick={() => toggleMastered(article.slug)}
                aria-pressed={isMastered}
                whileTap={{ scale: 0.94 }}
              >
                <Check size={17} />
                <span>{isMastered ? "已掌握" : "待掌握"}</span>
              </motion.button>
              <button
                className="article-action flex items-center gap-1.5"
                onClick={openNotes}
              >
                <NotebookPen size={16} />
                <span>记笔记</span>
              </button>
              <details className="more-menu relative">
                <summary className="icon-button" aria-label="更多文章操作">
                  <MoreHorizontal size={18} />
                </summary>
                <div className="more-popover absolute right-0 flex flex-col">
                  <button onClick={() => void copyLink()}>
                    <Link2 size={15} />
                    复制文章链接
                  </button>
                  <button
                    onClick={() => downloadMarkdown(article.title, markdown)}
                  >
                    <Download size={15} />
                    导出 Markdown
                  </button>
                  <button onClick={() => toggleMistake(article.slug)}>
                    <CircleAlert size={15} />
                    {isMistake ? "移出错题本" : "加入错题本"}
                  </button>
                  <button onClick={() => window.print()}>
                    <Printer size={15} />
                    打印文章
                  </button>
                </div>
              </details>
            </div>
          </div>
          <header className="article-header">
            <h1 id="question-title">{article.title}</h1>
            <p className="article-description">{article.description}</p>
            <div className="article-tags flex flex-wrap gap-2.5">
              {article.tags.map((tag, index) => (
                <Link
                  href={`/library?q=${encodeURIComponent(tag)}`}
                  key={tag}
                  className={`tag ${index === 0 ? "tag-blue" : ""}`}
                >
                  {tag}
                </Link>
              ))}
            </div>
            <div className="article-meta flex flex-wrap items-center">
              <span className="flex items-center gap-2">
                <Shapes size={16} />
                <span>
                  难度 <strong>中等</strong>
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Flame size={16} />
                <span>
                  高频率 <b>78%</b>
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Clock3 size={16} />
                <span>
                  预计阅读 <b>8 分钟</b>
                </span>
              </span>
              <span className="markdown-badge ml-auto flex items-center gap-1.5">
                <BookOpen size={13} />
                Markdown
              </span>
            </div>
          </header>
          <ArticleContent markdown={markdown} />
          <footer className="article-byline">
            <span>
              整理与分享：
              <a
                href={author.github}
                target="_blank"
                rel="author noopener noreferrer"
              >
                {author.name}
              </a>
            </span>
            <a
              href={author.bilibili}
              target="_blank"
              rel="me noopener noreferrer"
            >
              在 B 站一起学习 ↗
            </a>
          </footer>
        </article>
      </main>
      <RightSidebar
        article={article}
        headings={headings}
        activeSection={activeSection}
        onSection={jump}
        note={note}
        onNote={(value) => setNote(article.slug, value)}
        notesOpen={notesOpen}
        onToggleNotes={() => setNotesOpen(!notesOpen)}
        onFollowup={setPracticeQuestion}
      />
      {practiceQuestion && (
        <WorkspaceDialog
          panel="practice"
          question={practiceQuestion}
          onClose={() => setPracticeQuestion("")}
          article={article}
        />
      )}
    </div>
  );
}

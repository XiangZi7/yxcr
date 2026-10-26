"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Flame,
  Link2,
  MoreHorizontal,
  NotebookPen,
  Printer,
  Shapes,
  Star,
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import type { Article, Panel } from "@/lib/interview/types";
import { useStoredValue } from "@/lib/interview/useStoredValue";
import { ArticleContent } from "./ArticleContent";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { RightSidebar } from "./RightSidebar";
import { WorkspaceDialog } from "./WorkspaceDialog";

function readSlugs(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export function InterviewWorkspace({ article }: { article: Article }) {
  const [theme, setTheme] = useStoredValue("interview-os:theme", "light");
  const [savedValue, setSavedValue] = useStoredValue(
    "interview-os:saved",
    "[]",
  );
  const [masteredValue, setMasteredValue] = useStoredValue(
    "interview-os:mastered",
    '["vue-3"]',
  );
  const [note, setNote] = useStoredValue(
    `interview-os:note:${article.slug}`,
    "",
  );
  const [panel, setPanel] = useState<Panel | null>(null);
  const [panelQuery, setPanelQuery] = useState("");
  const [practiceQuestion, setPracticeQuestion] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("core");
  const [notice, setNotice] = useState("");
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saved = readSlugs(savedValue);
  const mastered = readSlugs(masteredValue);
  const isSaved = saved.includes(article.slug);
  const isMastered = mastered.includes(article.slug);
  useEffect(
    () => () => {
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    },
    [],
  );

  function notify(message: string) {
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(""), 2400);
  }
  function openPanel(nextPanel: Panel) {
    setPanelQuery("");
    setPracticeQuestion("");
    setPanel(nextPanel);
  }
  function toggleSaved() {
    const next = isSaved
      ? saved.filter((slug) => slug !== article.slug)
      : [...saved, article.slug];
    if (!setSavedValue(JSON.stringify(next)))
      notify("浏览器存储不可用，暂时无法保存收藏");
    else notify(isSaved ? "已取消收藏" : "已加入收藏与错题");
  }
  function toggleMastered() {
    const next = isMastered
      ? mastered.filter((slug) => slug !== article.slug)
      : [...mastered, article.slug];
    if (!setMasteredValue(JSON.stringify(next)))
      notify("浏览器存储不可用，暂时无法保存进度");
    else
      notify(isMastered ? "已标记为待复习" : "又掌握了一个知识点，继续加油！");
  }
  function jumpToSection(id: string) {
    if (["implementation-3", "comparison", "summary"].includes(id))
      setExpanded(true);
    setActiveSection(id);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
            block: "start",
          });
      }),
    );
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
      notify("复制失败，请从浏览器地址栏复制链接");
    }
  }

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.2 }}>
      <div className="workspace min-h-screen" data-theme={theme}>
        <a className="skip-link" href="#article">
          跳至文章内容
        </a>
        <Header
          dark={theme === "dark"}
          onTheme={() => {
            if (!setTheme(theme === "dark" ? "light" : "dark"))
              notify("浏览器存储不可用，无法保存主题设置");
          }}
          onPanel={openPanel}
          onMenu={() => setMobileOpen(!mobileOpen)}
          progress={41 + mastered.length}
        />
        <div className="workspace-layout">
          <Sidebar
            topic={article.topic}
            onPanel={openPanel}
            mobileOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />
          <div className="content-layout grid min-w-0 items-start">
            <main id="article" className="article-card min-w-0 rounded-xl">
              <div className="article-topline flex items-center justify-between gap-3">
                <nav
                  className="breadcrumbs flex items-center gap-2"
                  aria-label="面包屑"
                >
                  <button onClick={() => openPanel("library")}>题库</button>
                  <ChevronRight size={13} />
                  <button
                    onClick={() => {
                      setPanelQuery(article.category);
                      setPanel("library");
                    }}
                  >
                    {article.category}
                  </button>
                  <ChevronRight size={13} />
                  <span>{article.topic}</span>
                </nav>
                <div className="article-actions flex items-center">
                  <motion.button
                    className={`article-action flex items-center gap-1.5 ${isSaved ? "text-brand" : ""}`}
                    onClick={toggleSaved}
                    aria-pressed={isSaved}
                    whileTap={{ scale: 0.94 }}
                  >
                    <Star size={16} fill={isSaved ? "currentColor" : "none"} />
                    <span>{isSaved ? "已收藏" : "收藏"}</span>
                  </motion.button>
                  <motion.button
                    className={`article-action flex items-center gap-1.5 ${!isMastered ? "text-muted" : ""}`}
                    onClick={toggleMastered}
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
                      <button
                        onClick={(event) => {
                          void copyLink();
                          event.currentTarget
                            .closest("details")
                            ?.removeAttribute("open");
                        }}
                      >
                        <Link2 size={15} />
                        复制文章链接
                      </button>
                      <button
                        onClick={(event) => {
                          setExpanded(true);
                          event.currentTarget
                            .closest("details")
                            ?.removeAttribute("open");
                        }}
                      >
                        <BookOpen size={15} />
                        展开完整文章
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
                <h1>{article.title}</h1>
                <p className="article-description">{article.description}</p>
                <div className="article-tags flex flex-wrap gap-2.5">
                  {article.tags.map((tag, index) => (
                    <button
                      key={tag}
                      className={`tag ${index === 0 ? "tag-blue" : ""}`}
                      onClick={() => {
                        setPanelQuery(tag);
                        setPanel("library");
                      }}
                    >
                      {tag}
                    </button>
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
                </div>
              </header>
              <ArticleContent article={article} expanded={expanded} />
            </main>
            <RightSidebar
              article={article}
              activeSection={activeSection}
              onSection={jumpToSection}
              note={note}
              onNote={(value) => {
                if (!setNote(value)) notify("浏览器存储不可用，笔记未保存");
              }}
              notesOpen={notesOpen}
              onToggleNotes={() => setNotesOpen(!notesOpen)}
              onRelated={(tag) => {
                setPanelQuery(tag);
                setPanel("library");
              }}
              onFollowup={(question) => {
                setPracticeQuestion(question);
                setPanel("practice");
              }}
            />
          </div>
        </div>
        {panel && (
          <WorkspaceDialog
            key={`${panel}:${panelQuery}:${practiceQuestion}`}
            panel={panel}
            onClose={() => setPanel(null)}
            saved={saved}
            mastered={mastered}
            article={article}
            initialQuery={panelQuery}
            question={practiceQuestion}
          />
        )}
        <AnimatePresence>
          {notice && (
            <motion.div
              className="toast flex items-center gap-2"
              role="status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <Check size={16} className="text-brand" />
              {notice}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}


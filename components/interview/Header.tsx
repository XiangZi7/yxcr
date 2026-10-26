"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  BookOpenCheck,
  ChevronRight,
  CircleHelp,
  Command,
  Menu,
  Moon,
  Search,
  Sun,
  UserRound,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { articles, articleHref } from "@/lib/interview/data";
import type { Panel } from "@/lib/interview/types";

export function Header({
  dark,
  onTheme,
  onPanel,
  onMenu,
  progress,
}: {
  dark: boolean;
  onTheme: () => void;
  onPanel: (panel: Panel) => void;
  onMenu: () => void;
  progress: number;
}) {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const results = articles
    .filter((item) =>
      `${item.title} ${item.topic} ${item.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .slice(0, 6);
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setSearchOpen(false);
    }
    function onOutside(event: PointerEvent) {
      if (!searchRef.current?.contains(event.target as Node))
        setSearchOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, []);
  return (
    <header className="topbar flex items-center">
      <button
        className="icon-button mobile-menu"
        onClick={onMenu}
        aria-label="打开导航"
      >
        <Menu size={21} />
      </button>
      <Link
        href="/overview"
        className="brand flex shrink-0 items-center gap-3"
        aria-label="Interview OS 首页"
      >
        <span className="brand-mark flex items-center justify-center">
          <BookOpenCheck size={18} strokeWidth={2.5} />
        </span>
        <span>Interview OS</span>
      </Link>
      <div
        ref={searchRef}
        className="search-container relative"
        role="search"
        aria-label="全站题目搜索"
      >
        <div className="search-field flex items-center gap-2.5">
          <Search size={17} strokeWidth={1.8} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                searchRef.current
                  ?.querySelector<HTMLAnchorElement>(".search-result")
                  ?.focus();
              }
            }}
            placeholder="搜索题目、知识点或代码..."
            aria-label="搜索题目、知识点或代码"
            aria-controls="search-results"
            autoComplete="off"
          />
          <kbd className="flex shrink-0 items-center gap-0.5">
            <Command size={12} />K / Ctrl K
          </kbd>
        </div>
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              id="search-results"
              className="search-results"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              <p className="px-3 pb-2 pt-1 text-xs text-muted">
                {query ? `搜索结果 · ${results.length}` : "继续探索知识"}
              </p>
              {results.length ? (
                results.map((article) => (
                  <Link
                    className="search-result flex items-center justify-between gap-3"
                    href={articleHref(article.slug)}
                    key={article.slug}
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                    }}
                  >
                    <span>
                      <span className="mb-1 block text-xs text-brand">
                        {article.topic}
                      </span>
                      {article.title}
                    </span>
                    <ChevronRight size={16} />
                  </Link>
                ))
              ) : (
                <p className="p-4 text-sm text-muted">
                  没有找到相关题目，试试 Vue、React 或响应式。
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="header-actions ml-auto flex items-center">
        <button
          className="theme-switch flex items-center gap-1"
          aria-label={dark ? "切换浅色模式" : "切换深色模式"}
          onClick={onTheme}
          aria-pressed={dark}
        >
          <Sun size={17} />
          <Moon size={15} />
        </button>
        <button
          className="learning-progress flex items-center gap-2"
          onClick={() => onPanel("today")}
          aria-label={`学习进度 ${progress}%`}
        >
          <svg
            width="29"
            height="29"
            viewBox="0 0 32 32"
            className="progress-ring -rotate-90"
            aria-hidden="true"
          >
            <circle
              cx="16"
              cy="16"
              r="12.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              opacity=".12"
            />
            <circle
              cx="16"
              cy="16"
              r="12.5"
              fill="none"
              stroke="#42c2bd"
              strokeWidth="3.5"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray={`${progress} 100`}
            />
            <path
              d="m13 15 3 3 3-3"
              stroke="#7b9ca5"
              strokeWidth="1.8"
              fill="none"
              transform="rotate(90 16 16)"
            />
          </svg>
          <span className="text-center">
            <span className="block text-xs text-muted">学习进度</span>
            <span className="block text-xs">{progress}%</span>
          </span>
        </button>
        <button
          className="help-button flex items-center gap-1.5"
          onClick={() => onPanel("help")}
        >
          <CircleHelp size={17} />
          <span>帮助</span>
        </button>
        <button
          className="avatar flex items-center justify-center"
          aria-label="个人学习档案"
          onClick={() => onPanel("profile")}
        >
          <UserRound size={19} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}

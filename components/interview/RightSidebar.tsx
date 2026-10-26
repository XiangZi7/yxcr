"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ChevronRight,
  ListTree,
  NotebookPen,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Article } from "@/lib/interview/types";
import type { MarkdownHeading } from "@/lib/markdown/utils";

export function RightSidebar({
  article,
  headings,
  activeSection,
  onSection,
  note,
  onNote,
  notesOpen,
  onToggleNotes,
  onFollowup,
}: {
  article: Article;
  headings: MarkdownHeading[];
  activeSection: string;
  onSection: (id: string) => void;
  note: string;
  onNote: (value: string) => void;
  notesOpen: boolean;
  onToggleNotes: () => void;
  onFollowup: (question: string) => void;
}) {
  return (
    <aside
      className="right-sidebar flex min-w-0 flex-col"
      aria-label="文章辅助信息"
    >
      <section className="side-card toc-card">
        <div className="mb-3 flex items-center justify-between">
          <h2>文章目录</h2>
          <ListTree size={15} className="text-muted" />
        </div>
        <nav className="toc flex flex-col" aria-label="文章目录">
          {headings.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${item.depth === 3 ? "toc-child" : ""} ${activeSection === item.id ? "is-active" : ""}`}
              onClick={(event) => {
                event.preventDefault();
                onSection(item.id);
              }}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </section>
      <section className="side-card related-card">
        <h2>相关知识点</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {article.related.map((tag, index) => (
            <Link
              className={`tag ${index === 0 ? "tag-blue" : ""}`}
              href={`/library?q=${encodeURIComponent(tag)}`}
              key={tag}
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>
      <section className="side-card followups-card">
        <h2>面试追问</h2>
        <ul className="mt-3.5 flex flex-col gap-3">
          {article.followups.map((question) => (
            <li key={question}>
              <button
                className="followup text-left"
                onClick={() => onFollowup(question)}
              >
                {question}
              </button>
            </li>
          ))}
        </ul>
        <Link
          href={`/practice?topic=${article.slug}`}
          className="subtle-link mt-4 inline-flex items-center gap-1"
        >
          开始专项练习
          <ArrowUpRight size={13} />
        </Link>
      </section>
      <section className="side-card notes-card" id="personal-notes">
        <button
          className="flex w-full items-center justify-between text-left"
          onClick={onToggleNotes}
          aria-expanded={notesOpen}
        >
          <h2 className="flex items-center gap-2">
            个人笔记{note && <NotebookPen size={14} className="text-brand" />}
          </h2>
          <ChevronRight size={16} className={notesOpen ? "rotate-90" : ""} />
        </button>
        <AnimatePresence initial={false}>
          {notesOpen ? (
            <motion.div
              key="editor"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <textarea
                autoFocus
                value={note}
                onChange={(event) => onNote(event.target.value)}
                placeholder="支持 Markdown，记录你的理解…"
                aria-label="个人笔记"
                className="notes-input mt-4 w-full resize-y"
                rows={6}
              />
              <div className="mt-2 flex items-center justify-between text-xs text-muted">
                <span>自动保存</span>
                <Link
                  href={`/notes?article=${article.slug}`}
                  className="text-brand"
                >
                  打开笔记 <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </motion.div>
          ) : (
            <button
              className="note-preview mt-5 block w-full text-left"
              onClick={onToggleNotes}
            >
              {note || "添加笔记，记录你的思考..."}
            </button>
          )}
        </AnimatePresence>
      </section>
    </aside>
  );
}

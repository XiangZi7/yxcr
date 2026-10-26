"use client";

import { ChevronRight, ListTree, NotebookPen } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Article } from "@/lib/interview/types";

export function RightSidebar({
  article,
  activeSection,
  onSection,
  note,
  onNote,
  notesOpen,
  onToggleNotes,
  onRelated,
  onFollowup,
}: {
  article: Article;
  activeSection: string;
  onSection: (id: string) => void;
  note: string;
  onNote: (value: string) => void;
  notesOpen: boolean;
  onToggleNotes: () => void;
  onRelated: (tag: string) => void;
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
          <button
            className="toc-expand icon-button"
            aria-label="展开完整文章"
            title="展开完整文章"
            onClick={() => onSection("summary")}
          >
            <ListTree size={14} />
          </button>
        </div>
        <nav className="toc flex flex-col" aria-label="文章目录">
          <a
            className={activeSection === "core" ? "is-active" : ""}
            href="#core"
            onClick={(event) => {
              event.preventDefault();
              onSection("core");
            }}
          >
            一、核心概念
          </a>
          <a
            className={
              activeSection.startsWith("implementation") ||
              activeSection === "core"
                ? "is-active"
                : ""
            }
            href="#implementation"
            onClick={(event) => {
              event.preventDefault();
              onSection("implementation");
            }}
          >
            二、实现原理
          </a>
          <div className="toc-nested flex flex-col">
            {["创建响应式对象", "依赖收集与派发更新", "作用域与副作用"].map(
              (label, index) => (
                <a
                  className={
                    activeSection === `implementation-${index + 1}`
                      ? "is-active"
                      : ""
                  }
                  href={`#implementation-${index + 1}`}
                  key={label}
                  onClick={(event) => {
                    event.preventDefault();
                    onSection(`implementation-${index + 1}`);
                  }}
                >
                  {index + 1}.{" "}
                  {article.slug === "vue-3"
                    ? label
                    : index < 2
                      ? article.sections[index].title
                      : label}
                </a>
              ),
            )}
          </div>
          <a
            className={activeSection === "comparison" ? "is-active" : ""}
            href="#comparison"
            onClick={(event) => {
              event.preventDefault();
              onSection("comparison");
            }}
          >
            三、
            {article.slug === "vue-3" ? "与 Vue 2 的对比" : "实践与方案对比"}
          </a>
          <a
            className={activeSection === "summary" ? "is-active" : ""}
            href="#summary"
            onClick={(event) => {
              event.preventDefault();
              onSection("summary");
            }}
          >
            四、总结
          </a>
        </nav>
      </section>
      <section className="side-card related-card">
        <h2>相关知识点</h2>
        <div className="mt-4 flex flex-wrap gap-x-2 gap-y-2.5">
          {article.related.map((tag, index) => (
            <button
              className={`tag ${index === 0 ? "tag-blue" : ""}`}
              key={tag}
              onClick={() => onRelated(tag)}
            >
              {tag}
            </button>
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
      </section>
      <section
        className={`side-card notes-card ${notesOpen ? "notes-is-open" : ""}`}
        id="personal-notes"
      >
        <button
          className="flex w-full items-center justify-between text-left"
          onClick={onToggleNotes}
          aria-expanded={notesOpen}
        >
          <h2 className="flex items-center gap-2">
            个人笔记{note && <NotebookPen size={14} className="text-brand" />}
          </h2>
          <ChevronRight size={17} className={notesOpen ? "rotate-90" : ""} />
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
                placeholder="记录你的理解、思考与易错点…"
                aria-label="个人笔记"
                className="notes-input mt-4 w-full resize-y"
                rows={6}
              />
              <p className="mt-2 text-xs text-muted" role="status">
                自动保存在当前浏览器
              </p>
            </motion.div>
          ) : (
            <motion.button
              key="preview"
              className="note-preview mt-5 block w-full text-left"
              onClick={onToggleNotes}
            >
              {note || "添加笔记，记录你的思考..."}
            </motion.button>
          )}
        </AnimatePresence>
      </section>
    </aside>
  );
}

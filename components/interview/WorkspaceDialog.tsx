"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronRight,
  Search,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { articles, articleHref } from "@/lib/interview/data";
import type { Article, Panel } from "@/lib/interview/types";

const panelTitles: Record<Panel, string> = {
  library: "全部题库",
  today: "今日学习",
  saved: "收藏与错题",
  practice: "面试练习",
  help: "使用帮助",
  profile: "我的学习档案",
};

export function WorkspaceDialog({
  panel,
  onClose,
  saved,
  mastered,
  article,
  initialQuery = "",
  question = "",
}: {
  panel: Panel;
  onClose: () => void;
  saved: string[];
  mastered: string[];
  article: Article;
  initialQuery?: string;
  question?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [answer, setAnswer] = useState("");
  const [showReference, setShowReference] = useState(false);
  useEffect(() => {
    ref.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  const matches = articles.filter(
    (item) =>
      (panel !== "saved" || saved.includes(item.slug)) &&
      `${item.category} ${item.title} ${item.topic} ${item.tags.join(" ")} ${item.introduction}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <motion.dialog
      ref={ref}
      className="workspace-dialog"
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.18 }}
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-heading flex items-center justify-between">
        <div>
          <p className="mb-1 text-xs font-medium tracking-widest text-brand">
            INTERVIEW OS
          </p>
          <h2 id="dialog-title">{panelTitles[panel]}</h2>
        </div>
        <button className="icon-button" aria-label="关闭弹窗" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      {(panel === "library" || panel === "saved") && (
        <>
          <label className="dialog-search flex items-center gap-2">
            <Search size={17} />
            <input
              aria-label="筛选题目"
              placeholder="搜索题目或知识点"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <p className="mb-3 text-xs text-muted">
            共 {matches.length} 道题目
            {panel === "saved" ? " · 你的个人收藏" : " · 持续积累，系统学习"}
          </p>
          <div className="question-list flex flex-col gap-2">
            {matches.map((item) => (
              <Link
                href={articleHref(item.slug)}
                key={item.slug}
                onClick={onClose}
                className="question-row flex items-center gap-3"
              >
                <BookOpen size={18} className="shrink-0 text-brand" />
                <span className="min-w-0 flex-1">
                  <span className="mb-1 block text-xs text-muted">
                    {item.category} / {item.topic}
                  </span>
                  <span>{item.title}</span>
                </span>
                {mastered.includes(item.slug) && (
                  <Check size={16} className="text-brand" />
                )}
                <ChevronRight size={16} className="shrink-0 text-muted" />
              </Link>
            ))}
            {!matches.length && (
              <div className="empty-state py-10 text-center">
                <Star size={28} className="mx-auto mb-4 text-muted" />
                <p>
                  {panel === "saved" && !query
                    ? "还没有收藏的题目"
                    : "没有找到匹配的题目"}
                </p>
                <p className="mt-2 text-sm text-muted">
                  {panel === "saved"
                    ? "点击文章右上角的「收藏」，建立自己的复习清单。"
                    : "试试其他关键词，例如 Proxy、React 或 AI。"}
                </p>
              </div>
            )}
          </div>
        </>
      )}
      {(panel === "today" || panel === "profile") && (
        <>
          <p className="mb-5 leading-7 text-muted">
            每天进步一点点，让知识真正成为你的底气。
          </p>
          <div className="mb-6 grid grid-cols-3 gap-3">
            {[
              { value: articles.length, label: "学习题目" },
              { value: mastered.length, label: "已掌握" },
              { value: saved.length, label: "已收藏" },
            ].map((stat) => (
              <div className="stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <h3 className="mb-3 font-semibold">
            {panel === "today" ? "今天，继续学习这些知识" : "已掌握的知识"}
          </h3>
          <div className="flex flex-col gap-2">
            {(panel === "today"
              ? articles
                  .filter((item) => !mastered.includes(item.slug))
                  .slice(0, 3)
              : articles.filter((item) => mastered.includes(item.slug))
            ).map((item) => (
              <Link
                className="question-row flex items-center justify-between gap-3"
                key={item.slug}
                href={articleHref(item.slug)}
                onClick={onClose}
              >
                <span>{item.title}</span>
                <ChevronRight size={16} className="shrink-0 text-brand" />
              </Link>
            ))}
            {panel === "profile" && !mastered.length && (
              <p className="py-4 text-sm text-muted">
                学习后点击「已掌握」，在这里记录你的成长。
              </p>
            )}
          </div>
        </>
      )}
      {panel === "practice" && (
        <>
          <div className="practice-label mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
            <Sparkles size={14} />
            自主练习 · {article.topic}
          </div>
          <h3 className="mb-4 text-lg font-semibold leading-8">
            {question || article.title}
          </h3>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setShowReference(true);
            }}
          >
            <label
              htmlFor="practice-answer"
              className="mb-2 block text-sm text-muted"
            >
              先试着用自己的语言回答
            </label>
            <textarea
              id="practice-answer"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              className="practice-input w-full resize-y"
              rows={6}
              placeholder="可以从核心概念、实现过程和应用场景三个方面展开…"
              required
              minLength={10}
            />
            <p className="mb-4 mt-2 text-xs text-muted">
              至少输入 10 个字，再对照答题思路复盘。
            </p>
            <button className="solid-button" type="submit">
              查看答题思路
              <ChevronRight size={15} />
            </button>
          </form>
          {showReference && (
            <motion.div
              className="reference-answer mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h4 className="mb-2 font-semibold">答题思路</h4>
              <p className="text-sm leading-7">
                {question && question !== article.title
                  ? question.includes("ref")
                    ? "ref 可包装基本类型或对象，通过 .value 访问；reactive 返回对象的 Proxy 代理。ref 在模板中通常会自动解包，而 reactive 解构后可能失去响应式联系，可使用 toRefs 保留属性引用。"
                    : question.includes("简单")
                      ? "用 Proxy 拦截 get 与 set；通过 WeakMap 按对象与属性保存 effect 集合；读取时 track 收集当前 effect，写入时 trigger 执行依赖，并处理重复依赖与副作用清理。"
                      : article.summary
                  : article.summary}
              </p>
              <p className="mt-3 text-xs text-muted">
                这是本地自测练习，未接入在线 AI 评分。
              </p>
            </motion.div>
          )}
        </>
      )}
      {panel === "help" && (
        <div className="help-content flex flex-col gap-5">
          {[
            {
              title: "快速找到知识",
              text: "使用顶部搜索框搜索题目、知识点或代码。按 Ctrl K / ⌘ K 可以快速打开搜索，按 Escape 关闭。",
            },
            {
              title: "建立自己的学习节奏",
              text: "在左侧切换技术分类；点击收藏保留题目，点击已掌握更新学习记录。今日学习会推荐尚未掌握的题目。",
            },
            {
              title: "边学边记录",
              text: "点击「记笔记」或右侧个人笔记，随时记录思考。笔记和学习状态会保存在当前浏览器中。",
            },
            {
              title: "深入阅读与练习",
              text: "点击右侧目录跳转对应段落，后续章节会自动展开。点击面试追问可以进行自测，再对照答题思路复盘。",
            },
          ].map((item) => (
            <section key={item.title}>
              <h3 className="mb-2 font-semibold">{item.title}</h3>
              <p className="text-sm leading-7 text-muted">{item.text}</p>
            </section>
          ))}
        </div>
      )}
    </motion.dialog>
  );
}

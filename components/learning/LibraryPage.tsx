"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowDownWideNarrow,
  BookOpen,
  CircleAlert,
  FileUp,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { articles } from "@/lib/interview/data";
import { useLearningStore } from "@/lib/learning/store";
import { PageHeading } from "./PageHeading";
import { QuestionCard } from "./QuestionCard";

export function LibraryPage({ savedOnly = false }: { savedOnly?: boolean }) {
  const params = useSearchParams();
  return (
    <LibraryContent
      key={params.toString()}
      savedOnly={savedOnly}
      initialQuery={params.get("q") ?? ""}
      initialCategory={params.get("category") ?? "全部"}
    />
  );
}
function LibraryContent({
  savedOnly,
  initialQuery,
  initialCategory,
}: {
  savedOnly: boolean;
  initialQuery: string;
  initialCategory: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(
    ["前端", "后端", "AI / LLM"].includes(initialCategory)
      ? initialCategory
      : "全部",
  );
  const [status, setStatus] = useState("全部状态");
  const [sort, setSort] = useState("recommended");
  const [list, setList] = useState(false);
  const [tab, setTab] = useState("saved");
  const { saved, mastered, mistakes } = useLearningStore();
  const matches = articles
    .filter(
      (article) =>
        (!savedOnly ||
          (tab === "saved" ? saved : mistakes).includes(article.slug)) &&
        (category === "全部" || article.category === category) &&
        (status === "全部状态" ||
          (status === "已掌握"
            ? mastered.includes(article.slug)
            : !mastered.includes(article.slug))) &&
        `${article.title} ${article.topic} ${article.tags.join(" ")} ${article.introduction}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "title"
        ? a.title.localeCompare(b.title, "zh-CN")
        : sort === "unlearned"
          ? Number(mastered.includes(a.slug)) -
            Number(mastered.includes(b.slug))
          : 0,
    );
  function resetFilters() {
    setQuery("");
    setCategory("全部");
    setStatus("全部状态");
  }
  return (
    <main className="dashboard-page">
      <PageHeading
        title={
          savedOnly ? "把值得复习的，留在这里" : "每一个问题，都是一次进步"
        }
        description={
          savedOnly
            ? "整理收藏，复盘错题。把还不熟悉的，慢慢变成你的强项。"
            : "覆盖前端、后端与 AI 核心知识，按自己的节奏，构建完整的知识体系。"
        }
        label={savedOnly ? "收藏与错题" : "全部题库"}
        action={
          <Link href="/notes" className="outline-button">
            <FileUp size={15} />
            导入 Markdown
          </Link>
        }
      />
      {savedOnly ? (
        <div className="collection-tabs mb-6 flex gap-2">
          {[
            {
              id: "saved",
              title: "收藏的题目",
              count: saved.length,
              icon: Star,
            },
            {
              id: "mistakes",
              title: "我的错题本",
              count: mistakes.length,
              icon: CircleAlert,
            },
          ].map(({ id, title, count, icon: Icon }) => (
            <button
              key={id}
              className={`collection-tab ${tab === id ? "is-active" : ""}`}
              onClick={() => setTab(id)}
            >
              <Icon size={17} />
              {title}
              <span>{count}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="category-overview mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              title: "全部题目",
              category: "全部",
              icon: BookOpen,
              detail: "系统准备，从容应对",
            },
            {
              title: "前端开发",
              category: "前端",
              icon: LayoutGrid,
              detail: "语言、框架与工程能力",
            },
            {
              title: "后端开发",
              category: "后端",
              icon: SlidersHorizontal,
              detail: "服务、接口与系统设计",
            },
            {
              title: "AI / LLM",
              category: "AI / LLM",
              icon: Star,
              detail: "走近大模型应用开发",
            },
          ].map(({ title, category: value, icon: Icon, detail }) => (
            <button
              className={`category-overview-card text-left ${category === value ? "is-active" : ""}`}
              key={title}
              onClick={() => setCategory(value)}
            >
              <div className="flex items-center justify-between">
                <span className="metric-icon blue">
                  <Icon size={18} />
                </span>
                <span className="text-xl font-semibold">
                  {value === "全部"
                    ? articles.length
                    : articles.filter((article) => article.category === value)
                        .length}
                  <small className="ml-1 text-xs font-normal text-muted">
                    题
                  </small>
                </span>
              </div>
              <h2 className="mb-1 mt-4 text-sm font-semibold">{title}</h2>
              <p className="text-xs text-muted">{detail}</p>
            </button>
          ))}
        </div>
      )}
      <section className="library-filter panel">
        <div className="flex flex-wrap items-center gap-3">
          <label className="filter-search flex min-w-0 flex-1 items-center gap-2">
            <Search size={17} className="shrink-0 text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索题目、标签或知识点"
              aria-label="搜索题库"
            />
            <button
              aria-label="清空搜索"
              className={`icon-button ${query ? "" : "invisible"}`}
              onClick={() => setQuery("")}
            >
              <X size={14} />
            </button>
          </label>
          <select
            className="filter-select"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="掌握状态"
          >
            {["全部状态", "未掌握", "已掌握"].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
          <span className="mr-2 text-xs text-muted">技术方向</span>
          {["全部", "前端", "后端", "AI / LLM"].map((value) => (
            <button
              className={`filter-pill ${category === value ? "is-active" : ""}`}
              onClick={() => setCategory(value)}
              key={value}
            >
              {value}
            </button>
          ))}
          {(query || category !== "全部" || status !== "全部状态") && (
            <button
              onClick={resetFilters}
              className="ml-auto text-xs text-muted hover:text-brand"
            >
              重置筛选
            </button>
          )}
        </div>
      </section>
      <div className="mb-4 mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-muted">
          共 <strong className="font-medium text-ink">{matches.length}</strong>{" "}
          道题目<span className="mx-2 text-line">|</span>每一次理解，都有意义
        </p>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-muted">
            <ArrowDownWideNarrow size={14} />
            <select
              className="sort-select"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="题目排序"
            >
              <option value="recommended">推荐排序</option>
              <option value="unlearned">未掌握优先</option>
              <option value="title">按题目名称</option>
            </select>
          </label>
          <div className="view-toggle">
            <button
              aria-label="卡片视图"
              aria-pressed={!list}
              onClick={() => setList(false)}
              className={!list ? "is-active" : ""}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              aria-label="列表视图"
              aria-pressed={list}
              onClick={() => setList(true)}
              className={list ? "is-active" : ""}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>
      {matches.length ? (
        <div className={list ? "grid gap-3" : "question-grid grid gap-5"}>
          {matches.map((article) => (
            <QuestionCard key={article.slug} article={article} list={list} />
          ))}
        </div>
      ) : (
        <section className="empty-library panel">
          <span className="empty-icon">
            {savedOnly ? <Star size={30} /> : <Search size={30} />}
          </span>
          <h2 className="mt-5 text-lg font-semibold">
            {query || category !== "全部"
              ? "暂时没有找到相关题目"
              : tab === "mistakes"
                ? "还没有需要复习的错题"
                : "收藏你的第一道题目"}
          </h2>
          <p className="mb-6 mt-2 text-sm text-muted">
            {query || category !== "全部"
              ? "换个关键词，或者调整一下筛选条件。"
              : "遇到值得再看一遍的知识，就把它留在这里。"}
          </p>
          {savedOnly ? (
            <Link href="/library" className="solid-button">
              去题库看看
            </Link>
          ) : (
            <button className="solid-button" onClick={resetFilters}>
              重置筛选
            </button>
          )}
        </section>
      )}
    </main>
  );
}

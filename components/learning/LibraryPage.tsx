"use client";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CircleAlert, Search, Star } from "lucide-react";
import { useLearningStore } from "@/lib/learning/store";
import { originalKnowledge } from "@/lib/resources/original";
import { useResourceStore } from "@/lib/resources/store";
import { filterResources } from "@/lib/resources/query";
import { useKnowledgeRecords } from "@/lib/resources/progress";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { PageHeading } from "./PageHeading";

export function LibraryPage({ savedOnly = true }: { savedOnly?: boolean }) {
  const params = useSearchParams();
  return (
    <SavedKnowledge
      key={params.toString()}
      initialQuery={params.get("q") ?? ""}
      savedOnly={savedOnly}
    />
  );
}
function SavedKnowledge({
  initialQuery,
  savedOnly,
}: {
  initialQuery: string;
  savedOnly: boolean;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [tab, setTab] = useState("saved");
  const [status, setStatus] = useState("all");
  const records = useResourceStore((state) => state.records);
  const mistakes = useLearningStore((state) => state.mistakes);
  const catalog = [
    ...originalKnowledge,
    ...Object.values(records).map((item) => item.resource),
  ];
  const progress = useKnowledgeRecords(catalog);
  const savedCount = Object.values(progress).filter(
    (item) => item.saved,
  ).length;
  const base = savedOnly
    ? catalog.filter((item) =>
        tab === "saved" ? progress[item.id]?.saved : mistakes.includes(item.id),
      )
    : catalog;
  const matches = filterResources(
    base,
    {
      query,
      status:
        status === "mastered"
          ? "mastered"
          : status === "unlearned"
            ? "unlearned"
            : "all",
    },
    progress,
  );
  return (
    <main className="dashboard-page">
      <PageHeading
        title="把值得复习的，留在这里"
        description="整理收藏，复盘错题。把还不熟悉的，慢慢变成你的强项。"
        label="收藏与错题"
        action={
          <Link href="/library" className="outline-button">
            探索全部知识
          </Link>
        }
      />
      <div className="collection-tabs my-6 flex gap-2">
        {[
          { id: "saved", label: "我的收藏", count: savedCount, icon: Star },
          {
            id: "mistakes",
            label: "我的错题本",
            count: mistakes.length,
            icon: CircleAlert,
          },
        ].map(({ id, label, count, icon: Icon }) => (
          <button
            key={id}
            className={`collection-tab ${tab === id ? "is-active" : ""}`}
            aria-pressed={tab === id}
            onClick={() => setTab(id)}
          >
            <Icon size={17} />
            {label}
            <span>{count}</span>
          </button>
        ))}
      </div>
      <section className="panel resource-filter mb-6" aria-label="筛选收藏">
        <div className="resource-search-form">
          <label className="filter-search flex flex-1 items-center gap-2">
            <Search size={16} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="搜索收藏知识点"
              placeholder="搜索收藏的知识…"
            />
          </label>
          <select
            className="filter-select"
            aria-label="收藏学习状态"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="all">全部状态</option>
            <option value="mastered">已掌握</option>
            <option value="unlearned">待学习</option>
          </select>
        </div>
      </section>
      {matches.length ? (
        <div className="resource-grid">
          {matches.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <section className="panel empty-library">
          <Star size={30} className="mx-auto mb-4 text-muted" />
          <h2>这里还没有匹配的知识点</h2>
          <p className="my-4 text-sm text-muted">
            试试其他关键词，或去知识库收藏值得复习的知识。
          </p>
          <Link href="/library" className="solid-button">
            去探索知识
          </Link>
        </section>
      )}
    </main>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Layers3,
  LayoutGrid,
  List,
  LoaderCircle,
  RefreshCw,
  Search,
  Star,
  X,
} from "lucide-react";
import { PageHeading } from "@/components/learning/PageHeading";
import {
  resourceCollections,
  resourceGroups,
  resourceSources,
  resourceSummary,
  collectionResourceCount,
} from "@/lib/resources/config";
import {
  getCachedResources,
  loadResourceCatalog,
} from "@/lib/resources/client";
import { filterResources } from "@/lib/resources/query";
import { useResourceStore } from "@/lib/resources/store";
import type {
  LearningResource,
  ResourceFilters,
  ResourceStatus,
} from "@/lib/resources/types";
import { ResourceIcon } from "./ResourceIcon";
import { ResourceCard } from "./ResourceCard";

const pageSize = 24;
const statuses: { value: ResourceStatus; label: string }[] = [
  { value: "all", label: "全部状态" },
  { value: "saved", label: "我的收藏" },
  { value: "unlearned", label: "待学习" },
  { value: "mastered", label: "已掌握" },
  { value: "planned", label: "学习计划" },
];

export function ResourceLibraryPage({
  initialResources,
}: {
  initialResources: LearningResource[];
}) {
  const params = useSearchParams();
  const status = params.get("status") as ResourceStatus;
  return (
    <ResourceLibrary
      key={params.toString()}
      initialResources={initialResources}
      initialFilters={{
        query: params.get("q") ?? "",
        source: params.get("source") ?? "all",
        collection: params.get("collection") ?? "all",
        status: statuses.some((item) => item.value === status) ? status : "all",
      }}
    />
  );
}
export function ResourceLibraryPreview({
  initialResources,
}: {
  initialResources: LearningResource[];
}) {
  return <ResourceLibrary initialResources={initialResources} />;
}

export function ResourceLibraryTabs({
  active = "resources",
}: {
  active?: "resources" | "questions";
}) {
  return (
    <nav className="resource-library-tabs" aria-label="题库与学习资源">
      <Link
        href="/resources"
        className={active === "resources" ? "is-active" : ""}
      >
        <Layers3 size={15} />
        资源知识库<span>{resourceSummary.total.toLocaleString("en-US")}</span>
      </Link>
      <Link
        href="/library"
        className={active === "questions" ? "is-active" : ""}
      >
        <BookOpen size={15} />
        站内题库
      </Link>
    </nav>
  );
}

function ResourceLibrary({
  initialResources,
  initialFilters = {},
}: {
  initialResources: LearningResource[];
  initialFilters?: ResourceFilters;
}) {
  const router = useRouter();
  const [catalog, setCatalog] = useState(
    getCachedResources() ?? initialResources,
  );
  const [ready, setReady] = useState(Boolean(getCachedResources()));
  const [error, setError] = useState(false);
  const [query, setQuery] = useState(initialFilters.query ?? "");
  const [source, setSource] = useState(
    resourceSources.some((item) => item.id === initialFilters.source)
      ? initialFilters.source!
      : "all",
  );
  const [collection, setCollection] = useState(
    resourceCollections.some((item) => item.id === initialFilters.collection)
      ? initialFilters.collection!
      : "all",
  );
  const [status, setStatus] = useState<ResourceStatus>(
    initialFilters.status ?? "all",
  );
  const [page, setPage] = useState(1);
  const [list, setList] = useState(false);
  const records = useResourceStore((state) => state.records);
  const values = Object.values(records);
  const savedCount = values.filter((item) => item.saved).length;
  const masteredCount = values.filter((item) => item.mastered).length;

  useEffect(() => {
    let active = true;
    loadResourceCatalog()
      .then((data) => {
        if (active) {
          setCatalog(data);
          setReady(true);
        }
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const matches = useMemo(
    () =>
      filterResources(catalog, { query, source, collection, status }, records),
    [catalog, query, source, collection, status, records],
  );
  const total = ready
    ? matches.length
    : !query && source === "all" && collection === "all" && status === "all"
      ? resourceSummary.total
      : matches.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pages);
  const shown = matches.slice((safePage - 1) * pageSize, safePage * pageSize);
  const currentCollection = resourceCollections.find(
    (item) => item.id === collection,
  );

  function filterHref(patch: ResourceFilters = {}) {
    const filters = { query, source, collection, status, ...patch };
    const params = new URLSearchParams();
    if (filters.query) params.set("q", filters.query);
    if (filters.source !== "all") params.set("source", filters.source);
    if (filters.collection !== "all")
      params.set("collection", filters.collection);
    if (filters.status !== "all") params.set("status", filters.status);
    return `/resources${params.size ? `?${params}` : ""}`;
  }
  function reset() {
    setQuery("");
    setSource("all");
    setCollection("all");
    setStatus("all");
    setPage(1);
    router.replace("/resources", { scroll: false });
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    router.replace(filterHref(), { scroll: false });
  }
  function retry() {
    setError(false);
    void loadResourceCatalog()
      .then((data) => {
        setCatalog(data);
        setReady(true);
      })
      .catch(() => setError(true));
  }

  return (
    <main className="dashboard-page resources-page">
      <PageHeading
        title="让零散的知识，连成体系"
        description="从基础到进阶，从网络到 AI。把值得深入的资源，纳入自己的学习节奏。"
        label="资源知识库"
        action={
          <Link href="/today" className="outline-button">
            我的学习计划
            <ArrowRight size={14} />
          </Link>
        }
      />
      <ResourceLibraryTabs />
      <section className="resource-summary-grid" aria-label="资源目录概览">
        {[
          {
            label: "资源与知识点",
            value: resourceSummary.total.toLocaleString("en-US"),
            detail: "公开目录索引",
            icon: BookOpen,
            tone: "blue",
          },
          {
            label: "学习栏目",
            value: resourceCollections.length,
            detail: "基础 · 进阶 · 工程 · AI",
            icon: Layers3,
            tone: "violet",
          },
          {
            label: "内容来源",
            value: resourceSources.length,
            detail: "每条保留原文入口",
            icon: Globe2,
            tone: "teal",
          },
          {
            label: "我的知识积累",
            value: masteredCount,
            detail: `已收藏 ${savedCount} 条资源`,
            icon: Check,
            tone: "orange",
          },
        ].map(({ label, value, detail, icon: Icon, tone }) => (
          <div className="resource-summary-card" key={label}>
            <span className={`metric-icon ${tone}`}>
              <Icon size={18} />
            </span>
            <div>
              <p>{label}</p>
              <strong>{value}</strong>
              <span>{detail}</span>
            </div>
          </div>
        ))}
      </section>
      <nav className="resource-category-menu" aria-label="资源栏目">
        <div className="resource-main-categories">
          <Link
            href={filterHref({ collection: "all", source: "all" })}
            className={collection === "all" ? "is-active" : ""}
            prefetch={false}
          >
            全部
          </Link>
          {resourceCollections
            .filter((item) => item.group === "面试专栏")
            .map((item) => (
              <Link
                href={filterHref({ collection: item.id, source: "all" })}
                className={collection === item.id ? "is-active" : ""}
                aria-current={collection === item.id ? "page" : undefined}
                prefetch={false}
                key={item.id}
              >
                {item.title}
              </Link>
            ))}
        </div>
        <div className="resource-dropdown-menus">
          {resourceGroups
            .filter((group) => group !== "面试专栏")
            .map((group) => (
              <details className="resource-category-dropdown" key={group}>
                <summary
                  className={
                    currentCollection?.group === group ? "is-active" : ""
                  }
                >
                  {group === "专项练习" ? "更多" : group}
                  <ChevronDown size={12} />
                </summary>
                <div className="resource-category-popover">
                  {resourceCollections
                    .filter((item) => item.group === group)
                    .map((item) => (
                      <Link
                        key={item.id}
                        href={filterHref({
                          collection: item.id,
                          source: "all",
                        })}
                        prefetch={false}
                        className={collection === item.id ? "is-active" : ""}
                      >
                        <ResourceIcon name={item.icon} size={15} />
                        <span>{item.title}</span>
                        <small>{collectionResourceCount(item.id)}</small>
                      </Link>
                    ))}
                </div>
              </details>
            ))}
        </div>
      </nav>
      <div className="resource-extension-grid">
        {resourceCollections
          .filter((item) => item.group === "扩展专栏")
          .map((item) => (
            <Link
              key={item.id}
              href={filterHref({ collection: item.id, source: "all" })}
              prefetch={false}
              className={`resource-extension-card extension-${item.source}`}
            >
              <span className="resource-extension-icon">
                <ResourceIcon name={item.icon} size={23} />
              </span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
              <span className="resource-extension-count">
                {collectionResourceCount(item.id)}
                <small>条目录</small>
              </span>
              <ArrowUpRight size={17} />
            </Link>
          ))}
      </div>
      <section className="panel resource-filter" aria-label="筛选学习资源">
        <form className="resource-search-form" onSubmit={submit}>
          <label className="filter-search flex min-w-0 flex-1 items-center gap-2">
            <Search size={17} className="shrink-0 text-muted" />
            <input
              type="search"
              aria-label="搜索资源知识点"
              placeholder="搜索事件循环、HTTP、MCP、Agent…"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
            />
            {query && (
              <button
                type="button"
                className="icon-button text-muted"
                aria-label="清空资源搜索"
                onClick={() => {
                  setQuery("");
                  setPage(1);
                }}
              >
                <X size={14} />
              </button>
            )}
          </label>
          <button type="submit" className="outline-button">
            搜索
          </button>
          <select
            className="filter-select"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as ResourceStatus);
              setPage(1);
            }}
            aria-label="资源学习状态"
          >
            {statuses.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </form>
        <div className="resource-source-filters">
          <span className="text-xs text-muted">内容来源</span>
          <button
            className={`filter-pill ${source === "all" ? "is-active" : ""}`}
            aria-pressed={source === "all"}
            onClick={() => {
              setSource("all");
              setPage(1);
            }}
          >
            全部来源
          </button>
          {resourceSources.map((item) => (
            <button
              key={item.id}
              className={`filter-pill ${source === item.id ? "is-active" : ""}`}
              aria-pressed={source === item.id}
              onClick={() => {
                setSource(item.id);
                if (currentCollection?.source !== item.id) setCollection("all");
                setPage(1);
              }}
            >
              <span className={`resource-source-dot source-${item.id}`} />
              {item.name}
            </button>
          ))}
          {(query ||
            source !== "all" ||
            collection !== "all" ||
            status !== "all") && (
            <button className="resource-reset" onClick={reset}>
              <RefreshCw size={12} />
              重置筛选
            </button>
          )}
        </div>
      </section>
      <div className="resource-results-heading">
        <div>
          <p>
            {currentCollection?.title ?? "全部学习资源"}
            <span>{total.toLocaleString("en-US")} 条</span>
          </p>
          <small>
            {currentCollection?.description ??
              "内容来自原作者，阅读与访问权限以来源站为准。"}
          </small>
        </div>
        <div className="flex items-center gap-3">
          {!ready && !error && (
            <span className="resource-loading">
              <LoaderCircle size={13} className="animate-spin" />
              加载完整目录
            </span>
          )}
          <div className="view-toggle">
            <button
              aria-label="资源卡片视图"
              aria-pressed={!list}
              className={!list ? "is-active" : ""}
              onClick={() => setList(false)}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              aria-label="资源列表视图"
              aria-pressed={list}
              className={list ? "is-active" : ""}
              onClick={() => setList(true)}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>
      {error && (
        <div className="resource-load-error" role="status">
          <span>完整目录暂时无法加载，已保留可用资源。</span>
          <button onClick={retry}>重新加载</button>
        </div>
      )}
      {shown.length ? (
        <div className={`resource-grid ${list ? "resource-list" : ""}`}>
          {shown.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} list={list} />
          ))}
        </div>
      ) : (
        <section className="empty-library panel">
          <span className="empty-icon">
            <Search size={28} />
          </span>
          <h2 className="mt-5 text-lg font-semibold">
            {ready ? "没有找到匹配的资源" : "正在查找完整目录"}
          </h2>
          <p className="mb-6 mt-2 text-sm text-muted">
            {ready
              ? "换个关键词，或调整栏目和学习状态。"
              : "目录加载后会显示全部搜索结果。"}
          </p>
          {ready && (
            <button className="solid-button" onClick={reset}>
              查看全部资源
            </button>
          )}
        </section>
      )}
      {total > pageSize && (
        <nav className="resource-pagination" aria-label="资源分页">
          <span>
            第 {safePage} / {pages} 页 · 每页 {pageSize} 条
          </span>
          <div>
            <button
              className="outline-button"
              disabled={!ready || safePage === 1}
              onClick={() => setPage(safePage - 1)}
              aria-label="上一页资源"
            >
              <ChevronLeft size={15} />
              上一页
            </button>
            <button
              className="outline-button"
              disabled={!ready || safePage === pages}
              onClick={() => setPage(safePage + 1)}
              aria-label="下一页资源"
            >
              下一页
              <ChevronRight size={15} />
            </button>
          </div>
        </nav>
      )}
      <footer className="resource-attribution">
        <span>来源与致谢</span>
        {resourceSources.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.name}
            <ArrowUpRight size={11} />
          </a>
        ))}
        <span className="ml-auto">
          目录更新：{resourceSummary.syncedAt.slice(0, 10)}
        </span>
      </footer>
    </main>
  );
}

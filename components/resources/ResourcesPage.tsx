"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Layers3,
  LayoutGrid,
  List,
  LoaderCircle,
  RefreshCw,
  Search,
} from "lucide-react";
import { PageHeading } from "@/components/learning/PageHeading";
import {
  resourceCollections,
  resourceGroups,
  resourceSummary,
  collectionResourceCount,
} from "@/lib/resources/config";
import {
  loadResourceCatalog,
} from "@/lib/resources/client";
import { filterResources } from "@/lib/resources/query";
import { useKnowledgeRecords } from "@/lib/resources/progress";
import type {
  LearningResource,
  ResourceFilters,
  ResourceStatus,
} from "@/lib/resources/types";
import { ResourceIcon } from "./ResourceIcon";
import { ResourceCard } from "./ResourceCard";
import { libraryPageSize, listingHref, paginateKnowledge, parseLibraryPage, type LibraryPageData } from "@/lib/resources/listing";
import { categoryHref, collectionHref, topicCategories } from "@/lib/resources/sections";
import { useLearningStore } from "@/lib/learning/store";
import { useResourceStore } from "@/lib/resources/store";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";

const pageSize = libraryPageSize;
const emptyCatalog: LearningResource[] = [];
const statuses: { value: ResourceStatus; label: string }[] = [
  { value: "all", label: "全部状态" },
  { value: "saved", label: "我的收藏" },
  { value: "unlearned", label: "待学习" },
  { value: "mastered", label: "已掌握" },
  { value: "planned", label: "学习计划" },
];

export function ResourceLibraryPage({ data }: { data: LibraryPageData }) {
  const [search, setSearch] = useState("");
  return <>
    <Suspense fallback={null}><QuerySync onChange={setSearch} /></Suspense>
    <ResourceLibrary key={`${data.basePath}:${data.page}:${search}`} data={data} search={search} />
  </>;
}

function QuerySync({ onChange }: { onChange: (value: string) => void }) {
  const params = useSearchParams();
  const search = params.toString();
  useEffect(() => onChange(search), [search, onChange]);
  return null;
}

function ResourceLibrary({ data, search }: { data: LibraryPageData; search: string }) {
  const { initialResources, basePath, title, description } = data;
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const requestedStatus = params.get("status") || "all";
  const clientView = ["q", "category", "status", "page"].some((key) => params.has(key));
  const filters = useMemo<ResourceFilters>(() => clientView ? {
    ...data.filters,
    query: (params.get("q") || "").trim().slice(0, 200),
    category: data.filters.category || params.get("category") || "",
    status: statuses.some(({ value }) => value === requestedStatus) ? requestedStatus as ResourceStatus : "all",
  } : data.filters, [clientView, data.filters, params, requestedStatus]);
  const router = useRouter();
  const [privateCatalog, setPrivateCatalog] = useState<LearningResource[] | undefined>();
  const [error, setError] = useState(false);
  const [query, setQuery] = useState(filters.query ?? "");
  const category = filters.category ?? "";
  const collection = filters.collection ?? "all";
  const status = filters.status ?? "all";
  const [list, setList] = useState(false);
  const dropdownMenus = useRef<HTMLDivElement>(null);
  const catalog = clientView ? privateCatalog ?? emptyCatalog : initialResources;
  const ready = !clientView || Boolean(privateCatalog);
  const records = useKnowledgeRecords(catalog);
  const resourceRecords = useResourceStore((state) => state.records);
  const originalSaved = useLearningStore((state) => state.saved.length);
  const originalMastered = useLearningStore((state) => state.mastered.length);
  const savedCount = originalSaved + Object.values(resourceRecords).filter((item) => item.saved).length;
  const masteredCount = originalMastered + Object.values(resourceRecords).filter((item) => item.mastered).length;

  useEffect(() => {
    if (!clientView || privateCatalog) return;
    let active = true;
    loadResourceCatalog()
      .then((items) => { if (active) setPrivateCatalog(items); })
      .catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, [clientView, privateCatalog]);

  const matches = useMemo(
    () => clientView ? filterResources(catalog, { ...filters, query: [data.topicQuery, filters.query].filter(Boolean).join(" ") }, records) : initialResources,
    [clientView, catalog, filters, records, initialResources, data.topicQuery],
  );
  const total = clientView ? matches.length : data.total;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = clientView ? Math.min(parseLibraryPage(params.get("page") || undefined), pages) : data.page;
  const shown = clientView ? paginateKnowledge(matches, safePage) : initialResources;
  const currentCollection = resourceCollections.find((item) => item.id === collection);

  useEffect(() => {
    function closeMenu(restoreFocus = false) {
      const open = dropdownMenus.current?.querySelector<HTMLDetailsElement>(
        "details[open]",
      );
      if (!open) return;
      open.open = false;
      if (restoreFocus) open.querySelector("summary")?.focus();
    }
    function onPointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !dropdownMenus.current?.contains(event.target)
      ) closeMenu();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu(true);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function filterHref(patch: ResourceFilters = {}, page = 1) {
    return listingHref(basePath, { ...filters, query, ...patch }, page);
  }
  function reset() { router.push(basePath); }
  function submit(event: FormEvent) {
    event.preventDefault();
    router.push(filterHref());
  }
  function retry() {
    setError(false);
    void loadResourceCatalog().then(setPrivateCatalog).catch(() => setError(true));
  }

  return (
    <main className="dashboard-page resources-page">
      <PageHeading
        title="让零散的知识，连成体系"
        description="从基础到进阶，从网络到 AI。在阅读、实践与复习之间，构建自己的知识体系。"
        label={title}
        action={
          <Link href="/today" className="outline-button">
            我的学习计划
            <ArrowRight size={14} />
          </Link>
        }
      />
      <header className="library-introduction">
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      <nav className="library-topic-links" aria-label="学习方向">
        {topicCategories.map((topic) => (
          <Link href={categoryHref(topic.category)} key={topic.slug} aria-current={category === topic.category ? "page" : undefined}>{topic.title}</Link>
        ))}
      </nav>
      <section className="resource-summary-grid" aria-label="知识库概览">
        {[
          {
            label: "知识点",
            value: resourceSummary.total.toLocaleString("en-US"),
            detail: "原理解析与代码实践",
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
            label: "我的收藏",
            value: savedCount,
            detail: "留给下一次深入阅读",
            icon: BookOpen,
            tone: "teal",
          },
          {
            label: "我的知识积累",
            value: masteredCount,
            detail: `已收藏 ${savedCount} 个知识点`,
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
      <nav className="resource-category-menu" aria-label="知识栏目">
        <div className="resource-main-categories">
          <Link
            href="/library"
            className={collection === "all" ? "is-active" : ""}
            prefetch={false}
          >
            全部
          </Link>
          {resourceCollections
            .filter((item) => item.group === "学习专栏")
            .map((item) => (
              <Link
                href={collectionHref(item.id)}
                className={collection === item.id ? "is-active" : ""}
                aria-current={collection === item.id ? "page" : undefined}
                prefetch={false}
                key={item.id}
              >
                {item.title}
              </Link>
            ))}
        </div>
        <div className="resource-dropdown-menus" ref={dropdownMenus}>
          {resourceGroups
            .filter((group) => group !== "学习专栏")
            .map((group) => (
              <details
                className="resource-category-dropdown"
                name="knowledge-collection-dropdown"
                key={group}
              >
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
                        href={collectionHref(item.id)}
                        prefetch={false}
                        className={collection === item.id ? "is-active" : ""}
                        onClick={(event) =>
                          event.currentTarget.closest("details")?.removeAttribute("open")
                        }
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
      <section className="panel resource-filter" aria-label="筛选知识点">
        <form className="resource-search-form" action={basePath} method="get" onSubmit={submit}>
          {basePath.startsWith("/library/") && category && <input type="hidden" name="category" value={category} />}
          <SearchInput className="filter-search min-w-0 flex-1" name="q" label="搜索知识点"
            placeholder="搜索事件循环、HTTP、MCP、Agent…" value={query} onValueChange={setQuery}
            onClear={() => router.push(filterHref({ query: "" }))} />
          <button type="submit" className="outline-button">
            搜索
          </button>
          <Select name="status" label="学习状态" value={status} options={statuses}
            onValueChange={(value) => router.push(filterHref({ status: value as ResourceStatus }))} />
        </form>
        {(query || category || collection !== "all" || status !== "all") && (
          <button className="resource-reset mt-3" onClick={reset}>
            <RefreshCw size={12} />
            重置筛选
          </button>
        )}
      </section>
      <div className="resource-results-heading">
        <div>
          <p>
            {currentCollection?.title ??
              (category ? `${category}知识点` : "全部知识点")}
            <span>{total.toLocaleString("en-US")} 条</span>
          </p>
          <small>
            {currentCollection?.description ?? "每一次理解，都让知识更进一步。"}
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
              aria-label="卡片视图"
              aria-pressed={!list}
              className={!list ? "is-active" : ""}
              onClick={() => setList(false)}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              aria-label="列表视图"
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
          <span>完整目录暂时无法加载，已保留可用内容。</span>
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
            {ready ? "没有找到匹配的知识点" : "正在查找完整目录"}
          </h2>
          <p className="mb-6 mt-2 text-sm text-muted">
            {ready
              ? "换个关键词，或调整栏目和学习状态。"
              : "目录加载后会显示全部搜索结果。"}
          </p>
          {ready && (
            <button className="solid-button" onClick={reset}>
              查看全部知识点
            </button>
          )}
        </section>
      )}
      {total > pageSize && (
        <nav className="resource-pagination" aria-label="知识点分页">
          <span>
            第 {safePage} / {pages} 页 · 每页 {pageSize} 条
          </span>
          <div>
            {safePage > 1 && <Link className="outline-button" href={filterHref({}, safePage - 1)} prefetch={false} aria-label="上一页"><ChevronLeft size={15} />上一页</Link>}
            <span className="pagination-current" aria-current="page">{safePage}</span>
            {safePage < pages && <Link className="outline-button" href={filterHref({}, safePage + 1)} prefetch={false} aria-label="下一页">下一页<ChevronRight size={15} /></Link>}
          </div>
        </nav>
      )}
    </main>
  );
}

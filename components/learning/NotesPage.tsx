"use client";

import { useRef, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  Braces,
  Columns2,
  Download,
  Eye,
  FileCode2,
  FileText,
  FileUp,
  NotebookPen,
  Plus,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import { articles } from "@/lib/interview/data";
import { useLearningStore } from "@/lib/learning/store";
import { markdownGuide } from "@/lib/markdown/example";
import {
  downloadMarkdown,
  getMarkdownHeadings,
  markdownTitle,
} from "@/lib/markdown/utils";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import { Modal } from "@/components/ui/Modal";
import { PageHeading, PageSkeleton } from "./PageHeading";
import { useResourceStore } from "@/lib/resources/store";
import { knowledgeHref } from "@/lib/resources/links";
import { articleHref } from "@/lib/interview/data";

export function NotesPage() {
  const params = useSearchParams();
  const hydrated = useLearningStore((state) => state.hydrated);
  const resourcesHydrated = useResourceStore((state) => state.hydrated);
  if (!hydrated || !resourcesHydrated) return <PageSkeleton />;
  return (
    <NotesContent
      key={params.toString()}
      selectedId={
        params.get("document") ??
        (params.get("resource")
          ? `resource:${params.get("resource")}`
          : params.get("article")
            ? `article:${params.get("article")}`
            : "guide")
      }
    />
  );
}

function NotesContent({ selectedId }: { selectedId: string }) {
  const router = useRouter();
  const resourceRecords = useResourceStore((state) => state.records);
  const setResourceNote = useResourceStore((state) => state.setNote);
  const resourceRecord = selectedId.startsWith("resource:")
    ? resourceRecords[selectedId.slice(9)]
    : undefined;
  const { documents, notes, saveDocument, deleteDocument, setNote, notify } =
    useLearningStore();
  const fileInput = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"preview" | "edit" | "split">("preview");
  const [deletePending, setDeletePending] = useState(false);
  const articleSlug = selectedId.startsWith("article:")
    ? selectedId.slice(8)
    : "";
  const article = articles.find((item) => item.slug === articleSlug);
  const document = documents.find((item) => item.id === selectedId);
  const isGuide = !article && !document && !resourceRecord;
  const original =
    document?.content ??
    resourceRecord?.note ??
    (article
      ? (notes[article.slug] ?? `# ${article.topic} 学习笔记\n\n`)
      : markdownGuide);
  const [draft, setDraft] = useState(original);
  const title = markdownTitle(
    draft,
    document?.title ??
      resourceRecord?.resource.title ??
      article?.title ??
      "Markdown 使用指南",
  );
  const dirty = draft !== original;
  const allNotes = [
    {
      id: "guide",
      title: "Markdown 使用指南",
      kind: "guide",
      content: markdownGuide,
    },
    ...documents.map((item) => ({ ...item, kind: "document" })),
    ...Object.values(resourceRecords)
      .filter((item) => item.note.trim() || item === resourceRecord)
      .map((item) => ({
        id: `resource:${item.resource.id}`,
        title: item.resource.title,
        content: item.note,
        kind: "resource",
      })),
    ...articles
      .filter((item) => notes[item.slug]?.trim() || item.slug === articleSlug)
      .map((item) => ({
        id: `article:${item.slug}`,
        title: `${item.topic} 学习笔记`,
        content: notes[item.slug] ?? "",
        kind: "article",
      })),
  ];
  const matches = allNotes.filter((item) =>
    `${item.title} ${item.content}`.toLowerCase().includes(query.toLowerCase()),
  );
  function select(id: string) {
    router.push(
      id === "guide"
        ? "/notes"
        : id.startsWith("resource:")
          ? `/notes?resource=${encodeURIComponent(id.slice(9))}`
          : id.startsWith("article:")
            ? `/notes?article=${id.slice(8)}`
            : `/notes?document=${encodeURIComponent(id)}`,
    );
  }
  function save() {
    if (resourceRecord) {
      setResourceNote(resourceRecord.resource, draft);
      notify("学习笔记已保存");
    } else if (article) {
      setNote(article.slug, draft);
      notify("学习笔记已保存");
    } else {
      const id = document?.id ?? crypto.randomUUID();
      saveDocument({
        id,
        title,
        content: draft,
        updatedAt: new Date().toISOString(),
      });
      if (isGuide) select(id);
      notify("Markdown 文档已保存");
    }
  }
  function createNote() {
    const id = crypto.randomUUID();
    saveDocument({
      id,
      title: "未命名笔记",
      content: "# 未命名笔记\n\n写下今天新理解的一个知识点。\n",
      updatedAt: new Date().toISOString(),
    });
    select(id);
  }
  async function importMarkdown(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    let lastId = "";
    let used = documents.reduce(
      (total, item) => total + item.content.length,
      0,
    );
    for (const file of files) {
      if (!/\.(md|markdown)$/i.test(file.name)) {
        notify("请选择 .md 或 .markdown 文件");
        continue;
      }
      if (file.size > 512 * 1024 || used + file.size > 1_500_000) {
        notify("文件过大或本地笔记空间不足，请先导出部分文档。");
        continue;
      }
      try {
        const content = await file.text();
        const id = crypto.randomUUID();
        saveDocument({
          id,
          title: markdownTitle(
            content,
            file.name.replace(/\.(md|markdown)$/i, ""),
          ),
          content,
          updatedAt: new Date().toISOString(),
        });
        lastId = id;
        used += content.length;
      } catch {
        notify(`无法读取 ${file.name}，请重试。`);
      }
    }
    if (lastId) {
      select(lastId);
      notify("Markdown 文件导入成功");
    }
  }
  function remove() {
    if (resourceRecord) setResourceNote(resourceRecord.resource, "");
    else if (document) deleteDocument(document.id);
    else if (article) setNote(article.slug, "");
    setDeletePending(false);
    router.push("/notes");
  }
  return (
    <main className="dashboard-page notes-page">
      <PageHeading
        title="让知识，留下自己的注解"
        description="记录理解，连接思考。支持 Markdown 编辑、文件导入与本地保存。"
        label="我的笔记"
        action={
          <div className="flex gap-2">
            <button
              className="outline-button"
              onClick={() => fileInput.current?.click()}
            >
              <FileUp size={15} />
              导入 .md
            </button>
            <button className="solid-button" onClick={createNote}>
              <Plus size={15} />
              新建笔记
            </button>
          </div>
        }
      />
      <input
        ref={fileInput}
        type="file"
        className="sr-only"
        accept=".md,.markdown,text/markdown"
        multiple
        onChange={(event) => void importMarkdown(event)}
        aria-label="导入 Markdown 文件"
      />
      <div className="notes-layout">
        <aside className="notes-index panel">
          <label className="notes-search flex items-center gap-2">
            <Search size={15} className="text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="查找笔记"
              aria-label="查找笔记"
            />
          </label>
          <div className="mb-3 mt-6 flex items-center justify-between text-[11px] text-muted">
            <span>我的知识笔记</span>
            <span>{allNotes.length}</span>
          </div>
          <div className="space-y-1.5">
            {matches.map((item) => (
              <button
                className={`note-index-item ${selectedId === item.id || (isGuide && item.id === "guide") ? "is-active" : ""}`}
                key={item.id}
                onClick={() => select(item.id)}
              >
                {item.kind === "article" ? (
                  <NotebookPen size={17} />
                ) : item.kind === "guide" ? (
                  <Braces size={17} />
                ) : (
                  <FileText size={17} />
                )}
                <span>
                  <strong>{item.title}</strong>
                  <span>
                    {item.kind === "guide"
                      ? "从这里开始 · Markdown"
                      : item.kind === "article"
                        ? "题目笔记"
                        : item.kind === "resource"
                          ? "学习笔记"
                          : "Markdown 文档"}
                  </span>
                </span>
              </button>
            ))}
            {!matches.length && (
              <p className="py-5 text-center text-xs text-muted">
                没有找到相关笔记
              </p>
            )}
          </div>
          <div className="notes-index-tip">
            <FileCode2 size={21} className="mb-3 text-brand" />
            <h2 className="mb-2 text-xs font-medium">你的知识，自由组织</h2>
            <p className="text-[11px] leading-6 text-muted">
              支持标题、表格、引用、任务列表和代码高亮。导入的文档仅保存在当前浏览器中。
            </p>
            <button
              className="subtle-link mt-3 inline-flex text-xs"
              onClick={() => fileInput.current?.click()}
            >
              导入 Markdown
              <ArrowUpRight size={12} />
            </button>
          </div>
        </aside>
        <section className="note-document min-w-0">
          <div className="note-document-heading">
            <div className="flex min-w-0 items-center gap-3">
              <span className="document-type">MD</span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold">{title}</h2>
                <p className="mt-1 truncate text-[11px] text-muted">
                  {isGuide
                    ? "支持标准 Markdown 与 GFM 语法"
                    : dirty
                      ? "有尚未保存的修改"
                      : "已保存在当前浏览器"}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                className="icon-button text-muted"
                aria-label="导出 Markdown 文档"
                title="导出 Markdown"
                onClick={() => downloadMarkdown(title, draft)}
              >
                <Download size={17} />
              </button>
              {!isGuide && (
                <button
                  className="icon-button text-muted"
                  aria-label="删除当前笔记"
                  onClick={() => setDeletePending(true)}
                >
                  <Trash2 size={16} />
                </button>
              )}
              <button
                className="outline-button save-note-button"
                disabled={!dirty && !isGuide}
                onClick={save}
              >
                <Save size={14} />
                {isGuide ? "保存副本" : "保存"}
              </button>
            </div>
          </div>
          <div className="note-view-toolbar">
            <div className="note-view-tabs">
              {[
                { id: "preview", label: "阅读预览", icon: Eye },
                { id: "edit", label: "Markdown", icon: Braces },
                { id: "split", label: "分屏", icon: Columns2 },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  aria-pressed={mode === id}
                  className={mode === id ? "is-active" : ""}
                  onClick={() => setMode(id as typeof mode)}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
            <span className="hidden text-[11px] text-muted sm:block">
              {draft.length.toLocaleString()} 字符
              <span className="mx-2">·</span>
              {getMarkdownHeadings(draft).length} 个标题
            </span>
          </div>
          <div
            className={`note-editor-body ${mode === "split" ? "is-split" : ""}`}
          >
            {mode !== "preview" && (
              <textarea
                className="markdown-editor"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                aria-label="Markdown 编辑器"
                spellCheck={false}
                placeholder="# 从一个想法开始\n\n在这里使用 Markdown 编写你的笔记…"
              />
            )}
            {mode !== "edit" && (
              <div className="note-preview-body">
                <MarkdownRenderer
                  headingOffset={1}
                  content={draft || "*这里会实时显示你的 Markdown 内容。*"}
                />
              </div>
            )}
          </div>
          <footer className="note-status">
            {resourceRecord && (
              <a
                href={knowledgeHref(resourceRecord.resource)}
                className="subtle-link"
              >
                阅读正文
                <ArrowUpRight size={12} />
              </a>
            )}
            <span className="flex items-center gap-1.5">
              <span className={`save-indicator ${dirty ? "is-dirty" : ""}`} />
              {dirty ? "尚未保存 · 点击保存保留修改" : "Markdown 已就绪"}
            </span>
            {article && (
              <Link
                href={articleHrefForNote(article.slug)}
                className="subtle-link"
              >
                查看原题
                <ArrowUpRight size={12} />
              </Link>
            )}
          </footer>
        </section>
      </div>
      {deletePending && (
        <Modal title="删除这篇笔记？" onClose={() => setDeletePending(false)}>
          <p className="mb-2 text-sm font-medium">{title}</p>
          <p className="mb-6 text-sm leading-7 text-muted">
            删除后无法恢复。需要保留内容的话，请先导出 Markdown 文件。
          </p>
          <div className="flex justify-end gap-3">
            <button
              className="outline-button"
              onClick={() => setDeletePending(false)}
            >
              保留笔记
            </button>
            <button className="danger-button" onClick={remove}>
              <Trash2 size={14} />
              确认删除
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
}
function articleHrefForNote(slug: string) {
  return articleHref(slug);
}

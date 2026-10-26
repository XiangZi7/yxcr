"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Star,
  Plus,
  NotebookPen,
  Save,
  Eye,
  Braces,
} from "lucide-react";
import type { LearningResource } from "@/lib/resources/types";
import {
  getResourceCollection,
  getResourceSource,
} from "@/lib/resources/config";
import { useResourceStore } from "@/lib/resources/store";
import { useLearningStore } from "@/lib/learning/store";
import { Modal } from "@/components/ui/Modal";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import { ResourceIcon } from "./ResourceIcon";

export function ResourceCard({
  resource,
  list = false,
}: {
  resource: LearningResource;
  list?: boolean;
}) {
  const progress = useResourceStore((state) => state.records[resource.id]);
  const { toggleSaved, toggleMastered, togglePlan } = useResourceStore();
  const [editing, setEditing] = useState(false);
  const collection = getResourceCollection(resource.collection);
  const source = getResourceSource(resource.source);
  return (
    <article
      className={`resource-card ${list ? "resource-card-list" : ""} ${progress?.mastered ? "is-mastered" : ""}`}
    >
      <div className="resource-card-top">
        <span className={`resource-source-dot source-${resource.source}`} />
        <span>{source?.name}</span>
        {resource.featured && <span className="resource-featured">推荐</span>}
        <button
          className={`icon-button ml-auto ${progress?.saved ? "text-brand" : "text-muted"}`}
          onClick={() => toggleSaved(resource)}
          aria-label={`${progress?.saved ? "取消收藏资源" : "收藏资源"}：${resource.title}`}
          aria-pressed={progress?.saved ?? false}
        >
          <Star size={16} fill={progress?.saved ? "currentColor" : "none"} />
        </button>
      </div>
      <a
        className="resource-title"
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>{resource.title}</h2>
        <ArrowUpRight size={16} />
      </a>
      <p className="resource-card-context">
        <ResourceIcon name={collection?.icon ?? "book"} size={13} />
        <span>{collection?.title}</span>
        <span className="text-line">/</span>
        <span className="truncate">{resource.section}</span>
      </p>
      <div className="resource-card-bottom">
        <span className="resource-kind">
          {resource.kind === "knowledge"
            ? "知识点"
            : resource.kind === "collection"
              ? "专题入口"
              : "学习文档"}
        </span>
        <div className="flex items-center gap-1">
          <button
            className={`resource-action ${progress?.inPlan ? "is-active" : ""}`}
            onClick={() => togglePlan(resource)}
            aria-label={`${progress?.inPlan ? "移出资源计划" : "加入资源计划"}：${resource.title}`}
            aria-pressed={progress?.inPlan ?? false}
          >
            <Plus size={14} />
            <span>{progress?.inPlan ? "已加入" : "计划"}</span>
          </button>
          <button
            className={`resource-action ${progress?.note ? "is-active" : ""}`}
            onClick={() => setEditing(true)}
            aria-label={`资源笔记：${resource.title}`}
          >
            <NotebookPen size={14} />
            <span>笔记</span>
          </button>
          <button
            className={`resource-action ${progress?.mastered ? "is-complete" : ""}`}
            onClick={() => toggleMastered(resource)}
            aria-label={`${progress?.mastered ? "标记资源未掌握" : "标记资源已掌握"}：${resource.title}`}
            aria-pressed={progress?.mastered ?? false}
          >
            <Check size={14} />
            <span>{progress?.mastered ? "已掌握" : "掌握"}</span>
          </button>
        </div>
      </div>
      {editing && (
        <ResourceNoteDialog
          resource={resource}
          onClose={() => setEditing(false)}
        />
      )}
    </article>
  );
}

export function ResourceNoteDialog({
  resource,
  onClose,
}: {
  resource: LearningResource;
  onClose: () => void;
}) {
  const existing = useResourceStore(
    (state) => state.records[resource.id]?.note ?? "",
  );
  const setNote = useResourceStore((state) => state.setNote);
  const [draft, setDraft] = useState(existing);
  const [preview, setPreview] = useState(false);
  return (
    <Modal title="资源学习笔记" onClose={onClose}>
      <p className="mb-4 text-sm font-medium leading-6">{resource.title}</p>
      <div className="mb-3 flex items-center justify-between">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="subtle-link text-xs"
        >
          阅读原文
          <ArrowUpRight size={12} />
        </a>
        <button
          className="subtle-link text-xs"
          onClick={() => setPreview(!preview)}
        >
          {preview ? <Braces size={13} /> : <Eye size={13} />}
          {preview ? "编辑 Markdown" : "预览"}
        </button>
      </div>
      {preview ? (
        <div className="resource-note-preview">
          <MarkdownRenderer
            headingOffset={1}
            content={draft || "*先写下一点自己的理解。*"}
          />
        </div>
      ) : (
        <textarea
          className="resource-note-input"
          aria-label="资源 Markdown 笔记"
          maxLength={50000}
          placeholder="用自己的语言记录理解，支持 Markdown…"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
      )}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/notes?resource=${resource.id}`}
          className="text-xs text-muted hover:text-brand"
          onClick={() => {
            setNote(resource, draft || `# ${resource.title}\n\n`);
            onClose();
          }}
        >
          保存并打开完整编辑器
        </Link>
        <button
          className="solid-button"
          onClick={() => {
            setNote(resource, draft);
            useLearningStore.getState().notify("资源笔记已保存");
            onClose();
          }}
        >
          <Save size={14} />
          保存笔记
        </button>
      </div>
    </Modal>
  );
}

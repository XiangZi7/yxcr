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
} from "@/lib/resources/config";
import { useKnowledgeProgress } from "@/lib/resources/progress";
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
  const progress = useKnowledgeProgress(resource);
  const { toggleSaved, toggleMastered, togglePlan } = progress;
  const [editing, setEditing] = useState(false);
  const collection = getResourceCollection(resource.collection);
  return (
    <article
      className={`resource-card ${list ? "resource-card-list" : ""} ${progress?.mastered ? "is-mastered" : ""}`}
    >
      <div className="resource-card-top">
        <ResourceIcon name={collection?.icon ?? "book"} size={14} />
        <span>{resource.section}</span>
        {resource.featured && <span className="resource-featured">推荐</span>}
        <button
          className={`icon-button ml-auto ${progress?.saved ? "text-brand" : "text-muted"}`}
          onClick={() => toggleSaved()}
          aria-label={`${progress?.saved ? "取消收藏知识点" : "收藏知识点"}：${resource.title}`}
          aria-pressed={progress?.saved ?? false}
        >
          <Star size={16} fill={progress?.saved ? "currentColor" : "none"} />
        </button>
      </div>
      <Link
        className="resource-title"
        href={`/questions/${resource.originalSlug ?? resource.id}`}
      >
        <h2>{resource.title}</h2>
        <ArrowUpRight size={16} />
      </Link>
      {resource.description && <p className="knowledge-excerpt">{resource.description}</p>}
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
              ? "学习专题"
              : "学习文档"}
        </span>
        <div className="flex items-center gap-1">
          <button
            className={`resource-action ${progress?.inPlan ? "is-active" : ""}`}
            onClick={() => togglePlan()}
            aria-label={`${progress?.inPlan ? "移出学习计划" : "加入学习计划"}：${resource.title}`}
            aria-pressed={progress?.inPlan ?? false}
          >
            <Plus size={14} />
            <span>{progress?.inPlan ? "已加入" : "计划"}</span>
          </button>
          <button
            className={`resource-action ${progress?.note ? "is-active" : ""}`}
            onClick={() => setEditing(true)}
            aria-label={`学习笔记：${resource.title}`}
          >
            <NotebookPen size={14} />
            <span>笔记</span>
          </button>
          <button
            className={`resource-action ${progress?.mastered ? "is-complete" : ""}`}
            onClick={() => toggleMastered()}
            aria-label={`${progress?.mastered ? "标记知识点未掌握" : "标记知识点已掌握"}：${resource.title}`}
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
  const { note: existing, setNote } = useKnowledgeProgress(resource);
  const [draft, setDraft] = useState(existing);
  const [preview, setPreview] = useState(false);
  return (
    <Modal title="学习笔记" onClose={onClose}>
      <p className="mb-4 text-sm font-medium leading-6">{resource.title}</p>
      <div className="mb-3 flex items-center justify-between">
        <Link
          href={`/questions/${resource.originalSlug ?? resource.id}`}
          className="subtle-link text-xs"
        >
          阅读正文
          <ArrowUpRight size={12} />
        </Link>
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
          aria-label="Markdown 笔记"
          maxLength={50000}
          placeholder="用自己的语言记录理解，支持 Markdown…"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
      )}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Link
          href={resource.originalSlug ? `/notes?article=${resource.originalSlug}` : `/notes?resource=${resource.id}`}
          className="text-xs text-muted hover:text-brand"
          onClick={() => {
            setNote( draft || `# ${resource.title}\n\n`);
            onClose();
          }}
        >
          保存并打开完整编辑器
        </Link>
        <button
          className="solid-button"
          onClick={() => {
            setNote( draft);
            useLearningStore.getState().notify("学习笔记已保存");
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

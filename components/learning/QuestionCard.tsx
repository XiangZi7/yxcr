"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Flame,
  Star,
  CircleAlert,
} from "lucide-react";
import { BrandIcon } from "@/components/interview/BrandIcon";
import { articleHref } from "@/lib/interview/data";
import type { Article } from "@/lib/interview/types";
import { useLearningStore } from "@/lib/learning/store";

export function QuestionCard({
  article,
  list = false,
}: {
  article: Article;
  list?: boolean;
}) {
  const saved = useLearningStore((state) => state.saved.includes(article.slug));
  const mastered = useLearningStore((state) =>
    state.mastered.includes(article.slug),
  );
  const mistake = useLearningStore((state) =>
    state.mistakes.includes(article.slug),
  );
  const toggleSaved = useLearningStore((state) => state.toggleSaved);
  const toggleMistake = useLearningStore((state) => state.toggleMistake);
  return (
    <article className={`question-card ${list ? "question-card-list" : ""}`}>
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs text-muted">
          <span className="topic-symbol">
            <BrandIcon name={article.topic} />
          </span>
          {article.category} <span className="text-line">/</span>{" "}
          {article.topic}
        </span>
        <div className="flex items-center gap-1">
          <button
            className={`icon-button ${mistake ? "text-amber-500" : "text-muted"}`}
            aria-label={`${mistake ? "移出" : "加入"}错题本：${article.title}`}
            onClick={() => toggleMistake(article.slug)}
          >
            <CircleAlert size={15} />
          </button>
          <button
            className={`icon-button ${saved ? "text-brand" : "text-muted"}`}
            aria-label={`${saved ? "取消收藏" : "收藏"}：${article.title}`}
            aria-pressed={saved}
            onClick={() => toggleSaved(article.slug)}
          >
            <Star size={16} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      <Link
        href={articleHref(article.slug)}
        className="question-card-title group"
      >
        <h2 className="text-base font-semibold leading-7 transition-colors group-hover:text-brand">
          {article.title}
        </h2>
        <ArrowUpRight
          size={16}
          className="shrink-0 text-muted transition-colors group-hover:text-brand"
        />
      </Link>
      <p className="question-excerpt mt-2 text-[13px] leading-6 text-muted">
        {article.introduction}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {article.tags.slice(1, 4).map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-3.5 text-xs text-muted">
        <span className="flex items-center gap-3">
          <span className="difficulty-dot">中等</span>
          <span className="flex items-center gap-1">
            <Flame size={12} />
            高频
          </span>
        </span>
        {mastered ? (
          <span className="flex items-center gap-1 text-emerald-600">
            <Check size={13} />
            已掌握
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Clock3 size={12} />8 分钟
          </span>
        )}
      </div>
    </article>
  );
}

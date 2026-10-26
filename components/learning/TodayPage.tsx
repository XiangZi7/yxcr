"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronRight,
  Circle,
  Clock3,
  Plus,
  Settings2,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { articles, articleHref } from "@/lib/interview/data";
import { dayKey, useLearningStore } from "@/lib/learning/store";
import { BrandIcon } from "@/components/interview/BrandIcon";
import { Modal } from "@/components/ui/Modal";
import { PageHeading } from "./PageHeading";

export function TodayPage() {
  const {
    plan,
    mastered,
    dailyGoal,
    setDailyGoal,
    activity,
    hydrated,
    togglePlan,
    toggleMastered,
  } = useLearningStore();
  const [modal, setModal] = useState<"goal" | "add" | null>(null);
  const today = hydrated ? dayKey() : "";
  const todayCount = activity[today]?.length ?? 0;
  const planned = articles.filter((article) => plan.includes(article.slug));
  const done = planned.filter((article) =>
    mastered.includes(article.slug),
  ).length;
  const next = planned.find((article) => !mastered.includes(article.slug));
  return (
    <main className="dashboard-page">
      <PageHeading
        title="今天，也前进一点点"
        description="不用急着学完所有知识。做好眼前这一小步，就很好。"
        label="今日学习"
        action={
          <button className="outline-button" onClick={() => setModal("goal")}>
            <Settings2 size={15} />
            调整学习目标
          </button>
        }
      />
      <div className="dashboard-columns">
        <div className="min-w-0 space-y-6">
          <section className="daily-summary">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <span className="hero-eyebrow">
                  <CalendarDays size={14} />
                  {today || "今日学习计划"}
                </span>
                <h2 className="mb-2 mt-5 text-2xl font-semibold">
                  给今天一个小小的目标
                </h2>
                <p className="text-sm text-secondary">
                  每天 {dailyGoal} 道题，约 {dailyGoal * 8}{" "}
                  分钟，积累看得见的成长。
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {next ? (
                    <Link
                      href={articleHref(next.slug)}
                      className="solid-button"
                    >
                      开始今日学习
                      <ArrowRight size={15} />
                    </Link>
                  ) : (
                    <Link href="/library" className="solid-button">
                      探索更多知识
                      <ArrowRight size={15} />
                    </Link>
                  )}
                  <button
                    className="outline-button"
                    onClick={() => setModal("add")}
                  >
                    <Plus size={15} />
                    添加题目
                  </button>
                </div>
              </div>
              <div className="daily-count">
                <strong>
                  {todayCount}
                  <span> / {dailyGoal}</span>
                </strong>
                <span>今日已掌握</span>
                <div className="progress-track mt-4">
                  <div
                    style={{
                      width: `${Math.min((todayCount / dailyGoal) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="panel">
            <div className="section-heading">
              <div>
                <h2>我的学习清单</h2>
                <p>先理解，再表达。勾选已学会的知识，记录今天的进步。</p>
              </div>
              <span className="tag tag-blue">
                {done} / {planned.length} 已掌握
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {planned.map((article, index) => {
                const completed = mastered.includes(article.slug);
                return (
                  <article
                    className={`plan-row ${completed ? "is-completed" : ""}`}
                    key={article.slug}
                  >
                    <button
                      className="completion-button"
                      onClick={() => toggleMastered(article.slug)}
                      aria-label={`${completed ? "标记未掌握" : "标记已掌握"}：${article.title}`}
                      aria-pressed={completed}
                    >
                      {completed ? <Check size={16} /> : <Circle size={19} />}
                    </button>
                    <span className="min-w-0 flex-1">
                      <span className="mb-1 block text-[11px] text-muted">
                        学习任务 0{index + 1}
                      </span>
                      <Link
                        href={articleHref(article.slug)}
                        className="block text-sm font-medium leading-6 hover:text-brand"
                      >
                        {article.title}
                      </Link>
                      <span className="mt-1.5 flex items-center gap-3 text-xs text-muted">
                        <span className="flex items-center gap-1.5">
                          <BrandIcon name={article.topic} />
                          {article.topic}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock3 size={12} />8 分钟
                        </span>
                      </span>
                    </span>
                    <Link
                      href={articleHref(article.slug)}
                      className="plan-start"
                    >
                      {completed ? "再复习" : "去学习"}
                      <ChevronRight size={14} />
                    </Link>
                    <button
                      className="icon-button text-muted"
                      aria-label={`移出计划：${article.title}`}
                      onClick={() => togglePlan(article.slug)}
                    >
                      <X size={14} />
                    </button>
                  </article>
                );
              })}
              {!planned.length && (
                <div className="py-12 text-center">
                  <BookOpen size={30} className="mx-auto mb-4 text-muted" />
                  <h3 className="font-medium">给今天安排一点新知识</h3>
                  <p className="mb-5 mt-2 text-sm text-muted">
                    从题库挑选几道感兴趣的题目，开始你的学习计划。
                  </p>
                  <button
                    className="outline-button"
                    onClick={() => setModal("add")}
                  >
                    <Plus size={15} />
                    添加学习任务
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
        <aside className="space-y-5">
          <section className="panel">
            <div className="section-heading">
              <h2>今日小结</h2>
              <CheckCheck size={18} className="text-brand" />
            </div>
            <div className="mt-5 space-y-5">
              {[
                { label: "已掌握", value: `${todayCount} 题`, icon: Check },
                {
                  label: "计划完成",
                  value: `${done} / ${planned.length}`,
                  icon: Target,
                },
                {
                  label: "预计学习时长",
                  value: `${planned.filter((article) => !mastered.includes(article.slug)).length * 8} 分钟`,
                  icon: Clock3,
                },
              ].map(({ label, value, icon: Icon }) => (
                <div
                  className="flex items-center justify-between text-sm"
                  key={label}
                >
                  <span className="flex items-center gap-2 text-muted">
                    <Icon size={15} />
                    {label}
                  </span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="panel study-tip">
            <Sparkles size={20} className="text-brand" />
            <h2 className="mb-2 mt-4 text-base font-semibold">
              试着讲给别人听
            </h2>
            <p className="text-[13px] leading-7 text-secondary">
              读懂一道题后，合上答案，试着用自己的语言解释一遍。能讲清楚，才算真正理解。
            </p>
            <Link className="subtle-link mt-5 inline-flex" href="/practice">
              去练习表达
              <ArrowRight size={14} />
            </Link>
          </section>
        </aside>
      </div>
      {modal === "goal" && (
        <Modal title="设定你的每日目标" onClose={() => setModal(null)}>
          <p className="mb-5 text-sm leading-7 text-muted">
            找到适合自己的节奏。持续积累，比偶尔冲刺更重要。
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[3, 5, 8].map((value) => (
              <button
                key={value}
                onClick={() => setDailyGoal(value)}
                className={`goal-option ${dailyGoal === value ? "is-active" : ""}`}
              >
                <strong>
                  {value}
                  <small> 题</small>
                </strong>
                <span>约 {value * 8} 分钟</span>
              </button>
            ))}
          </div>
          <button
            className="solid-button mt-6 w-full justify-center"
            onClick={() => setModal(null)}
          >
            保存学习目标
            <Check size={15} />
          </button>
        </Modal>
      )}
      {modal === "add" && (
        <Modal title="添加学习任务" onClose={() => setModal(null)}>
          <p className="mb-4 text-sm text-muted">
            选择想要学习的知识，添加后即可开始。
          </p>
          <div className="max-h-[55dvh] space-y-2 overflow-y-auto">
            {articles.map((article) => (
              <button
                key={article.slug}
                className="question-row flex w-full items-center gap-3 text-left"
                onClick={() => togglePlan(article.slug)}
              >
                <BrandIcon name={article.topic} />
                <span className="min-w-0 flex-1 text-sm">{article.title}</span>
                {plan.includes(article.slug) ? (
                  <Check size={17} className="text-brand" />
                ) : (
                  <Plus size={17} className="text-muted" />
                )}
              </button>
            ))}
          </div>
          <button
            className="solid-button mt-5 w-full justify-center"
            onClick={() => setModal(null)}
          >
            完成
          </button>
        </Modal>
      )}
    </main>
  );
}

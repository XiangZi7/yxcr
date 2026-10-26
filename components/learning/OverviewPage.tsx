"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronRight,
  Flame,
  GraduationCap,
  NotebookPen,
  Sparkles,
  Star,
  Target,
} from "lucide-react";
import { motion } from "motion/react";
import { articles, articleHref, navigationGroups } from "@/lib/interview/data";
import { dayKey, useLearningStore } from "@/lib/learning/store";
import { PageHeading } from "./PageHeading";
import { BrandIcon } from "@/components/interview/BrandIcon";
import { useResourceStore } from "@/lib/resources/store";
import { resourceSummary } from "@/lib/resources/config";

export function OverviewPage() {
  const {
    mastered,
    saved,
    notes,
    documents,
    activity,
    dailyGoal,
    plan,
    displayName,
    hydrated,
  } = useLearningStore();
  const resourceRecords = useResourceStore((state) => state.records);
  const resourceActivity = useResourceStore((state) => state.activity);
  const resourceValues = Object.values(resourceRecords);
  const today = hydrated ? dayKey() : "";
  const learnedToday =
    (activity[today]?.length ?? 0) + (resourceActivity[today]?.length ?? 0);
  const learnedOnDay = (date: string) =>
    (activity[date]?.length ?? 0) + (resourceActivity[date]?.length ?? 0);
  const progress = Math.round((mastered.length / articles.length) * 100);
  const recommendations = [
    ...articles.filter(
      (article) =>
        plan.includes(article.slug) && !mastered.includes(article.slug),
    ),
    ...articles.filter(
      (article) =>
        !plan.includes(article.slug) && !mastered.includes(article.slug),
    ),
  ].slice(0, 3);
  const week = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(`${today || "2026-10-26"}T12:00:00+08:00`);
    date.setUTCDate(date.getUTCDate() - 6 + index);
    return {
      date: dayKey(date),
      label: `${date.getUTCMonth() + 1}/${date.getUTCDate()}`,
    };
  });
  const stats = [
    {
      label: "累计掌握",
      value:
        mastered.length + resourceValues.filter((item) => item.mastered).length,
      unit: "项",
      detail: `${articles.length} 道题目 · ${resourceSummary.total.toLocaleString("en-US")} 条资源`,
      icon: GraduationCap,
      color: "blue",
    },
    {
      label: "今日学习",
      value: learnedToday,
      unit: "题",
      detail: `每日目标 ${dailyGoal} 题`,
      icon: CheckCheck,
      color: "teal",
    },
    {
      label: "我的收藏",
      value: saved.length + resourceValues.filter((item) => item.saved).length,
      unit: "项",
      detail: "留给下一次认真复习",
      icon: Star,
      color: "violet",
    },
    {
      label: "学习笔记",
      value:
        Object.values(notes).filter((value) => value.trim()).length +
        documents.length +
        resourceValues.filter((item) => item.note.trim()).length,
      unit: "篇",
      detail: "用自己的语言理解知识",
      icon: NotebookPen,
      color: "orange",
    },
  ];
  return (
    <main className="dashboard-page">
      <PageHeading
        title={`你好，${displayName}`}
        description="保持好奇，慢慢积累。今天也向理想的 offer 走近一点。"
        label="学习概览"
        action={
          <Link href="/today" className="outline-button">
            <CalendarDays size={15} />
            今日计划
            <ChevronRight size={14} />
          </Link>
        }
      />
      <section className="overview-hero relative overflow-hidden">
        <div className="relative z-10">
          <span className="hero-eyebrow">
            <Sparkles size={14} />
            每天进步一点点
          </span>
          <h2 className="mt-5 text-[27px] font-semibold leading-[1.5] tracking-tight">
            让每一次准备，
            <br />
            都成为你的底气。
          </h2>
          <p className="mb-6 mt-3 text-sm leading-7 text-secondary">
            从一个知识点开始，建立属于自己的面试知识体系。
          </p>
          <Link
            href={articleHref(recommendations[0]?.slug ?? "vue-3")}
            className="solid-button"
          >
            继续学习
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/library"
            className="ml-5 inline-flex items-center gap-1 text-sm text-secondary hover:text-brand"
          >
            探索全部题库
            <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="hero-illustration" aria-hidden="true">
          <div className="illustration-orbit orbit-one" />
          <div className="illustration-orbit orbit-two" />
          <motion.div
            className="floating-book"
            initial={{ y: 5 }}
            animate={{ y: 0 }}
          >
            <BookOpen size={69} strokeWidth={1.2} />
            <span className="book-spark">
              <Sparkles size={24} />
            </span>
          </motion.div>
          <span className="floating-chip chip-vue">
            <BrandIcon name="Vue 3" />
            响应式原理
          </span>
          <span className="floating-chip chip-check">
            <Check size={14} />
            又掌握了一个知识点
          </span>
          <span className="floating-chip chip-code">
            &lt;/&gt; &nbsp; Learn. Build. Grow.
          </span>
        </div>
      </section>
      <div className="my-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map(({ label, value, unit, detail, icon: Icon, color }) => (
          <section className="metric-card" key={label}>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-secondary">{label}</span>
              <span className={`metric-icon ${color}`}>
                <Icon size={18} />
              </span>
            </div>
            <div className="mb-2 mt-3 flex items-baseline gap-2">
              <strong className="text-[30px] font-semibold tracking-tight">
                {value}
              </strong>
              <span className="text-xs text-muted">{unit}</span>
            </div>
            <p className="text-xs text-muted">{detail}</p>
          </section>
        ))}
      </div>
      <div className="dashboard-columns">
        <div className="min-w-0 space-y-5">
          <section className="panel">
            <div className="section-heading">
              <div>
                <h2>今天，从这里开始</h2>
                <p>为你整理的下一步，学懂比刷完更重要。</p>
              </div>
              <Link href="/today" className="subtle-link">
                查看计划
                <ChevronRight size={14} />
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {recommendations.map((article, index) => (
                <Link
                  href={articleHref(article.slug)}
                  className="recommended-question flex items-center gap-4"
                  key={article.slug}
                >
                  <span className="recommendation-index">0{index + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="mb-1 block text-sm font-medium">
                      {article.title}
                    </span>
                    <span className="text-xs text-muted">
                      {article.topic} <span className="mx-2">·</span>中等
                      <span className="mx-2">·</span>约 8 分钟
                    </span>
                  </span>
                  <ChevronRight size={16} className="text-muted" />
                </Link>
              ))}
            </div>
          </section>
          <section className="panel">
            <div className="section-heading">
              <div>
                <h2>学习轨迹</h2>
                <p>一点一滴的积累，都算数。</p>
              </div>
              <span className="rounded-md bg-line/50 px-2.5 py-1 text-xs text-muted">
                最近 7 天
              </span>
            </div>
            <div
              className="weekly-chart"
              role="img"
              aria-label={`最近七天掌握知识：${week.map((day) => `${day.label} ${learnedOnDay(day.date)}项`).join("，")}`}
            >
              {week.map((day) => {
                const count = learnedOnDay(day.date);
                return (
                  <div className="chart-day" key={day.date}>
                    <span className="text-xs text-muted">{count || ""}</span>
                    <div className="bar-track">
                      <div
                        className={`chart-bar ${day.date === today ? "is-today" : ""}`}
                        style={{
                          height: `${Math.max(4, Math.min((count / dailyGoal) * 100, 100))}%`,
                        }}
                      />
                    </div>
                    <span
                      className={`text-xs ${day.date === today ? "text-brand" : "text-muted"}`}
                    >
                      {day.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
        <div className="space-y-5">
          <section className="panel">
            <div className="section-heading">
              <h2>知识版图</h2>
              <Target size={17} className="text-muted" />
            </div>
            <div className="progress-summary">
              <svg
                viewBox="0 0 100 100"
                className="knowledge-ring"
                aria-hidden="true"
              >
                <circle cx="50" cy="50" r="42" />
                <circle
                  className="ring-fill"
                  cx="50"
                  cy="50"
                  r="42"
                  pathLength="100"
                  strokeDasharray={`${progress} 100`}
                />
              </svg>
              <span>
                <strong>
                  {progress}
                  <small>%</small>
                </strong>
                <span className="text-xs text-muted">站内题库掌握度</span>
              </span>
            </div>
            <div className="space-y-5">
              {navigationGroups.map((group) => {
                const groupArticles = articles.filter(
                  (article) => article.category === group.title,
                );
                const completed = groupArticles.filter((article) =>
                  mastered.includes(article.slug),
                ).length;
                return (
                  <Link
                    href={`/library?category=${encodeURIComponent(group.title)}`}
                    className="block"
                    key={group.title}
                  >
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2">
                        <BrandIcon name={group.icon} />
                        {group.title}
                      </span>
                      <span className="text-muted">
                        {completed} / {groupArticles.length}
                      </span>
                    </div>
                    <div className="progress-track">
                      <div
                        style={{
                          width: `${(completed / groupArticles.length) * 100}%`,
                        }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
          <section className="panel practice-promo">
            <span className="metric-icon blue">
              <Flame size={19} />
            </span>
            <h2 className="mb-2 mt-4 text-base font-semibold">
              知识会了，也要说出来
            </h2>
            <p className="text-[13px] leading-6 text-muted">
              把知识组织成清晰的表达，提前进入面试状态。
            </p>
            <Link
              href="/practice"
              className="outline-button mt-5 w-full justify-center"
            >
              开始一场模拟面试
              <ArrowRight size={14} />
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}

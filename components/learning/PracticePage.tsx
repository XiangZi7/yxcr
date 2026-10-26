"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  Bot,
  Check,
  CheckCheck,
  ChevronRight,
  Clock3,
  Eye,
  Flag,
  History,
  MessageSquareText,
  Play,
  RotateCcw,
  Settings2,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { articles, articleHref } from "@/lib/interview/data";
import { useLearningStore } from "@/lib/learning/store";
import { PageHeading } from "./PageHeading";

export function PracticePage() {
  const params = useSearchParams();
  const topic = params.get("topic");
  const topicArticle = articles.find((article) => article.slug === topic);
  const [category, setCategory] = useState(
    topicArticle?.category ?? "全部方向",
  );
  const [count, setCount] = useState(3);
  const [minutes, setMinutes] = useState(15);
  const [mode, setMode] = useState("guided");
  const [stage, setStage] = useState<"setup" | "session" | "result">("setup");
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [reference, setReference] = useState(false);
  const [remaining, setRemaining] = useState(minutes * 60);
  const startedAt = useRef(0);
  const { recordSession, sessions, toggleMistake, mistakes } =
    useLearningStore();
  const pool = articles.filter(
    (article) => category === "全部方向" || article.category === category,
  );
  const sessionArticles = questionIds.map((id) =>
    articles.find((article) => article.slug === id)!,
  );
  const current = sessionArticles[index];
  const completed = Object.values(answers).filter(
    (answer) => answer.trim().length >= 10,
  ).length;
  const willStart = Math.min(count, pool.length);
  useEffect(() => {
    if (stage !== "session") return;
    const timer = setInterval(
      () => setRemaining((value) => Math.max(0, value - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, [stage]);
  function start() {
    const sorted =
      topicArticle && pool.some((article) => article.slug === topicArticle.slug)
        ? [
            topicArticle,
            ...pool.filter((article) => article.slug !== topicArticle.slug),
          ]
        : pool;
    setQuestionIds(sorted.slice(0, count).map((article) => article.slug));
    setIndex(0);
    setAnswers({});
    setReference(false);
    setRemaining(minutes * 60);
    startedAt.current = Date.now();
    setStage("session");
  }
  function finish() {
    recordSession({
      category,
      total: questionIds.length,
      completed,
      duration: Math.max(
        1,
        Math.round((Date.now() - startedAt.current) / 60_000),
      ),
    });
    setStage("result");
  }
  return (
    <main className="dashboard-page">
      <PageHeading
        title={
          stage === "setup"
            ? "把准备，变成从容的表达"
            : stage === "result"
              ? "每一次练习，都比上一次更好"
              : "专注当下，把思路说清楚"
        }
        description={
          stage === "setup"
            ? "选择一个方向，留一点不被打扰的时间，提前进入面试状态。"
            : "先独立思考，再对照复盘。"
        }
        label="模拟面试"
        action={
          <span className="local-mode-badge">
            <span />
            本地自测模式
          </span>
        }
      />
      {stage === "setup" && (
        <div className="dashboard-columns">
          <section className="panel practice-setup">
            <div className="practice-intro flex items-center gap-4">
              <span className="practice-bot">
                <Bot size={27} />
              </span>
              <div>
                <h2 className="text-lg font-semibold">开启一场专属练习</h2>
                <p className="mt-1.5 text-[13px] text-muted">
                  独立作答 · 限时练习 · 对照复盘
                </p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="form-section-label">
                <span>01</span>选择技术方向
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {["全部方向", "前端", "后端", "AI / LLM"].map((value) => (
                  <button
                    className={`practice-category ${category === value ? "is-active" : ""}`}
                    key={value}
                    onClick={() => setCategory(value)}
                  >
                    {value}
                    {category === value && <Check size={13} />}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <label>
                <span className="form-section-label">
                  <span>02</span>练习题数
                </span>
                <select
                  className="form-control mt-3"
                  aria-label="练习题数"
                  value={count}
                  onChange={(event) => setCount(Number(event.target.value))}
                >
                  {[3, 5, 8].map((value) => (
                    <option key={value} value={value}>
                      {value} 道题
                    </option>
                  ))}
                </select>
                <span className="mt-2 block text-xs text-muted">
                  当前方向共 {pool.length} 题，本次将练习 {willStart} 题
                </span>
              </label>
              <label>
                <span className="form-section-label">
                  <span>03</span>练习时长
                </span>
                <select
                  className="form-control mt-3"
                  aria-label="练习时长"
                  value={minutes}
                  onChange={(event) => setMinutes(Number(event.target.value))}
                >
                  {[15, 30, 45].map((value) => (
                    <option key={value} value={value}>
                      {value} 分钟
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-7">
              <h3 className="form-section-label">
                <span>04</span>选择练习模式
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    id: "guided",
                    title: "学习模式",
                    detail: "随时查看参考思路，边练边学",
                    icon: Eye,
                  },
                  {
                    id: "interview",
                    title: "面试模式",
                    detail: "完成回答后，再查看参考思路",
                    icon: MessageSquareText,
                  },
                ].map(({ id, title, detail, icon: Icon }) => (
                  <button
                    className={`practice-mode text-left ${mode === id ? "is-active" : ""}`}
                    key={id}
                    onClick={() => setMode(id)}
                  >
                    <Icon size={20} />
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <span className="text-xs text-muted">
                准备好了，就从第一个问题开始。
              </span>
              <button className="solid-button" onClick={start}>
                <Play size={14} />
                开始练习
                <ArrowRight size={15} />
              </button>
            </div>
          </section>
          <aside className="space-y-5">
            <section className="panel study-tip">
              <Sparkles size={20} className="text-brand" />
              <h2 className="mb-3 mt-4 text-base font-semibold">
                给回答一点结构
              </h2>
              <ol className="space-y-4">
                {[
                  { title: "先说结论", detail: "用一句话回答核心问题。" },
                  { title: "解释原理", detail: "按执行过程展开关键机制。" },
                  { title: "补充场景", detail: "结合项目经验与边界条件。" },
                ].map((item, i) => (
                  <li className="flex gap-3" key={item.title}>
                    <span className="step-number">{i + 1}</span>
                    <span>
                      <strong className="text-[13px] font-medium">
                        {item.title}
                      </strong>
                      <span className="mt-1 block text-xs leading-6 text-muted">
                        {item.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </section>
            <section className="panel">
              <div className="section-heading">
                <h2>最近练习</h2>
                <History size={16} className="text-muted" />
              </div>
              {sessions.length ? (
                <div className="mt-4 space-y-4">
                  {sessions.slice(0, 3).map((session) => (
                    <div
                      className="border-b border-line pb-3 last:border-0 last:pb-0"
                      key={session.id}
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span>{session.category}</span>
                        <span className="text-brand">
                          {session.completed} / {session.total} 题
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        {session.date.slice(0, 10)}
                        <span className="mx-2">·</span>
                        {session.duration} 分钟
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-7 text-center">
                  <AudioLines size={24} className="mx-auto mb-3 text-muted" />
                  <p className="text-xs leading-6 text-muted">
                    你的第一场练习，
                    <br />
                    就从今天开始。
                  </p>
                </div>
              )}
              <p className="mt-4 border-t border-line pt-3 text-[11px] leading-5 text-muted">
                当前提供题库自测与参考思路，尚未连接在线 AI 面试官。
              </p>
            </section>
          </aside>
        </div>
      )}
      {stage === "session" && current && (
        <div className="session-layout">
          <section className="panel">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
              <span className="flex items-center gap-2 text-sm">
                <Settings2 size={16} className="text-brand" />
                {category}
                <span className="tag ml-2">
                  {mode === "guided" ? "学习模式" : "面试模式"}
                </span>
              </span>
              <span
                className={`session-timer ${remaining < 60 ? "text-red-500" : ""}`}
              >
                <Clock3 size={16} />
                {String(Math.floor(remaining / 60)).padStart(2, "0")}:
                {String(remaining % 60).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-7 flex items-center justify-between">
              <span className="text-xs font-medium tracking-widest text-brand">
                QUESTION {String(index + 1).padStart(2, "0")} /{" "}
                {questionIds.length}
              </span>
              <span className="tag">{current.topic}</span>
            </div>
            <h2 className="mb-4 mt-4 text-[22px] font-semibold leading-9">
              {current.title}
            </h2>
            <p className="text-sm leading-7 text-muted">
              {current.description}
            </p>
            {remaining === 0 && (
              <p
                role="status"
                className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-700"
              >
                练习时间已到。你可以完成当前回答，再提交复盘。
              </p>
            )}
            <label
              htmlFor="session-answer"
              className="mb-3 mt-7 block text-sm font-medium"
            >
              你的回答
            </label>
            <textarea
              id="session-answer"
              className="practice-input w-full resize-y"
              rows={10}
              value={answers[current.slug] ?? ""}
              onChange={(event) =>
                setAnswers({ ...answers, [current.slug]: event.target.value })
              }
              placeholder="先写下核心结论，再逐步展开实现原理与实际场景…"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-muted">
              <span>
                {(answers[current.slug] ?? "").length} 字 · 10 字以上计为已作答
              </span>
              <button
                className="flex items-center gap-1 hover:text-brand"
                onClick={() => toggleMistake(current.slug)}
              >
                <Flag size={12} />
                {mistakes.includes(current.slug)
                  ? "已加入错题本"
                  : "标记待复习"}
              </button>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <button
                className="outline-button"
                onClick={() => setReference(!reference)}
                disabled={
                  mode === "interview" &&
                  (answers[current.slug] ?? "").trim().length < 10
                }
              >
                <Eye size={15} />
                {reference ? "收起参考思路" : "查看参考思路"}
              </button>
              <div className="flex gap-2">
                <button
                  className="outline-button"
                  disabled={index === 0}
                  onClick={() => {
                    setIndex(index - 1);
                    setReference(false);
                  }}
                >
                  <ArrowLeft size={14} />
                  上一题
                </button>
                {index < questionIds.length - 1 ? (
                  <button
                    className="solid-button"
                    onClick={() => {
                      setIndex(index + 1);
                      setReference(false);
                    }}
                  >
                    下一题
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button className="solid-button" onClick={finish}>
                    完成并复盘
                    <CheckCheck size={15} />
                  </button>
                )}
              </div>
            </div>
            {reference && (
              <motion.div
                className="reference-answer mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="mb-3 font-semibold">参考答题思路</h3>
                <p className="text-sm leading-8">{current.summary}</p>
                <Link
                  className="subtle-link mt-4 inline-flex"
                  href={articleHref(current.slug)}
                >
                  查看完整解析
                  <ChevronRight size={14} />
                </Link>
              </motion.div>
            )}
          </section>
          <aside className="panel">
            <h2 className="text-sm font-semibold">本场进度</h2>
            <p className="mb-5 mt-2 text-xs text-muted">
              已作答 {completed} / {questionIds.length} 题
            </p>
            <div className="space-y-2">
              {sessionArticles.map((article, i) => (
                <button
                  className={`session-question ${index === i ? "is-active" : ""}`}
                  key={article.slug}
                  onClick={() => {
                    setIndex(i);
                    setReference(false);
                  }}
                >
                  <span>
                    {(answers[article.slug] ?? "").trim().length >= 10 ? (
                      <Check size={14} />
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </span>
                  <span>{article.topic}</span>
                </button>
              ))}
            </div>
            <button
              className="outline-button mt-6 w-full justify-center"
              onClick={finish}
            >
              结束并复盘
            </button>
          </aside>
        </div>
      )}
      {stage === "result" && (
        <section className="panel practice-result">
          <span className="result-icon">
            <CheckCheck size={34} />
          </span>
          <h2 className="mb-2 mt-6 text-2xl font-semibold">
            练习完成，给今天的自己点个赞
          </h2>
          <p className="text-sm text-muted">
            表达的熟练度，来自每一次认真练习。
          </p>
          <div className="mx-auto my-8 grid max-w-lg grid-cols-3 gap-4">
            <div className="stat-card">
              <strong>{questionIds.length}</strong>
              <span>练习题数</span>
            </div>
            <div className="stat-card">
              <strong>{completed}</strong>
              <span>独立作答</span>
            </div>
            <div className="stat-card">
              <strong>
                {Math.max(1, Math.round((minutes * 60 - remaining) / 60))}
              </strong>
              <span>练习分钟</span>
            </div>
          </div>
          <div className="mx-auto max-w-2xl space-y-3 text-left">
            {sessionArticles.map((article) => (
              <details className="result-detail" key={article.slug}>
                <summary className="flex cursor-pointer items-center gap-3">
                  <span className="flex-1 text-sm font-medium">
                    {article.title}
                  </span>
                  <ChevronRight size={15} />
                </summary>
                <div className="mt-4 border-t border-line pt-4">
                  <h3 className="mb-2 text-xs font-semibold text-brand">
                    我的回答
                  </h3>
                  <p className="whitespace-pre-wrap text-sm leading-7 text-secondary">
                    {answers[article.slug]?.trim() ||
                      "本题暂未作答，可以再练习一次。"}
                  </p>
                  <h3 className="mb-2 mt-5 text-xs font-semibold text-brand">
                    参考思路
                  </h3>
                  <p className="text-sm leading-7 text-secondary">
                    {article.summary}
                  </p>
                  <Link
                    href={articleHref(article.slug)}
                    className="subtle-link mt-4 inline-flex"
                  >
                    阅读完整解析
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </details>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-3">
            <button
              className="outline-button"
              onClick={() => setStage("setup")}
            >
              <RotateCcw size={15} />
              再练一次
            </button>
            <Link className="solid-button" href="/overview">
              回到学习概览
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

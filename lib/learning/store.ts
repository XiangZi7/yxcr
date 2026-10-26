"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { articles } from "@/lib/interview/data";
import type { LearningState } from "./types";

export function dayKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
function toggle(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      hydrated: false,
      theme: "light",
      saved: [],
      mastered: ["vue-3"],
      mistakes: [],
      notes: {},
      plan: ["javascript", "typescript", "react"],
      dailyGoal: 3,
      displayName: "学习者",
      activity: {},
      sessions: [],
      documents: [],
      toast: "",
      setTheme: (theme) => set({ theme }),
      toggleSaved: (slug) =>
        set((state) => ({
          saved: toggle(state.saved, slug),
          toast: state.saved.includes(slug) ? "已取消收藏" : "已加入收藏",
        })),
      toggleMastered: (slug) =>
        set((state) => {
          const date = dayKey();
          return {
            mastered: toggle(state.mastered, slug),
            activity: {
              ...state.activity,
              [date]: state.mastered.includes(slug)
                ? (state.activity[date] ?? []).filter((id) => id !== slug)
                : [...new Set([...(state.activity[date] ?? []), slug])],
            },
            toast: state.mastered.includes(slug)
              ? "已标记为待复习"
              : "又掌握了一个知识点，继续加油！",
          };
        }),
      toggleMistake: (slug) =>
        set((state) => ({
          mistakes: toggle(state.mistakes, slug),
          toast: state.mistakes.includes(slug)
            ? "已移出错题本"
            : "已加入错题本",
        })),
      setNote: (slug, value) =>
        set((state) => ({ notes: { ...state.notes, [slug]: value } })),
      togglePlan: (slug) =>
        set((state) => ({
          plan: toggle(state.plan, slug),
          toast: state.plan.includes(slug)
            ? "已移出学习计划"
            : "已加入今日计划",
        })),
      setDailyGoal: (dailyGoal) =>
        set({ dailyGoal: Math.max(1, Math.min(12, dailyGoal)) }),
      setDisplayName: (displayName) =>
        set({ displayName: displayName.trim().slice(0, 20) || "学习者" }),
      recordSession: (session) =>
        set((state) => ({
          sessions: [
            {
              ...session,
              id: crypto.randomUUID(),
              date: new Date().toISOString(),
            },
            ...state.sessions,
          ].slice(0, 50),
        })),
      saveDocument: (document) =>
        set((state) => ({
          documents: [
            document,
            ...state.documents.filter((item) => item.id !== document.id),
          ],
        })),
      deleteDocument: (id) =>
        set((state) => ({
          documents: state.documents.filter((item) => item.id !== id),
          toast: "文档已删除",
        })),
      notify: (toast) => set({ toast }),
    }),
    {
      name: "interview-os:learning-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        theme: state.theme,
        saved: state.saved,
        mastered: state.mastered,
        mistakes: state.mistakes,
        notes: state.notes,
        plan: state.plan,
        dailyGoal: state.dailyGoal,
        displayName: state.displayName,
        activity: state.activity,
        sessions: state.sessions,
        documents: state.documents,
      }),
    },
  ),
);

let initialization: Promise<void> | undefined;
export function initializeLearningState() {
  initialization ??= (async () => {
    const hasNewState = localStorage.getItem("interview-os:learning-v1");
    await useLearningStore.persist.rehydrate();
    if (!hasNewState) {
      const readList = (key: string, fallback: string[]) => {
        try {
          const value: unknown = JSON.parse(
            localStorage.getItem(key) ?? "null",
          );
          return Array.isArray(value)
            ? value.filter((item): item is string => typeof item === "string")
            : fallback;
        } catch {
          return fallback;
        }
      };
      const notes: Record<string, string> = {};
      articles.forEach((article) => {
        const note = localStorage.getItem(`interview-os:note:${article.slug}`);
        if (note) notes[article.slug] = note;
      });
      useLearningStore.setState({
        saved: readList("interview-os:saved", []),
        mastered: readList("interview-os:mastered", ["vue-3"]),
        theme:
          localStorage.getItem("interview-os:theme") === "dark"
            ? "dark"
            : "light",
        notes,
      });
    }
    useLearningStore.setState({ hydrated: true });
  })().catch(() => {
    useLearningStore.setState({
      hydrated: true,
      toast: "浏览器存储暂不可用，部分更改可能无法保存。",
    });
  });
  return initialization;
}

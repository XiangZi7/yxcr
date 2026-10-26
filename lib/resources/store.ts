"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { dayKey, useLearningStore } from "@/lib/learning/store";
import type { LearningResource, ResourceProgress } from "./types";

interface ResourceState {
  hydrated: boolean;
  records: Record<string, ResourceProgress>;
  activity: Record<string, string[]>;
  toggleSaved: (resource: LearningResource) => void;
  toggleMastered: (resource: LearningResource) => void;
  togglePlan: (resource: LearningResource) => void;
  setNote: (resource: LearningResource, note: string) => void;
}

const emptyProgress = (resource: LearningResource): ResourceProgress => ({ resource, saved: false, mastered: false, inPlan: false, note: "" });
function nextRecords(records: ResourceState["records"], resource: LearningResource, patch: Partial<ResourceProgress>) {
  const next = { ...(records[resource.id] ?? emptyProgress(resource)), ...patch, resource };
  const result = { ...records };
  if (!next.saved && !next.mastered && !next.inPlan && !next.note.trim()) delete result[resource.id];
  else result[resource.id] = next;
  return result;
}

export const useResourceStore = create<ResourceState>()(persist((set, get) => ({
  hydrated: false,
  records: {},
  activity: {},
  toggleSaved(resource) {
    const saved = !get().records[resource.id]?.saved;
    set(state => ({ records: nextRecords(state.records, resource, { saved }) }));
    useLearningStore.getState().notify(saved ? "已收藏这条学习资源" : "已取消收藏");
  },
  toggleMastered(resource) {
    const mastered = !get().records[resource.id]?.mastered;
    const today = dayKey();
    set(state => ({ records: nextRecords(state.records, resource, { mastered }), activity: { ...state.activity, [today]: mastered ? [...new Set([...(state.activity[today] ?? []), resource.id])] : (state.activity[today] ?? []).filter(id => id !== resource.id) } }));
    useLearningStore.getState().notify(mastered ? "又掌握了一个知识点" : "已标记为待复习");
  },
  togglePlan(resource) {
    const inPlan = !get().records[resource.id]?.inPlan;
    set(state => ({ records: nextRecords(state.records, resource, { inPlan }) }));
    useLearningStore.getState().notify(inPlan ? "已加入今日学习计划" : "已移出学习计划");
  },
  setNote(resource, note) { set(state => ({ records: nextRecords(state.records, resource, { note }) })); },
}), { name: "yxcr-os:resources-v1", storage: createJSONStorage(() => localStorage), skipHydration: true, partialize: state => ({ records: state.records, activity: state.activity }) }));

let initialization: Promise<void> | undefined;
export function initializeResourceState() {
  initialization ??= Promise.resolve(useResourceStore.persist.rehydrate()).catch(() => {
    useLearningStore.getState().notify("资源学习记录暂时无法读取。");
  }).finally(() => useResourceStore.setState({ hydrated: true }));
  return initialization;
}

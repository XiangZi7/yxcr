"use client";

import { useMemo } from "react";
import { useLearningStore } from "@/lib/learning/store";
import { useResourceStore } from "./store";
import type { LearningResource, ResourceProgress } from "./types";

// Keep existing learning records compatible while presenting one knowledge library.
export function useKnowledgeProgress(resource: LearningResource) {
  const learning = useLearningStore();
  const resources = useResourceStore();
  const slug = resource.originalSlug;
  return {
    saved: slug ? learning.saved.includes(slug) : !!resources.records[resource.id]?.saved,
    mastered: slug ? learning.mastered.includes(slug) : !!resources.records[resource.id]?.mastered,
    inPlan: slug ? learning.plan.includes(slug) : !!resources.records[resource.id]?.inPlan,
    note: slug ? learning.notes[slug] ?? "" : resources.records[resource.id]?.note ?? "",
    toggleSaved: () => slug ? learning.toggleSaved(slug) : resources.toggleSaved(resource),
    toggleMastered: () => slug ? learning.toggleMastered(slug) : resources.toggleMastered(resource),
    togglePlan: () => slug ? learning.togglePlan(slug) : resources.togglePlan(resource),
    setNote: (note: string) => slug ? learning.setNote(slug, note) : resources.setNote(resource, note),
  };
}

export function useKnowledgeRecords(catalog: LearningResource[]) {
  const records = useResourceStore((state) => state.records);
  const saved = useLearningStore((state) => state.saved);
  const mastered = useLearningStore((state) => state.mastered);
  const plan = useLearningStore((state) => state.plan);
  const notes = useLearningStore((state) => state.notes);
  return useMemo(() => {
    const combined: Record<string, ResourceProgress> = { ...records };
    for (const resource of catalog) {
      const slug = resource.originalSlug;
      if (slug) combined[resource.id] = { resource, saved: saved.includes(slug), mastered: mastered.includes(slug), inPlan: plan.includes(slug), note: notes[slug] ?? "" };
    }
    return combined;
  }, [catalog, records, saved, mastered, plan, notes]);
}

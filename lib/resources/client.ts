import type { LearningResource } from "./types";
import { resourceSummary } from "./config";

let cached: LearningResource[] | undefined;
let pending: Promise<LearningResource[]> | undefined;

export function getCachedResources() {
  return cached;
}
export function loadResourceCatalog(): Promise<LearningResource[]> {
  pending ??= fetch(
    `/api/resources?v=${encodeURIComponent(resourceSummary.syncedAt)}`,
  )
    .then(async (response) => {
      if (!response.ok) throw new Error("资源目录加载失败");
      const data: LearningResource[] = await response.json();
      cached = data;
      return data;
    })
    .catch((error) => {
      pending = undefined;
      throw error;
    });
  return pending;
}

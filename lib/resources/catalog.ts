import "server-only";
import catalog from "./catalog.json";
import type { LearningResource } from "./types";
import { originalKnowledge } from "./original";

export const resources: LearningResource[] = [
  ...originalKnowledge,
  ...(catalog as LearningResource[]),
];

export function findKnowledge(id: string) {
  return resources.find((resource) => resource.id === id);
}

import "server-only";
import catalog from "./catalog.json";
import type { LearningResource } from "./types";

export const resources = catalog as LearningResource[];

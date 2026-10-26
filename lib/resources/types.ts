export interface LearningResource {
  id: string;
  title: string;
  url: string;
  source: string;
  collection: string;
  section: string;
  kind: "document" | "knowledge" | "collection";
  featured?: boolean;
  description?: string;
  collections?: string[];
  originalSlug?: string;
  category?: string;
}

export interface ResourceProgress {
  resource: LearningResource;
  saved: boolean;
  mastered: boolean;
  inPlan: boolean;
  note: string;
}

export type ResourceStatus =
  "all" | "saved" | "mastered" | "unlearned" | "planned";

export interface ResourceFilters {
  query?: string;
  source?: string;
  collection?: string;
  status?: ResourceStatus;
  category?: string;
}

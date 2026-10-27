import "server-only";
import { cache } from "react";
import { readContentMarkdown } from "@/lib/markdown/read-content";
import { findKnowledge } from "./catalog";

export const getKnowledgeMarkdown = cache(async (id: string) => {
  if (!/^res-[a-f0-9]{16}$/.test(id) || !findKnowledge(id)) return null;
  return readContentMarkdown("knowledge", id);
});

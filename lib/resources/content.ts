import "server-only";
import { readContentMarkdown } from "@/lib/markdown/read-content";
import { findKnowledge } from "./catalog";

export async function getKnowledgeMarkdown(id: string) {
  "use cache";
  if (!/^res-[a-f0-9]{16}$/.test(id) || !findKnowledge(id)) return null;
  return readContentMarkdown("knowledge", id);
}

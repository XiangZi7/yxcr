import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { findKnowledge } from "./catalog";

export async function getKnowledgeMarkdown(id: string) {
  "use cache";
  if (!/^res-[a-f0-9]{16}$/.test(id) || !findKnowledge(id)) return null;
  return readFile(
    path.join(process.cwd(), "content", "knowledge", `${id}.md`),
    "utf8",
  );
}

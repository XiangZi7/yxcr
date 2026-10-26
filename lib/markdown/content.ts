import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Article } from "@/lib/interview/types";
import { articleToMarkdown } from "./utils";

export async function getArticleMarkdown(article: Article) {
  "use cache";
  try {
    return await readFile(
      path.join(process.cwd(), "content", "questions", `${article.slug}.md`),
      "utf-8",
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    return articleToMarkdown(article);
  }
}

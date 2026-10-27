import "server-only";
import type { Article } from "@/lib/interview/types";
import { articleToMarkdown } from "./utils";
import { readContentMarkdown } from "./read-content";

export async function getArticleMarkdown(article: Article) {
  "use cache";
  return (await readContentMarkdown("questions", article.slug)) ?? articleToMarkdown(article);
}

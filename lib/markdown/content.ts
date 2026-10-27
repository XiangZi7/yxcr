import "server-only";
import { cache } from "react";
import type { Article } from "@/lib/interview/types";
import { articleToMarkdown } from "./utils";
import { readContentMarkdown } from "./read-content";

export const getArticleMarkdown = cache(async (article: Article) => {
  return (await readContentMarkdown("questions", article.slug)) ?? articleToMarkdown(article);
});

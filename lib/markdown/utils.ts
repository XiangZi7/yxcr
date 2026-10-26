import GithubSlugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import type { Article } from "@/lib/interview/types";

export interface MarkdownHeading {
  id: string;
  title: string;
  depth: number;
}
export function getMarkdownHeadings(markdown: string): MarkdownHeading[] {
  const tree = unified().use(remarkParse).parse(markdown);
  const slugger = new GithubSlugger();
  const headings: MarkdownHeading[] = [];
  visit(tree, "heading", (node) => {
    const title = toString(node);
    const id = slugger.slug(title);
    if (node.depth <= 3) headings.push({ id, title, depth: node.depth });
  });
  return headings;
}
export function articleToMarkdown(article: Article): string {
  const language = ["Python", "FastAPI"].includes(article.topic)
    ? "python"
    : article.topic === "React"
      ? "tsx"
      : "typescript";
  return [
    `## 一、核心概念\n\n${article.introduction}`,
    `## 二、实现原理`,
    ...article.sections.map(
      (section, index) =>
        `### ${index + 1}. ${section.title}\n\n${section.text}\n\n\`\`\`${language}\n${section.code}\n\`\`\``,
    ),
    `### 3. 作用域与副作用\n\n${article.slug === "vue-3" ? "使用 **effectScope** 管理副作用的生命周期。组件卸载时清理不再需要的侦听器，避免重复执行与内存泄漏。" : "明确事件监听、异步请求和资源的生命周期，及时清理不再需要的副作用。"}`,
    `## 三、${article.slug === "vue-3" ? "与 Vue 2 的对比" : "实践与方案对比"}\n\n${article.comparison}`,
    `## 四、总结\n\n${article.summary}`,
  ].join("\n\n");
}
export function markdownTitle(content: string, fallback = "未命名文档") {
  return (
    getMarkdownHeadings(content).find((item) => item.depth === 1)?.title ??
    fallback
  );
}
export function downloadMarkdown(filename: string, content: string) {
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/markdown;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename.replace(/[<>:"/\\|?*]/g, "-")}.md`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export function ArticleContent({ markdown }: { markdown: string }) {
  return <MarkdownRenderer content={markdown} className="article-markdown" />;
}

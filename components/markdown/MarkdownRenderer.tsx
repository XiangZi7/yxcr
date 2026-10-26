"use client";

import {
  Children,
  createElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { CodeBlock } from "@/components/interview/CodeBlock";

function plainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(plainText).join("");
  if (isValidElement<{ children?: ReactNode }>(node))
    return plainText(node.props.children);
  return "";
}

export function MarkdownRenderer({
  content,
  className = "",
  headingOffset = 0,
}: {
  content: string;
  className?: string;
  headingOffset?: number;
}) {
  function heading(
    level: number,
    { id, children }: { id?: string; children?: ReactNode },
  ) {
    return createElement(
      `h${Math.min(6, Math.max(2, level + headingOffset))}`,
      { id, className: `markdown-h${level}` },
      children,
    );
  }
  return (
    <div className={`markdown-content ${className}`}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeHighlight, { detect: false, ignoreMissing: true }],
        ]}
        skipHtml
        components={{
          h1: (props) => heading(1, props),
          h2: (props) => heading(2, props),
          h3: (props) => heading(3, props),
          h4: (props) => heading(4, props),
          h5: (props) => heading(5, props),
          h6: (props) => heading(6, props),
          pre({ children }) {
            const child = Children.toArray(children).find(
              (
                item,
              ): item is ReactElement<{
                children?: ReactNode;
                className?: string;
              }> => isValidElement(item),
            );
            const language =
              /language-([\w+-]+)/.exec(child?.props.className ?? "")?.[1] ??
              "text";
            return (
              <CodeBlock
                language={language}
                code={plainText(child?.props.children).replace(/\n$/, "")}
              >
                {child?.props.children}
              </CodeBlock>
            );
          },
          table({ children }) {
            return (
              <div className="markdown-table-wrap" tabIndex={0}>
                <table>{children}</table>
              </div>
            );
          },
          a({ children, href }) {
            const external = /^https?:\/\//.test(href ?? "");
            return (
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}

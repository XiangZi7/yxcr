"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({
  code,
  language = "text",
  children,
}: {
  code: string;
  language?: string;
  children?: ReactNode;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2200);
  }
  return (
    <figure className="code-block" aria-label={`${language} 代码示例`}>
      <figcaption className="code-toolbar">
        <span className="window-controls" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <div className="code-tools">
          <button
            className="copy-code"
            aria-label="复制代码"
            onClick={copyCode}
          >
            {status === "copied" ? <Check size={13} /> : <Copy size={13} />}
            <span aria-live="polite">
              {status === "copied"
                ? "已复制"
                : status === "error"
                  ? "复制失败"
                  : "复制"}
            </span>
          </button>
          <span className="code-language">{language}</span>
        </div>
      </figcaption>
      <div className="code-content">
        <div className="code-gutter" aria-hidden="true">
          {code.split("\n").map((_, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </div>
        <pre tabIndex={0}>
          <code className={`hljs language-${language}`}>
            {children ?? code}
          </code>
        </pre>
      </div>
    </figure>
  );
}

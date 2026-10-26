"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

function highlightLine(line: string) {
  const pattern =
    /(\/\/.*$|#.*$|'[^']*'|"[^"]*"|`[^`]*`|\b(?:import|from|const|return|function|def|class|for|in|async|await|yield|interface|type|export|print)\b|\b(?:reactive|effect|console|log|count|name|state|runner|useState|useEffect|number|string)\b|\b\d+\b|=>|\+\+|=)/g;
  return line.split(pattern).map((token, index) => {
    let kind = "";
    if (/^(\/\/|#)/.test(token)) kind = "comment";
    else if (/^['"`]/.test(token)) kind = "string";
    else if (
      /^(import|const|return|function|def|class|for|in|async|await|yield|interface|type|export)$/.test(
        token,
      )
    )
      kind = "keyword";
    else if (token === "from" || /^(=>|\+\+|=)$/.test(token)) kind = "operator";
    else if (/^\d+$/.test(token)) kind = "number";
    else if (
      /^(reactive|effect|console|log|count|name|state|runner|useState|useEffect|number|string)$/.test(
        token,
      )
    )
      kind = "function";
    return kind ? (
      <span className={`syntax-${kind}`} key={index}>
        {token}
      </span>
    ) : (
      token
    );
  });
}

export function CodeBlock({
  code,
  language = "TS",
}: {
  code: string;
  language?: string;
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
    <div className="code-block overflow-hidden rounded-lg">
      <div className="code-toolbar flex items-center justify-between">
        <span>{language}</span>
        <button
          onClick={copyCode}
          className="flex items-center gap-1.5"
          aria-label="复制代码"
        >
          {status === "copied" ? <Check size={12} /> : <Copy size={12} />}
          <span aria-live="polite">
            {status === "copied"
              ? "已复制"
              : status === "error"
                ? "复制失败，请手动选择"
                : "复制代码"}
          </span>
        </button>
      </div>
      <pre tabIndex={0} aria-label={`${language} 代码示例`}>
        <code>
          {code.split("\n").map((line, index) => (
            <span className="code-line" key={index}>
              <span className="line-number" aria-hidden="true">
                {index + 1}
              </span>
              <span>{highlightLine(line) || " "}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

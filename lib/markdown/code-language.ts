import { visit } from "unist-util-visit";

const aliases: Record<string, string> = {
  ts: "typescript", tsx: "typescript", js: "javascript", jsx: "javascript",
  vue: "xml", html: "xml", wxml: "xml", svg: "xml", html5: "xml",
  sh: "bash", shellscript: "bash", zsh: "bash", terminal: "bash",
  yml: "yaml", dockerfile: "dockerfile", py: "python", text: "text", txt: "text",
};

export function codeLanguage(value: string, explicit?: string | null) {
  if (explicit) {
    const language = explicit.toLowerCase().replace(/^language-/, "").split(/[:{]/)[0];
    return aliases[language] ?? language;
  }
  if (/^\s*(?:type\s+\w+\s*=|interface\s+\w+|(?:export\s+)?(?:async\s+)?function\s+\w+[^\n]*\)\s*:\s*\w+)|\b(?:Record|Promise|Array)<[^\n]+>|\b(?:const|let)\s+\w+\s*:\s*\w+/m.test(value)) return "typescript";
  if (/^\s*<(?:template|script|style|div|html|!doctype|svg|view)\b/i.test(value)) return "xml";
  if (/^\s*(?:export\s+)?(?:const|let|var|function|class)\s+\w+|\bconsole\.log\(|(?:import|export)\s+.*\bfrom\s+['"]/m.test(value)) return "javascript";
  if (/^\s*(?:async\s+)?def\s+\w+\(|^\s*from\s+[\w.]+\s+import\s|^\s*if __name__\s*==/m.test(value)) return "python";
  if (/^\s*(?:\$\s+)?(?:npm|pnpm|npx|yarn|git|curl|docker|pip|python|node|cd|mkdir)\s+\S/m.test(value)) return "bash";
  if (/^\s*(?:SELECT\b.+\bFROM|CREATE\s+TABLE|INSERT\s+INTO|UPDATE\s+\w+\s+SET)/im.test(value)) return "sql";
  if (/^[\s\S]*[.#@][\w-]+[^\n{}]*\{[^}]*[\w-]+\s*:[^}]+\}/.test(value)) return "css";
  try { const parsed: unknown = JSON.parse(value); if (parsed !== null && typeof parsed === "object") return "json"; } catch { /* Plain text stays unhighlighted. */ }
  return "text";
}

export function remarkCodeLanguage() {
  return (tree: { type: string }) => {
    visit(tree, "code", (node) => {
      const code = node as unknown as { value: string; lang?: string | null };
      code.lang = codeLanguage(code.value, code.lang);
    });
  };
}

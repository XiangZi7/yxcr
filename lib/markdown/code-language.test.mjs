import assert from "node:assert/strict";
import test from "node:test";
import { codeLanguage } from "./code-language.ts";
import rehypeHighlight from "rehype-highlight";
import { visit } from "unist-util-visit";
import { highlightOptions } from "./highlight.ts";

test("unlabelled Agent interface examples are recognized as TypeScript", () => {
  assert.equal(
    codeLanguage(
      "type ToolCall = {\n id: string;\n arguments: Record<string, unknown>;\n};",
    ),
    "typescript",
  );
  assert.equal(
    codeLanguage("const count = 3\nconsole.log(count)"),
    "javascript",
  );
  assert.equal(codeLanguage("pnpm install\npnpm dev"), "bash");
  assert.equal(
    codeLanguage("def read_file(path):\n    return open(path).read()"),
    "python",
  );
});
test("language aliases work while explicit plaintext and diagrams stay plain", () => {
  assert.equal(
    codeLanguage("<template><p>{{ count }}</p></template>", "vue"),
    "xml",
  );
  assert.equal(codeLanguage("const count = 3", "text"), "text");
  assert.equal(codeLanguage("┌─────┐\n│ Host │\n└─────┘"), "text");
  assert.equal(codeLanguage("const value: number = 1", "TS"), "typescript");
});

test("TypeScript language detection produces actual keyword and string tokens", () => {
  const value = 'type Message = { role: "user" | "assistant"; count: number }';
  const language = codeLanguage(value);
  const tree = {
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: {},
        children: [
          {
            type: "element",
            tagName: "code",
            properties: { className: [`language-${language}`] },
            children: [{ type: "text", value }],
          },
        ],
      },
    ],
  };
  rehypeHighlight(highlightOptions)(tree, {
    message() {
      throw new Error("Unknown code language");
    },
  });
  const classes = new Set();
  visit(tree, "element", (node) => {
    for (const name of node.properties.className ?? []) classes.add(name);
  });
  assert(classes.has("hljs-keyword"));
  assert(classes.has("hljs-string"));
});

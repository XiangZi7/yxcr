import assert from "node:assert/strict";
import test from "node:test";
import { codeLanguage } from "./code-language.ts";

test("unlabelled Agent interface examples are recognized as TypeScript", () => {
  assert.equal(codeLanguage('type ToolCall = {\n id: string;\n arguments: Record<string, unknown>;\n};'), "typescript");
  assert.equal(codeLanguage('const count = 3\nconsole.log(count)'), "javascript");
  assert.equal(codeLanguage('pnpm install\npnpm dev'), "bash");
  assert.equal(codeLanguage('def read_file(path):\n    return open(path).read()'), "python");
});
test("language aliases work while explicit plaintext and diagrams stay plain", () => {
  assert.equal(codeLanguage('<template><p>{{ count }}</p></template>', 'vue'), "xml");
  assert.equal(codeLanguage('const count = 3', 'text'), "text");
  assert.equal(codeLanguage('┌─────┐\n│ Host │\n└─────┘'), "text");
  assert.equal(codeLanguage('const value: number = 1', 'TS'), "typescript");
});

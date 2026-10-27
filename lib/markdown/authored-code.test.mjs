import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

const source = readFileSync(
  new URL("../../content/authored/handwritten.md", import.meta.url),
  "utf8",
);
function codeFor(slug) {
  const section = source
    .split(new RegExp(`^## ${slug} \\| [^\\n]+\\n`, "m"))[1]
    ?.split(/^## /m)[0];
  assert(section, slug);
  const tree = unified().use(remarkParse).parse(section);
  const blocks = [];
  visit(tree, "code", (node) => {
    if (node.lang === "javascript") blocks.push(node.value);
  });
  return blocks.join("\n");
}

test("authored JavaScript examples contain valid syntax", () => {
  const tree = unified().use(remarkParse).parse(source);
  let checked = 0;
  visit(tree, "code", (node) => {
    if (node.lang === "javascript") {
      new vm.Script(node.value);
      checked++;
    }
  });
  assert(checked >= 20);
});

test("JSON parser rejects malformed input and preserves dangerous-looking keys as data", () => {
  const result = vm.runInNewContext(
    codeFor("json") +
      `\n({
    value: parseJSON('{"a":[true,null,1.2e2]}').a[2],
    own: Object.hasOwn(parseJSON('{"__proto__":{"polluted":true}}'), '__proto__'),
    invalid: (() => { try { parseJSON('[1,]'); return false } catch { return true } })(),
    serialized: stringifyJSON({ a: undefined, b: [undefined, Infinity] })
  })`,
  );
  assert.equal(result.value, 120);
  assert.equal(result.own, true);
  assert.equal(result.invalid, true);
  assert.equal(result.serialized, '{"b":[null,null]}');
});

test("handwritten Promise preserves asynchronous chaining and rejected thenables", async () => {
  const code = codeFor("promise-core");
  const result = await vm.runInNewContext(
    code +
      `\nnew Promise(resolve => {
    const events = [];
    MiniPromise.resolve({ then: (ok) => { ok(3); ok(9); } }).then(value => events.push(value));
    events.push('sync');
    queueMicrotask(() => queueMicrotask(() => resolve(events.join(','))));
  })`,
    { queueMicrotask, console: { log() {} } },
  );
  assert.equal(result, "sync,3");
});

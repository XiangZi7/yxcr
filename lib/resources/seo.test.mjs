import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { knowledgeHref, knowledgePath, resolveKnowledgeLink } from "./links.ts";
import { libraryPageSize, listingHref, paginateKnowledge, parseLibraryPage } from "./listing.ts";

const read = (file) => JSON.parse(readFileSync(new URL(file, import.meta.url), "utf8"));
const catalog = read("./catalog.json");
const routes = read("./route-map.json");
const revisions = read("./content-revisions.json");

test("all migrated documents have distinct readable URLs and revision records", () => {
  const paths = new Set();
  for (const item of catalog) {
    const href = knowledgeHref(item);
    assert(href.startsWith("/learn/"), item.id);
    assert(!href.includes(item.id), item.id);
    assert(!paths.has(href), item.title);
    paths.add(href);
    assert.equal(decodeURIComponent(href.slice(7)), routes[item.id]);
    assert.match(revisions[item.id].hash, /^[a-f0-9]{64}$/);
    if (revisions[item.id].lastModified) assert(Number.isFinite(Date.parse(revisions[item.id].lastModified)));
  }
});

test("previously saved records and original article IDs resolve to the migrated URL", () => {
  const resource = { id: "res-56b6faa875af330a", url: "/questions/res-56b6faa875af330a", title: "旧标题" };
  assert.equal(knowledgeHref(resource), "/learn/canvas-barrage");
  assert.equal(knowledgePath("vue-3"), "/learn/vue-reactivity");
  assert.equal(knowledgePath("res-nonexistent"), undefined);
  assert.equal(knowledgeHref({ id: "missing", title: "旧目录记录", url: "https://example.com" }), "/library?q=%E6%97%A7%E7%9B%AE%E5%BD%95%E8%AE%B0%E5%BD%95");
});

test("legacy aliases never shadow a real document and non-document aliases stay mapped", () => {
  const canonical = new Set(catalog.map((item) => item.id));
  const claimed = new Set();
  for (const item of catalog) for (const alias of item.aliasIds || []) {
    if (canonical.has(alias) || claimed.has(alias)) continue;
    claimed.add(alias);
    assert.equal(knowledgePath(alias), knowledgePath(item.id));
  }
  assert(claimed.size > 0);
});

test("Markdown migration preserves fragments, queries and external URLs", () => {
  assert.equal(resolveKnowledgeLink("/questions/vue-3#三总结"), "/learn/vue-reactivity#三总结");
  assert.equal(resolveKnowledgeLink("/questions/res-56b6faa875af330a?from=notes#html"), "/learn/canvas-barrage?from=notes#html");
  assert.equal(resolveKnowledgeLink("https://example.com/questions/vue-3"), "https://example.com/questions/vue-3");
  assert.equal(resolveKnowledgeLink("#local"), "#local");
});

test("paging exposes every document exactly once without altering stable IDs", () => {
  const count = Math.ceil(catalog.length / libraryPageSize);
  const ids = Array.from({ length: count }, (_, i) => paginateKnowledge(catalog, i + 1)).flat().map((item) => item.id);
  assert.deepEqual(ids, catalog.map((item) => item.id));
  assert.equal(new Set(ids).size, catalog.length);
  assert.equal(paginateKnowledge(catalog, count + 1).length, 0);
});

test("pagination links retain search and local status while page one has a clean canonical path", () => {
  assert.equal(listingHref("/library/canvas", {}, 1), "/library/canvas");
  assert.equal(listingHref("/topics/frontend", {}, 2), "/topics/frontend?page=2");
  const href = new URL(listingHref("/library", { query: "Vue & React", status: "saved" }, 3), "https://yxcr.top");
  assert.equal(href.searchParams.get("q"), "Vue & React");
  assert.equal(href.searchParams.get("status"), "saved");
  assert.equal(href.searchParams.get("page"), "3");
  for (const input of [undefined, "0", "-2", "1.5", "Infinity", "9007199254740993"]) assert.equal(parseLibraryPage(input), 1);
});

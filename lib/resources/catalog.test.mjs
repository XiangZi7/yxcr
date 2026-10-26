import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { filterResources } from "./query.ts";

const catalog = JSON.parse(readFileSync(new URL("./catalog.json", import.meta.url), "utf8"));
const summary = JSON.parse(readFileSync(new URL("./summary.json", import.meta.url), "utf8"));
const config = JSON.parse(readFileSync(new URL("../../content/resources/sources.json", import.meta.url), "utf8"));

test("resource index has unique stable URLs and valid source/collection associations", () => {
  assert.equal(new Set(catalog.map(item => item.id)).size, catalog.length);
  assert.equal(new Set(catalog.map(item => item.url)).size, catalog.length);
  for (const item of catalog) {
    const source = config.sources.find(source => source.id === item.source);
    const collection = config.collections.find(collection => collection.id === item.collection);
    assert(source && collection, item.id);
    assert.equal(collection.source, source.id);
    assert.equal(new URL(item.url).origin, new URL(source.url).origin);
    assert.equal(new URL(item.url).protocol, "https:");
    assert(item.title.trim().length >= 2);
  }
});

test("every requested collection is indexed and counts match the actual snapshot", () => {
  assert.equal(summary.total, catalog.length);
  assert.equal(config.collections.length, 31);
  for (const collection of config.collections) {
    const matching = catalog.filter(item => item.collection === collection.id);
    assert(matching.length > 0, collection.id);
    assert.equal(summary.collections[collection.id], matching.length);
  }
  assert.equal(catalog.filter(item => item.collection === "network-interview" && item.kind === "knowledge").length, 71);
  assert(catalog.some(item => item.featured && item.url.includes("ai-agent-harness-engineering#")));
});

test("search normalizes fullwidth Latin and combines source and collection filters", () => {
  const found = filterResources(catalog, { query: "ＭＣＰ", source: "aifuture", collection: "ai-future" });
  assert(found.length >= 3);
  assert(found.every(item => item.source === "aifuture" && item.collection === "ai-future"));
  assert.equal(filterResources(catalog, { source: "bingkele", collection: "ai" }).length, 0);
  assert.equal(filterResources(catalog, { query: "yxcr-unmatched-knowledge-point-726415" }).length, 0);
});

test("personal status filters select only the corresponding saved, mastered or planned records", () => {
  const [first, second] = catalog;
  const records = {
    [first.id]: { resource: first, saved: true, mastered: false, inPlan: true, note: "" },
    [second.id]: { resource: second, saved: false, mastered: true, inPlan: false, note: "" },
  };
  assert.deepEqual(filterResources(catalog, { status: "saved" }, records).map(item => item.id), [first.id]);
  assert.deepEqual(filterResources(catalog, { status: "mastered" }, records).map(item => item.id), [second.id]);
  assert.deepEqual(filterResources(catalog, { status: "planned" }, records).map(item => item.id), [first.id]);
  assert(!filterResources(catalog, { status: "unlearned" }, records).some(item => item.id === second.id));
});

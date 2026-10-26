import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { filterResources } from "./query.ts";

const catalog = JSON.parse(
  readFileSync(new URL("./catalog.json", import.meta.url), "utf8"),
);
const summary = JSON.parse(
  readFileSync(new URL("./summary.json", import.meta.url), "utf8"),
);
const config = JSON.parse(
  readFileSync(
    new URL("../../content/resources/sources.json", import.meta.url),
    "utf8",
  ),
);

test("every listed knowledge entry has a complete local body and an internal URL", () => {
  assert.equal(new Set(catalog.map((item) => item.id)).size, catalog.length);
  assert.equal(summary.total, catalog.length);
  for (const item of catalog) {
    assert.match(item.id, /^res-[a-f0-9]{16}$/);
    assert.equal(item.url, `/questions/${item.id}`);
    const body = readFileSync(new URL(`../../content/knowledge/${item.id}.md`, import.meta.url), "utf8");
    assert(body.trim().length > 60, item.title);
    assert(item.title.trim().length >= 2);
  }
});

test("requested columns count actual local articles, and adaptations retain license records", () => {
  const manifest = JSON.parse(readFileSync(new URL("../../content/knowledge/manifest.json", import.meta.url), "utf8"));
  assert.equal(config.collections.length, 31);
  for (const collection of config.collections) {
    const matching = catalog.filter((item) => item.collections.includes(collection.id));
    assert(matching.length > 0, collection.id);
    assert.equal(summary.collections[collection.id], matching.length);
  }
  for (const item of catalog.filter((item) => item.source !== "yxcr")) {
    assert(["MIT", "Apache-2.0"].includes(manifest[item.id].license));
    assert.match(manifest[item.id].blob, /^[a-f0-9]{40}$/);
    assert.equal(manifest[item.id].modified, true);
  }
});

test("search and topic filters work across one combined knowledge catalog", () => {
  const found = filterResources(catalog, { query: "ＭＣＰ", collection: "ai-future" });
  assert(found.length >= 3);
  assert(found.every((item) => item.collections.includes("ai-future")));
  assert(filterResources(catalog, { category: "后端" }).length > 30);
  assert.equal(filterResources(catalog, { query: "yxcr-unmatched-knowledge-point-726415" }).length, 0);
});

test("personal status filters select only the corresponding saved, mastered or planned records", () => {
  const [first, second] = catalog;
  const records = {
    [first.id]: {
      resource: first,
      saved: true,
      mastered: false,
      inPlan: true,
      note: "",
    },
    [second.id]: {
      resource: second,
      saved: false,
      mastered: true,
      inPlan: false,
      note: "",
    },
  };
  assert.deepEqual(
    filterResources(catalog, { status: "saved" }, records).map(
      (item) => item.id,
    ),
    [first.id],
  );
  assert.deepEqual(
    filterResources(catalog, { status: "mastered" }, records).map(
      (item) => item.id,
    ),
    [second.id],
  );
  assert.deepEqual(
    filterResources(catalog, { status: "planned" }, records).map(
      (item) => item.id,
    ),
    [first.id],
  );
  assert(
    !filterResources(catalog, { status: "unlearned" }, records).some(
      (item) => item.id === second.id,
    ),
  );
});

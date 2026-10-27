import assert from "node:assert/strict";
import catalog from "../lib/resources/catalog.json" with { type: "json" };
import routes from "../lib/resources/route-map.json" with { type: "json" };

const base = process.env.SEO_TEST_BASE_URL || "http://localhost:3002";
const sample = new Map();
for (const category of new Set(catalog.map((item) => item.category))) {
  const items = catalog.filter((item) => item.category === category);
  for (let index = 0; index < 6; index++) {
    const item = items[Math.floor(index * (items.length - 1) / 5)];
    if (item) sample.set(item.id, item);
  }
}
// These regression cases returned HTTP 200 with an embedded 404 and no body.
for (const item of catalog.filter((item) =>
  item.title === "Teleport原理讲解" || routes[item.id]?.startsWith("agent-loop-"),
)) sample.set(item.id, item);

const items = [...sample.values()];
let checked = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (items.length) {
    const item = items.shift();
    const url = new URL(`/learn/${encodeURIComponent(routes[item.id])}`, base);
    const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
    assert.equal(response.status, 200, `${item.title}: ${url}`);
    const html = await response.text();
    assert.match(html, /<h1\b[^>]*id="knowledge-title"/, `${item.title}: article heading missing`);
    assert.match(html, /class="markdown-content article-markdown"/, `${item.title}: article body missing`);
    assert.doesNotMatch(html, /NEXT_HTTP_ERROR_FALLBACK|Switched to client rendering because the server rendering errored/, `${item.title}: server render failed behind HTTP 200`);
    checked++;
  }
}));
console.log(`Verified rendered headings and Markdown bodies for ${checked} articles across all categories at ${base}.`);

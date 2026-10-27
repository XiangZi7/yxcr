import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import routes from "../lib/resources/route-map.json" with { type: "json" };

const root = new URL("../out/", import.meta.url);
const articles = await readdir(new URL("learn/", root));
const published = new Set(articles.filter((file) => file.endsWith(".html")).map((file) => decodeURIComponent(file.slice(0, -5))));
for (const slug of new Set(Object.values(routes))) assert.ok(published.has(slug), `Missing exported article: ${slug}`);
for (const file of articles.filter((file) => file.endsWith(".html"))) {
  const html = await readFile(new URL(`learn/${encodeURIComponent(file)}`, root), "utf8");
  assert.match(html, /<h1\b/, `Missing article heading: ${file}`);
  assert.ok(html.includes('class="markdown-content article-markdown"'), `Missing article body: ${file}`);
  assert.ok(!/NEXT_HTTP_ERROR_FALLBACK|Switched to client rendering because the server rendering errored/.test(html), `Article render failed: ${file}`);
}
let files = 0;
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await inspect(file);
    else files++;
  }
}
await inspect(fileURLToPath(root));
assert.ok(files <= 20000, `Static export exceeds the free asset limit: ${files}`);
assert.ok((await readFile(new URL("404.html", root), "utf8")).includes("<html"));
console.log(`Verified ${published.size} exported articles and ${files} static assets.`);

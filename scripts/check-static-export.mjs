import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import routes from "../lib/resources/route-map.json" with { type: "json" };

const root = new URL("../out/", import.meta.url);
const articles = await readdir(new URL("learn/", root));
const published = new Set(articles.filter((file) => file.endsWith(".html")).map((file) => decodeURIComponent(file.slice(0, -5))));
for (const slug of new Set(Object.values(routes))) assert.ok(published.has(slug), `Missing exported article: ${slug}`);
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

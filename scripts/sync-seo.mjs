import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (file) => readFileSync(path.join(root, file), "utf8");
const json = (file) => JSON.parse(read(file));
const oldRoutes = json("lib/resources/route-map.json");
const oldRevisions = json("lib/resources/content-revisions.json");
const catalog = json("lib/resources/catalog.json");
const articleSource = read("lib/interview/data.ts");
const originalIds = [...articleSource.matchAll(/^\s+slug: "([^"]+)",/gm)].map((match) => match[1]);
const overrides = {
  "vue-3": "vue-reactivity", javascript: "javascript-event-loop",
  typescript: "typescript-type-and-interface", react: "react-hooks",
  browser: "browser-page-lifecycle", engineering: "frontend-architecture",
  python: "python-generators-and-iterators", fastapi: "fastapi-validation",
  rag: "rag-workflow", mcp: "mcp-protocol", agent: "reliable-ai-agent",
  inference: "llm-inference-optimization",
  "res-56b6faa875af330a": "canvas-barrage",
};
const files = new Map();
try {
  const history = execFileSync("git", ["log", "--format=@@%cI", "--name-only", "--", "content/knowledge", "content/questions", "lib/interview/data.ts"], { cwd: root, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  let date;
  for (const line of history.split(/\r?\n/)) {
    if (line.startsWith("@@")) date = line.slice(2);
    else if (line && date && !files.has(line)) files.set(line, date);
  }
} catch {
  // Omit dates that cannot be established; never invent a deployment timestamp.
}
let dirty = new Set();
try {
  dirty = new Set(execFileSync("git", ["diff", "HEAD", "--name-only"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim().split(/\r?\n/));
} catch { /* Git history is optional for a source archive. */ }
const now = new Date().toISOString();
const records = [
  ...originalIds.map((id) => ({ id, title: id, original: true })),
  ...catalog,
];
const used = new Map();
const routes = {};
// Reserve published names before assigning names to newly imported articles.
for (const record of records) {
  const slug = oldRevisions[record.id] ? oldRoutes[record.id] : undefined;
  if (!slug) continue;
  if (used.has(slug)) throw new Error(`Duplicate published slug: ${slug}`);
  used.set(slug, record.id);
  routes[record.id] = slug;
}
const revisions = {};
for (const record of records) {
  if (!routes[record.id]) {
    const base = overrides[record.id] || record.title.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "").slice(0, 100).replace(/-+$/g, "");
    if (!base) throw new Error(`Missing descriptive title: ${record.id}`);
    let slug = base;
    let suffix = 2;
    while (used.has(slug)) slug = `${base}-${suffix++}`;
    routes[record.id] = slug;
    used.set(slug, record.id);
  }
  const file = record.original ? `content/questions/${record.id}.md` : `content/knowledge/${record.id}.md`;
  const body = existsSync(path.join(root, file)) ? read(file) : "";
  const metadata = record.original
    ? articleSource.split("export const navigationGroups")[0].replace(/^import .*;\r?\n/gm, "")
    : JSON.stringify([record.title, record.description, record.section, record.category, record.collection, record.collections]);
  const hash = createHash("sha256").update(metadata + "\n" + body).digest("hex");
  const previous = oldRevisions[record.id];
  const candidates = [files.get(file), ...(record.original ? [files.get("lib/interview/data.ts")] : [])].filter(Boolean).sort();
  const changed = dirty.has(file) || (record.original && dirty.has("lib/interview/data.ts"));
  const lastModified = previous?.hash === hash ? previous.lastModified
    : previous || changed ? now : candidates.at(-1);
  revisions[record.id] = { hash, ...(lastModified ? { lastModified } : {}) };
}
const canonicalIds = new Set(records.map((record) => record.id));
for (const record of records) {
  for (const alias of record.aliasIds || []) {
    // Imported aliases can overlap actual IDs; actual documents take precedence.
    if (canonicalIds.has(alias) || routes[alias]) continue;
    routes[alias] = routes[record.id];
  }
}
for (const [file, data] of [["lib/resources/route-map.json", routes], ["lib/resources/content-revisions.json", revisions]]) {
  const output = JSON.stringify(data, null, 2) + "\n";
  if (read(file) !== output) writeFileSync(path.join(root, file), output);
}
console.log(`SEO registry: ${records.length} stable article URLs; ${routes["res-56b6faa875af330a"]}`);

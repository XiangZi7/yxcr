// Generate VitePress pages from content/ and lib/resources/ metadata.
// Output (site/learn, site/topics, site/library, site/.vitepress/generated) is gitignored.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = path.join(root, "site");
const json = (file) => JSON.parse(readFileSync(path.join(root, file), "utf8"));

const catalog = json("lib/resources/catalog.json");
const articles = json("content/questions/articles.json");
const routes = json("lib/resources/route-map.json");
const revisions = json("lib/resources/content-revisions.json");
const { sources, collections } = json("content/resources/sources.json");
const { categories, topics } = json("content/resources/topics.json");
const manifest = {
  ...json("content/knowledge/manifest.json"),
  ...json("content/knowledge/algorithms-manifest.json"),
};

// Keep upstream collection IDs in data; use clear public paths (matches the old site).
const collectionNames = {
  "network-interview": "computer-network", "ai-future": "ai-engineering",
  frequent: "core-concepts", experience: "learning-methods", yearly: "learning-review",
};
const collectionSlug = (id) => collectionNames[id] || id;
const collectionHref = (id) => `/library/${collectionSlug(id)}`;
const categoryHref = (category) => `/topics/${categories.find((item) => item.category === category).slug}`;

const resources = [
  ...articles.map((article) => ({
    id: article.slug, title: article.title, description: article.description,
    category: article.category, section: article.topic, source: "yxcr",
    collection: article.category === "AI / LLM" ? "ai" : "frequent",
    collections: ["curated", "frequent", "principles"], markdown: article.markdown,
  })),
  ...catalog,
].map((item) => ({ ...item, slug: routes[item.id], href: `/learn/${routes[item.id]}` }));

const missing = resources.filter((item) => !item.slug);
if (missing.length) throw new Error(`Missing routes: ${missing.map((item) => item.id).join(", ")}`);

// Same matching rules as the old library search.
const normalize = (value) => value.normalize("NFKC").toLocaleLowerCase().replace(/[\s\p{P}\p{S}]+/gu, " ").trim();
function filter({ category, collection, query = "" }) {
  const terms = normalize(query).split(" ").filter(Boolean);
  return resources.filter((item) => {
    if (category && item.category !== category) return false;
    if (collection && item.collection !== collection && !item.collections?.includes(collection)) return false;
    const text = normalize(`${item.title} ${item.section} ${item.description ?? ""} ${(item.searchAliases ?? []).join(" ")}`);
    return terms.every((term) => text.includes(term));
  });
}

// ---------- Markdown body ----------

const fenceAliases = { html5: "html", wxml: "html", terminal: "bash", liunx: "bash", cmd: "bat", env: "dotenv", plain: "txt" };
function detectLanguage(code) {
  if (/^\s*(?:type\s+\w+\s*=|interface\s+\w+|(?:export\s+)?(?:async\s+)?function\s+\w+[^\n]*\)\s*:\s*\w+)|\b(?:Record|Promise|Array)<[^\n]+>|\b(?:const|let)\s+\w+\s*:\s*\w+/m.test(code)) return "ts";
  if (/^\s*<(?:template|script|style|div|html|!doctype|svg|view)\b/i.test(code)) return "html";
  if (/^\s*(?:export\s+)?(?:const|let|var|function|class)\s+\w+|\bconsole\.log\(|(?:import|export)\s+.*\bfrom\s+['"]/m.test(code)) return "js";
  if (/^\s*(?:async\s+)?def\s+\w+\(|^\s*from\s+[\w.]+\s+import\s|^\s*if __name__\s*==/m.test(code)) return "python";
  if (/^\s*(?:\$\s+)?(?:npm|pnpm|npx|yarn|git|curl|docker|pip|python|node|cd|mkdir)\s+\S/m.test(code)) return "bash";
  if (/^\s*(?:SELECT\b.+\bFROM|CREATE\s+TABLE|INSERT\s+INTO|UPDATE\s+\w+\s+SET)/im.test(code)) return "sql";
  if (/^[\s\S]*[.#@][\w-]+[^\n{}]*\{[^}]*[\w-]+\s*:[^}]+\}/.test(code)) return "css";
  try {
    const parsed = JSON.parse(code);
    if (parsed !== null && typeof parsed === "object") return "json";
  } catch { /* plain text */ }
  return "txt";
}

// Label code fences (the old renderer guessed unlabelled languages) and normalize aliases.
function labelFences(markdown) {
  const lines = markdown.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const open = /^(\s{0,3})(`{3,}|~{3,})\s*([^\s`{]*)(.*)$/.exec(lines[i]);
    if (!open) continue;
    const [, indent, fence, lang, rest] = open;
    let end = i + 1;
    while (end < lines.length && !new RegExp(`^\\s{0,3}${fence[0]}{${fence.length},}\\s*$`).test(lines[end])) end++;
    const label = lang ? fenceAliases[lang.toLowerCase()] ?? lang : detectLanguage(lines.slice(i + 1, end).join("\n"));
    lines[i] = `${indent}${fence}${label}${rest}`;
    i = end;
  }
  return lines.join("\n");
}

const rewriteLinks = (markdown) => markdown.replace(/\]\(\/questions\/([^)\s?#]+)/g,
  (match, id) => routes[id] ? `](/learn/${routes[id]}` : match);

const yaml = (value) => JSON.stringify(value);

function provenance(item) {
  const origin = manifest[item.id];
  if (origin) return { name: origin.author, url: `https://github.com/${origin.repository}`, license: origin.license, modified: origin.modified };
  const source = sources.find((entry) => entry.id === item.source);
  return source ? { name: source.author, url: source.url } : undefined;
}

// ---------- Pages ----------

rmSync(path.join(site, "library.md"), { force: true });
for (const dir of ["learn", "topics", "library", ".vitepress/generated"]) {
  rmSync(path.join(site, dir), { recursive: true, force: true });
  mkdirSync(path.join(site, dir), { recursive: true });
}
const write = (file, content) => writeFileSync(path.join(site, file), content);

// Prev/next follows the reading order inside each primary collection and section.
const sequences = new Map();
for (const item of resources) {
  const key = `${item.collection}|${item.section}`;
  if (!sequences.has(key)) sequences.set(key, []);
  sequences.get(key).push(item);
}
const link = (item) => item ? { text: item.title, link: item.href } : false;

for (const item of resources) {
  const body = item.markdown ?? readFileSync(path.join(root, "content/knowledge", `${item.id}.md`), "utf8");
  const sequence = sequences.get(`${item.collection}|${item.section}`);
  const index = sequence.indexOf(item);
  const collection = collections.find((entry) => entry.id === item.collection);
  const origin = provenance(item);
  const frontmatter = [
    `title: ${yaml(item.title)}`,
    item.description && `description: ${yaml(item.description.replace(/\s+/g, " ").trim())}`,
    `category: ${yaml(item.category)}`,
    `categoryLink: ${yaml(categoryHref(item.category))}`,
    `section: ${yaml(item.section)}`,
    collection && `collection: ${yaml({ title: collection.title, link: collectionHref(collection.id) })}`,
    origin && `origin: ${yaml(origin)}`,
    revisions[item.id]?.lastModified && `updated: ${yaml(revisions[item.id].lastModified)}`,
    `prev: ${yaml(link(sequence[index - 1]))}`,
    `next: ${yaml(link(sequence[index + 1]))}`,
  ].filter(Boolean);
  const content = rewriteLinks(labelFences(body.trim()));
  const heading = /^#\s/.test(content) ? "" : `# ${item.title}\n\n`;
  write(`learn/${item.slug}.md`, `---\n${frontmatter.join("\n")}\n---\n\n${heading}${content}\n`);
}

const escapeText = (value) => value.replace(/[[\]<>*_`\\|]/g, "\\$&");
const listItem = (item) => `- [${escapeText(item.title)}](${item.href})`;

function groupedList(items) {
  const groups = new Map();
  for (const item of items) {
    // Algorithm problems share one section; group them by problem number instead.
    const number = item.category === "算法" && /^(\d+)\./.exec(item.title)?.[1];
    const key = number
      ? `题号 ${String(Math.floor(number / 100) * 100).padStart(4, "0")}–${String(Math.floor(number / 100) * 100 + 99).padStart(4, "0")}`
      : item.section;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  const ordered = [...groups].sort(([a], [b]) => (a.startsWith("题号") && b.startsWith("题号") ? a.localeCompare(b) : 0));
  return ordered.map(([title, entries]) => {
    if (title.startsWith("题号")) entries.sort((a, b) => parseInt(a.title) - parseInt(b.title));
    return `## ${title}\n\n<p class="count">${entries.length} 篇</p>\n\n${entries.map(listItem).join("\n")}`;
  }).join("\n\n");
}

const listingPage = ({ title, description, items, intro = "" }) =>
  `---\ntitle: ${yaml(title)}\ndescription: ${yaml(description)}\noutline: [2, 2]\n---\n\n# ${title}\n\n${description}\n\n${intro}共收录 **${items.length}** 篇。\n\n${groupedList(items)}\n`;

const topicPages = [];
for (const category of categories) {
  const items = filter({ category: category.category });
  const children = topics.map((topic) => ({ ...topic, items: filter({ category: topic.category, query: topic.query }) }))
    .filter((topic) => topic.category === category.category && topic.items.length);
  const intro = children.length
    ? `**细分专题：** ${children.map((topic) => `[${topic.title.replace(/\s*学习$/u, "")}](/topics/${topic.slug})`).join(" · ")}\n\n`
    : "";
  write(`topics/${category.slug}.md`, listingPage({ title: category.title, description: category.description, items, intro }));
  topicPages.push({ ...category, count: items.length, children });
  for (const topic of children) {
    const parent = `[${category.title}](/topics/${category.slug}) › `;
    write(`topics/${topic.slug}.md`, listingPage({ title: topic.title, description: topic.description, items: topic.items, intro: parent }));
  }
}

const groups = [...new Set(collections.map((item) => item.group))];
const collectionPages = collections.map((collection) => ({ ...collection, items: filter({ collection: collection.id }) }))
  .filter((collection) => collection.items.length);
for (const collection of collectionPages) {
  const source = sources.find((entry) => entry.id === collection.source);
  const intro = `[知识库](/library) › ${collection.group}${source ? ` · 内容来源：[${source.name}](${source.url})` : ""}\n\n`;
  write(`library/${collectionSlug(collection.id)}.md`, listingPage({
    title: collection.title, description: collection.description, items: collection.items, intro,
  }));
}

write("library.md", `---\ntitle: 知识库\ndescription: 按学习方向与专栏浏览全部 ${resources.length} 篇编程与 AI 知识。\n---\n\n# 知识库\n\n按学习方向与专栏浏览全部 **${resources.length}** 篇编程与 AI 知识，也可以按 <kbd>/</kbd> 或 <kbd>Ctrl</kbd> <kbd>K</kbd> 搜索。\n\n## 学习方向\n\n${topicPages.map((topic) => `- [${topic.title}](/topics/${topic.slug})（${topic.count}）：${topic.description}`).join("\n")}\n\n${groups.map((group) => `## ${group}\n\n${collectionPages.filter((item) => item.group === group).map((item) => `- [${item.title}](${collectionHref(item.id)})（${item.items.length}）：${item.description}`).join("\n")}`).join("\n\n")}\n`);

// ---------- Theme data ----------

const sidebar = [
  { text: "学习方向", items: topicPages.map((topic) => ({
    text: `${topic.title} <span class="count">${topic.count}</span>`,
    link: `/topics/${topic.slug}`,
    collapsed: true,
    items: topic.children.map((child) => ({
      text: `${child.title.replace(/\s*学习$/u, "")} <span class="count">${child.items.length}</span>`,
      link: `/topics/${child.slug}`,
    })),
  })) },
  ...groups.map((group) => ({
    text: group,
    collapsed: true,
    items: collectionPages.filter((item) => item.group === group).map((item) => ({
      text: `${item.title} <span class="count">${item.items.length}</span>`,
      link: collectionHref(item.id),
    })),
  })),
];
writeFileSync(path.join(site, ".vitepress/generated/theme.json"), JSON.stringify({
  sidebar,
  topics: topicPages.map(({ slug, title, description, count }) => ({ slug, title, description, count })),
  total: resources.length,
}, null, 2));

console.log(`Generated ${resources.length} articles, ${topicPages.length + topicPages.reduce((sum, topic) => sum + topic.children.length, 0)} topics, ${collectionPages.length} collections.`);

// Verify the VitePress output contains every article and fits the Cloudflare free plan.
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import routes from "../content/resources/route-map.json" with { type: "json" };
import revisions from "../content/resources/content-revisions.json" with { type: "json" };

const dist = fileURLToPath(new URL("../site/.vitepress/dist/", import.meta.url));
const missing = Object.keys(revisions).filter((id) => !existsSync(path.join(dist, "learn", `${routes[id]}.html`)));
if (missing.length) throw new Error(`Missing ${missing.length} article pages, e.g. ${missing.slice(0, 5).join(", ")}`);

const files = readdirSync(dist, { recursive: true, withFileTypes: true }).filter((entry) => entry.isFile()).length;
const limit = 20_000;
if (files > limit) throw new Error(`${files} files exceed the ${limit} static asset limit`);
console.log(`Static site: ${Object.keys(revisions).length} articles, ${files} files (limit ${limit}).`);

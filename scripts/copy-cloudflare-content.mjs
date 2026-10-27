import { copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
let copied = 0;

for (const collection of ["knowledge", "questions"]) {
  const source = path.join(root, "content", collection);
  const target = path.join(root, ".open-next", "assets", "_content", collection);
  await mkdir(target, { recursive: true });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    await copyFile(path.join(source, entry.name), path.join(target, entry.name));
    copied++;
  }
}

console.log(`Copied ${copied} Markdown files to Cloudflare static assets.`);

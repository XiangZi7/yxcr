import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function readContentMarkdown(
  collection: "knowledge" | "questions",
  filename: string,
): Promise<string | null> {
  let assets;
  try {
    assets = getCloudflareContext().env.ASSETS;
  } catch {
    // Next.js development/build and Node.js hosting read repository files.
  }

  if (assets) {
    const url = new URL(`/_content/${collection}/${encodeURIComponent(filename)}.md`, "https://assets.internal");
    const response = await assets.fetch(url);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Unable to read Markdown asset: ${response.status}`);
    return response.text();
  }

  try {
    return await readFile(path.join(process.cwd(), "content", collection, `${filename}.md`), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

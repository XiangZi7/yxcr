import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function readContentMarkdown(
  collection: "knowledge" | "questions",
  filename: string,
): Promise<string | null> {
  try {
    return await readFile(path.join(process.cwd(), "content", collection, `${filename}.md`), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

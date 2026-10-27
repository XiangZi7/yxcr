import fs from "node:fs";
import { syncBuiltinESMExports } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

if (process.platform === "win32") {
  const symlinkSync = fs.symlinkSync;
  // OpenNext copies pnpm directory links without specifying their type.
  // Junctions work without Windows Developer Mode or administrator rights.
  fs.symlinkSync = (target, destination, type) => {
    try {
      return symlinkSync(target, destination, type);
    } catch (error) {
      if (error.code !== "EPERM") throw error;
      const resolved = path.resolve(path.dirname(destination.toString()), target.toString());
      if (!fs.statSync(resolved).isDirectory()) throw error;
      return symlinkSync(resolved, destination, "junction");
    }
  };
  syncBuiltinESMExports();
}

const cli = new URL("../cli/index.js", import.meta.resolve("@opennextjs/cloudflare"));
process.argv = [process.argv[0], fileURLToPath(cli), "build", ...process.argv.slice(2)];
await import(cli.href);
await import("./copy-cloudflare-content.mjs");

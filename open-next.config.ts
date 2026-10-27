import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

// Repository content changes only on deployment; KV keys include the build ID.
// Cache interception is incompatible with this app's Partial Prerendering.
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
});

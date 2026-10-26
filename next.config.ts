import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects() {
    return [{ source: "/resources", destination: "/library", permanent: true }];
  },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

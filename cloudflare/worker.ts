import config from "../content/resources/sources.json";
import { knowledgePath } from "../lib/resources/links";
import { categoryHref, collectionHref, topicCategories } from "../lib/resources/sections";
import { parseLibraryPage } from "../lib/resources/listing";

interface Env { ASSETS: { fetch: (request: Request) => Promise<Response> } }

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/questions/")) {
      let id: string;
      try { id = decodeURIComponent(url.pathname.slice(11)); } catch { return env.ASSETS.fetch(request); }
      const destination = knowledgePath(id);
      if (destination) { url.pathname = destination; return Response.redirect(url, 308); }
    }
    if (url.pathname === "/resources") {
      url.pathname = "/library";
      return Response.redirect(url, 308);
    }
    if (url.pathname === "/library") {
      const collection = url.searchParams.get("collection");
      const category = url.searchParams.get("category");
      if (collection && config.collections.some(({ id }) => id === collection)) {
        url.pathname = collectionHref(collection);
        url.searchParams.delete("collection");
        return Response.redirect(url, 308);
      }
      if (category && topicCategories.some((topic) => topic.category === category)) {
        url.pathname = categoryHref(category);
        url.searchParams.delete("category");
        return Response.redirect(url, 308);
      }
    }
    const isListing = /^\/(?:library(?:\/[^/]+)?|topics\/[^/]+)$/.test(url.pathname);
    const privateView = Boolean(url.searchParams.get("q") || url.searchParams.get("category") ||
      ["saved", "mastered", "planned", "unlearned"].includes(url.searchParams.get("status") || ""));
    if (isListing && !privateView && url.searchParams.has("page")) {
      const page = parseLibraryPage(url.searchParams.get("page") || undefined);
      url.searchParams.delete("page");
      if (page > 1) url.pathname += `/page/${page}`;
      return Response.redirect(url, 308);
    }
    if (/^\/(?:library(?:\/[^/]+)?|topics\/[^/]+)\/page\/1$/.test(url.pathname)) {
      url.pathname = url.pathname.slice(0, -7);
      return Response.redirect(url, 308);
    }
    const response = await env.ASSETS.fetch(request);
    if (privateView && /^\/(library|topics)(\/|$)/.test(url.pathname)) {
      const headers = new Headers(response.headers);
      headers.set("X-Robots-Tag", "noindex, follow");
      return new Response(response.body, { status: response.status, headers });
    }
    return response;
  },
};

export default worker;

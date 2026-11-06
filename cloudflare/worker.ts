import config from "../content/resources/sources.json";
import topics from "../content/resources/topics.json";
import routes from "../content/resources/route-map.json";

interface Env { ASSETS: { fetch: (request: Request) => Promise<Response> } }

const slugs: Record<string, string> = routes;
const collectionNames: Record<string, string> = {
  "network-interview": "computer-network", "ai-future": "ai-engineering",
  frequent: "core-concepts", experience: "learning-methods", yearly: "learning-review",
};
// Interactive pages of the old app; their content now lives in the library.
const retired = ["/overview", "/today", "/practice", "/saved", "/notes", "/profile", "/resources"];

function redirect(url: URL, pathname: string) {
  url.pathname = pathname;
  url.search = "";
  return Response.redirect(url, 308);
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/questions/")) {
      let id: string;
      try { id = decodeURIComponent(url.pathname.slice(11)); } catch { return env.ASSETS.fetch(request); }
      if (Object.hasOwn(slugs, id)) return redirect(url, `/learn/${encodeURIComponent(slugs[id])}`);
    }
    if (retired.includes(url.pathname)) return redirect(url, "/library");
    if (url.pathname === "/library") {
      const collection = url.searchParams.get("collection");
      const category = url.searchParams.get("category");
      if (collection && config.collections.some(({ id }) => id === collection)) {
        return redirect(url, `/library/${collectionNames[collection] || collection}`);
      }
      const topic = topics.categories.find((item) => item.category === category);
      if (topic) return redirect(url, `/topics/${topic.slug}`);
    }
    // Listings are no longer paginated.
    const paged = /^(\/(?:library(?:\/[^/]+)?|topics\/[^/]+))\/page\/\d+$/.exec(url.pathname);
    if (paged) return redirect(url, paged[1]);
    if (/^\/(?:library|topics)(?:\/|$)/.test(url.pathname) && url.searchParams.has("page")) {
      return redirect(url, url.pathname);
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;

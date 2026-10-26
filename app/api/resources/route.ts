import { resources } from "@/lib/resources/catalog";
import { filterResources } from "@/lib/resources/query";

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const query = (params.get("q") ?? "").slice(0, 200);
  const result = query
    ? filterResources(resources, { query }).slice(0, 8)
    : resources;
  return Response.json(result, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

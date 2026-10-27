import { resources } from "@/lib/resources/catalog";
export const dynamic = "force-static";

export function GET() {
  return Response.json(resources, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

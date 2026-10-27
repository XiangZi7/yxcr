import { NextResponse, type NextRequest } from "next/server";
import sourceConfig from "./content/resources/sources.json";
import { categoryHref, collectionHref, topicCategories } from "@/lib/resources/sections";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname !== "/library") return NextResponse.next();
  const collection = url.searchParams.get("collection");
  const category = url.searchParams.get("category");
  if (collection && sourceConfig.collections.some((item) => item.id === collection)) {
    url.pathname = collectionHref(collection);
    url.searchParams.delete("collection");
    url.searchParams.delete("category");
  } else if (category && topicCategories.some((item) => item.category === category)) {
    url.pathname = categoryHref(category);
    url.searchParams.delete("category");
    url.searchParams.delete("collection");
  } else return NextResponse.next();
  return NextResponse.redirect(url, 308);
}
export const config = { matcher: ["/library"] };

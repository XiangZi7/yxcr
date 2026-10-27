import { NextResponse } from "next/server";
import { knowledgePath } from "@/lib/resources/links";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const path = knowledgePath(slug);
  if (!path) return new Response("内容未找到", { status: 404 });
  const destination = new URL(path, request.url);
  destination.search = new URL(request.url).search;
  return NextResponse.redirect(destination, 308);
}

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { LibraryListing } from "@/components/resources/LibraryListing";
import { PageSkeleton } from "@/components/learning/PageHeading";
import { getCategoryBySlug, learningTopics } from "@/lib/resources/sections";
import { getLibraryPage, libraryMetadata } from "@/lib/resources/listing-server";

export function generateStaticParams() { return learningTopics.map(({ slug }) => ({ topic: slug })); }
async function landing(params: PageProps<"/topics/[topic]">["params"]) {
  const { topic } = await params;
  const category = getCategoryBySlug(topic);
  if (!category) notFound();
  return { basePath: `/topics/${category.slug}`, title: category.title, description: category.description, category: category.category, topicQuery: category.query };
}
export async function generateMetadata(props: PageProps<"/topics/[topic]">) {
  return libraryMetadata(getLibraryPage(await props.searchParams, await landing(props.params)));
}
export default function Page(props: PageProps<"/topics/[topic]">) {
  return <Suspense fallback={<PageSkeleton />}><TopicContent {...props} /></Suspense>;
}
async function TopicContent(props: PageProps<"/topics/[topic]">) {
  return <LibraryListing landing={await landing(props.params)} searchParams={props.searchParams} />;
}

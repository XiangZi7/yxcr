import { Suspense } from "react";
import { notFound } from "next/navigation";
import { LibraryListing } from "@/components/resources/LibraryListing";
import { PageSkeleton } from "@/components/learning/PageHeading";
import { getCollectionBySlug, collectionHref } from "@/lib/resources/sections";
import { getLibraryPage, libraryMetadata } from "@/lib/resources/listing-server";
import { resourceCollections } from "@/lib/resources/config";
import { collectionSlug } from "@/lib/resources/sections";

export function generateStaticParams() { return resourceCollections.map((item) => ({ section: collectionSlug(item.id) })); }
async function landing(params: PageProps<"/library/[section]">["params"]) {
  const { section } = await params;
  const collection = getCollectionBySlug(section);
  if (!collection) notFound();
  return { basePath: collectionHref(collection.id), title: `${collection.title} · 学习专题`, description: collection.description, collection: collection.id };
}
export async function generateMetadata(props: PageProps<"/library/[section]">) {
  return libraryMetadata(getLibraryPage(await props.searchParams, await landing(props.params)));
}
export default function Page(props: PageProps<"/library/[section]">) {
  return <Suspense fallback={<PageSkeleton />}><CollectionContent {...props} /></Suspense>;
}
async function CollectionContent(props: PageProps<"/library/[section]">) {
  return <LibraryListing landing={await landing(props.params)} searchParams={props.searchParams} />;
}

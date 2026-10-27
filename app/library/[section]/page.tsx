import { LibraryListing } from "@/components/resources/LibraryListing";
import { getCollectionLanding, getLibraryPage, libraryMetadata } from "@/lib/resources/listing-server";
import { resourceCollections } from "@/lib/resources/config";
import { collectionSlug } from "@/lib/resources/sections";

export const dynamicParams = false;
export function generateStaticParams() { return resourceCollections.map((item) => ({ section: collectionSlug(item.id) })); }
export async function generateMetadata({ params }: PageProps<"/library/[section]">) {
  return libraryMetadata(getLibraryPage({}, getCollectionLanding((await params).section)));
}
export default async function Page({ params }: PageProps<"/library/[section]">) {
  return <LibraryListing landing={getCollectionLanding((await params).section)} />;
}

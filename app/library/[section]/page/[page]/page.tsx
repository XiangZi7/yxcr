import { LibraryListing } from "@/components/resources/LibraryListing";
import { resourceCollections } from "@/lib/resources/config";
import { collectionSlug } from "@/lib/resources/sections";
import { getCollectionLanding, getListingStaticPages, getStaticListingPage, libraryMetadata } from "@/lib/resources/listing-server";

export const dynamicParams = false;
export function generateStaticParams() {
  return resourceCollections.flatMap(({ id }) => {
    const section = collectionSlug(id);
    return getListingStaticPages(getCollectionLanding(section)).map((page) => ({ section, ...page }));
  });
}
export async function generateMetadata({ params }: PageProps<"/library/[section]/page/[page]">) {
  const { section, page } = await params;
  return libraryMetadata(getStaticListingPage(page, getCollectionLanding(section)));
}
export default async function Page({ params }: PageProps<"/library/[section]/page/[page]">) {
  const { section, page } = await params;
  const landing = getCollectionLanding(section);
  return <LibraryListing landing={landing} page={getStaticListingPage(page, landing).page} />;
}

import { LibraryListing } from "@/components/resources/LibraryListing";
import { getListingStaticPages, getStaticListingPage, libraryMetadata } from "@/lib/resources/listing-server";

export const dynamicParams = false;
export function generateStaticParams() { return getListingStaticPages(); }
export async function generateMetadata({ params }: PageProps<"/library/page/[page]">) {
  return libraryMetadata(getStaticListingPage((await params).page));
}
export default async function Page({ params }: PageProps<"/library/page/[page]">) {
  return <LibraryListing page={getStaticListingPage((await params).page).page} />;
}

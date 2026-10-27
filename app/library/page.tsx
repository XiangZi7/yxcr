import { Suspense } from "react";
import { LibraryListing } from "@/components/resources/LibraryListing";
import { PageSkeleton } from "@/components/learning/PageHeading";
import { getLibraryPage, libraryMetadata } from "@/lib/resources/listing-server";

export async function generateMetadata(props: PageProps<"/library">) {
  return libraryMetadata(getLibraryPage(await props.searchParams));
}
export default function Page(props: PageProps<"/library">) {
  return <Suspense fallback={<PageSkeleton />}><LibraryListing searchParams={props.searchParams} /></Suspense>;
}

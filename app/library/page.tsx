import { Suspense } from "react";
import { LibraryListing } from "@/components/resources/LibraryListing";
import { PageSkeleton } from "@/components/learning/PageHeading";
import { getLibraryPage, libraryMetadata } from "@/lib/resources/listing-server";

export function generateMetadata() {
  return libraryMetadata(getLibraryPage({}));
}
export default function Page() {
  return <Suspense fallback={<PageSkeleton />}><LibraryListing /></Suspense>;
}

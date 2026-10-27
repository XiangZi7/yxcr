import { LibraryListing } from "@/components/resources/LibraryListing";
import { learningTopics } from "@/lib/resources/sections";
import { getLibraryPage, getTopicLanding, libraryMetadata } from "@/lib/resources/listing-server";

export const dynamicParams = false;
export function generateStaticParams() { return learningTopics.map(({ slug }) => ({ topic: slug })); }
export async function generateMetadata({ params }: PageProps<"/topics/[topic]">) {
  return libraryMetadata(getLibraryPage({}, getTopicLanding((await params).topic)));
}
export default async function Page({ params }: PageProps<"/topics/[topic]">) {
  return <LibraryListing landing={getTopicLanding((await params).topic)} />;
}

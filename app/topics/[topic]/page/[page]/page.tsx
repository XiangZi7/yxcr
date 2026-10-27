import { LibraryListing } from "@/components/resources/LibraryListing";
import { learningTopics } from "@/lib/resources/sections";
import { getTopicLanding, getListingStaticPages, getStaticListingPage, libraryMetadata } from "@/lib/resources/listing-server";

export const dynamicParams = false;
export function generateStaticParams() {
  return learningTopics.flatMap(({ slug }) => getListingStaticPages(getTopicLanding(slug)).map((page) => ({ topic: slug, ...page })));
}
export async function generateMetadata({ params }: PageProps<"/topics/[topic]/page/[page]">) {
  const { topic, page } = await params;
  return libraryMetadata(getStaticListingPage(page, getTopicLanding(topic)));
}
export default async function Page({ params }: PageProps<"/topics/[topic]/page/[page]">) {
  const { topic, page } = await params;
  const landing = getTopicLanding(topic);
  return <LibraryListing landing={landing} page={getStaticListingPage(page, landing).page} />;
}

import { ResourceLibraryPage } from "./ResourcesPage";
import { getLibraryPage, type LibraryLanding, type SearchValues } from "@/lib/resources/listing-server";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/site";
import { knowledgeHref } from "@/lib/resources/links";
import { listingHref } from "@/lib/resources/listing";

export async function LibraryListing({ searchParams, landing }: {
  searchParams: Promise<SearchValues>;
  landing?: LibraryLanding;
}) {
  const data = getLibraryPage(await searchParams, landing);
  return <>
    {data.filters.status === "all" && <JsonLd data={{
      "@context": "https://schema.org", "@type": "CollectionPage",
      name: data.title, description: data.description,
      url: absoluteUrl(listingHref(data.basePath, {}, data.page)),
      mainEntity: { "@type": "ItemList", itemListElement: data.initialResources.map((item, index) => ({
        "@type": "ListItem", position: (data.page - 1) * 24 + index + 1,
        name: item.title, url: absoluteUrl(knowledgeHref(item)),
      })) },
    }} />}
    <ResourceLibraryPage data={data} />
  </>;
}

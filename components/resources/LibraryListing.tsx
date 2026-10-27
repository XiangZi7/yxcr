import { ResourceLibraryPage } from "./ResourcesPage";
import { getLibraryPage, type LibraryLanding } from "@/lib/resources/listing-server";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/site";
import { knowledgeHref } from "@/lib/resources/links";
import { listingHref } from "@/lib/resources/listing";

export function LibraryListing({ page = 1, landing }: {
  page?: number;
  landing?: LibraryLanding;
}) {
  const data = getLibraryPage({ page: String(page) }, landing);
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

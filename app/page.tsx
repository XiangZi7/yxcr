import { InterviewWorkspace } from "@/components/interview/InterviewWorkspace";
import { articles } from "@/lib/interview/data";
import { getArticleMarkdown } from "@/lib/markdown/content";
import { articleMetadata, articleStructuredData } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = articleMetadata(articles[0]);

export default async function Home() {
  return (
    <>
      <JsonLd data={articleStructuredData(articles[0])} />
      <InterviewWorkspace
        key={articles[0].slug}
        article={articles[0]}
        markdown={await getArticleMarkdown(articles[0])}
      />
    </>
  );
}

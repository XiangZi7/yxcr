import { InterviewWorkspace } from "@/components/interview/InterviewWorkspace";
import { articles } from "@/lib/interview/data";
import { getArticleMarkdown } from "@/lib/markdown/content";

export default async function Home() {
  return (
    <InterviewWorkspace
      key={articles[0].slug}
      article={articles[0]}
      markdown={await getArticleMarkdown(articles[0])}
    />
  );
}

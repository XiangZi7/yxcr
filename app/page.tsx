import { InterviewWorkspace } from "@/components/interview/InterviewWorkspace";
import { articles } from "@/lib/interview/data";

export default function Home() {
  return <InterviewWorkspace key={articles[0].slug} article={articles[0]} />;
}

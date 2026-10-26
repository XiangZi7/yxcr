import type { Metadata } from "next";
import { Suspense } from "react";
import { NotesPage } from "@/components/learning/NotesPage";
import { PageSkeleton } from "@/components/learning/PageHeading";
export const metadata: Metadata = { title: "Markdown 笔记 · Interview OS" };
export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <NotesPage />
    </Suspense>
  );
}

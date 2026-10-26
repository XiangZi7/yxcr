import type { Metadata } from "next";
import { Suspense } from "react";
import { LibraryPage } from "@/components/learning/LibraryPage";
import { PageSkeleton } from "@/components/learning/PageHeading";
export const metadata: Metadata = { title: "全部题库 · Interview OS" };
export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <LibraryPage />
    </Suspense>
  );
}

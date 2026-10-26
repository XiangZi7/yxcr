import type { Metadata } from "next";
import { Suspense } from "react";
import { LibraryPage } from "@/components/learning/LibraryPage";
import { PageSkeleton } from "@/components/learning/PageHeading";
export const metadata: Metadata = { title: "收藏与错题 · Interview OS" };
export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <LibraryPage savedOnly />
    </Suspense>
  );
}

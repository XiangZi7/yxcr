import type { Metadata } from "next";
import { Suspense } from "react";
import { PracticePage } from "@/components/learning/PracticePage";
import { PageSkeleton } from "@/components/learning/PageHeading";
export const metadata: Metadata = { title: "模拟面试 · Interview OS" };
export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PracticePage />
    </Suspense>
  );
}

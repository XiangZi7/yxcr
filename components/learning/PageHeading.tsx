import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeading({
  label,
  action,
}: {
  label: string;
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="page-heading">
      <nav
        className="breadcrumbs mb-5 flex items-center gap-2"
        aria-label="面包屑"
      >
        <Link href="/">工作台</Link>
        <ChevronRight size={13} />
        <span aria-current="page">{label}</span>
      </nav>
      <div className="flex flex-wrap items-end justify-between gap-5">
        {action}
      </div>
    </header>
  );
}

export function PageSkeleton() {
  return (
    <div className="dashboard-page animate-pulse">
      <div className="mb-8 h-8 w-40 rounded-lg bg-line" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {[1, 2, 3].map((id) => (
          <div key={id} className="h-48 rounded-xl bg-card" />
        ))}
      </div>
    </div>
  );
}

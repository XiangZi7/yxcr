import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeading({
  title,
  description,
  label,
  action,
}: {
  title: string;
  description: string;
  label: string;
  action?: ReactNode;
}) {
  return (
    <header className="page-heading">
      <div className="breadcrumbs mb-5 flex items-center gap-2">
        <Link href="/overview">工作台</Link>
        <ChevronRight size={13} />
        <span>{label}</span>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
        </div>
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

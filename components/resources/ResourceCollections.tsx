"use client";

import Link from "next/link";
import { ArrowRight, Layers3 } from "lucide-react";
import { useResourceStore } from "@/lib/resources/store";
import { ResourceCard } from "./ResourceCard";

export function SavedResources({ query = "" }: { query?: string }) {
  const records = useResourceStore((state) => state.records);
  const saved = Object.values(records).filter(
    (item) =>
      item.saved &&
      `${item.resource.title} ${item.resource.section}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  if (!saved.length) return null;
  return (
    <section className="mt-8">
      <div className="section-heading mb-5">
        <div>
          <h2>已收藏的知识点</h2>
          <p>把值得深入的知识，留给下一次认真阅读。</p>
        </div>
        <Link href="/library?status=saved" className="subtle-link text-xs">
          查看全部收藏
          <ArrowRight size={13} />
        </Link>
      </div>
      <div className="resource-grid">
        {saved.map((item) => (
          <ResourceCard resource={item.resource} key={item.resource.id} />
        ))}
      </div>
    </section>
  );
}

export function PlannedResources() {
  const records = useResourceStore((state) => state.records);
  const planned = Object.values(records).filter((item) => item.inPlan);
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <h2>接下来学习</h2>
          <p>为今天的进步，安排下一步。</p>
        </div>
        <Link href="/library" className="subtle-link text-xs">
          添加知识点
          <ArrowRight size={13} />
        </Link>
      </div>
      {planned.length ? (
        <div className="resource-plan-list">
          {planned.map((item) => (
            <ResourceCard
              key={item.resource.id}
              resource={item.resource}
              list
            />
          ))}
        </div>
      ) : (
        <Link href="/library" className="resource-plan-empty">
          <Layers3 size={21} />
          <span>选择一个感兴趣的知识点，开始学习</span>
          <ArrowRight size={15} />
        </Link>
      )}
    </section>
  );
}

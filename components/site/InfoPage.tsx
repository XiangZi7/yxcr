import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { author } from "@/lib/site";
import { policyUpdatedAt, policyUpdatedLabel, sitePages } from "@/lib/site-pages";

export interface InfoSection {
  id: string;
  title: string;
  content: ReactNode;
}

export function InfoPage({ title, description, path, sections }: {
  title: string;
  description: string;
  path: string;
  sections: InfoSection[];
}) {
  return (
    <main className="info-page">
      <Link className="info-back" href="/">
        <ArrowLeft size={14} /> 返回学习首页
      </Link>
      <header className="info-header">
        <span className="info-eyebrow">YXCR OS · 站点信息</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="info-date">
          生效与更新日期：<time dateTime={policyUpdatedAt}>{policyUpdatedLabel}</time>
        </div>
      </header>
      <nav className="info-navigation" aria-label="站点信息页面">
        {sitePages.map((page) => (
          <Link href={page.href} key={page.href} aria-current={path === page.href ? "page" : undefined}>
            {page.title}
          </Link>
        ))}
      </nav>
      <div className="info-layout">
        <article className="info-article">
          {sections.map((section, index) => (
            <section id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`}><span>{String(index + 1).padStart(2, "0")}</span>{section.title}</h2>
              <div className="info-prose">{section.content}</div>
            </section>
          ))}
        </article>
        <aside className="info-aside">
          <nav aria-label="本页目录">
            <h2>本页内容</h2>
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>{section.title}</a>
            ))}
          </nav>
          <div className="info-contact">
            <Mail size={19} aria-hidden="true" />
            <h2>有问题，随时联系</h2>
            <p>内容纠错、隐私请求与合作咨询</p>
            <a href={`mailto:${author.email}`}>{author.email}<ArrowUpRight size={13} /></a>
          </div>
        </aside>
      </div>
    </main>
  );
}

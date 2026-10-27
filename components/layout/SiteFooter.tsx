import Link from "next/link";
import { author, site } from "@/lib/site";
import { sitePages } from "@/lib/site-pages";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link href="/" className="site-footer-brand">{site.name}</Link>
        <p>编程与 AI 学习 · 每天理解多一点</p>
      </div>
      <nav aria-label="站点信息与政策">
        {sitePages.map((page) => (
          <Link key={page.href} href={page.href}>{page.title}</Link>
        ))}
      </nav>
      <p className="site-footer-credit">
        由 {author.name} 维护 · 开放许可内容的权利归原作者所有
      </p>
    </footer>
  );
}

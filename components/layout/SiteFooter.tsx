import Link from "next/link";
import { author, site } from "@/lib/site";
import { sitePages } from "@/lib/site-pages";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link href="/" className="site-footer-brand">
          {site.name}
        </Link>
      </div>
      <nav aria-label="站点信息与政策">
        {sitePages.map((page) => (
          <Link key={page.href} href={page.href}>
            {page.title}
          </Link>
        ))}
      </nav>
    </footer>
  );
}

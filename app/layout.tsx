import type { Metadata } from "next";
import "./globals.css";
import "./workspace.css";
import "./resources.css";
import "katex/dist/katex.min.css";
import { AppShell } from "@/components/layout/AppShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, author, site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · 让面试更有底气`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: author.name, url: author.github }],
  creator: author.name,
  publisher: author.name,
  category: "education",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { telephone: false },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  openGraph: {
    title: `${site.name} · 让面试更有底气`,
    description: site.description,
    siteName: site.name,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${site.name} — Learn. Practice. Grow.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [absoluteUrl("/opengraph-image")],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": absoluteUrl("/#website"),
                name: site.name,
                alternateName: `${site.name} 面试学习工作台`,
                url: site.url,
                inLanguage: "zh-CN",
                publisher: { "@id": absoluteUrl("/#author") },
              },
              {
                "@type": "Person",
                "@id": absoluteUrl("/#author"),
                name: author.name,
                url: author.github,
                sameAs: [author.github, author.bilibili],
                image: absoluteUrl(author.avatar),
              },
            ],
          }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

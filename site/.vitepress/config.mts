import { defineConfig, type HeadConfig } from "vitepress";
import { katex } from "@mdit/plugin-katex";
import theme from "./generated/theme.json" with { type: "json" };

const siteUrl = (process.env.SITE_URL || "https://yxcr.top").replace(/\/$/, "");
const siteName = "YXCR OS";
const description = "XiangZi7 的编程与 AI 学习网站：系统学习 JavaScript、TypeScript、Vue、React、Python 与 AI 大模型知识，通过原理解析与代码实践构建自己的知识体系。";
const author = { name: "XiangZi7", github: "https://github.com/XiangZi7", bilibili: "https://space.bilibili.com/52419790" };

export default defineConfig({
  lang: "zh-CN",
  title: siteName,
  titleTemplate: `:title · ${siteName}`,
  description,
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: siteUrl },
  head: [
    ["link", { rel: "icon", href: "/icon.svg", type: "image/svg+xml" }],
    ["meta", { name: "author", content: author.name }],
    ["meta", { property: "og:site_name", content: siteName }],
    ["meta", { property: "og:locale", content: "zh_CN" }],
    ["script", { async: "", src: "https://www.googletagmanager.com/gtag/js?id=G-RVZ6G4NWQ0" }],
    ["script", {}, "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-RVZ6G4NWQ0');"],
  ],
  markdown: {
    lineNumbers: false,
    languageAlias: { mysql: "sql", mermaid: "txt", gitattributes: "txt", gitignore: "txt", liunx: "bash", plain: "txt" },
    config(md) {
      md.use(katex, { delimiters: "dollars", strict: false, logger: () => {} });
      // `<<< path` is VitePress snippet import syntax; imported articles use it as plain text.
      md.block.ruler.disable("snippet");
      // Imported articles are plain Markdown: disable raw HTML (the old renderer ignored it too)
      // and wrap them in v-pre so `{{ }}` in prose is not compiled as a Vue template.
      const parse = md.parse.bind(md);
      md.parse = (src, env) => {
        const imported = /^learn\//.test(env?.relativePath ?? "");
        md.set({ html: !imported });
        const tokens = parse(src, env);
        md.set({ html: true });
        if (imported) {
          const open = new md.core.State("", md, env).Token;
          const wrap = (content: string) => Object.assign(new open("html_block", "", 0), { content });
          tokens.unshift(wrap("<div v-pre>\n"));
          tokens.push(wrap("</div>\n"));
        }
        return tokens;
      };
    },
  },
  transformPageData(pageData) {
    const updated = pageData.frontmatter.updated;
    if (updated) pageData.lastUpdated = Date.parse(updated);
  },
  transformHead({ pageData }) {
    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, "");
    const url = `${siteUrl}/${path}`;
    const title = pageData.frontmatter.title || pageData.title;
    const head: HeadConfig[] = [
      ["link", { rel: "canonical", href: url }],
      ["meta", { property: "og:url", content: url }],
      ["meta", { property: "og:title", content: title ? `${title} · ${siteName}` : siteName }],
      ["meta", { property: "og:description", content: pageData.frontmatter.description || description }],
      ["meta", { property: "og:type", content: path.startsWith("learn/") ? "article" : "website" }],
    ];
    if (path.startsWith("learn/")) {
      const origin = pageData.frontmatter.origin;
      head.push(["script", { type: "application/ld+json" }, JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "TechArticle", "@id": `${url}#article`, headline: title,
            description: pageData.frontmatter.description, dateModified: pageData.frontmatter.updated,
            author: { "@type": "Person", name: origin?.name || author.name, url: origin?.url || author.github },
            publisher: { "@type": "Person", name: author.name, url: author.github },
            articleSection: pageData.frontmatter.category, inLanguage: "zh-CN", url, isAccessibleForFree: true,
            ...(origin ? { citation: origin.url, license: `${siteUrl}/copyright` } : {}),
          },
          {
            "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: "知识库", item: `${siteUrl}/library` },
              { "@type": "ListItem", position: 2, name: pageData.frontmatter.category, item: `${siteUrl}${pageData.frontmatter.categoryLink}` },
              { "@type": "ListItem", position: 3, name: title, item: url },
            ],
          },
        ],
      })]);
    }
    return head;
  },
  themeConfig: {
    logo: "/icon.svg",
    nav: [
      { text: "知识库", link: "/library", activeMatch: "^/(library|learn)" },
      { text: "学习方向", activeMatch: "^/topics/", items: theme.topics.map((topic) => ({ text: topic.title, link: `/topics/${topic.slug}` })) },
      { text: "关于", link: "/about" },
    ],
    sidebar: theme.sidebar,
    outline: { level: [2, 3], label: "本页目录" },
    socialLinks: [
      { icon: "github", link: author.github },
      { icon: "bilibili", link: author.bilibili },
    ],
    search: {
      provider: "local",
      options: {
        // Index titles, descriptions and headings only; full text of ~2000 articles is too large.
        async _render(src, env, md) {
          const html = await md.renderAsync(src, env);
          if (env.frontmatter?.search === false) return "";
          if (!env.relativePath.startsWith("learn/")) return html;
          const headings = html.match(/<h[1-3][^>]*>[\s\S]*?<\/h[1-3]>/g) ?? [];
          return `${headings[0] ?? ""}<p>${env.frontmatter?.description ?? ""}</p>${headings.slice(1).join("")}`;
        },
        translations: {
          button: { buttonText: "搜索", buttonAriaLabel: "搜索" },
          modal: {
            displayDetails: "显示详细列表", resetButtonTitle: "清除查询", backButtonTitle: "关闭搜索",
            noResultsText: "没有找到相关结果",
            footer: { selectText: "选择", navigateText: "切换", closeText: "关闭" },
          },
        },
      },
    },
    docFooter: { prev: "上一篇", next: "下一篇" },
    lastUpdated: { text: "最后更新", formatOptions: { dateStyle: "medium" } },
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "回到顶部",
    langMenuLabel: "语言",
    notFound: { title: "页面不存在", quote: "这个地址没有内容，可能已经移动或删除。", linkText: "返回首页" },
    footer: {
      message: '<a href="/about">关于</a> · <a href="/contact">联系</a> · <a href="/privacy">隐私</a> · <a href="/terms">条款</a> · <a href="/cookies">Cookie</a> · <a href="/copyright">版权与来源</a>',
      copyright: `© ${new Date().getFullYear()} ${author.name} · ${siteName}`,
    },
  },
});

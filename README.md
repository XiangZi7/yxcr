# YXCR OS

基于 Next.js 16、React、TypeScript 与 Tailwind CSS v4 的编程与 AI 学习网站，沿用 `ui/ui.png` 中的浅蓝灰视觉风格。

## 开发

```bash
pnpm install
pnpm dev
```

开发地址：[http://localhost:3002](http://localhost:3002)。同一项目同时只运行一个 `next dev` 实例。

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm test
pnpm build
```

## 部署到 Cloudflare Workers

项目使用 [OpenNext](https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/) 适配 Next.js 服务端功能。Worker 配置在 `wrangler.jsonc`，缓存配置在 `open-next.config.ts`。

部署前需在[当前账号的 Workers 套餐页面](https://dash.cloudflare.com/268729d711fadbb19006ad3ec3b26c32/workers/plans)开通 **Workers Paid**。文章服务端 Markdown 渲染会超出免费套餐的 10ms CPU 上限；当前配置将单次请求 CPU 上限设为 30,000ms。免费套餐会拒绝该配置并返回 `100328`，不能仅通过重新部署解除限制。参见 [Cloudflare CPU 限额](https://developers.cloudflare.com/workers/platform/limits/#cpu-time)。

```bash
pnpm exec wrangler login
pnpm preview
pnpm run deploy
```

- `pnpm preview` 构建并在本地 Workers 运行时预览，默认地址为 `http://localhost:8787`。
- `pnpm run deploy` 构建、复制 Markdown 正文、填充 KV 缓存并发布 `yxcr` Worker。已有构建时可运行 `pnpm exec opennextjs-cloudflare deploy`。
- 当前配置绑定此账号下的 `NEXT_INC_CACHE_KV`。更换 Cloudflare 账号时，修改 `account_id`，运行 `pnpm exec wrangler kv namespace create NEXT_INC_CACHE_KV`，再将返回的 ID 填入 `kv_namespaces`。
- 内容随代码部署更新，使用 KV 缓存，无需开通 R2。Durable Object 队列处理后台页面重验证；没有配置按标签缓存失效。后续如接入在线内容编辑或 `revalidateTag`，应补充 Tag Cache 和失效机制。
- `content/knowledge` 与 `content/questions` 的 `.md` 文件由 `scripts/copy-cloudflare-content.mjs` 复制到构建资源目录；线上通过 `ASSETS` 绑定读取，本地开发和普通 Node.js 部署仍读取原文件。
- Cloudflare 构建关闭当前 Next.js 16.4 与 OpenNext 组合存在兼容问题的 Cache Components / Partial Prefetching，使用常规 SSR 和静态预渲染，并通过构建别名改用 React 请求内缓存。本地开发和普通 `pnpm build` 保持原配置。
- `pnpm cf:typegen` 可生成本地 Cloudflare 绑定类型。生成文件、Worker 构建产物与本地运行状态均已加入忽略列表。

在 Cloudflare 控制台关联 Git 仓库实现自动部署时，选择 **Workers** 项目，使用以下设置：

| 设置 | 值 |
| --- | --- |
| 根目录 | 仓库根目录 |
| 构建命令 | `pnpm build:cloudflare` |
| 部署命令 | `pnpm exec opennextjs-cloudflare deploy` |
| 构建环境变量 | `NEXT_PUBLIC_SITE_URL=https://yxcr.top` |

使用 Node.js 22，安装依赖使用 `pnpm install --frozen-lockfile`。`NEXT_PUBLIC_SITE_URL` 会写入浏览器与预渲染输出，必须配置为**构建变量**；只修改 Worker 运行变量不会更新这些网址。更换域名时同步修改 `wrangler.jsonc` 中的值并重新构建。

首次发布后可先访问部署输出的 `workers.dev` 地址。绑定正式域名时，在 Worker 的 **Settings → Domains & Routes → Add → Custom Domain** 添加 `yxcr.top`；域名需位于对应 Cloudflare 账号中。正式域名默认用于 canonical 和 sitemap。

构建脚本在 Windows 上为 OpenNext 的目录符号链接提供 junction 回退，无需修改系统设置。OpenNext 对原生 Windows 的支持仍有限；遇到其他平台问题时，使用 WSL 或 Cloudflare 的 Linux 构建环境。

## 页面

| 地址                     | 页面                                    |
| ------------------------ | --------------------------------------- |
| `/`                      | 编程与 AI 学习首页、主题入口与学习方法  |
| `/learn/[slug]`           | 使用稳定可读网址的知识详情与学习笔记   |
| `/questions/[slug]`       | 旧文章地址，308 永久跳转到新网址        |
| `/overview`              | 学习概览、每日统计与知识版图            |
| `/library`               | 分类筛选、搜索、收藏与掌握状态          |
| `/library/[section]`     | 独立栏目入口，支持 `?page=2` 服务端分页 |
| `/topics/[topic]`        | 学习方向与语言专题，支持服务端分页      |
| `/resources`             | 兼容旧地址，308 重定向到 `/library`     |
| `/today`                 | 每日目标与学习计划                      |
| `/practice`              | 限时自测、参考思路与练习复盘            |
| `/saved`                 | 收藏题目与错题本                        |
| `/notes`                 | Markdown 文档导入、编辑、分屏预览与导出 |
| `/profile`               | 个人资料、主题偏好与学习记录导出        |
| `/about`、`/contact`      | 关于我们、联系邮箱与分类反馈入口        |
| `/privacy`、`/terms`      | 隐私政策与服务条款                      |
| `/cookies`、`/copyright`  | Cookie 与广告说明、版权与来源许可       |

## Markdown

- 题目元数据位于 `lib/interview/data.ts`，正文优先读取 `content/questions/{slug}.md`。没有对应文件时，由原有结构化内容生成 Markdown。
- 示例正文：`content/questions/vue-3.md`。可直接导入的示例文件：`content/examples/markdown-demo.md`。
- 使用 `react-markdown`、`remark-gfm`、`rehype-highlight` 渲染标题、列表、表格、引用、任务列表与代码高亮；目录使用真实 Markdown 语法树生成。
- 对未标注语言的常见代码进行保守识别，显式纯文本与字符图保持原样。支持 TypeScript、JavaScript、Vue/XML、Python、Shell、HTTP、Dockerfile、PowerShell 等语法；使用 KaTeX 渲染算法公式。
- 代码块支持三色圆点、语言名称、行号、横向滚动和复制。支持的常见语言包括 JavaScript、TypeScript、TSX、CSS、Python、JSON、Shell 等。
- 文件导入支持 `.md`、`.markdown`，单文件不超过 512 KB；导入的文档保存在当前浏览器中。编辑后点击保存，可导出标准 Markdown。
- 文件正文由 Next.js 缓存。修改仓库内的 Markdown 后，重启开发服务；生产环境重新构建即可更新。

## 字体与状态

- 正文字体按 `Inter → PingFang SC → Microsoft YaHei UI → Microsoft YaHei → 系统 sans-serif` 回退。
- 等宽字体按 `JetBrains Mono Variable → JetBrains Mono → SF Mono → Cascadia Code → Menlo → Consolas → 系统中文字体` 回退。
- 两种拉丁字体都仅引用本地 latin 可变字体文件，不加载其他语言子集。
- 图标使用 Lucide React，交互动画使用 Motion。Zustand 管理主题、学习状态、收藏、错题、笔记、计划与练习记录，并迁移旧版浏览器本地记录。
- 当前为前端本地学习工作台，自测练习尚未接入在线 AI 服务。

## 统一知识库

- `/library` 统一呈现原有题目与新增知识，使用一套栏目、搜索、收藏、计划和笔记。所有知识卡片及搜索结果都进入 `/learn/[slug]` 阅读正文。内部文章 ID、正文文件名和本地学习记录保持稳定。
- 正文存于 `content/knowledge/{id}.md`；目录元数据存于 `lib/resources/catalog.json`。只有实际存在正文的内容才进入列表和 sitemap，不将外站标题索引计为可阅读题目。
- `scripts/import-knowledge.py` 导入公开许可仓库的 Markdown，校验 Git blob 哈希，保留源文件及许可证清单，转换文档语法与内部章节链接。使用 Python 标准库即可运行，不需要额外抓取依赖。
- 首次运行会读取 GitHub 的公开文件树与许可证，原始 Markdown 缓存到忽略的 `.tmp-resources/markdown/`。仓库正文更新后，删除对应 `.tmp-resources/*-tree.json` 再执行导入以刷新快照。
- 独立维护的补充文章位于 `content/guides/`。旧的 `scripts/sync-resources.py` 只用于分析公开目录，输出独立索引，不会覆盖可阅读正文目录。
- 独立补写的 71 道网络题位于 `content/authored/network.md`，手写与算法讲义位于 `content/authored/handwritten.md`。`handwritten-topics.json` 维护明确的题目别名，重复入口跳转到同一篇实际讲义。
- `python -X utf8 scripts/sync-algorithms.py` 按现有算法目录稀疏下载对应开放许可题解，只导入解法与选定语言代码。首次运行需要 Git 和网络；保留 CC BY-SA 4.0 署名、许可与修改说明，题目描述正文不复制。
- 更新流程：先运行 `scripts/sync-resources.py` 核对公开目录，按需运行 `scripts/sync-algorithms.py`，再运行 `scripts/import-knowledge.py` 汇总正文，最后运行 `scripts/audit-knowledge.py`。后者在 `content/resources/coverage.json` 记录覆盖情况，`remaining-knowledge.json` 记录尚未关联的目录项；`complete: false` 表示全量补写尚未完成。
- `content/knowledge/manifest.json` 记录每篇改编文档的原路径、blob、作者、许可证及修改声明；完整许可证和通知保存在 `public/licenses/`。界面按知识主题组织，不按来源分组。
- 原站会员或未声明可再分发的正文不导入。构建和站内阅读均使用本地正文，不依赖来源站实时响应。

## 作者与 SEO

- 作者：[XiangZi7 · GitHub](https://github.com/XiangZi7)，[哔哩哔哩](https://space.bilibili.com/52419790)。侧栏、个人档案和文章署名包含社交入口。
- 作者头像来自 GitHub 公开头像，内置于 `public/images/xiangzi7-avatar.png`。Logo 为浅银蓝底色的几何折叠 X，与浏览器图标、分享卡片保持一致。
- 正式域名默认为 `https://yxcr.top`，可通过 `.env.example` 中的 `NEXT_PUBLIC_SITE_URL` 覆盖。生产环境修改后需要重新构建。
- 每页配置独立标题、摘要、canonical、Open Graph 和 Twitter 分享卡片，分享图片由 `/opengraph-image` 生成。
- `/robots.txt` 与 `/sitemap.xml` 自动生成。站点地图包含公开信息页、规范文章地址、学习方向、栏目及其分页；学习概览、今日计划、收藏、私人笔记、个人档案及站内搜索/个人筛选使用 `noindex, follow`。
- `/` 为独立学习首页，使用自身 canonical；知识详情使用 `/learn/[slug]`。旧文章和别名通过 HTTP 308 跳转，分页使用自身 canonical，第一页省略 `page` 参数。
- 使用 `main`、`article`、`nav`、`aside`、`header`、`footer` 和分级标题；题目正文在服务端输出。JSON-LD 包含 WebSite、Person、TechArticle 与 BreadcrumbList，并转义 HTML 特殊字符。
- 部署到正式域名后，可向搜索引擎站长平台提交 `https://yxcr.top/sitemap.xml`。

- `pnpm seo:sync` 更新稳定网址与文章修订记录；`pnpm build` 会自动先执行此同步。同步后的两个 JSON 注册文件应随内容修改一起提交，避免标题修改后改变既有地址。维护方法见 [SEO 路由与分页](docs/seo-migration.md)。

## 站点信息与广告准备

- 全站页脚提供关于我们、联系我们、隐私政策、服务条款、Cookie 与广告、版权声明六个入口；这些页面在服务端输出，并加入 sitemap。
- 公开维护者为 `XiangZi7`，联系邮箱为 `xiangzi777777@gmail.com`，统一在 `lib/site.ts` 维护；政策生效日期与页面清单位于 `lib/site-pages.ts`。
- 当前没有广告、统计追踪脚本或广告 Cookie；页面区分现有本地学习功能和未来 AdSense 数据处理。此次准备不代表广告账户或网站已获批准。
- 真实发布商 ID、站点验证、`ads.txt`、同意管理与上线检查见 [AdSense 接入准备](docs/adsense-readiness.md)。启用广告、统计或在线服务时，必须同步更新政策中的当前状态及数据处理说明。

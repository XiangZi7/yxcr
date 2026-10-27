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

## 页面

| 地址                     | 页面                                    |
| ------------------------ | --------------------------------------- |
| `/`                      | 编程与 AI 学习首页、主题入口与学习方法  |
| `/questions/[slug]`       | Markdown 知识详情、文章目录与学习笔记   |
| `/overview`              | 学习概览、每日统计与知识版图            |
| `/library`               | 分类筛选、搜索、收藏与掌握状态          |
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

## 统一知识知识库

- `/library` 统一呈现原有题目与新增知识，使用一套栏目、搜索、收藏、计划和笔记。所有知识卡片及搜索结果都进入 `/questions/[slug]` 阅读正文。
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
- `/robots.txt` 与 `/sitemap.xml` 自动生成。站点地图仅包含公开页面与题目详情；今日计划、收藏、私人笔记和个人档案使用 `noindex, follow`。
- `/` 为独立学习首页，使用自身 canonical；知识详情保留 `/questions/[slug]` 地址。
- 使用 `main`、`article`、`nav`、`aside`、`header`、`footer` 和分级标题；题目正文在服务端输出。JSON-LD 包含 WebSite、Person、TechArticle 与 BreadcrumbList，并转义 HTML 特殊字符。
- 部署到正式域名后，可向搜索引擎站长平台提交 `https://yxcr.top/sitemap.xml`。当前修改不包含域名解析或线上部署。

## 站点信息与广告准备

- 全站页脚提供关于我们、联系我们、隐私政策、服务条款、Cookie 与广告、版权声明六个入口；这些页面在服务端输出，并加入 sitemap。
- 公开维护者为 `XiangZi7`，联系邮箱为 `xiangzi777777@gmail.com`，统一在 `lib/site.ts` 维护；政策生效日期与页面清单位于 `lib/site-pages.ts`。
- 当前没有广告、统计追踪脚本或广告 Cookie；页面区分现有本地学习功能和未来 AdSense 数据处理。此次准备不代表广告账户或网站已获批准。
- 真实发布商 ID、站点验证、`ads.txt`、同意管理与上线检查见 [AdSense 接入准备](docs/adsense-readiness.md)。启用广告、统计或在线服务时，必须同步更新政策中的当前状态及数据处理说明。

# YXCR OS

基于 Next.js 16、React、TypeScript 与 Tailwind CSS v4 的面试学习工作台，沿用 `ui/ui.png` 中的浅蓝灰视觉风格。

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
| `/`、`/questions/[slug]` | Markdown 题目详情、文章目录与学习笔记   |
| `/overview`              | 学习概览、每日统计与知识版图            |
| `/library`               | 分类筛选、搜索、收藏与掌握状态          |
| `/resources`             | 三个来源的资源目录、栏目筛选、学习计划与笔记 |
| `/today`                 | 每日目标与学习计划                      |
| `/practice`              | 限时自测、参考思路与练习复盘            |
| `/saved`                 | 收藏题目与错题本                        |
| `/notes`                 | Markdown 文档导入、编辑、分屏预览与导出 |
| `/profile`               | 个人资料、主题偏好与学习记录导出        |

## Markdown

- 题目元数据位于 `lib/interview/data.ts`，正文优先读取 `content/questions/{slug}.md`。没有对应文件时，由原有结构化内容生成 Markdown。
- 示例正文：`content/questions/vue-3.md`。可直接导入的示例文件：`content/examples/markdown-demo.md`。
- 使用 `react-markdown`、`remark-gfm`、`rehype-highlight` 渲染标题、列表、表格、引用、任务列表与代码高亮；目录使用真实 Markdown 语法树生成。
- 代码块支持三色圆点、语言名称、行号、横向滚动和复制。支持的常见语言包括 JavaScript、TypeScript、TSX、CSS、Python、JSON、Shell 等。
- 文件导入支持 `.md`、`.markdown`，单文件不超过 512 KB；导入的文档保存在当前浏览器中。编辑后点击保存，可导出标准 Markdown。
- 文件正文由 Next.js 缓存。修改仓库内的 Markdown 后，重启开发服务；生产环境重新构建即可更新。

## 字体与状态

- 正文字体按 `Inter → PingFang SC → Microsoft YaHei UI → Microsoft YaHei → 系统 sans-serif` 回退。
- 等宽字体按 `JetBrains Mono Variable → JetBrains Mono → SF Mono → Cascadia Code → Menlo → Consolas → 系统中文字体` 回退。
- 两种拉丁字体都仅引用本地 latin 可变字体文件，不加载其他语言子集。
- 图标使用 Lucide React，交互动画使用 Motion。Zustand 管理主题、学习状态、收藏、错题、笔记、计划与练习记录，并迁移旧版浏览器本地记录。
- 当前为前端本地学习工作台，模拟面试尚未接入在线 AI 服务。

## 作者与 SEO

## 学习资源目录

- 接入[前端进阶之旅](https://feinterview.poetries.top)、[冰可乐网络面试专题](https://bingkele.cc/interview/new/network/)与 [AI Future](https://gouxinjie.github.io/column/AIFuture/)，覆盖截图中的主栏目、更多专项与知识库。
- `content/resources/sources.json` 定义来源和栏目，`lib/resources/catalog.json` 保存公开的标题、分类、章节锚点与原文链接，`summary.json` 记录实际目录数量。
- 资源与知识点目录不等于独立面试题数量；其中包含文档、章节知识点和专题入口。小程序题库作为原站专题入口接入，不用不透明的题目 ID 充当题目标题。
- 资源卡片支持原文阅读、收藏、标记掌握、加入计划和 Markdown 笔记，联动今日学习、收藏、我的笔记、概览和记录导出。学习数据保存在浏览器本地，原文及访问权限归来源站。
- 目录通过 `/api/resources` 按需读取；顶部全站搜索只请求匹配结果，不把完整目录放入首屏 JavaScript。资源页服务端输出首批内容与来源信息。
- 更新目录：安装 `beautifulsoup4` 后运行 `python -X utf8 scripts/sync-resources.py`。脚本只提取公开站点地图、链接与标题目录，不导入正文或会员内容；原始抓取缓存保存在忽略的 `.tmp-resources/`，生产构建不依赖来源站在线。

## 作者与 SEO

- 作者：[XiangZi7 · GitHub](https://github.com/XiangZi7)，[哔哩哔哩](https://space.bilibili.com/52419790)。侧栏、个人档案和文章署名包含社交入口。
- 作者头像来自 GitHub 公开头像，内置于 `public/images/xiangzi7-avatar.png`。Logo 为浅银蓝底色的几何折叠 X，与浏览器图标、分享卡片保持一致。
- 正式域名默认为 `https://yxcr.top`，可通过 `.env.example` 中的 `NEXT_PUBLIC_SITE_URL` 覆盖。生产环境修改后需要重新构建。
- 每页配置独立标题、摘要、canonical、Open Graph 和 Twitter 分享卡片，分享图片由 `/opengraph-image` 生成。
- `/robots.txt` 与 `/sitemap.xml` 自动生成。站点地图仅包含公开页面与题目详情；今日计划、收藏、私人笔记和个人档案使用 `noindex, follow`。
- `/` 与 `/questions/vue-3` 展示相同内容，以 `/questions/vue-3` 为规范地址，避免重复收录。
- 使用 `main`、`article`、`nav`、`aside`、`header`、`footer` 和分级标题；题目正文在服务端输出。JSON-LD 包含 WebSite、Person、TechArticle 与 BreadcrumbList，并转义 HTML 特殊字符。
- 部署到正式域名后，可向搜索引擎站长平台提交 `https://yxcr.top/sitemap.xml`。当前修改不包含域名解析或线上部署。

# Interview OS

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

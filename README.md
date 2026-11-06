# YXCR OS

基于 [VitePress 2](https://vitepress.dev/) 的编程与 AI 学习网站。全部文章在构建时从 `content/` 生成静态页面，部署到 Cloudflare Workers Static Assets。

## 开发

```bash
pnpm install
pnpm dev        # http://localhost:3002
pnpm build      # 输出到 site/.vitepress/dist
pnpm preview    # 预览构建结果
```

首次 `pnpm dev` 需要先生成约 2000 个页面，稍等片刻。完整构建约需 8 分钟，`build` 脚本已为 Node 分配 12 GB 堆内存。

## 目录

| 路径 | 内容 |
| --- | --- |
| `content/knowledge/*.md` | 导入的知识文章正文与来源清单 `manifest.json` |
| `content/questions/*.md`、`articles.json` | 原创文章正文与元数据 |
| `content/resources/catalog.json` | 全部导入文章的标题、分类、专栏 |
| `content/resources/route-map.json` | 文章 ID → 稳定网址（`/learn/<slug>`），由 `scripts/sync-seo.mjs` 维护，已发布的网址不会改变 |
| `content/resources/sources.json`、`topics.json` | 专栏与学习方向定义 |
| `site/*.md` | 首页与关于、联系、隐私等手写页面 |
| `site/.vitepress/` | VitePress 配置与主题 |
| `scripts/build-site.mjs` | 把 `content/` 生成为 `site/learn`、`site/topics`、`site/library` 页面和侧边栏数据（生成结果已忽略，不提交） |

`pnpm gen` 依次运行 `sync-seo.mjs`（为新文章分配网址、记录修改时间）与 `build-site.mjs`。`dev`、`build` 会自动执行。

## 页面

| 地址 | 页面 |
| --- | --- |
| `/` | 首页 |
| `/library` | 知识库总览 |
| `/library/<专栏>` | 专栏文章列表 |
| `/topics/<方向>` | 学习方向与细分专题 |
| `/learn/<slug>` | 文章详情，含来源署名与上一篇 / 下一篇 |
| `/about`、`/contact`、`/privacy`、`/terms`、`/cookies`、`/copyright` | 站点信息 |

搜索使用 VitePress 本地搜索，索引标题、简介与各级标题。

## 部署到 Cloudflare Workers

```bash
pnpm exec wrangler login
pnpm run deploy
```

- `wrangler.jsonc` 把 `site/.vitepress/dist` 作为静态资源目录。
- `cloudflare/worker.ts` 只处理旧链接的 308 跳转：`/questions/<id>` → `/learn/<slug>`，`/library?collection=`、`?category=`、分页地址 → 对应列表页，旧版交互页面（`/overview`、`/today`、`/practice`、`/saved`、`/notes`、`/profile`、`/resources`）→ `/library`。
- `scripts/check-site.mjs` 在构建后校验全部文章均已生成，且文件数不超过免费套餐的 20,000 限制。
- 站点地址默认 `https://yxcr.top`，可用构建环境变量 `SITE_URL` 覆盖。

在 Cloudflare 控制台关联 Git 仓库自动部署时：构建命令 `pnpm build`，部署命令 `pnpm exec wrangler deploy`，Node.js 22。

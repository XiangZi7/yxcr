# YXCR OS

基于 [VitePress 2](https://vitepress.dev/) 的编程与 AI 学习网站。全部文章在构建时从 `content/` 生成静态页面，部署到 Cloudflare Workers Static Assets。

## 开发

```bash
pnpm install
pnpm dev        # http://localhost:3002
pnpm build      # 输出到 site/.vitepress/dist
pnpm preview    # 预览构建结果
```

首次 `pnpm dev` 需要先生成约 2000 个页面，稍等片刻。完整构建会渲染全部文章；`build` 脚本将 Node 堆内存上限设为 6 GB，并将 VitePress 页面渲染并发限制为 8，以适配 Cloudflare Builds 的 8 GB 构建环境。

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

### Codex Cloudflare 插件

可以安装 [Cloudflare 官方 Codex 插件](https://github.com/cloudflare/skills)，让 Codex 使用部署技能和 Cloudflare MCP 管理站点：

```bash
codex plugin marketplace add cloudflare/skills
codex plugin add cloudflare@cloudflare
codex mcp login cloudflare --scopes offline_access,user:read,account:read,workers-ci.read,workers-ci.write,workers-scripts.read,workers-scripts.write
```

首次连接需在 Cloudflare 授权页面确认账户和权限。插件提供部署工具；推送代码后的持续自动部署使用下方的 Workers Builds 配置。

- `wrangler.jsonc` 把 `site/.vitepress/dist` 作为静态资源目录，并绑定自定义域名 `yxcr.top`，同时保留 `workers.dev` 访问地址。
- `cloudflare/worker.ts` 只处理旧链接的 308 跳转：`/questions/<id>` → `/learn/<slug>`，`/library?collection=`、`?category=`、分页地址 → 对应列表页，旧版交互页面（`/overview`、`/today`、`/practice`、`/saved`、`/notes`、`/profile`、`/resources`）→ `/library`。
- `scripts/check-site.mjs` 在构建后校验全部文章均已生成，且文件数不超过免费套餐的 20,000 限制。
- 站点地址默认 `https://yxcr.top`，可用构建环境变量 `SITE_URL` 覆盖。

### 从当前分支自动部署

在 Cloudflare 控制台打开现有的 `yxcr` Worker，进入 **Settings → Builds → Connect**，关联 GitHub 仓库，使用以下配置：

| 设置 | 值 |
| --- | --- |
| Git 仓库 | `XiangZi7/yxcr` |
| 生产分支 | `vitepress` |
| 根目录 | `/` |
| 构建命令 | `pnpm build` |
| 部署命令 | `pnpm exec wrangler deploy` |
| 构建变量 `NODE_VERSION` | `22.22.2` |
| 构建变量 `PNPM_VERSION` | `10.33.0` |
| 构建变量 `SITE_URL` | `https://yxcr.top` |

仓库中的 `.node-version` 固定 Node.js 版本，`package.json` 的 `packageManager` 固定 pnpm 版本；控制台中如有同名版本变量，请保持一致。

如果已关联仓库，在 **Settings → Builds → Branch control** 中把生产分支设为 `vitepress`。保存后，该分支的新推送会自动构建并部署到现有的 `yxcr` Worker 和 `yxcr.top`。完整构建后已包含站点文件校验，部署命令无需再次运行构建。

`SITE_URL` 在构建时读取，用于生成 canonical、Open Graph、robots 与 sitemap；它不会自动添加 Cloudflare 自定义域名。不要在仓库中保存 Cloudflare API Token，自动部署使用控制台配置的构建凭据。

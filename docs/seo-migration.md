# SEO 路由、分页与 sitemap

文章的内部 ID、Markdown 文件名以及浏览器学习记录不随公开网址迁移。

## 公开路由

- `/learn/canvas-barrage`：原 `/questions/res-56b6faa875af330a`。
- `/learn/vue-reactivity`：原 `/questions/vue-3`。
- 其他文章使用由标题生成的可读中文或英文名称。中文路径在浏览器地址栏可读，链接和 XML 中按 URL 标准编码。
- `/library?page=2`：全部知识的第二页，每页 24 篇。
- `/library/canvas`、`/library/computer-network`：独立栏目入口。
- `/topics/frontend`、`/topics/python`、`/topics/mcp`：学习方向与语言专题入口。

分页直接在服务器上按 URL 筛选并输出当前页的文章和可点击的翻页链接，不依赖爬虫点击按钮加载整份目录。每页有自身 canonical，第一页使用不带 `page` 的地址。

站内搜索 `q` 和个人学习状态筛选使用 `noindex, follow`。私人记录继续从当前浏览器读取，服务器不能据此返回个人数据。栏目与类别的组合筛选也不作为独立收录入口。

## 永久跳转

`app/questions/[slug]/route.ts` 使用真实 HTTP 308，将原 ID、原文章短名及可识别的历史别名直接跳到最终文章地址。跳转保留查询参数，浏览器会在目标不指定新片段时继承原书签锚点；页面内旧 Markdown 链接在渲染时转换为新链接并保留锚点。

旧 `/library?collection=...` 与 `/library?category=...` 通过 `proxy.ts` 在渲染前返回 HTTP 308。搜索、页码和个人状态参数保留。未知旧文章返回 404。

## 稳定网址注册表

`lib/resources/route-map.json` 保存内部 ID 到公开名称的映射，也包含历史别名。已发布名称优先保留；新增同名文章会得到数字后缀，不能与已有网址冲突。别名与实际文章 ID 重合时，实际文章优先。

更新或导入内容后执行：

```sh
pnpm seo:sync
pnpm test
pnpm build
```

`pnpm build` 自动执行同步。应提交同步后的 `route-map.json` 与 `content-revisions.json`，而不是在每次部署中丢弃并重建注册表。已有文章改标题会更新内容摘要与修订记录，不会自动改变已发布网址。

如需主动更换一个已发布名称，需要额外保存原公开名称的永久跳转；不要直接手工改注册表造成原 `/learn/...` 断链。

## 更新时间

`content-revisions.json` 根据正文及相关元数据的内容哈希保存修订记录。首次登记优先从 Git 的文档历史取得日期；无法确定时省略日期。后续只有实际内容变化才更新时间，重复同步和部署不会刷新日期。

这里的时间指本站整理内容的更新记录，不是原作者的首次发表日期。文章结构化数据与页面显示相同的本站更新时间。栏目分页的 `lastmod` 使用该页文章中最新的已知更新时间。

## sitemap 与发布检查

- sitemap 仅列规范地址、独立学习入口及其有效分页，不列旧 `/questions/...`、搜索或私人筛选地址。
- 不使用 Google 忽略的 `priority` 和 `changefreq` 作为优化手段。
- 保持 `NEXT_PUBLIC_SITE_URL` 为正式域名。迁移部署后确认旧链接 308、目标 200、新 canonical 与 sitemap 一致，再向 Search Console 提交 sitemap。
- 网址调整不保证收录或排名；仍需持续维护资料质量、实际内容增值、许可与来源说明。

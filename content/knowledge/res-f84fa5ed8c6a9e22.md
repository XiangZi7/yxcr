**原理：** 攻击者注入恶意脚本，用户浏览器执行后被窃取 cookie/token 或篡改页面。

**类型：** 存储型（存服务器）、反射型（URL 参数）、DOM 型。

**防御：**

- 对用户输入做**转义/编码**（HTML 实体）。
- 前端框架默认转义（React/Vue 的 `{{}}` 默认转义）。
- 设置 Cookie `HttpOnly`（JS 无法读取）。
- CSP（内容安全策略）限制可加载的脚本来源。
- 对富文本等需慎用 `v-html`/`dangerouslySetInnerHTML`。

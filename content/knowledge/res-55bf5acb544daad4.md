**网络层：**

- 减少 HTTP 请求（合并/按需/雪碧图）。
- 强缓存 + 协商缓存、CDN 加速。
- 开启 Gzip/Brotli 压缩、HTTP/2。
- 小图片转 base64、图片压缩/webp 格式、图片懒加载。

**资源层：**

- JS/CSS 压缩、代码分割、Tree shaking。
- 路由/组件懒加载，首屏只加载关键资源。
- `preload`（提前加载关键资源）、`prefetch`（空闲加载后续资源）。
- 第三方库按需引入、`defer`/`async` 处理 `<script>`。

**渲染层：**

- 减少 DOM 层级与重排重绘。
- `requestAnimationFrame` 做动画、`will-change`。
- 大数据列表虚拟滚动。

**框架层：**

- Vue：`keep-alive`、`Object.freeze`、`v-once`、`shallowRef`。
- React：`memo`、`useMemo`、`useCallback`、`React.lazy`。
- 长列表虚拟化。

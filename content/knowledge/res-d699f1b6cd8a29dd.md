1. 路由懒加载 + 组件懒加载（异步组件 `defineAsyncComponent`）。
2. 第三方库**按需引入**。
3. 大数据列表用**虚拟滚动**。
4. `keep-alive` 缓存组件。
5. 列表数据用 `Object.freeze()` 冻结，跳过响应式（只读展示数据）。
6. 大量静态内容用 `v-once` / `v-memo`。
7. 函数式组件 / 合理拆分组件。
8. 避免 `v-for` 与 `v-if` 同用。
9. 事件代理、防抖节流。
10. 合理使用 `shallowRef`/`shallowReactive` 减少深度代理。

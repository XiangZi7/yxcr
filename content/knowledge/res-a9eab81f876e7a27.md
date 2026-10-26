**渲染触发条件：** ① props/state 变化；② 父组件重渲染（默认会连带子组件，除非 memo）；③ 强制刷新。

**避免不必要的渲染：**

- `React.memo` 包裹子组件。
- `useMemo`/`useCallback` 稳定 props。
- 合理拆分组件，状态尽量下沉。

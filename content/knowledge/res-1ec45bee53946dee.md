| 对比项 | Vue | React |
| --- | --- | --- |
| 定位 | 渐进式框架，上手简单，提供指令 | 库，更自由，需搭配生态 |
| 模板 | HTML 模板 + 指令 | JSX（JS 语法扩展） |
| 数据 | **响应式**（Proxy），自动追踪 | 显式 setState，需要手动优化 |
| 状态更新 | 自动收集依赖 | 需 `memo`/`useMemo`/`useCallback` 优化 |
| 组件状态 | Options API / Composition API | 函数组件 + Hooks |
| 风格 | 模板语法，声明式更强 | 函数式，更接近 JS |
| 生态 | Pinia/Vue Router | Redux/Zustand/Next.js |

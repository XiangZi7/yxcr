```css
:root {
  --primary: #409eff;
  --bg: #fff;
}
.btn {
  background: var(--primary);
}
/* 暗色主题切换 */
[data-theme="dark"] {
  --bg: #1e1e1e;
}
```

> 通过切换根节点 `data-theme` 实现主题，无需重写样式，是 2024+ 面试加分项。

---

## 二、JavaScript 核心

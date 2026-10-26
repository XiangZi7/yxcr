**问题：** 父元素高度塌陷（无法被浮动子元素撑开），影响同级元素布局。

**清除方式：**

- 给父级定义 `height`（不灵活）。
- 在末尾加空元素并设 `clear: both`（会多一个无用 DOM）。
- 父级设 `overflow: hidden/auto`（触发 BFC）。
- 使用 `::after` 伪元素 + `clear: both`（推荐）。

```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

> 现代布局已用 flex/grid 替代浮动，但理解清除浮动原理仍是考点。

BFC 是一个独立的渲染区域，内部元素布局不会影响外部。常见特性：

1. 块级元素在垂直方向一个接一个排列。
2. BFC 内上下相邻元素的 `margin` 会重叠；创建新 BFC 可避免外边距塌陷。
3. 计算 BFC 高度时，会包含浮动元素的高度（可用于清除浮动）。
4. BFC 区域不会与浮动的容器重叠。
5. BFC 是独立容器，内部元素不会影响外部。
6. 每个元素的左 `margin` 与容器的左 `border` 接触。

**创建 BFC 的常见方式：**

- `float: left/right`（非 none）
- `position: absolute/fixed`
- `display: inline-block / flex / grid / table-cell`
- `overflow: hidden / auto / scroll`

**经典应用：** 清除浮动、避免 margin 塌陷、两栏布局（右侧 `overflow:hidden` 触发 BFC 不与左浮动重叠）。

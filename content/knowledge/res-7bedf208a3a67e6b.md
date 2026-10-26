BFC（Block Formatting Context）块级格式化上下文，是 Web 页面中盒模型布局的 CSS 渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。

形成 BFC 的条件：

- 根元素
- 浮动元素，`float` 除 `none`以外的值
- 定位元素，`position`（`absolute`，`fixed`）
- `display` 为以下其中之一的值 `inline-block`，`table-cell`，`table-caption`
- `overflow` 除了 `visible` 以外的值（`hidden`，`auto`，`scroll`）

BFC 的特性：

- 内部的 Box 会在垂直反向上一个接一个的放位置
- 垂直方向上的距离有`margin` 距离
- `BFC` 的区域不会与 `float` 的元素区域重叠
- 计算 `BFC` 的高度时，浮动元素也参与计算
- `BFC` 就是页面上的独立容器，容器里面的子元素不会影响外面元素

BFC的作用：

- 可以包含浮动元素
- 不被浮动元素覆盖
- 阻止父子元素的`margin`折叠

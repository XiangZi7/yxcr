给定结构：

```html
<div class="outer">
  <div class="left">左侧</div>
  <div class="right">右侧</div>
</div>
```

**方式一：浮动 + margin-left**

```css
.outer { height: 100px; }
.left { float: left; width: 200px; height: 100%; background: lightcoral; }
.right { margin-left: 200px; height: 100%; background: lightseagreen; }
```

**方式二：浮动 + BFC**

右侧 `overflow: hidden` 触发 BFC，使其不与浮动元素重叠。

```css
.left { float: left; width: 200px; height: 100%; background: lightcoral; }
.right { overflow: hidden; height: 100%; background: lightseagreen; }
```

**方式三：flex（最推荐）**

```css
.outer { display: flex; height: 100px; }
.left { width: 200px; height: 100%; background: lightcoral; }
.right { flex: 1; height: 100%; background: lightseagreen; }
```

**方式四：绝对定位**（脱离文档流，需父元素 `position: relative`）

```css
.outer { position: relative; height: 100px; }
.left { position: absolute; width: 200px; height: 100%; background: lightcoral; }
.right { margin-left: 200px; height: 100%; background: lightseagreen; }
```

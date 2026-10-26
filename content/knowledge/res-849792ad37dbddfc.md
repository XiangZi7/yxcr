目的：**中间一栏最先加载渲染（内容最重要）**；两侧固定，中间自适应；多用于 PC。

核心：使用 `float` + 两侧 `margin` 负值实现横向重叠；圣杯用父容器 `padding` 保护中间，双飞翼用中间内容 `margin` 保护。

**圣杯布局 HTML：**

```html
<div id="container" class="clearfix">
  <p class="center">我是中间</p>
  <p class="left">我是左边</p>
  <p class="right">我是右边</p>
</div>
```

**CSS：**

```css
#container { padding-left: 200px; padding-right: 150px; }
#container p { float: left; }
.center { width: 100%; }
.left {
  width: 200px;
  position: relative;
  left: -200px;
  margin-left: -100%;
}
.right { width: 150px; margin-right: -150px; }
.clearfix::after { content: ""; display: table; clear: both; }
```

**双飞翼布局 HTML：**

```html
<div id="main" class="float">
  <div id="main-wrap">main</div>
</div>
<div id="left" class="float">left</div>
<div id="right" class="float">right</div>
```

**CSS：**

```css
.float { float: left; }
#main { width: 100%; }
#main-wrap { margin: 0 190px; }
#left { width: 190px; margin-left: -100%; }
#right { width: 190px; margin-left: -190px; }
```

> 提示：`margin-left: -100%` 相对的是父元素 **content** 宽度（不含 padding/border）。理解 `margin` 负值是看懂这类布局的关键。

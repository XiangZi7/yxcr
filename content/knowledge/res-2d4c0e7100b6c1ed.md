---

**实现如下：**

```html
<div class="content">
  <p>内容只有一行居中</p>
</div>
<br />
<div class="content">
  <p>内容多行左对齐，内容多行左对齐</p>
</div>
```

CSS
```css
.content {
  width: 200px;
  border: 1px solid #ee2415;
  text-align: center;
  padding: 2px 5px;
}

/*display: inline-block使P的宽度根据文字的宽度伸缩 */
.content p {
  text-align: left;
  display: inline-block; // [!code ++]
}
```

**截图如下：**

![](https://raw.githubusercontent.com/gouxinjie/gouxinjie.github.io/main/docs/column/ProblemNotes/HtmlCss/images/left.png)

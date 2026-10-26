如果父盒子的高度低于子盒子的高度或者父盒子没有高度的话，会造成**高度塌陷**。

示例

```html
<div class="pic-box">
    <div class="container">
        <img class="pic-1" src="img1.jpg">
        <img class="pic-2" src="img2.jpg">
        <img class="pic-3" src="img3.jpg">
    </div>
</div>
```

由于我们没给父盒子设置高度，所以父盒子的高度是由图片撑开的。

![未浮动](https://img-blog.csdn.net/20170519142404832?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzE5MTU3NDU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

如果我们让img3浮动的话，会变成这样。

![浮动](https://img-blog.csdn.net/20170519142445808?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzE5MTU3NDU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

如果要解决高度塌陷，则需要**清除浮动**。

`webpack`官网大图告诉我们，资源经过`loader`处理，变成处理好的文件。如果不用`require`的话，图片资源是不会加入的。

所以我们应该这样引入

```js
imges:[
  {src:require("../../assets/imges/homePageSwipe/timg.jpg")},
  {src:require("../../assets/imges/homePageSwipe/timg1.jpg")},
  {src:require("../../assets/imges/homePageSwipe/timg2.jpg")},
  {src:require("../../assets/imges/homePageSwipe/timg3.jpg")}
]
```

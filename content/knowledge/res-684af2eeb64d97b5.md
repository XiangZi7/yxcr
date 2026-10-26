清除浮动的核心是`clear:both`;

1. 使用额外标签法（不推荐使用）

   在浮动的盒子下面再放一个标签，使用 `clear:both`;来清除浮动

2. 使用 `overflow` 清除浮动（不推荐使用）

   先找到浮动盒子的父元素，给父元素添加一个属性：`overflow:hidden`;就会清除子元素对页面的影响

3. 使用伪元素清除浮动(用的最多)

   ```css
   .clearfix:after {
     content: '';
     height: 0;
     line-height: 0;
     display: block;
     clear: both;
     visibility: hidden; /*将元素隐藏起来
      在页面的 clearfix 元素后面添加了一个空的块级元素
     （这个元素的高为 0 行高也为 0   并且这个元素清除了浮动）*/
   }
   .clearfix {
     zoom: 1; /*为了兼容 IE6*/
   }
   ```

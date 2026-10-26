## 1，添加水印

选择上传一张图片，使用cavans对其添加水印；
我这里使用的是`vantUI的uploader`组件上传图片，当然也可以使用原生的`input type='file'`来上传图片，然后拿到资源句柄；

**效果图如下：** 

水印是在左下角

![在这里插入图片描述](https://raw.githubusercontent.com/gouxinjie/gouxinjie.github.io/main/docs/column/Vue/images/watermark.png)


**代码讲解：**

大家主要看`afterRead(file)` 方法即可，其中需要注意的是：

1，形参file是拿到的图片的base64格式和其他的一些信息；

2，添加水印主要使用this.base64AddWaterMaker()这个方法进行操作，返回的是一个`promise`可以使用`await`进行接收也可以直接在`then`里面拿到返回的base64图片文件；

3，canvas.getContext('2d')创建了一个2d的画布，而ctx.drawImage()像是一个画笔，开始绘制图像；

4，img.onload()方法是一个异步加载的方法；

5，toDataURL()方法把图形转变成base64编码格式的png；

**代码如下：**
```vue
<template>
  <div>
    <p>用户选择一张图片进行添加水印并截图</p>
    
    <van-uploader :after-read="afterRead"> <van-button icon="plus" type="primary" size="small">上传文件</van-button></van-uploader>
    <van-button type="primary" size="small" class="del" @click="delImg">删除图片</van-button>
    <van-button type="primary" size="small" class="del" @click="screenShot">图片截图</van-button>
    <van-button type="primary" size="small" class="del" @click="jumpTo">跳转静态路由</van-button>

    <div class="preview" v-if="true">
      <div class="perview-box">
        <img :src="imgBase64" alt="" id="img" />
      </div>
    </div>
  </div>
</template>




```
## 2，图片截图


1， 图片截图功能需要引入一个插件，插件下载地址为：

[https://blog-static.cnblogs.com/files/lyt520/html2canvas.min.js](https://blog-static.cnblogs.com/files/lyt520/html2canvas.min.js)

2，下载完成后放到一个指定的位置 然后引入：

![在这里插入图片描述](https://raw.githubusercontent.com/gouxinjie/gouxinjie.github.io/main/docs/column/Vue/images/watermark-2.png)

3， 然后在 methods里面 新增一个`screenShot()`方法即可完成截图功能 

代码如下：

```javascript
 // 图片截图 使用了html2canvas插件
    screenShot() {
      if(!this.imgBase64){
        return alert("请先上传一张图片！")
      }
      // 获取截取的元素 这里直接获取img
      const imgEl = document.getElementById('img');
      html2canvas(imgEl, {
        scale: window.devicePixelRat, //设备像素比
        backgroundColor: null, //设置截图的背景色
        allowTaint: false, //允许跨域（图片跨域相关）
        useCORS: true, // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
        taintTest: true, //是否在渲染前测试图片
      }).then((canvas) => {
        // 导出图像
        let url = canvas.toDataURL('image/png', 1.0);
        var saveLink = document.createElement('a'); // 创建a链接
        saveLink.href = url;
        saveLink.download = 'downLoad.png'; // 下载的图片名称
        saveLink.click();
      });
    },
```

## 3，上传多个图片同时并添加上水印
如果你的业务需求是上传多个图片，同时要求添加水印；可以预览；我们也可以使用vant的uploader组件的 `v-model="fileList"`属性进行操作；

实现效果如下：

![在这里插入图片描述](https://raw.githubusercontent.com/gouxinjie/gouxinjie.github.io/main/docs/column/Vue/images/watermark-2.png)

实现代码如下：

**`注意`**：
一个`afterReadImg(`)方法就可以实现了，原理主要是监听（`this.$watch`）fileList的长度变化，如果新增了一张或多张，那就同步的把每一张都添加水印，并添加一个新的属性 `watermark: true`, //水印标识；

这是判断是否添加水印的标识，新增的图片肯定没有此属性，就可以添加水印了；


在循环的最后面要调用`unWatch()`方法解除监听，否则会引起无限监听循环；因为我们`this.fileList = templateList`改变了响应式属性fileList；


```vue
<template>
  <div>
    <p>请选择图片</p>
    <van-uploader v-model="fileList" :after-read="afterReadImg" multiple />
  </div>
</template>




```

**css代码如下：**

```css

.container{
    width: 402px;
    height: 300px;
    background:#ccc;
    border: 1px solid red;  
    margin: 0 auto;     
}
// 预览的盒子
.perview-box{
    width: 402px;
    height: 400px;
    border: 1px solid;
    margin-top: 10px;
    #img{
        display: inline-block;
        width: 400px;
        
    }
}
.del{
    margin-left: 20px;
}
```

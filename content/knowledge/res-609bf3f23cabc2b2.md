## 1，实现的效果和功能


**实现的功能如下**


1.  第一张是实现中国地图，点击任意省份能够显示 tooltip 提示框.
2.  第二张是点击`详情`能够在原来的位置显示此省的地图并可以查看详细.
3.  第三张是点击第二张左上角的返回箭头 重新返回到 第一张`中国地图`. 需要的保费模拟数据我会放到文章的最后面； 
   

echarts 官网参考：[https://echarts.apache.org/examples/zh/index.html](https://echarts.apache.org/examples/zh/index.html)

map 地图参考：[https://echarts.apache.org/zh/option.html#series-map](https://echarts.apache.org/zh/option.html#series-map)


**效果图： **

![在这里插入图片描述](https://raw.githubusercontent.com/gouxinjie/gouxinjie.github.io/main/docs/column/Vue/images/echarts.png) 

## 2，安装 ECharts

```javascript
npm install echarts --save // 最新版本
### 之前版本
npm install echarts@4.8.0 --save
### 卸载echarts
npm uninstall echarts
```


**注意： **

echarts5.0 版本下会有地图的数据，5.0 版本以上则没有地图的数据，需要自己下载；
或者安装低版本的 echart 把 map 文件夹的地图数据复制到高版本的对应文件下面也是可以的；


### 2.1 地图数据的位置

中国地图和各省的地图绘制信息需要放到依赖里面的 echarts 下面的 map 文件夹下面；如下图：

![在这里插入图片描述](https://raw.githubusercontent.com/gouxinjie/gouxinjie.github.io/main/docs/column/Vue/images/echarts-1.png) 

### 2.2 还可以自己下载这些地图数据

下载地址：[https://datav.aliyun.com/portal/school/atlas/area_selector](https://datav.aliyun.com/portal/school/atlas/area_selector) ![在这里插入图片描述](https://raw.githubusercontent.com/gouxinjie/gouxinjie.github.io/main/docs/column/Vue/images/echarts-2.png)

## 3，main.js 里面引入 echarts

```javascript
// 引入echarts
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts; //挂载到原型上面 也可以选择不挂载 直接在页面上引入
```

## 4，实现如下

主要流程如下：



**流程**


 1. 需要有一个容器 <div id="chinaMap" v-if="pyName === 'china'"></div> 且有唯一 id 值 
 2. this.$echarts.init(document.getElementById('chinaMap')); 用来初始化节点 id 和上面的相对应；
 3. require('../../../node_modules/echarts/map/json/china.json');用来导入相对应的地图数据，echarts 进行渲染 
 4. options配置项用来设置 echarts 图表的样式和展示数据相关； 
 5. this.myEchartsOfChina.setOption(options);设置图表实例的配置项以及数据，万能接口，所有参数和数据的修改都可以通过 setOption 完成，ECharts 会合并新的参数和数据，然后刷新图表；
 6. options：formatter; html 里面的点击事件需要在 mounted 里面先行注册一下，否则此方法会报错：undefined；
   


全部代码如下：

```javascript
<template>
  <div>
    <h1>echarts可视化</h1>
    <hr />
    <div class="container">
      
      <div class="china">
        
        <div @click="returnCh">
          <img v-if="pyName !== 'china'" class="returnImg" src="@/assets/img/return.png" />
        </div>
        <div id="chinaMap" v-if="pyName === 'china'"></div>
        <div id="provinceMap" v-if="pyName !== 'china'">111</div>
      </div>
    </div>
  </div>
</template>


```

## 5，遇到的问题

### 5.1 渲染中国地图时警告地图不存在：

![在这里插入图片描述](https://raw.githubusercontent.com/gouxinjie/gouxinjie.github.io/main/docs/column/Vue/images/echarts-3.png) **原因：series 里面的 map 属性没有和上面 registerMap 中的第一个参数值保持一致**

**正确写法：**

![在这里插入图片描述](https://raw.githubusercontent.com/gouxinjie/gouxinjie.github.io/main/docs/column/Vue/images/echarts-4.png)

### 5.2 点击 tooltip 提示框中的详情 生成省份地图时失败（显示的是空白），并且报错如下：

![在这里插入图片描述](https://raw.githubusercontent.com/gouxinjie/gouxinjie.github.io/main/docs/column/Vue/images/echarts-5.png) 

**原因：没有拿到 dom 节点，需要在 this.$nextTick API 里面获取 dom 节点**

**正确写法：**

```javascript
// 获取城市拼音
for (var i = 0, len = this.cityArr[0].length; i < len; i++) {
  if (cityName === this.cityArr[0][i]) {
    // 获取得城市拼音
    this.pyName = this.cityArr[1][i];
    // 使用nextTick Api 防止echarts初始化时避免节点不存在的报错
    this.$nextTick(() => {
      this.chinaMapFun(this.pyName);
    });
    break;
  } else {
    console.warn("没有找到此城市的拼音");
  }
}
```

## 6，用到的模拟数据

mapData.js

```javascript
// 定义全国省份的数组
export const cityArr = [
  [
    "上海",
    "河北",
    "山西",
    "内蒙古",
    "辽宁",
    "吉林",
    "黑龙江",
    "江苏",
    "浙江",
    "安徽",
    "福建",
    "江西",
    "山东",
    "河南",
    "湖北",
    "湖南",
    "广东",
    "广西",
    "海南",
    "四川",
    "贵州",
    "云南",
    "西藏",
    "陕西",
    "甘肃",
    "青海",
    "宁夏",
    "新疆",
    "北京",
    "天津",
    "重庆",
    "香港",
    "澳门",
    "台湾"
  ],
  [
    "shanghai",
    "hebei",
    "shanxi",
    "neimenggu",
    "liaoning",
    "jilin",
    "heilongjiang",
    "jiangsu",
    "zhejiang",
    "anhui",
    "fujian",
    "jiangxi",
    "shandong",
    "henan",
    "hubei",
    "hunan",
    "guangdong",
    "guangxi",
    "hainan",
    "sichuan",
    "guizhou",
    "yunnan",
    "xizang",
    "shanxi1",
    "gansu",
    "qinghai",
    "ningxia",
    "xinjiang",
    "beijing",
    "tianjin",
    "chongqing",
    "xianggang",
    "aomen",
    "taiwan"
  ]
];

// 全省保费信息
export const totalMap = [
  {
    achieveRate: 104.1,
    comname2: "山东",
    preium: 22855,
    target: 21960
  },
  {
    achieveRate: 154,
    comname2: "新疆",
    preium: 893,
    target: 580
  },
  {
    achieveRate: 128.6,
    comname2: "青海",
    preium: 935,
    target: 727
  },
  {
    achieveRate: 84.7,
    comname2: "四川",
    preium: 7357,
    target: 8687
  },
  {
    achieveRate: 79.4,
    comname2: "陕西",
    preium: 5102,
    target: 6427
  },
  {
    achieveRate: 84.6,
    comname2: "内蒙古",
    preium: 10448,
    target: 12357
  },
  {
    achieveRate: 0,
    comname2: "无锡",
    preium: 21,
    target: 0
  },
  {
    achieveRate: 74.8,
    comname2: "甘肃",
    preium: 5468,
    target: 7308
  },
  {
    achieveRate: 93.4,
    comname2: "海南",
    preium: 3746,
    target: 4009
  },
  {
    achieveRate: 71.4,
    comname2: "湖北",
    preium: 2870,
    target: 4017
  },
  {
    achieveRate: 39.4,
    comname2: "厦门",
    preium: 188,
    target: 477
  },
  {
    achieveRate: 63.3,
    comname2: "宁夏",
    preium: 1292,
    target: 2042
  },
  {
    achieveRate: 135.2,
    comname2: "江西",
    preium: 5616,
    target: 4155
  },
  {
    achieveRate: 0,
    comname2: "东莞",
    preium: 0,
    target: 0
  },
  {
    achieveRate: 95,
    comname2: "贵州",
    preium: 6931,
    target: 7298
  },
  {
    achieveRate: 39.1,
    comname2: "江苏",
    preium: 2303,
    target: 5893
  },
  {
    achieveRate: 0,
    comname2: "上海",
    preium: 6,
    target: 0
  },
  {
    achieveRate: 85.7,
    comname2: "天津",
    preium: 1672,
    target: 1950
  },
  {
    achieveRate: 60.1,
    comname2: "广东",
    preium: 3260,
    target: 5428
  },
  {
    achieveRate: 58.6,
    comname2: "青岛",
    preium: 1979,
    target: 3380
  },
  {
    achieveRate: 67.7,
    comname2: "吉林",
    preium: 12375,
    target: 18288
  },
  {
    achieveRate: 45.3,
    comname2: "湖南",
    preium: 4527,
    target: 9995
  },
  {
    achieveRate: 52.2,
    comname2: "北京",
    preium: 6,
    target: 12
  },
  {
    achieveRate: 86.1,
    comname2: "河南",
    preium: 5733,
    target: 6659
  },
  {
    achieveRate: 71.6,
    comname2: "安徽",
    preium: 3201,
    target: 4471
  },
  {
    achieveRate: 50.6,
    comname2: "黑龙江",
    preium: 3127,
    target: 6186,
    children: {
      comname2: "黑河市",
      preium: 3127,
      target: 6186,
      achieveRate: 50.6
    }
  },
  {
    achieveRate: 0,
    comname2: "苏州",
    preium: 193,
    target: 0
  },
  {
    achieveRate: 69.9,
    comname2: "山西",
    preium: 2051,
    target: 2935
  },
  {
    achieveRate: 77.6,
    comname2: "福建",
    preium: 4371,
    target: 5632
  },
  {
    achieveRate: 96.5,
    comname2: "浙江",
    preium: 9650,
    target: 10000
  },
  {
    achieveRate: 73.5,
    comname2: "辽宁",
    preium: 8753,
    target: 11915
  },
  {
    achieveRate: 78.1,
    comname2: "重庆",
    preium: 2587,
    target: 3313
  },
  {
    achieveRate: -0.5,
    comname2: "深圳",
    preium: 0,
    target: 24
  },
  {
    achieveRate: 112.5,
    comname2: "宁波",
    preium: 1233,
    target: 1096
  },
  {
    achieveRate: 122.7,
    comname2: "云南",
    preium: 5477,
    target: 4462
  },
  {
    achieveRate: 104.9,
    comname2: "河北",
    preium: 13750,
    target: 13107
  },
  {
    achieveRate: 66.4,
    comname2: "广西",
    preium: 1134,
    target: 1707
  }
];
```

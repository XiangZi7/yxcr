---


**主要实现功能：**


1. 表头字段可以进行正序倒序排序功能；
2. 展开收起功能；
3. 蓝色这一行是合计数据 需要单独出来进行渲染，否则排序的时候此行会排乱掉；
4. 注意表头数据 thList，title 是标题，isSort 是否可以进行排序，backgroundColor 是表示是否添加特殊的背景颜色；sortField 是根据什么字段进行排序； 


**效果图如下**：


**用到的模拟数据会放到最后面**

![在这里插入图片描述](https://raw.githubusercontent.com/gouxinjie/gouxinjie.github.io/main/docs/column/ProblemNotes/images/table.png){width=60%}




## vue 代码如下

```javascript
<template>
  <div class="organizationDetails">
    
    <div class="table-content" :class="controlHeight">
      <table ref="table" class="table">
        
        <tr class="top">
          <th v-for="(item_th, index_th) in thList" :key="index_th" :style="{ background: item_th.backgroundColor }">
            <span class="title">{{ item_th.title }}</span>
            <span class="sort" v-if="item_th.isSort" @click="needSort(item_th.sortField, index_th)" :class="[sortIndex === index_th && isNeedSort ? 'sortUp' : '']"></span>
          </th>
        </tr>
        
        <tr class="cont sum" v-for="(item, index) in totalData" :key="index + Math.random() * 24">
          <td>{{ item.comname2 }}</td>
          <td>{{ item.addAgent }}</td>
          <td>{{ item.addAgentRate }}</td>
          <td>{{ item.preium }}</td>
          <td>{{ item.premiumRate }}</td>
        </tr>

        
        <tr class="cont" v-for="(item_tr, index_tr) in data11" :key="index_tr">
          <td>{{ item_tr.comname2 }}</td>
          <td>{{ item_tr.addAgent }}</td>
          <td>{{ item_tr.addAgentRate }}</td>
          <td>{{ item_tr.preium }}</td>
          <td>{{ item_tr.premiumRate }}</td>
        </tr>
      </table>
    </div>
    
    <div class="more" v-if="showMoreCom">
      <span :colspan="thList.length" @click="showMoreFun(true)" v-if="!showMore">
        更多
        <van-icon name="arrow-down" />
      </span>
      <span :colspan="thList.length" @click="showMoreFun2(false)" v-else>
        收起全部
        <van-icon name="arrow-up" />
      </span>
    </div>
  </div>
</template>




```

## 模拟数据data.js

```javascript
// 模拟数据 11月份机构详细
export const data11 = [
  {
    comname2: "贵州",
    addAgent: 136,
    addAgentRate: "26.8%",
    preium: "1,005.0",
    premiumRate: "143.6%"
  },
  {
    comname2: "辽宁",
    addAgent: 201,
    addAgentRate: "100.5%",
    preium: "805.8",
    premiumRate: "71.1%",
    children: [
      {
        comname2: "辽阳",
        addAgent: 100,
        addAgentRate: "120.5%",
        preium: "805.8",
        premiumRate: "71.1%"
      },
      {
        comname2: "沈阳",
        addAgent: 101,
        addAgentRate: "130.5%",
        preium: "805.8",
        premiumRate: "71.1%"
      }
    ]
  },
  {
    comname2: "四川",

    addAgent: 27,
    addAgentRate: "13.5%",
    preium: "769.2",
    premiumRate: "100.9%"
  },
  {
    comname2: "江西",

    addAgent: 306,
    addAgentRate: "102%",
    preium: "748.8",
    premiumRate: "213.9%"
  },
  {
    comname2: "云南",

    addAgent: 42,
    addAgentRate: "8%",
    preium: "643.0",
    premiumRate: "213.6%"
  },
  {
    comname2: "福建",

    addAgent: 45,
    addAgentRate: "9.7%",
    preium: "514.5",
    premiumRate: "93.5%"
  },
  {
    comname2: "河南",

    addAgent: 26,
    addAgentRate: "26%",
    preium: "512.1",
    premiumRate: "88.3%"
  },
  {
    comname2: "安徽",

    addAgent: 1,
    addAgentRate: "0.3%",
    preium: "398.7",
    premiumRate: "102.2%"
  },
  {
    comname2: "甘肃",

    addAgent: 43,
    addAgentRate: "10.4%",
    preium: "393.6",
    premiumRate: "69.3%"
  },
  {
    comname2: "陕西",

    addAgent: 52,
    addAgentRate: "12.3%",
    preium: "374.5",
    premiumRate: "46.8%"
  },
  {
    comname2: "湖南",

    addAgent: 53,
    addAgentRate: "10.2%",
    preium: "356.5",
    premiumRate: "45%"
  },
  {
    comname2: "海南",

    addAgent: 36,
    addAgentRate: "12.8%",
    preium: "341.3",
    premiumRate: "103.7%"
  },
  {
    comname2: "湖北",

    addAgent: 25,
    addAgentRate: "6.5%",
    preium: "336.5",
    premiumRate: "98.1%"
  },
  {
    comname2: "青岛",

    addAgent: 10,
    addAgentRate: "6.7%",
    preium: "289.0",
    premiumRate: "111.1%"
  },
  {
    comname2: "黑龙江",

    addAgent: 5,
    addAgentRate: "2.2%",
    preium: "286.2",
    premiumRate: "54%"
  },
  {
    comname2: "广东",

    addAgent: 17,
    addAgentRate: "3.5%",
    preium: "265.9",
    premiumRate: "57.8%"
  },
  {
    comname2: "重庆",

    addAgent: 46,
    addAgentRate: "31.3%",
    preium: "240.6",
    premiumRate: "88.5%"
  },
  {
    comname2: "江苏",

    addAgent: 40,
    addAgentRate: "9.6%",
    preium: "238.2",
    premiumRate: "34%"
  },
  {
    comname2: "山西",

    addAgent: 178,
    addAgentRate: "57.6%",
    preium: "214.9",
    premiumRate: "75.1%"
  },
  {
    comname2: "新疆",

    addAgent: 13,
    addAgentRate: "130%",
    preium: "189.1",
    premiumRate: "370.8%"
  },
  {
    comname2: "青海",

    addAgent: 6,
    addAgentRate: "3.9%",
    preium: "152.1",
    premiumRate: "257.8%"
  },
  {
    comname2: "宁夏",

    addAgent: 7,
    addAgentRate: "2.5%",
    preium: "144.1",
    premiumRate: "87.9%"
  },
  {
    comname2: "广西",

    addAgent: 0,
    addAgentRate: "0%",
    preium: "108.7",
    premiumRate: "63.9%"
  },
  {
    comname2: "宁波",

    addAgent: 8,
    addAgentRate: "14.3%",
    preium: "106.8",
    premiumRate: "113.6%"
  },
  {
    comname2: "天津",

    addAgent: 16,
    addAgentRate: "7.8%",
    preium: "96.0",
    premiumRate: "68.6%"
  },
  {
    comname2: "苏州",

    addAgent: 0,
    addAgentRate: "0%",
    preium: "21.2",
    premiumRate: "0%"
  },
  {
    comname2: "厦门",

    addAgent: 0,
    addAgentRate: "0%",
    preium: "0.2",
    premiumRate: "0.4%"
  },
  {
    comname2: "深圳",

    addAgent: 0,
    addAgentRate: "0%",
    preium: "0.0",
    premiumRate: "0%"
  },
  {
    comname2: "无锡",

    addAgent: 0,
    addAgentRate: "0%",
    preium: "0.0",
    premiumRate: "0%"
  },
  {
    comname2: "上海",

    addAgent: 0,
    addAgentRate: "0%",
    preium: "0.0",
    premiumRate: "0%"
  },
  {
    comname2: "北京",

    addAgent: 0,
    addAgentRate: "0%",
    preium: "0.0",
    premiumRate: "0%"
  }
];
// 第一行合计数据
export const totalData = [
  {
    comname2: "合计",
    addAgent: 2864,
    addAgentRate: "29.7%",
    preium: "16,474.7",
    premiumRate: "94.9%"
  }
];
```

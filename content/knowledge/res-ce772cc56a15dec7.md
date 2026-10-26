**什么是深拷贝？**

`JS` 的引用类型数据在用=号复制给其他变量时，并不是像基本数据类型一样复制出一份，而是将这个变量的指针指向这个数据，即两个变量共用一个数据，当数据发生改变，则两个变量的值都会改变。

**怎么实现深拷贝**

有很多种方法，这里只列举几种

1. 使用循环

   使用循环遍历每个成员给新数组添加上对应的成员

   ```js
   function deepCopy(arr1, arr2) {
     for (var i = 0; i < arr1.length; ++i) {
       arr2[i] = arr1[i]
     }
   }
   ```

2. 使用ES6 扩展运算符

   ```js
   var arr = [1, 2, 3, 4, 5]
   var [...arr2] = arr
   arr[2] = 5
   console.log(arr) //[1,2,5,4,5]
   console.log(arr2) //[1,2,3,4,5]
   ```

3. 对象与 Json 相互转换

   即先把对象转化成 `json` 字符串，赋给其他变量的同时再转换成对象。但是这个方法如果成员属性值有 `undefined`、`function`、`symbol`，则会在转换过程中忽略

   ```js
   function deepClone(origin) {
     var clone = {}
     try {
       clone = JSON.parse(JSON.stringify(origin))
     } catch (e) {}
     return clone
   }
   ```

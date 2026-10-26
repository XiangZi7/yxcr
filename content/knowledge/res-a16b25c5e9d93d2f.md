- `typeof`：适合基本类型，但 `null`、数组、对象都返回 `object`。
- `instanceof`：检测引用类型在原型链上是否匹配，**无法判断基本类型**，且跨 iframe 会失效。
- `constructor`：可判断类型，但对象原型被改写后会失真。
- `Object.prototype.toString.call()`：**最精确**，返回 `[object Type]`。

```js
Object.prototype.toString.call([]);        // '[object Array]'
Object.prototype.toString.call(null);      // '[object Null]'
Object.prototype.toString.call(new Date()); // '[object Date]'
```

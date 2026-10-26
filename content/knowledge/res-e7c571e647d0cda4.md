构造函数生成的实例（`Number/String/Boolean/Array/Date/RegExp/Function`）重写了自身的 `toString`，会返回对应字符串；但 `Object`、`Math` 返回 `[object Object]`。精确判断需用：

```js
Object.prototype.toString.call(value); // 精确到 [object Type]
```

---

## 四、Vue3 相关

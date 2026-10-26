```js
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (map.has(obj)) return map.get(obj); // 解决循环引用

  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);
  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key], map);
  }
  return clone;
}
```

> 追问：`JSON.parse(JSON.stringify())` 的缺点——丢失 `undefined`/`function`/`Symbol`、Date 变字符串、无法处理循环引用、无法复制不可枚举属性。

原理：遍历左侧对象原型链，看是否等于右侧函数的 `prototype`。

```js
function myInstanceof(target, origin) {
  if (typeof target !== 'object' || target === null) return false;
  if (typeof origin !== 'function') throw new TypeError('origin must be function');
  let proto = Object.getPrototypeOf(target);
  while (proto) {
    if (proto === origin.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
```

> 注意：`123 instanceof Number` 为 `false`（基本类型不能 instanceof）；需 `new Number(123)` 才行。

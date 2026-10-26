- **`prototype`**：只有**函数**才有，存放被实例共享的属性和方法（如 `Array.prototype` 有 `map/push` 等）。
- **`__proto__`**：每个对象都有（非标准，浏览器实现），指向其构造函数的 `prototype`，即 `实例.__proto__ === 构造函数.prototype`。
- **原型链**：访问属性时先查自身，再沿 `__proto__` 逐层向上，直到 `Object.prototype`（其 `__proto__` 为 `null`）。

```js
class Person {
  constructor(name) { this.name = name; }
  say() { console.log(this.name); }
}
const p = new Person('Tom');
p.__proto__ === Person.prototype; // true
```

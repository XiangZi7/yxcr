- **全局作用域**：整个脚本内生效。
- **函数作用域（局部）**：函数内部生效，形参可视为局部变量。
- **块级作用域**：`let`/`const` 声明，在 `{}`（`if`/`for`/`switch`/`try-catch` 的 `catch`）内生效。

**作用域链（就近原则）：** 内部函数访问变量时，沿自身 → 父函数 → ... → 全局逐层向上查找。

```js
var num = 22;
function fn() {
  var num = 33;
  function fun() {
    console.log(num); // 33，就近取到外层 fn 的 num
  }
  fun();
}
fn();
```

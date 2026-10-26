通过条件判断让 TS 更精确推断类型：

```ts
function fn(x: string | number) {
  if (typeof x === 'string') {
    return x.toUpperCase(); // 收窄为 string
  }
  return x.toFixed(2); // 收窄为 number
}
```

允许定义类型参数，增强复用性：

```ts
function identity<T>(arg: T): T {
  return arg;
}
// 约束
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}
```

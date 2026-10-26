- `some`：有一项满足即 `true`，短路。
- `every`：全部满足才 `true`，有一项不满足即短路返回 `false`。
- `find`：返回第一个满足条件的元素（本身）。
- `includes`：判断是否包含某值，内部用 `SameValueZero`（能正确识别 `NaN`），比 `indexOf` 语义更清晰。

```js
[NaN].includes(NaN); // true
[NaN].indexOf(NaN);  // -1
```

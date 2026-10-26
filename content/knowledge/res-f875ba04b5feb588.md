- `useEffect(fn)`：每次渲染后执行。
- `useEffect(fn, [])`：仅挂载后执行一次（模拟 `mounted`）。
- `useEffect(fn, [dep])`：依赖变化时执行。
- **清理函数**：`return () => {}`，在卸载或下次 effect 前执行，用于清除定时器/取消订阅，防止内存泄漏。

```js
useEffect(() => {
  let ignore = false;
  fetchData().then((data) => { if (!ignore) setData(data); });
  return () => { ignore = true; };
}, []);
```

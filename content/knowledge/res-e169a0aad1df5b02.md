**防抖（debounce）：** 连续触发时只在最后一次触发后等待 `delay` 再执行。

```js
function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

**节流（throttle）：** 固定间隔内最多执行一次。

```js
function throttle(fn, interval = 300) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}
```

> 适用场景：防抖——输入框搜索、窗口 resize；节流——滚动加载、按钮防重复点击。

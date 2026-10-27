防抖把连续触发合并成最后一次调用，常用于输入搜索。节流限制单位时间内执行频率，常用于持续触发的滚动或拖动事件。下面分别展示尾沿防抖和时间戳式前沿节流，二者的边界行为并不相同。

```javascript
function debounce(fn, delay) {
  let timer
  function wrapped(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
  wrapped.cancel = () => clearTimeout(timer)
  return wrapped
}

function throttle(fn, interval) {
  let previous = -Infinity
  return function (...args) {
    const now = performance.now()
    if (now - previous >= interval) {
      previous = now
      return fn.apply(this, args)
    }
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function intervalWithTimeout(fn, delay) {
  let stopped = false
  let timer
  async function tick() {
    try { await fn() }
    finally { if (!stopped) timer = setTimeout(tick, delay) }
  }
  timer = setTimeout(tick, delay)
  return () => { stopped = true; clearTimeout(timer) }
}

function timeoutWithInterval(fn, delay) {
  const timer = setInterval(() => { clearInterval(timer); fn() }, delay)
  return () => clearInterval(timer)
}
```

定时器只保证不会早于目标延迟进入可执行阶段，不能保证精准时刻。异步任务的递归 setTimeout 可以避免固定间隔调度下任务重叠，但仍应处理任务失败与停止后的资源清理。

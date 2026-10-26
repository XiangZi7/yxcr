```js
function debounceImmediate(fn, delay = 300) {
  let timer;
  let immediate = true;
  return function (...args) {
    if (immediate) { fn.apply(this, args); immediate = false; }
    clearTimeout(timer);
    timer = setTimeout(() => { immediate = true; }, delay);
  };
}
```

---

## 十三、场景题与软技能

```js
Array.prototype.slice.call(arrayLike);
[].slice.call(arguments);
Array.from(arrayLike);        // 推荐
[...arrayLike];               // 需有迭代器
```

> `arguments` 没有 `slice`，借数组的 `slice` 让 `this` 指向 `arguments` 即可处理。

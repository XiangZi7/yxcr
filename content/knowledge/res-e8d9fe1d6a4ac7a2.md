```js
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (!promises || !promises[Symbol.iterator]) return reject(new TypeError('not iterable'));
    if (promises.length === 0) return resolve([]);
    const results = [];
    let count = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p).then(
        (v) => {
          results[i] = v;
          if (++count === promises.length) resolve(results);
        },
        reject
      );
    });
  });
};
```

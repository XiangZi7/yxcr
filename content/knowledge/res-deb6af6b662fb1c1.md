```js
// Set（最简洁）
[...new Set(arr)];

// filter + indexOf
arr.filter((item, index, self) => self.indexOf(item) === index);

// reduce
arr.reduce((acc, cur) => (acc.includes(cur) ? acc : [...acc, cur]), []);
```

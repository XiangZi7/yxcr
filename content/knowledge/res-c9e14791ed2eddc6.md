数组方法实现时容易忽略稀疏数组、长度快照、thisArg 与 reduce 初始值。下面用一个共享遍历函数说明 map、filter、every、some 和 forEach 的基本区别；适用范围是普通数组，不涉及子类 species 行为。

```javascript
function visitArray(array, callback, thisArg) {
  const length = array.length
  for (let i = 0; i < length; i++) {
    if (i in array) callback.call(thisArg, array[i], i, array)
  }
}

function myMap(array, callback, thisArg) {
  const result = new Array(array.length)
  visitArray(array, (value, i) => { result[i] = callback.call(thisArg, value, i, array) })
  return result
}

function myFilter(array, callback, thisArg) {
  const result = []
  visitArray(array, (value, i) => {
    if (callback.call(thisArg, value, i, array)) result.push(value)
  })
  return result
}

function myEvery(array, predicate) {
  for (let i = 0, n = array.length; i < n; i++) if (i in array && !predicate(array[i], i, array)) return false
  return true
}
function mySome(array, predicate) {
  for (let i = 0, n = array.length; i < n; i++) if (i in array && predicate(array[i], i, array)) return true
  return false
}
function myFindIndex(array, predicate) {
  for (let i = 0, n = array.length; i < n; i++) if (predicate(array[i], i, array)) return i
  return -1
}
function myFind(array, predicate) {
  const index = myFindIndex(array, predicate)
  return index < 0 ? undefined : array[index]
}
function myReduce(array, callback, ...initial) {
  let i = 0, value = initial[0]
  const n = array.length
  if (!initial.length) {
    while (i < n && !(i in array)) i++
    if (i === n) throw new TypeError('Empty array without initial value')
    value = array[i++]
  }
  for (; i < n; i++) if (i in array) value = callback(value, array[i], i, array)
  return value
}

const unique = array => [...new Set(array)]
const uniqueBy = (array, key) => [...new Map(array.map(item => [key(item), item])).values()]
const intersection = (a, b) => { const values = new Set(b); return [...new Set(a)].filter(value => values.has(value)) }
const arrayLikeToArray = value => Array.from(value)
const arrayOf = (...values) => values

function chunk(array, size) {
  if (!Number.isInteger(size) || size < 1) throw new RangeError('Invalid chunk size')
  const result = []
  for (let i = 0; i < array.length; i += size) result.push(array.slice(i, i + size))
  return result
}
function flat(array, depth = 1) {
  const result = []
  for (let i = 0; i < array.length; i++) {
    if (!(i in array)) continue
    const value = array[i]
    if (depth > 0 && Array.isArray(value)) result.push(...flat(value, depth - 1))
    else result.push(value)
  }
  return result
}
```

Map 方式按键去重时，上例保留最后一个值；如果要求保留第一次出现，应在 has 判断后再插入。reduce 还可实现计数、分组与累加，但不要为了使用 reduce 而让复杂流程变得难以理解。find 与 findIndex 会访问空位，这一点与 map、filter 不同。

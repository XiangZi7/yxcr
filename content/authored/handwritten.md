## promises | Promise：状态流转与组合器

Promise 把异步操作的结果表示为 pending、fulfilled、rejected 三种状态。状态一旦落定就不再改变。then 返回一个新的 Promise，回调的返回值、抛出的错误和返回的 thenable 决定新 Promise 的状态。回调通过微任务执行，不能在调用 then 的当前同步栈中立即运行。

### 实现组合器

all 保留输入顺序，任一拒绝就拒绝；allSettled 等待每个结果落定；race 采用最早落定的结果。空输入下 all 与 allSettled 得到空数组，race 保持等待。下面利用原生 Promise 处理单个值的状态同化，重点实现组合逻辑。

```javascript
function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const items = Array.from(iterable)
    const result = new Array(items.length)
    let remaining = items.length
    if (!remaining) return resolve([])
    items.forEach((item, index) => {
      Promise.resolve(item).then(value => {
        result[index] = value
        if (--remaining === 0) resolve(result)
      }, reject)
    })
  })
}

function promiseAllSettled(iterable) {
  return promiseAll(Array.from(iterable, item =>
    Promise.resolve(item).then(
      value => ({ status: 'fulfilled', value }),
      reason => ({ status: 'rejected', reason })
    )
  ))
}

function promiseRace(iterable) {
  return new Promise((resolve, reject) => {
    for (const item of iterable) Promise.resolve(item).then(resolve, reject)
  })
}

function promiseFinally(promise, callback) {
  return promise.then(
    value => Promise.resolve(callback()).then(() => value),
    error => Promise.resolve(callback()).then(() => { throw error })
  )
}

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (error, value) => error ? reject(error) : resolve(value))
    })
  }
}
```

### 从零实现时的检查点

resolve 不能只把状态改为成功：收到 Promise 或 thenable 时，要采用它的最终状态；访问 then 属性本身也可能抛错。then 的两个处理函数缺省时，需要透传成功值或失败原因。回调返回自身衍生的 Promise 时必须拒绝，避免循环解析。

Promise/A+ 主要规定 then 行为和解析过程，不等于所有原生 Promise 静态方法的完整规范。实现类以后，分别检查异步回调、链式透传、异常传播、thenable 只调用一次以及循环检测，再使用相应的符合性测试。不要把一个只支持单次回调的对象称为完整 Promise。

## scheduling | 异步任务：串行、并行与并发限制

并发控制的输入应该是尚未执行的任务函数，而不是已经启动的 Promise。下面的任务池只在工作槽空闲时调用下一个函数，结果按输入顺序保存。示例采用全部收集策略，单个任务失败不会阻止其他任务继续执行。

```typescript
async function asyncPool<T>(tasks: Array<() => Promise<T>>, limit: number) {
  if (!Number.isInteger(limit) || limit < 1) throw new RangeError('limit must be positive')
  const results: PromiseSettledResult<T>[] = new Array(tasks.length)
  let cursor = 0
  async function worker() {
    while (cursor < tasks.length) {
      const index = cursor++
      try {
        results[index] = { status: 'fulfilled', value: await tasks[index]() }
      } catch (reason) {
        results[index] = { status: 'rejected', reason }
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker))
  return results
}

async function serial<T>(tasks: Array<() => Promise<T>>) {
  const values: T[] = []
  for (const task of tasks) values.push(await task())
  return values
}

async function parallel<T>(tasks: Array<() => Promise<T>>) {
  return Promise.all(tasks.map(task => task()))
}
```

原生 Ajax、fetch 和一般异步函数都可以包装成任务函数。串行用于有依赖的步骤，并行用于相互独立且资源预算允许的操作，任务池用于控制连接数或服务压力。实际调度器还需要按需求加入取消信号、重试上限与背压。

## timers | 防抖、节流与定时器

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

## arrays | 数组遍历、去重、交集与分组

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

## cloning | 深拷贝、循环引用与冻结

深拷贝需要先限定类型范围。JSON 序列化不保留函数、undefined、Map、Set 等结构，也无法处理循环引用。浏览器与 Node 提供 structuredClone 处理多种可克隆类型，但函数和部分宿主对象仍不能被克隆。

下面的教学实现覆盖普通对象、数组、Date、RegExp、Map 和 Set，并用 WeakMap 保留循环引用关系。函数作为引用保留；不声称处理任意带内部槽的对象。

```javascript
function clone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value
  if (seen.has(value)) return seen.get(value)
  if (value instanceof Date) return new Date(value)
  if (value instanceof RegExp) return new RegExp(value.source, value.flags)
  if (value instanceof Map) {
    const result = new Map(); seen.set(value, result)
    for (const [key, item] of value) result.set(clone(key, seen), clone(item, seen))
    return result
  }
  if (value instanceof Set) {
    const result = new Set(); seen.set(value, result)
    for (const item of value) result.add(clone(item, seen))
    return result
  }
  const result = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value))
  seen.set(value, result)
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key)
    if ('value' in descriptor) descriptor.value = clone(descriptor.value, seen)
    Object.defineProperty(result, key, descriptor)
  }
  return result
}

function deepFreeze(value, seen = new WeakSet()) {
  if (value === null || typeof value !== 'object' || seen.has(value)) return value
  seen.add(value)
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key)
    if (descriptor && 'value' in descriptor) deepFreeze(descriptor.value, seen)
  }
  return Object.freeze(value)
}
```

Object.freeze 只冻结属性层面的修改，不能阻止 Map、Set 内部集合内容通过其方法改变。判断深相等、克隆与冻结是不同问题，不应把序列化结果相同视为任意对象语义相同。

## functions | 函数调用：this、构造、柯里化与组合

call 和 apply 调整一次调用的接收者，bind 创建固定部分参数与接收者的新函数。构造调用则不同：new 创建实例并连接原型，构造函数显式返回对象时采用该对象。不要使用修改全局原型的方式演示，以免影响页面中的其他代码。

```javascript
const myCall = (fn, receiver, ...args) => Reflect.apply(fn, receiver, args)
const myApply = (fn, receiver, args = []) => Reflect.apply(fn, receiver, args)

function myBind(fn, receiver, ...prefix) {
  function bound(...suffix) {
    if (new.target) return Reflect.construct(fn, [...prefix, ...suffix], new.target === bound ? fn : new.target)
    return Reflect.apply(fn, receiver, [...prefix, ...suffix])
  }
  return bound
}
const myNew = (Constructor, ...args) => Reflect.construct(Constructor, args)

function myInstanceOf(value, Constructor) {
  if (value === null || !['object', 'function'].includes(typeof value)) return false
  const target = Constructor.prototype
  if (target === null || typeof target !== 'object') throw new TypeError('Invalid prototype')
  for (let current = Object.getPrototypeOf(value); current; current = Object.getPrototypeOf(current)) {
    if (current === target) return true
  }
  return false
}

function curry(fn, arity = fn.length, collected = []) {
  return function (...args) {
    const all = [...collected, ...args]
    return all.length >= arity ? fn.apply(this, all) : curry(fn, arity, all)
  }
}
const compose = (...functions) => input => functions.reduceRight((value, fn) => fn(value), input)

function add(initial) {
  let total = initial
  function next(value) { total += value; return next }
  next.valueOf = () => total
  return next
}
console.log(Number(add(1)(2)(3))) // 6

const isSame = (a, b) => a === b ? a !== 0 || 1 / a === 1 / b : a !== a && b !== b
const getType = value => Object.prototype.toString.call(value).slice(8, -1)
const isArray = value => Array.isArray(value)
```

Reflect 展示了标准调用与构造操作的边界。如果面试要求不使用 Reflect，可以用临时 Symbol 属性说明普通对象接收者的基本原理，但它不能完整模拟严格模式、不可扩展对象及所有函数种类。上面的 myInstanceOf 也只演示普通原型链查找，不包含自定义 Symbol.hasInstance。

const 约束的是绑定不能被重新赋值，而不是对象内容不可变。无法仅靠一个运行时函数完整模拟词法声明的暂时性死区与作用域规则，应该分别解释绑定、属性描述符与冻结对象的区别。

## inheritance | 原型继承与 class

实例属性通常由构造函数初始化，共享方法放在原型对象上。ES5 的寄生组合继承让子类原型关联到父类原型，同时避免为了构造原型而额外调用一次父构造函数。

```javascript
function Parent(name) { this.name = name }
Parent.prototype.say = function () { return this.name }

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}
Child.prototype = Object.create(Parent.prototype, {
  constructor: { value: Child, writable: true, configurable: true }
})
Object.setPrototypeOf(Child, Parent)

class ModernChild extends Parent {
  constructor(name, age) {
    super(name)
    this.age = age
  }
}
```

实例原型链与构造函数本身的原型链是两条不同关系。extends 还涉及静态成员继承、super 调用和派生构造函数规则；把父类方法复制到子类对象上，不等于建立了同样的继承关系。手写 Object.create 的常见临时构造函数版本也不能完整处理 null 原型和所有属性描述符，因此应明确适用范围。

## strings | 字符串：查找、版本比较、格式化与大数

字符串题首先明确索引单位：JavaScript 的字符串长度和下标按 UTF-16 码元处理，不一定等于用户看到的字符数量。下面的查找和滑动窗口示例以码元为单位；显示层统计字符时需要另外考虑码点与字素簇。

```javascript
function indexOf(text, pattern) {
  if (!pattern.length) return 0
  outer: for (let i = 0; i <= text.length - pattern.length; i++) {
    for (let j = 0; j < pattern.length; j++) if (text[i + j] !== pattern[j]) continue outer
    return i
  }
  return -1
}

function longestUnique(text) {
  const last = new Map()
  let start = 0, best = 0
  for (let end = 0; end < text.length; end++) {
    start = Math.max(start, (last.get(text[end]) ?? -1) + 1)
    last.set(text[end], end)
    best = Math.max(best, end - start + 1)
  }
  return best
}

function commonPrefix(strings) {
  if (!strings.length) return ''
  let prefix = strings[0]
  for (const text of strings.slice(1)) {
    while (!text.startsWith(prefix)) prefix = prefix.slice(0, -1)
  }
  return prefix
}

function compareVersion(a, b) {
  const left = a.split('.'), right = b.split('.')
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    const x = BigInt(left[i] || '0'), y = BigInt(right[i] || '0')
    if (x !== y) return x < y ? -1 : 1
  }
  return 0
}

function addBigIntegers(a, b) {
  let i = a.length - 1, j = b.length - 1, carry = 0, result = ''
  while (i >= 0 || j >= 0 || carry) {
    const sum = Number(a[i--] || 0) + Number(b[j--] || 0) + carry
    result = String(sum % 10) + result
    carry = Math.floor(sum / 10)
  }
  return result.replace(/^0+(?=\d)/, '')
}

const toCamelCase = text => text.replace(/[-_]([a-z])/g, (_, letter) => letter.toUpperCase())
const formatThousands = number => new Intl.NumberFormat('en-US').format(number)
const padStart = (text, length, fill = ' ') => text.padStart(length, fill)
const padEnd = (text, length, fill = ' ') => text.padEnd(length, fill)

function mostFrequent(text) {
  const counts = new Map()
  let winner = '', maximum = 0
  for (const char of text) {
    const count = (counts.get(char) ?? 0) + 1
    counts.set(char, count)
    if (count > maximum) { maximum = count; winner = char }
  }
  return { char: winner, count: maximum }
}
```

版本比较示例只处理非负整数段，不覆盖 SemVer 的预发布与构建元信息。大整数加法示例只接受非负十进制整数字符串。限定输入域是正确算法的一部分，不能只给出看起来可运行的代码。

## caches | URL、Cookie、嵌套路径与过期缓存

优先使用 URL 和 URLSearchParams 解析查询参数，避免在问号、片段和编码字符之间做错误的字符串切割。相同查询键可能出现多次，是否转成数组应由业务约定。

```javascript
const params = new URL('https://example.com/?tag=a&tag=b').searchParams
console.log(params.getAll('tag')) // ['a', 'b']

function getCookie(name, cookies = document.cookie) {
  const pair = cookies.split(';').map(part => part.trim()).find(part => part.startsWith(encodeURIComponent(name) + '='))
  return pair ? decodeURIComponent(pair.slice(pair.indexOf('=') + 1)) : undefined
}

function setCache(key, value, ttl) {
  localStorage.setItem(key, JSON.stringify({ value, expiresAt: Date.now() + ttl }))
}
function getCache(key) {
  const raw = localStorage.getItem(key)
  if (raw === null) return undefined
  try {
    const entry = JSON.parse(raw)
    if (entry.expiresAt <= Date.now()) { localStorage.removeItem(key); return undefined }
    return entry.value
  } catch { return undefined }
}

function getPath(object, path) {
  return path.split('.').reduce((value, key) => value == null ? undefined : value[key], object)
}
function setPath(object, path, value) {
  const keys = path.split('.')
  if (keys.some(key => ['__proto__', 'prototype', 'constructor'].includes(key))) throw new Error('Unsafe path')
  let target = object
  for (const key of keys.slice(0, -1)) target = target[key] ??= {}
  target[keys.at(-1)] = value
  return object
}
```

脚本不能读取 HttpOnly Cookie。localStorage 写入也可能因为存储策略或容量限制而失败，应用应处理错误。上面的点分路径不支持键名包含点号的对象，不能当成完整路径表达式解析器。

## collections | LRU、队列、链表与字典树

LRU 在容量达到上限时淘汰最久未使用的项目。Map 保留插入顺序，可以通过删除再插入把一次访问移动到最近使用的位置。若要求严格最坏常数时间，一般结合哈希表与双向链表实现。

```javascript
class LRUCache {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity < 1) throw new RangeError('Invalid capacity')
    this.capacity = capacity
    this.values = new Map()
  }
  get(key) {
    if (!this.values.has(key)) return undefined
    const value = this.values.get(key)
    this.values.delete(key); this.values.set(key, value)
    return value
  }
  put(key, value) {
    this.values.delete(key); this.values.set(key, value)
    if (this.values.size > this.capacity) this.values.delete(this.values.keys().next().value)
  }
}

class Queue {
  constructor() { this.input = []; this.output = [] }
  push(value) { this.input.push(value) }
  pop() {
    if (!this.output.length) while (this.input.length) this.output.push(this.input.pop())
    return this.output.pop()
  }
}

class ListNode { constructor(value, next = null) { this.value = value; this.next = next } }
function reverseList(head) {
  let previous = null
  while (head) { const next = head.next; head.next = previous; previous = head; head = next }
  return previous
}
function reverseListRecursive(head) {
  if (!head?.next) return head
  const tail = reverseListRecursive(head.next)
  head.next.next = head; head.next = null
  return tail
}
function kthFromEnd(head, k) {
  if (!Number.isInteger(k) || k < 1) return null
  let fast = head, slow = head
  for (let i = 0; i < k; i++) { if (!fast) return null; fast = fast.next }
  while (fast) { fast = fast.next; slow = slow.next }
  return slow
}

class Trie {
  constructor() { this.root = new Map() }
  insert(word) {
    let node = this.root
    for (const char of word) { if (!node.has(char)) node.set(char, new Map()); node = node.get(char) }
    node.terminal = true
  }
  search(word) {
    let node = this.root
    for (const char of word) { if (!node.has(char)) return false; node = node.get(char) }
    return node.terminal === true
  }
}
```

两个栈组成队列时，每个元素最多进入和离开每个栈一次，因此均摊时间为常数。递归反转链表有调用栈开销，极长链表应优先使用迭代。字典树适合前缀检索，但需要权衡节点数量和字符范围。

## sorting | 排序、二分查找与逆序对

排序题要同时讨论复杂度、稳定性和是否修改原数组。冒泡与插入排序在保留相等元素原顺序的实现下可以稳定；选择排序的常见交换实现不稳定；快速排序平均较快，但糟糕的枢轴选择会退化。

```javascript
function bubbleSort(input) {
  const a = [...input]
  for (let end = a.length - 1; end > 0; end--) {
    let changed = false
    for (let i = 0; i < end; i++) if (a[i] > a[i + 1]) {
      [a[i], a[i + 1]] = [a[i + 1], a[i]]; changed = true
    }
    if (!changed) break
  }
  return a
}
function insertionSort(input) {
  const a = [...input]
  for (let i = 1; i < a.length; i++) {
    const value = a[i]
    let j = i - 1
    while (j >= 0 && a[j] > value) { a[j + 1] = a[j]; j-- }
    a[j + 1] = value
  }
  return a
}
function selectionSort(input) {
  const a = [...input]
  for (let i = 0; i < a.length; i++) {
    let minimum = i
    for (let j = i + 1; j < a.length; j++) if (a[j] < a[minimum]) minimum = j
    ;[a[i], a[minimum]] = [a[minimum], a[i]]
  }
  return a
}
function quickSort(a) {
  if (a.length < 2) return [...a]
  const pivot = a[Math.floor(a.length / 2)]
  return [...quickSort(a.filter(x => x < pivot)), ...a.filter(x => x === pivot), ...quickSort(a.filter(x => x > pivot))]
}
function binarySearch(a, target) {
  let left = 0, right = a.length - 1
  while (left <= right) {
    const middle = left + Math.floor((right - left) / 2)
    if (a[middle] === target) return middle
    if (a[middle] < target) left = middle + 1
    else right = middle - 1
  }
  return -1
}
function countInversions(input) {
  function sort(a) {
    if (a.length < 2) return { a, count: 0 }
    const middle = Math.floor(a.length / 2)
    const left = sort(a.slice(0, middle)), right = sort(a.slice(middle))
    let i = 0, j = 0, count = left.count + right.count
    const merged = []
    while (i < left.a.length && j < right.a.length) {
      if (left.a[i] <= right.a[j]) merged.push(left.a[i++])
      else { merged.push(right.a[j++]); count += left.a.length - i }
    }
    return { a: merged.concat(left.a.slice(i), right.a.slice(j)), count }
  }
  return sort(input).count
}
```

这里的快速排序为便于理解创建了额外数组，不是原地排序。二分查找要求搜索区间有单调性，查找第一个大于等于目标的位置时应调整边界定义，不能直接套用“找到就返回”的版本。逆序对通过归并过程中统计跨区间的逆序关系，将双重枚举降到 O(n log n)。

## trees | 树的遍历、搜索与列表转换

深度优先遍历使用递归或显式栈，广度优先遍历使用队列。前序、中序、后序的区别是根节点相对于左右子树的访问位置。二叉搜索树则额外满足键的有序关系，因此可以按比较结果选择下一条分支。

```javascript
function traverse(root, order = 'pre', result = []) {
  if (!root) return result
  if (order === 'pre') result.push(root.value)
  traverse(root.left, order, result)
  if (order === 'in') result.push(root.value)
  traverse(root.right, order, result)
  if (order === 'post') result.push(root.value)
  return result
}
function levelOrder(root) {
  if (!root) return []
  const queue = [root], result = []
  let head = 0
  while (head < queue.length) {
    const end = queue.length, level = []
    while (head < end) {
      const node = queue[head++]; level.push(node.value)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(level)
  }
  return result
}
function searchBST(root, value) {
  while (root && root.value !== value) root = value < root.value ? root.left : root.right
  return root
}
function listToTree(list) {
  const nodes = new Map(list.map(item => [item.id, { ...item, children: [] }]))
  const roots = []
  for (const item of list) {
    const node = nodes.get(item.id), parent = nodes.get(item.parentId)
    if (parent) parent.children.push(node)
    else roots.push(node)
  }
  return roots
}
function treeToList(roots) {
  const output = []
  function walk(node, parentId = null) {
    const { children = [], ...rest } = node
    output.push({ ...rest, parentId })
    children.forEach(child => walk(child, node.id))
  }
  roots.forEach(root => walk(root))
  return output
}
```

列表转换示例要求 id 唯一、父子关系无环。生产导入数据时，应先检查重复 id、孤儿节点和循环关系。递归遍历的空间开销取决于树高，而不是所有情况下都是 O(log n)；退化为链时可以达到 O(n)。

## events | 发布订阅、观察者与事件总线

发布订阅通过一个事件通道解耦发送者与接收者；观察者模式通常由被观察对象持有订阅者。无论使用哪种形式，都需要明确订阅的生命周期、重复订阅、取消订阅以及监听器执行中修改订阅集合的行为。

```javascript
class EventEmitter {
  constructor() { this.events = new Map() }
  on(name, listener) {
    if (!this.events.has(name)) this.events.set(name, new Set())
    this.events.get(name).add(listener)
    return () => this.off(name, listener)
  }
  off(name, listener) {
    const listeners = this.events.get(name)
    listeners?.delete(listener)
    if (listeners?.size === 0) this.events.delete(name)
  }
  once(name, listener) {
    const off = this.on(name, (...args) => { off(); listener(...args) })
    return off
  }
  emit(name, ...args) {
    for (const listener of [...(this.events.get(name) ?? [])]) listener(...args)
  }
}

class Subject {
  constructor() { this.observers = new Set() }
  subscribe(observer) { this.observers.add(observer); return () => this.observers.delete(observer) }
  next(value) { for (const observer of [...this.observers]) observer(value) }
}
```

上例明确采用同步通知，监听器抛错会中断本次通知链。如果业务要求隔离监听器错误，应分别捕获并报告。Vue 事件总线本质也是类似通道，但组件卸载时必须取消订阅；复杂全局状态更适合有明确更新与追踪能力的状态管理方案。

## reactivity | 响应式：依赖收集、触发与双向绑定

响应式需要建立“哪个副作用读取了哪个对象属性”的对应关系。读取时收集依赖，写入变化时触发依赖。下面是只演示普通对象属性与同步 effect 的最小结构，不包含嵌套代理、调度批处理和完整生命周期。

```javascript
const dependencies = new WeakMap()
let activeEffect

function effect(fn) {
  function runner() {
    const previous = activeEffect
    activeEffect = runner
    try { fn() } finally { activeEffect = previous }
  }
  runner()
  return runner
}
function reactive(target) {
  return new Proxy(target, {
    get(object, key, receiver) {
      if (activeEffect) {
        if (!dependencies.has(object)) dependencies.set(object, new Map())
        const properties = dependencies.get(object)
        if (!properties.has(key)) properties.set(key, new Set())
        properties.get(key).add(activeEffect)
      }
      return Reflect.get(object, key, receiver)
    },
    set(object, key, value, receiver) {
      const oldValue = Reflect.get(object, key, receiver)
      const success = Reflect.set(object, key, value, receiver)
      if (success && !Object.is(oldValue, value)) {
        for (const run of [...(dependencies.get(object)?.get(key) ?? [])]) if (run !== activeEffect) run()
      }
      return success
    }
  })
}

const state = reactive({ message: 'Hello' })
const input = document.querySelector('input')
effect(() => { input.value = state.message })
input.addEventListener('input', event => { state.message = event.target.value })
```

双向绑定由两条单向路径组成：状态变化更新控件，输入事件更新状态。完整实现还需要清理分支切换后不再使用的依赖、防止无限递归、处理数组与集合，以及停止 effect。不能把这段最小演示当成 Vue 内部实现的完整替代。

## browser | DOM 转换、懒加载、分片渲染与拖拽

DOM 示例的重点是分清数据、节点与事件。文本内容使用 textContent，避免把未知字符串当成 HTML 执行。给大量子节点绑定同类事件时，可以把监听器放在容器上，由事件委托判断命中的目标。

```javascript
function domToJSON(element) {
  return {
    tag: element.tagName.toLowerCase(),
    attributes: Object.fromEntries([...element.attributes].map(attr => [attr.name, attr.value])),
    children: [...element.childNodes].map(node => node.nodeType === Node.TEXT_NODE ? node.textContent : node.nodeType === Node.ELEMENT_NODE ? domToJSON(node) : null).filter(node => node !== null)
  }
}
function render(node) {
  if (typeof node === 'string') return document.createTextNode(node)
  const element = document.createElement(node.tag)
  for (const [key, value] of Object.entries(node.attributes ?? {})) element.setAttribute(key, value)
  for (const child of node.children ?? []) element.appendChild(render(child))
  return element
}
function lazyImages(images) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src
      observer.unobserve(entry.target)
    }
  })
  images.forEach(image => observer.observe(image))
  return () => observer.disconnect()
}
async function renderChunks(container, items, create, chunkSize = 100) {
  for (let start = 0; start < items.length; start += chunkSize) {
    const fragment = document.createDocumentFragment()
    for (const item of items.slice(start, start + chunkSize)) fragment.appendChild(create(item))
    container.appendChild(fragment)
    await new Promise(requestAnimationFrame)
  }
}

function draggable(element) {
  const start = event => {
    element.setPointerCapture(event.pointerId)
    const left = event.clientX, top = event.clientY
    const move = current => { element.style.transform = `translate(${current.clientX - left}px, ${current.clientY - top}px)` }
    const stop = () => { element.removeEventListener('pointermove', move); element.removeEventListener('pointerup', stop); element.removeEventListener('pointercancel', stop) }
    element.addEventListener('pointermove', move)
    element.addEventListener('pointerup', stop)
    element.addEventListener('pointercancel', stop)
  }
  element.addEventListener('pointerdown', start)
  return () => element.removeEventListener('pointerdown', start)
}
```

分片渲染减少单次阻塞，但不减少最终节点数量；超长列表通常还需要虚拟化。拖拽示例从当前指针起点计算本次位移，没有实现累积位置、边界限制或键盘操作。生产控件还要处理这些交互和可访问性要求。

## iterators | 迭代器、Generator 与异步执行

可迭代对象通过 Symbol.iterator 返回迭代器，迭代器的 next 返回包含 value 与 done 的结果。Generator 自动维护暂停位置；async/await 则把异步等待组织成更接近顺序代码的控制流。

```javascript
function range(start, end) {
  return {
    [Symbol.iterator]() {
      let value = start
      return { next: () => value < end ? { value: value++, done: false } : { value: undefined, done: true } }
    }
  }
}

function runGenerator(factory, ...args) {
  return new Promise((resolve, reject) => {
    const iterator = factory(...args)
    function advance(method, value) {
      let step
      try { step = iterator[method](value) } catch (error) { reject(error); return }
      if (step.done) { resolve(step.value); return }
      Promise.resolve(step.value).then(
        result => advance('next', result),
        error => advance('throw', error)
      )
    }
    advance('next')
  })
}

runGenerator(function* () {
  const first = yield Promise.resolve(2)
  return first + 3
}).then(console.log) // 5
```

等待失败时，把错误交回 iterator.throw，让 Generator 内部的 try/catch 有机会处理，而不是直接结束外层任务。这个执行器说明自动推进的基本原理，不等于完整的 async/await 转译器；后者还需要保留更完整的语言语义。

## validation | 常见格式校验与随机数组

格式校验与真实性验证要分开。电子邮件地址和手机号通过本地规则，只能表示符合当前规则，不能证明邮箱存在或号码属于某个人。复杂表单适合使用统一 schema，再与服务端校验配合。

```javascript
const isEmail = text => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)
const isPhone = text => /^1[3-9]\d{9}$/.test(text)

function isChineseId18(input) {
  const text = input.toUpperCase()
  if (!/^[1-9]\d{16}[0-9X]$/.test(text)) return false
  const year = Number(text.slice(6, 10)), month = Number(text.slice(10, 12)), day = Number(text.slice(12, 14))
  const date = new Date(Date.UTC(year, month - 1, day))
  if (year < 1800 || date > new Date() || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return false
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const sum = weights.reduce((total, weight, i) => total + Number(text[i]) * weight, 0)
  return '10X98765432'[sum % 11] === text[17]
}

function uniqueRandomArray(min, max, count) {
  if (![min, max, count].every(Number.isInteger) || max < min || count < 0 || count > max - min + 1) throw new RangeError('Invalid range')
  const values = Array.from({ length: max - min + 1 }, (_, i) => min + i)
  for (let i = 0; i < count; i++) {
    const j = i + Math.floor(Math.random() * (values.length - i))
    ;[values[i], values[j]] = [values[j], values[i]]
  }
  return values.slice(0, count)
}
```

身份证示例只检查 18 位形式、日期与校验位，没有核实行政区划代码与真实签发信息。随机数组使用部分 Fisher-Yates 洗牌，每次从剩余位置选取，适合普通随机抽样；安全令牌应使用密码学随机源。

## object-transforms | 对象深比较、键名转换与扁平化

先明确比较规则：是否要求原型相同，是否区分缺失属性与值为 undefined 的属性，以及循环引用如何处理。下面的比较器以普通对象、数组与 Date 为范围，并要求循环引用图的映射一致。

```javascript
function isEqual(a, b, seen = new WeakMap()) {
  if (Object.is(a, b)) return true
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false
  if (a instanceof Date || b instanceof Date) return a instanceof Date && b instanceof Date && Object.is(a.getTime(), b.getTime())
  const prototype = Object.getPrototypeOf(a)
  if (prototype !== Object.getPrototypeOf(b)) return false
  if (Array.isArray(a) && a.length !== b.length) return false
  if (!Array.isArray(a) && prototype !== Object.prototype && prototype !== null) return false
  if (seen.has(a)) return seen.get(a) === b
  seen.set(a, b)
  const left = Object.keys(a), right = Object.keys(b)
  if (left.length !== right.length) return false
  return left.every(key => Object.hasOwn(b, key) && isEqual(a[key], b[key], seen))
}

function renameKeys(value, rename, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value
  if (seen.has(value)) return seen.get(value)
  const result = Array.isArray(value) ? [] : Object.create(null)
  seen.set(value, result)
  for (const key of Object.keys(value)) result[Array.isArray(value) ? key : rename(key)] = renameKeys(value[key], rename, seen)
  return result
}

function flattenObject(object, prefix = '', output = Object.create(null)) {
  for (const [key, value] of Object.entries(object)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (value && Object.getPrototypeOf(value) === Object.prototype && Object.keys(value).length) flattenObject(value, path, output)
    else output[path] = value
  }
  return output
}
```

数组比较注意长度与空位的区别，例如空数组与只有空位的数组并不相同。键名转换可能把两个原键映射到同一个新键，应提前确定冲突策略。扁平路径示例要求原键不包含点号，数组作为叶子保留。

## state | Redux 风格的状态容器与中间件

状态容器维护当前状态，通过 reducer 计算下一状态，再通知订阅者。中间件包裹 dispatch，使日志、异步动作等能力在约定位置扩展，而不需要把这些逻辑写进 reducer。

```javascript
function createStore(reducer, initialState) {
  let state = initialState
  const listeners = new Set()
  const store = {
    getState: () => state,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener) },
    dispatch(action) {
      state = reducer(state, action)
      for (const listener of [...listeners]) listener()
      return action
    }
  }
  store.dispatch({ type: '@@init' })
  return store
}
function applyMiddleware(store, ...middlewares) {
  let dispatch = store.dispatch
  const api = { getState: store.getState, dispatch: action => dispatch(action) }
  dispatch = middlewares.map(middleware => middleware(api)).reduceRight((next, wrap) => wrap(next), store.dispatch)
  return { ...store, dispatch }
}
const thunk = ({ dispatch, getState }) => next => action => typeof action === 'function' ? action(dispatch, getState) : next(action)

function singleton(factory) {
  let created = false, instance
  return (...args) => {
    if (!created) { instance = factory(...args); created = true }
    return instance
  }
}
```

Reducer 应保持可预测，不在计算状态时直接发网络请求。上例用于理解容器与中间件组合，不包含 Redux 的全部输入校验与重入约束。单例缓存的是某个创建结果，模块、浏览器标签页与服务器请求之间是否共享，则取决于运行环境。

## network-code | 手写 Ajax、JSONP 与 Hash Router

Ajax 把网络回调转换为 Promise 时，需要区分 HTTP 状态失败、连接失败、超时和取消。JSONP 则通过加载脚本调用全局函数，只适用于配合返回脚本的受信任服务，不是任意跨源接口的通用替代方案。

```javascript
function ajax(url, { method = 'GET', body = null, timeout = 10000 } = {}) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open(method, url); request.timeout = timeout
    request.onload = () => request.status >= 200 && request.status < 300 ? resolve(request.responseText) : reject(new Error(`HTTP ${request.status}`))
    request.onerror = () => reject(new Error('Network error'))
    request.ontimeout = () => reject(new Error('Request timed out'))
    request.onabort = () => reject(new Error('Request aborted'))
    request.send(body)
  })
}

function jsonp(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const name = `jsonp_${crypto.randomUUID().replaceAll('-', '')}`
    const script = document.createElement('script')
    const timer = setTimeout(() => { cleanup(); reject(new Error('JSONP timed out')) }, timeout)
    function cleanup() { clearTimeout(timer); script.remove(); delete window[name] }
    window[name] = data => { cleanup(); resolve(data) }
    script.onerror = () => { cleanup(); reject(new Error('JSONP load failed')) }
    const target = new URL(url, location.href)
    target.searchParams.set('callback', name)
    script.src = target.href
    document.head.appendChild(script)
  })
}

function hashRouter(routes) {
  const render = () => {
    const path = location.hash.slice(1).split('?')[0] || '/'
    ;(routes[path] ?? routes['404'])?.()
  }
  window.addEventListener('hashchange', render)
  render()
  return () => window.removeEventListener('hashchange', render)
}
```

应用路由还需要匹配参数、导航错误和状态恢复；这里演示固定路径表。JSONP 加载的是可执行脚本，因此必须控制目标服务和返回内容，不能用它绕过应用原本的信任边界。

## promise-core | 从零实现 Promise 的核心链式行为

下面以微任务队列、状态不可逆和解析过程为核心，展示 then、resolve、reject 与链式返回。解析时先读取 then，防止 getter 抛错；调用 thenable 时使用一次性保护，避免同时成功、失败或重复通知。

```javascript
class MiniPromise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.handlers = []
    let called = false
    const resolve = value => { if (!called) { called = true; this.adopt(value) } }
    const reject = reason => { if (!called) { called = true; this.settle('rejected', reason) } }
    try { executor(resolve, reject) } catch (error) { reject(error) }
  }
  settle(state, value) {
    if (this.state !== 'pending') return
    this.state = state; this.value = value
    for (const handler of this.handlers) handler()
    this.handlers = []
  }
  adopt(value) {
    if (value === this) { this.settle('rejected', new TypeError('Promise cycle')); return }
    if (value !== null && ['object', 'function'].includes(typeof value)) {
      let then
      try { then = value.then } catch (error) { this.settle('rejected', error); return }
      if (typeof then === 'function') {
        let called = false
        try {
          then.call(value,
            result => { if (!called) { called = true; this.adopt(result) } },
            error => { if (!called) { called = true; this.settle('rejected', error) } }
          )
        } catch (error) { if (!called) this.settle('rejected', error) }
        return
      }
    }
    this.settle('fulfilled', value)
  }
  then(onFulfilled, onRejected) {
    return new MiniPromise((resolve, reject) => {
      const run = () => queueMicrotask(() => {
        const handler = this.state === 'fulfilled' ? onFulfilled : onRejected
        if (typeof handler !== 'function') {
          ;(this.state === 'fulfilled' ? resolve : reject)(this.value)
          return
        }
        try { resolve(handler(this.value)) } catch (error) { reject(error) }
      })
      if (this.state === 'pending') this.handlers.push(run)
      else run()
    })
  }
  catch(handler) { return this.then(undefined, handler) }
  static resolve(value) { return value instanceof MiniPromise ? value : new MiniPromise(resolve => resolve(value)) }
  static reject(error) { return new MiniPromise((_, reject) => reject(error)) }
}

MiniPromise.resolve(1)
  .then(value => value + 1)
  .then(value => { console.log(value); throw new Error('example') })
  .catch(error => console.log(error.message))
```

该实现用于学习核心解析与通知过程，没有实现原生 Promise 的全部静态方法、子类规则与未处理拒绝跟踪。声称符合 Promise/A+ 前应运行符合性测试，特别检查返回自身、then getter 抛错以及 thenable 多次调用等情况。

## json | JSON：递归下降解析与序列化

JSON 的语法包含对象、数组、字符串、数字、true、false 和 null。手写解析器应按字符推进游标，并验证所有输入已经消耗，不能用 eval 执行未知文本。下面的解析器演示严格数字格式、字符串转义与递归结构。

```javascript
function parseJSON(text) {
  let i = 0
  const fail = () => { throw new SyntaxError(`Invalid JSON at ${i}`) }
  const space = () => { while (/[\t\n\r ]/.test(text[i] ?? '') && i < text.length) i++ }
  function string() {
    if (text[i++] !== '"') fail()
    let result = ''
    while (i < text.length) {
      const char = text[i++]
      if (char === '"') return result
      if (char === '\\') {
        const escaped = text[i++]
        const escapes = { '"': '"', '\\': '\\', '/': '/', b: '\b', f: '\f', n: '\n', r: '\r', t: '\t' }
        if (escaped === 'u') {
          const hex = text.slice(i, i + 4)
          if (!/^[0-9a-fA-F]{4}$/.test(hex)) fail()
          result += String.fromCharCode(parseInt(hex, 16)); i += 4
        } else if (Object.hasOwn(escapes, escaped)) result += escapes[escaped]
        else fail()
      } else { if (char.charCodeAt(0) < 32) fail(); result += char }
    }
    fail()
  }
  function value() {
    space()
    const char = text[i]
    if (char === '"') return string()
    if (char === '[') {
      i++; space(); const result = []
      if (text[i] === ']') { i++; return result }
      while (true) {
        result.push(value()); space()
        const separator = text[i++]
        if (separator === ']') return result
        if (separator !== ',') fail()
      }
    }
    if (char === '{') {
      i++; space(); const result = {}
      if (text[i] === '}') { i++; return result }
      while (true) {
        space(); if (text[i] !== '"') fail()
        const key = string(); space(); if (text[i++] !== ':') fail()
        Object.defineProperty(result, key, { value: value(), writable: true, enumerable: true, configurable: true })
        space(); const separator = text[i++]
        if (separator === '}') return result
        if (separator !== ',') fail()
      }
    }
    for (const [literal, result] of [['true', true], ['false', false], ['null', null]]) {
      if (text.startsWith(literal, i)) { i += literal.length; return result }
    }
    const number = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/.exec(text.slice(i))
    if (!number) fail()
    i += number[0].length
    return Number(number[0])
  }
  const result = value(); space()
  if (i !== text.length) fail()
  return result
}

function stringifyJSON(input) {
  const ancestors = new Set()
  const quote = text => '"' + text.replace(/["\\\u0000-\u001f\ud800-\udfff]/g, char => {
    if (char === '"' || char === '\\') return '\\' + char
    return '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0')
  }) + '"'
  function encode(value) {
    if (value === null) return 'null'
    if (typeof value === 'string') return quote(value)
    if (typeof value === 'number') return Number.isFinite(value) ? String(value) : 'null'
    if (typeof value === 'boolean') return String(value)
    if (typeof value === 'bigint') throw new TypeError('BigInt is not JSON')
    if (typeof value !== 'object') return undefined
    if (ancestors.has(value)) throw new TypeError('Circular structure')
    ancestors.add(value)
    let result
    if (Array.isArray(value)) result = '[' + Array.from(value, item => encode(item) ?? 'null').join(',') + ']'
    else result = '{' + Object.keys(value).flatMap(key => {
      const encoded = encode(value[key])
      return encoded === undefined ? [] : [quote(key) + ':' + encoded]
    }).join(',') + '}'
    ancestors.delete(value)
    return result
  }
  return encode(input)
}
```

解析器未提供 reviver，也没有限制恶意输入的嵌套深度；序列化器以普通 JSON 数据为范围，不实现 toJSON、replacer 与缩进选项。真实业务优先使用原生 JSON API。这里的递归结构用于解释语法与边界，不能用它声称替代完整标准实现。

## modules | CommonJS 模块：包装、缓存与循环依赖

CommonJS 模块在函数包装中执行，通过 module.exports 导出结果。缓存应在执行模块之前放入，这样循环依赖可以取得另一个模块正在初始化的导出对象；执行失败时移除缓存，以免留下损坏状态。

```javascript
// Node.js 教学实现：只支持显式路径的 .js 模块
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const cache = new Map()

function loadCommonJS(filename) {
  const resolved = path.resolve(filename)
  if (cache.has(resolved)) return cache.get(resolved).exports
  const module = { exports: {} }
  cache.set(resolved, module)
  try {
    const code = fs.readFileSync(resolved, 'utf8')
    const wrapped = vm.runInThisContext(`(function(exports, require, module, __filename, __dirname) {\n${code}\n})`, { filename: resolved })
    const localRequire = request => {
      if (!request.startsWith('.')) return require(request)
      let target = path.resolve(path.dirname(resolved), request)
      if (!path.extname(target)) target += '.js'
      return loadCommonJS(target)
    }
    wrapped(module.exports, localRequire, module, resolved, path.dirname(resolved))
    return module.exports
  } catch (error) { cache.delete(resolved); throw error }
}
```

此示例不实现完整的 Node 模块解析、package.json 导出条件与 ESM 互操作。vm.runInThisContext 也不是用于执行不可信代码的安全隔离环境。业务需要动态加载模块时，应优先采用 Node 已有的加载 API。

## templates | 模板替换、链式计算与括号匹配

简单模板替换可以只允许明确的点分属性路径，不执行任意 JavaScript 表达式。链式计算通过返回同一个对象保留后续调用入口，最终使用显式取值方法获得结果。括号匹配则利用栈检查最近未闭合的左括号。

```javascript
function renderTemplate(template, data) {
  return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, path) => {
    const value = path.split('.').reduce((object, key) => object != null && Object.hasOwn(Object(object), key) ? object[key] : undefined, data)
    return value == null ? '' : String(value)
  })
}
function calculate(initial) {
  let value = initial
  return {
    add(number) { value += number; return this },
    minus(number) { value -= number; return this },
    value: () => value
  }
}
function validBrackets(text) {
  const pairs = { ')': '(', ']': '[', '}': '{' }
  const stack = []
  for (const char of text) {
    if ('([{'.includes(char)) stack.push(char)
    else if (Object.hasOwn(pairs, char) && stack.pop() !== pairs[char]) return false
  }
  return stack.length === 0
}

console.log(calculate(10).add(3).minus(2).value()) // 11
console.log(validBrackets('([])')) // true
```

模板结果是普通字符串，若需要放入 HTML，必须按输出上下文进行转义，不能直接写入 innerHTML。括号示例忽略非括号字符，不解析代码中的字符串和注释；若题目是源代码语法检查，需要先进行词法分析。

## algorithms-core | 数据结构与算法：复杂度、遍历、回溯和动态规划

算法先确定输入规模、目标和约束，再选择数据表示。数组支持按下标访问；链表便于在已知节点附近调整链接；哈希表适合按键查找；栈与队列组织处理顺序；树和图表示层次或关系。结构本身没有绝对优劣，成本取决于需要执行的操作。

### 复杂度如何衡量

O 表示输入规模增长时的上界趋势。线性扫描通常是 O(n)，两层独立遍历通常是 O(n²)，有序区间每次减半通常是 O(log n)。要把循环内部的复制、排序和字符串拼接也纳入分析。

空间复杂度应说明是否包括输出，以及递归调用栈。二叉树递归的辅助空间由树高决定，平衡树与退化链形树不同。动态数组、哈希表等结构还可能需要区分均摊、期望和最坏情况。

### 数组、字符串与双指针

双指针通过维护一个区间或两个位置，减少重复扫描。例如把奇数放到偶数前面，只要求分区而不要求稳定时，可以从两端向中间移动。

```javascript
function oddBeforeEven(input) {
  const values = [...input]
  let left = 0, right = values.length - 1
  while (left < right) {
    while (left < right && values[left] % 2 !== 0) left++
    while (left < right && values[right] % 2 === 0) right--
    if (left < right) [values[left], values[right]] = [values[right], values[left]]
  }
  return values
}
```

如果要求奇数、偶数各自保持原顺序，可以使用额外数组做稳定分区，或者选择更复杂的原地策略。滑动窗口则要维护窗口合法性，移动左边界时同步撤销统计状态，不能只记住最终长度。

### 链表与快慢指针

链表操作常用哨兵节点统一处理头节点，修改 next 前先保存后继。快慢指针可以检测环并定位环入口，空间为 O(1)。

```javascript
function cycleEntry(head) {
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next; fast = fast.next.next
    if (slow === fast) {
      let entry = head
      while (entry !== slow) { entry = entry.next; slow = slow.next }
      return entry
    }
  }
  return null
}
```

相遇后，一个指针从头出发，另一个留在相遇处，二者同速前进会在入口相遇。单纯看到相同节点值不能判断成环，必须比较节点引用。

### 栈、队列与遍历

栈遵循后进先出，适合回退、括号匹配、表达式处理与显式模拟递归。队列遵循先进先出，适合广度优先与按层处理。单调栈额外维护有序性，用于寻找下一个更大元素等问题。

```javascript
function nextGreater(values) {
  const result = new Array(values.length).fill(-1), stack = []
  for (let i = 0; i < values.length; i++) {
    while (stack.length && values[stack.at(-1)] < values[i]) result[stack.pop()] = values[i]
    stack.push(i)
  }
  return result
}
function bfs(graph, start) {
  const queue = [start], visited = new Set([start])
  for (let head = 0; head < queue.length; head++) {
    for (const next of graph.get(queue[head]) ?? []) if (!visited.has(next)) {
      visited.add(next); queue.push(next)
    }
  }
  return queue
}
```

图遍历在入队时就标记访问，避免同一节点反复入队。无权图中 BFS 按距离扩展，可用于最少边数路径；加权图最短路则不能直接用普通 BFS 替代。

### 回溯与剪枝

回溯在候选状态空间中尝试选择，再撤销选择。状态修改与撤销必须成对，保存结果时也要复制路径，避免所有答案引用同一个可变数组。

```javascript
function subsets(values) {
  const answer = [], path = []
  function visit(index) {
    if (index === values.length) { answer.push([...path]); return }
    visit(index + 1)
    path.push(values[index]); visit(index + 1); path.pop()
  }
  visit(0)
  return answer
}
```

剪枝需要证明被排除的分支不可能产生合法或更优解。比如存在负数时，不能直接沿用“当前和超过目标就停止”的正数剪枝规则。

### 动态规划

动态规划先定义状态含义，再写状态转移、边界和计算顺序。记忆化搜索按需计算，迭代 DP 按依赖顺序填表。压缩空间时，应确认被覆盖的旧状态已经不再需要。

```javascript
function minCoins(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (let total = 1; total <= amount; total++) {
    for (const coin of coins) if (coin > 0 && coin <= total) dp[total] = Math.min(dp[total], dp[total - coin] + 1)
  }
  return Number.isFinite(dp[amount]) ? dp[amount] : -1
}
```

这里的状态是“凑出恰好 total 所需的最少硬币数”，不是方案数量。对于 0/1 背包与完全背包，遍历方向会改变一个物品是否可重复使用，不能仅凭代码长得相似就互换。

### 字符串压缩与删除：记忆化状态

游程编码把连续字符与出现次数关联起来，删除字符可能让原本分开的相同字符合并。下面用状态 `(起点, 剩余删除次数)` 枚举保留的首段，适用于长度较小的字符串压缩优化问题。

```python
from functools import lru_cache

def shortest_compression(text: str, deletions: int) -> int:
    n = len(text)

    @lru_cache(None)
    def solve(start: int, remaining: int) -> int:
        if remaining < 0:
            return float('inf')
        if n - start <= remaining:
            return 0
        best = solve(start + 1, remaining - 1)
        count = removed = 0
        for end in range(start, n):
            if text[end] == text[start]:
                count += 1
            else:
                removed += 1
            if removed > remaining:
                break
            encoded = 1 if count == 1 else 1 + len(str(count))
            best = min(best, encoded + solve(end + 1, remaining - removed))
        return best

    return solve(0, deletions)
```

状态数为 O(nk)，每个状态最多扫描 O(n) 个位置，总时间上界 O(n²k)，状态空间 O(nk)。删除首字符与保留首段是两类互补选择，不能只考虑删除当前字符而忽略合并后的编码长度。

### 二叉搜索树、平衡树与堆

BST 的有序关系支持按比较方向查找，但如果连续插入有序数据，树可能退化为链。AVL 树通过维护高度差并旋转恢复平衡；红黑树使用颜色约束限制高度。旋转必须保持中序顺序，并更新受影响节点的辅助信息。

堆只保证父子之间的局部顺序，不保证整棵树有序。它适合优先队列、Top K 与合并多个有序流。用堆找最小值和用 BST 做有序范围遍历，是不同操作需求。

```javascript
class MinHeap {
  constructor() { this.values = [] }
  push(value) {
    const a = this.values; a.push(value)
    let i = a.length - 1
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2)
      if (a[parent] <= a[i]) break
      ;[a[parent], a[i]] = [a[i], a[parent]]; i = parent
    }
  }
  pop() {
    const a = this.values
    if (!a.length) return undefined
    const minimum = a[0], last = a.pop()
    if (a.length) {
      a[0] = last
      for (let i = 0; ;) {
        let child = i * 2 + 1
        if (child >= a.length) break
        if (child + 1 < a.length && a[child + 1] < a[child]) child++
        if (a[i] <= a[child]) break
        ;[a[i], a[child]] = [a[child], a[i]]; i = child
      }
    }
    return minimum
  }
}
```

学习路线可以按“数组与字符串 → 栈队列与链表 → 树与图遍历 → 排序与查找 → 回溯与动态规划”推进。每个算法都用空输入、单元素、重复值与极端形状检查边界，再说明复杂度和数据约束。

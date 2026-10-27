Promise 把异步操作的结果表示为 pending、fulfilled、rejected 三种状态。状态一旦落定就不再改变。then 返回一个新的 Promise，回调的返回值、抛出的错误和返回的 thenable 决定新 Promise 的状态。回调通过微任务执行，不能在调用 then 的当前同步栈中立即运行。

## 实现组合器

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

## 从零实现时的检查点

resolve 不能只把状态改为成功：收到 Promise 或 thenable 时，要采用它的最终状态；访问 then 属性本身也可能抛错。then 的两个处理函数缺省时，需要透传成功值或失败原因。回调返回自身衍生的 Promise 时必须拒绝，避免循环解析。

Promise/A+ 主要规定 then 行为和解析过程，不等于所有原生 Promise 静态方法的完整规范。实现类以后，分别检查异步回调、链式透传、异常传播、thenable 只调用一次以及循环检测，再使用相应的符合性测试。不要把一个只支持单次回调的对象称为完整 Promise。

`async/await` 是基于 Promise 的语法糖。`async` 函数总是返回一个 Promise；`await` 等待 Promise 的 resolve 值，reject 需用 `try/catch` 捕获；`await` 只能在 `async` 函数内使用。

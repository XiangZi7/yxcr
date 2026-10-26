Promise 用于解决异步回调（回调地狱）问题。有 `pending`（进行中）、`fulfilled`（成功）、`rejected`（失败）三态，状态一旦改变不可逆。`.then` 处理成功，`.catch` 处理失败。

**`Promise.all`：** 接收 promise 数组，全部成功才 resolve，结果按顺序返回；只要一个失败就 reject（快速失败）。

**`Promise.race`：** 返回最快 settle 的那个，其余结果不关心。

**`Promise.allSettled`（ES2020）：** 等待所有结束，返回每个的结果（含成功/失败），不会因单个失败而中断。

**`Promise.any`（ES2021）：** 返回第一个成功的结果；全部失败才 reject。

> 2024+ 高频追问：`all` 与 `allSettled` 的区别、`race` 用于超时控制。

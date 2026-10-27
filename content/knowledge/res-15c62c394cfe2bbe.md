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

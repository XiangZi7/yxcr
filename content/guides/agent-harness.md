# Agent Harness：让智能体可靠完成任务

模型能生成下一步，应用还需要负责让这一步真正执行、留下记录，并决定是否继续。围绕模型的这层执行环境，通常称为 Agent Harness。

## 从一次调用到执行循环

一次问答把输入转换成输出。执行循环还需要处理工具请求、工具返回、失败重试和退出条件。先定义任务成功的证据，再设计循环，能避免智能体反复操作却无法结束。

```typescript
type Step =
  | { type: 'done'; answer: string }
  | { type: 'tool'; name: string; input: unknown }

interface Harness {
  decide(history: unknown[]): Promise<Step>
  execute(name: string, input: unknown): Promise<unknown>
  checkpoint(history: unknown[]): Promise<void>
}

async function runAgent(runtime: Harness, task: string) {
  const history: unknown[] = [{ role: 'user', content: task }]

  for (let step = 0; step < 20; step++) {
    const action = await runtime.decide(history)
    if (action.type === 'done') return action.answer

    const result = await runtime.execute(action.name, action.input)
    history.push({ action, result })
    await runtime.checkpoint(history)
  }

  throw new Error('达到执行步数上限，需要检查任务状态')
}
```

这是与具体模型 SDK 无关的结构示例。实际应用还需要在 `execute` 中验证参数、校验权限、设置超时并记录错误，不能把模型给出的工具名直接交给任意系统命令。

## 工具契约与状态

工具的参数应有明确结构，返回值应区分成功、可重试错误和不可重试错误。模型的文字判断不能替代工具的真实结果：例如“文件已保存”应以写入成功和内容校验为依据。

将状态拆成三个部分：任务目标与约束、可恢复的执行记录、下一次调用需要的工作上下文。检查点保存执行记录；上下文只装入当前步骤需要的信息。两者不必始终包含相同内容。

## 什么时候使用工作流图

当业务有固定检查点，例如“读取订单 → 校验库存 → 创建支付单”，可以把步骤和可接受的转移写成状态图。模型在某个节点帮助提取信息或选择工具，应用控制允许的下一步。

任务路径不确定时，可以使用有边界的自主循环。图和循环都应具备预算、取消信号与终止条件；增加节点数量本身不会带来可靠性。

## 重试与恢复

- 对临时网络错误使用有上限的退避重试。
- 对写入、扣款或发消息等操作使用幂等键，防止恢复时重复执行。
- 记录工具开始、结束、耗时及结果摘要，保留能够重放或定位问题的证据。
- 对参数错误先修正输入，而不是原样重试。

## 如何验证效果

准备一组包含正常路径和失败路径的任务，分别记录完成率、工具失败率、耗时和调用成本。比较新旧策略时使用相同任务集。单次演示成功只能证明一个样例可运行。

可以从“读取一个文件、修改一个值、验证修改结果”的小任务开始，再逐步加入跨文件依赖和可恢复执行。

延伸阅读：[Anthropic：Building effective agents](https://www.anthropic.com/research/building-effective-agents)。本文的运行时结构与代码为独立学习示例。

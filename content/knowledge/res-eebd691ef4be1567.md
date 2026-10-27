## 解法




### 方法一：栈 + 模拟



> **思考**
>
> 函数可嵌套，日志给出起止时刻，要求每函数的独占时间。若按时间轴逐秒模拟，区间可达 $10^9$。
>
> 嵌套结构对应栈：新函数启动时，把栈顶已跑过的片段结算到 `pre`；结束时把闭区间 $[pre, cur]$ 加给自己，并把 `pre` 接到 $cur+1$。一次扫完日志。



我们定义一个栈 $\textit{stk}$，用于存储当前正在执行的函数的标识符。同时，我们定义一个数组 $\textit{ans}$，用于存储每个函数的独占时间，初始时每个函数的独占时间都为 $0$。用一个变量 $\textit{pre}$ 记录上一个时间戳。

遍历日志数组，对于每一条日志，我们首先将其按照冒号分隔，得到函数标识符 $\textit{i}$，操作类型 $\textit{op}$ 和时间戳 $\textit{t}$。

如果 $\textit{op}$ 为 $\text{start}$，则表示函数 $\textit{i}$ 开始执行，我们需要判断栈是否为空，如果不为空，则将栈顶函数的独占时间增加 $\textit{cur} - \textit{pre}$，然后将 $\textit{i}$ 入栈，更新 $\textit{pre}$ 为 $\textit{cur}$；如果 $\textit{op}$ 为 $\text{end}$，则表示函数 $\textit{i}$ 结束执行，我们将栈顶函数的独占时间增加 $\textit{cur} - \textit{pre} + 1$，然后将栈顶元素出栈，更新 $\textit{pre}$ 为 $\textit{cur} + 1$。

最后返回数组 $\textit{ans}$ 即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为日志数组的长度。




#### Python3


```python
class Solution:
    def exclusiveTime(self, n: int, logs: List[str]) -> List[int]:
        stk = []
        ans = [0] * n
        pre = 0
        for log in logs:
            i, op, t = log.split(":")
            i, cur = int(i), int(t)
            if op[0] == "s":
                if stk:
                    ans[stk[-1]] += cur - pre
                stk.append(i)
                pre = cur
            else:
                ans[stk.pop()] += cur - pre + 1
                pre = cur + 1
        return ans
```


#### TypeScript


```ts
function exclusiveTime(n: number, logs: string[]): number[] {
    const ans: number[] = Array(n).fill(0);
    let pre = 0;
    const stk: number[] = [];
    for (const log of logs) {
        const [i, op, cur] = log.split(':');
        if (op[0] === 's') {
            if (stk.length) {
                ans[stk.at(-1)!] += +cur - pre;
            }
            stk.push(+i);
            pre = +cur;
        } else {
            ans[stk.pop()!] += +cur - pre + 1;
            pre = +cur + 1;
        }
    }
    return ans;
}
```

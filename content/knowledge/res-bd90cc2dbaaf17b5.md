## 解法




### 方法一：栈 + 模拟



> **思考**
>
> 按定义从 $n$ 递减套用 $\times,\div,+, -$ 即可，但乘除优先于加减，直接从左到右累加会算错。 $N\le 10^4$，一次线性扫描足够，关键是把不同优先级拆开。
>
> 乘、除必须立刻与前一个操作数结合，加、减只是向结果放入正负项，可延后到最后再求和。
>
> 用栈保存当前待结算的项，并以 $k\bmod 4$ 轮转四种运算：乘除时弹出栈顶运算后再压回，加减则压入 $x$ 或 $-x$，最后把栈中元素相加。



笨阶乘的计算过程可以看作是一个栈的模拟过程。

我们定义一个栈 `stk`，初始时我们将 $n$ 入栈，定义一个变量 $k$，表示当前的操作符，初始时 $k = 0$。

然后我们从 $n-1$ 开始，枚举 $x$，根据当前的 $k$ 的值，决定如何处理 $x$：

- 当 $k = 0$ 时，表示乘法操作，我们将栈顶元素出栈，与 $x$ 相乘后再入栈；
- 当 $k = 1$ 时，表示除法操作，我们将栈顶元素出栈，与 $x$ 相除后取整数部分再入栈；
- 当 $k = 2$ 时，表示加法操作，我们直接将 $x$ 入栈；
- 当 $k = 3$ 时，表示减法操作，我们将 $-x$ 入栈。

接着我们更新 $k = (k + 1) \mod 4$。

最后，我们将栈中的元素累加即为答案。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为题目给定的整数 $N$。




#### Python3


```python
class Solution:
    def clumsy(self, n: int) -> int:
        k = 0
        stk = [n]
        for x in range(n - 1, 0, -1):
            if k == 0:
                stk.append(stk.pop() * x)
            elif k == 1:
                stk.append(int(stk.pop() / x))
            elif k == 2:
                stk.append(x)
            else:
                stk.append(-x)
            k = (k + 1) % 4
        return sum(stk)
```


#### TypeScript


```ts
function clumsy(n: number): number {
    const stk: number[] = [n];
    let k = 0;
    for (let x = n - 1; x; --x) {
        if (k === 0) {
            stk.push(stk.pop()! * x);
        } else if (k === 1) {
            stk.push((stk.pop()! / x) | 0);
        } else if (k === 2) {
            stk.push(x);
        } else {
            stk.push(-x);
        }
        k = (k + 1) % 4;
    }
    return stk.reduce((acc, cur) => acc + cur, 0);
}
```

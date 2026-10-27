## 解法




### 方法一：栈



> **思考**
>
> 反复在 $s$ 中查找并删除 $\textit{abc}$ 可以得到答案，但 $n\le 2\times 10^4$ 时每轮扫描都是线性，最坏接近平方。长度若不是 $3$ 的倍数，则无论怎样插入都不可能由空串得到 $s$，可立即判否。
>
> 有效串由在任意位置插入 $\textit{abc}$ 生成，因而从左到右读入时，一旦栈顶三字符恰好组成 $\textit{abc}$，它们对应一次刚完成的插入，应当消去。
>
> 用栈模拟这一过程：每个字符入栈后检查栈顶，能消则弹掉三段。扫完后栈空当且仅当整串可由插入还原。



我们观察题目中的操作，可以发现，每一次都会在字符串的任意位置插入字符串 $\textit{"abc"}$，所以每次插入操作之后，字符串的长度都会增加 $3$。如果字符串 $s$ 有效，那么它的长度一定是 $3$ 的倍数。因此，我们先对字符串 $s$ 的长度进行判断，如果不是 $3$ 的倍数，那么 $s$ 一定无效，可以直接返回 $\textit{false}$。

接下来我们遍历字符串 $s$ 的每个字符 $c$，我们先将字符 $c$ 压入栈 $t$ 中。如果此时栈 $t$ 的长度大于等于 $3$，并且栈顶的三个元素组成了字符串 $\textit{"abc"}$，那么我们就将栈顶的三个元素弹出。然后继续遍历字符串 $s$ 的下一个字符。

遍历结束之后，如果栈 $t$ 为空，那么说明字符串 $s$ 有效，返回 $\textit{true}$；否则，返回 $\textit{false}$。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是字符串 $s$ 的长度。




#### Python3


```python
class Solution:
    def isValid(self, s: str) -> bool:
        if len(s) % 3:
            return False
        t = []
        for c in s:
            t.append(c)
            if ''.join(t[-3:]) == 'abc':
                t[-3:] = []
        return not t
```


#### TypeScript


```ts
function isValid(s: string): boolean {
    if (s.length % 3 !== 0) {
        return false;
    }
    const t: string[] = [];
    for (const c of s) {
        t.push(c);
        if (t.slice(-3).join('') === 'abc') {
            t.splice(-3);
        }
    }
    return t.length === 0;
}
```

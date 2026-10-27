## 解法




### 方法一：模拟



> **思考**
>
> 按照 Z 字形将字符填入网格再按行读出，时间与空间均为线性。 $n \le 10^3$ 可以接受，然而网格中多数位置为空，列这一维并不出现在最终输出中。
>
> 决定答案的只有每个字符所在的行，以及同一行内的相对顺序。行号沿 $0,1,\ldots,\textit{numRows}-1$ 往复变化，到达顶端或底端后改变方向。
>
> 为此只需维护 $\textit{numRows}$ 个列表，用方向变量 $k$ 在边界处取反。将 $k$ 的初值设为 $-1$，遇到第一行时立即翻转为向下。当 $\textit{numRows}=1$ 时顶与底重合，应直接返回原串，否则会在同一行上反复转向。



我们用一个二维数组 $g$ 来模拟 Z 字形排列的过程，其中 $g[i][j]$ 表示第 $i$ 行第 $j$ 列的字符。初始时 $i = 0$，另外我们定义一个方向变量 $k$，初始时 $k = -1$，表示向上走。

我们从左到右遍历字符串 $s$，每次遍历到一个字符 $c$，将其追加到 $g[i]$ 中。如果此时 $i = 0$ 或者 $i = \textit{numRows} - 1$，说明当前字符位于 Z 字形排列的拐点，我们将 $k$ 的值反转，即 $k = -k$。接下来，我们将 $i$ 的值更新为 $i + k$，即向上或向下移动一行。继续遍历下一个字符，直到遍历完字符串 $s$，我们返回 $g$ 中所有行拼接后的字符串即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串 $s$ 的长度。




#### Python3


```python
class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1:
            return s
        g = [[] for _ in range(numRows)]
        i, k = 0, -1
        for c in s:
            g[i].append(c)
            if i == 0 or i == numRows - 1:
                k = -k
            i += k
        return ''.join(chain(*g))
```


#### TypeScript


```ts
function convert(s: string, numRows: number): string {
    if (numRows === 1) {
        return s;
    }
    const g: string[][] = new Array(numRows).fill(0).map(() => []);
    let i = 0;
    let k = -1;
    for (const c of s) {
        g[i].push(c);
        if (i === numRows - 1 || i === 0) {
            k = -k;
        }
        i += k;
    }
    return g.flat().join('');
}
```

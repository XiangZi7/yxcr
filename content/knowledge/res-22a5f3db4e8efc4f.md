## 解法




### 方法一：动态规划



> **思考**
>
> 统计 $s$ 中有多少子序列等于 $t$。对每个位置选或不选， $s$ 与 $t$ 长度可达 $1000$，朴素递归会重复计算同一后缀对。
>
> 子问题只依赖「 $s$ 用了多长、 $t$ 匹配了多长」。 $f[i][j]$ 表示 $s$ 前 $i$ 个字符形成 $t$ 前 $j$ 个字符的方案数； $s$ 当前字符与 $t$ 对齐时可以多一条「用掉这对字符」的转移。空 $t$ 有且仅有一种空子序列。



我们定义 $f[i][j]$ 表示字符串 $s$ 的前 $i$ 个字符中，子序列构成字符串 $t$ 的前 $j$ 个字符的方案数。初始时 $f[i][0]=1$，其中 $i \in [0,m]$。

当 $i \gt 0$ 时，考虑 $f[i][j]$ 的计算：

- 当 $s[i-1] \ne t[j-1]$ 时，不能选取 $s[i-1]$，因此 $f[i][j]=f[i-1][j]$；
- 否则，可以选取 $s[i-1]$，此时 $f[i][j]=f[i-1][j-1]$。

因此我们有如下的状态转移方程：

$$
f[i][j]=\left\{
\begin{aligned}
&f[i-1][j], &s[i-1] \ne t[j-1] \\
&f[i-1][j-1]+f[i-1][j], &s[i-1]=t[j-1]
\end{aligned}
\right.
$$

最终的答案即为 $f[m][n]$，其中 $m$ 和 $n$ 分别是字符串 $s$ 和 $t$ 的长度。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。




#### Python3


```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(s), len(t)
        f = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            f[i][0] = 1
        for i, a in enumerate(s, 1):
            for j, b in enumerate(t, 1):
                f[i][j] = f[i - 1][j]
                if a == b:
                    f[i][j] += f[i - 1][j - 1]
        return f[m][n]
```


#### TypeScript


```ts
function numDistinct(s: string, t: string): number {
    const m = s.length;
    const n = t.length;
    const f: number[][] = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; ++i) {
        f[i][0] = 1;
    }
    for (let i = 1; i <= m; ++i) {
        for (let j = 1; j <= n; ++j) {
            f[i][j] = f[i - 1][j];
            if (s[i - 1] === t[j - 1]) {
                f[i][j] += f[i - 1][j - 1];
            }
        }
    }
    return f[m][n];
}
```


### 方法二：动态规划优化



> **思考**
>
> 方法一的 $f[i][j]$ 只依赖上一行。压缩成一维后，内层必须从大到小更新 $j$，以免覆盖尚未使用的 $f[j-1]$。空间降为 $O(|t|)$。



$f[i][j]$ 只与上一行有关，因此可以去掉第一维。内层对 $j$ 从大到小更新，避免覆盖还未使用的 $f[j-1]$，空间复杂度降为 $O(n)$。




#### Python3


```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        n = len(t)
        f = [1] + [0] * n
        for a in s:
            for j in range(n, 0, -1):
                if a == t[j - 1]:
                    f[j] += f[j - 1]
        return f[n]
```


#### TypeScript


```ts
function numDistinct(s: string, t: string): number {
    const n = t.length;
    const f: number[] = new Array(n + 1).fill(0);
    f[0] = 1;
    for (const a of s) {
        for (let j = n; j; --j) {
            const b = t[j - 1];
            if (a === b) {
                f[j] += f[j - 1];
            }
        }
    }
    return f[n];
}
```

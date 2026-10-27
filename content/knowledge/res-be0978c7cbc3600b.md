## 解法




### 方法一：动态规划



> **思考**
>
> 在 $0$、 $1$ 个数受限下选最多字符串，是二维费用的 $0$-$1$ 背包。子集枚举不可行。
>
> $f[i][j][k]$：前 $i$ 个串、至多 $j$ 个 $0$、 $k$ 个 $1$ 的最大个数。不选抄上一行，选则加上 $1$（费用够时）。
>
> 先统计当前串的 $0/1$ 个数再填表，保证转移用的是这一件物品的费用。



我们定义 $f[i][j][k]$ 表示在前 $i$ 个字符串中，使用 $j$ 个 0 和 $k$ 个 1 的情况下最多可以得到的字符串数量。初始时 $f[i][j][k]=0$，答案为 $f[sz][m][n]$，其中 $sz$ 是数组 $strs$ 的长度。

对于 $f[i][j][k]$，我们有两种决策：

- 不选第 $i$ 个字符串，此时 $f[i][j][k]=f[i-1][j][k]$；
- 选第 $i$ 个字符串，此时 $f[i][j][k]=f[i-1][j-a][k-b]+1$，其中 $a$ 和 $b$ 分别是第 $i$ 个字符串中 $0$ 和 $1$ 的数量。

我们取两种决策中的最大值，即可得到 $f[i][j][k]$ 的值。

最终的答案即为 $f[sz][m][n]$。

时间复杂度 $O(sz \times m \times n)$，空间复杂度 $O(sz \times m \times n)$。其中 $sz$ 是数组 $strs$ 的长度；而 $m$ 和 $n$ 分别是字符串中 $0$ 和 $1$ 的数量上限。




#### Python3


```python
class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        sz = len(strs)
        f = [[[0] * (n + 1) for _ in range(m + 1)] for _ in range(sz + 1)]
        for i, s in enumerate(strs, 1):
            a, b = s.count("0"), s.count("1")
            for j in range(m + 1):
                for k in range(n + 1):
                    f[i][j][k] = f[i - 1][j][k]
                    if j >= a and k >= b:
                        f[i][j][k] = max(f[i][j][k], f[i - 1][j - a][k - b] + 1)
        return f[sz][m][n]
```


#### TypeScript


```ts
function findMaxForm(strs: string[], m: number, n: number): number {
    const sz = strs.length;
    const f = Array.from({ length: sz + 1 }, () =>
        Array.from({ length: m + 1 }, () => Array.from({ length: n + 1 }, () => 0)),
    );
    const count = (s: string): [number, number] => {
        let a = 0;
        for (const c of s) {
            a += c === '0' ? 1 : 0;
        }
        return [a, s.length - a];
    };
    for (let i = 1; i <= sz; ++i) {
        const [a, b] = count(strs[i - 1]);
        for (let j = 0; j <= m; ++j) {
            for (let k = 0; k <= n; ++k) {
                f[i][j][k] = f[i - 1][j][k];
                if (j >= a && k >= b) {
                    f[i][j][k] = Math.max(f[i][j][k], f[i - 1][j - a][k - b] + 1);
                }
            }
        }
    }
    return f[sz][m][n];
}
```


### 方法二：动态规划（空间优化）



> **思考**
>
> $f[i]$ 只依赖 $f[i-1]$，将 $j,k$ 倒序更新并丢掉第一维，空间降为 $O(mn)$，避免同一字符串被用两次。



我们注意到 $f[i][j][k]$ 的计算只和 $f[i-1][j][k]$ 以及 $f[i-1][j-a][k-b]$ 有关，因此我们可以去掉第一维，将空间复杂度优化到 $O(m \times n)$。




#### Python3


```python
class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        f = [[0] * (n + 1) for _ in range(m + 1)]
        for s in strs:
            a, b = s.count("0"), s.count("1")
            for i in range(m, a - 1, -1):
                for j in range(n, b - 1, -1):
                    f[i][j] = max(f[i][j], f[i - a][j - b] + 1)
        return f[m][n]
```


#### TypeScript


```ts
function findMaxForm(strs: string[], m: number, n: number): number {
    const f = Array.from({ length: m + 1 }, () => Array.from({ length: n + 1 }, () => 0));
    const count = (s: string): [number, number] => {
        let a = 0;
        for (const c of s) {
            a += c === '0' ? 1 : 0;
        }
        return [a, s.length - a];
    };
    for (const s of strs) {
        const [a, b] = count(s);
        for (let i = m; i >= a; --i) {
            for (let j = n; j >= b; --j) {
                f[i][j] = Math.max(f[i][j], f[i - a][j - b] + 1);
            }
        }
    }
    return f[m][n];
}
```

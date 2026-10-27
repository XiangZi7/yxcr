## 解法




### 方法一：动态规划



> **思考**
>
> 只能向右或向下，求路径乘积的最大非负值。网格含负数，最大乘积可能来自「最小（最负）乘积再乘一个负数」。只记最大值会漏掉这条通道。
>
> 对每个格子同时记录到达该格的最小积与最大积，由上方、左方的两个极值与当前值相乘更新。终点最大积若为负则返回 $-1$，否则取模。



我们定义一个三维数组 $f$，其中 $f[i][j][0]$ 和 $f[i][j][1]$ 分别表示从左上角 $(0, 0)$ 出发到达位置 $(i, j)$ 的路径中积的最小值和最大值。对于每个位置 $(i, j)$，我们可以从上方 $(i - 1, j)$ 或左方 $(i, j - 1)$ 转移过来，因此我们需要考虑这两条路径的积的最小值和最大值与当前单元格的值相乘后的结果。

最后，我们需要返回 $f[m - 1][n - 1][1]$ 对 $10^9 + 7$ 取余的结果，如果 $f[m - 1][n - 1][1]$ 小于 $0$，则返回 $-1$。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是矩阵的行数和列数。




#### Python3


```python
class Solution:
    def maxProductPath(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        f = [[[0, 0] for _ in range(n)] for _ in range(m)]

        for i in range(m):
            for j in range(n):
                x = grid[i][j]
                if i == 0 and j == 0:
                    f[i][j][0] = x
                    f[i][j][1] = x
                    continue

                mn, mx = inf, -inf

                if i > 0:
                    a, b = f[i - 1][j]
                    mn = min(mn, a * x, b * x)
                    mx = max(mx, a * x, b * x)

                if j > 0:
                    a, b = f[i][j - 1]
                    mn = min(mn, a * x, b * x)
                    mx = max(mx, a * x, b * x)

                f[i][j][0], f[i][j][1] = mn, mx

        ans = f[m - 1][n - 1][1]
        mod = 10**9 + 7
        return -1 if ans < 0 else ans % mod
```


#### TypeScript


```ts
function maxProductPath(grid: number[][]): number {
    const m = grid.length,
        n = grid[0].length;
    const f = Array.from({ length: m }, () => Array.from({ length: n }, () => [0, 0]));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const x = grid[i][j];

            if (i === 0 && j === 0) {
                f[i][j] = [x, x];
                continue;
            }

            let mn = Infinity,
                mx = -Infinity;

            if (i > 0) {
                const [a, b] = f[i - 1][j];
                mn = Math.min(mn, a * x, b * x);
                mx = Math.max(mx, a * x, b * x);
            }

            if (j > 0) {
                const [a, b] = f[i][j - 1];
                mn = Math.min(mn, a * x, b * x);
                mx = Math.max(mx, a * x, b * x);
            }

            f[i][j] = [mn, mx];
        }
    }

    const ans = f[m - 1][n - 1][1];
    const mod = 1e9 + 7;
    return ans < 0 ? -1 : ans % mod;
}
```

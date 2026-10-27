## 解法




### 方法一：动态规划（滚动数组）



> **思考**
>
> 下降路径相邻行不能同列。 $n \le 200$，朴素 $O(n^3)$ 可过。第 $i$ 行选列 $j$ 的最优值是上一行除 $j$ 外的最小路径和加上 $grid[i][j]$。
>
> 只保留上一行的 $n$ 个值，当前行现场加上「除本列外的最小前缀」。滚动数组去掉行维。



定义 $f[i][j]$ 表示前 $i$ 行且最后一个数字在第 $j$ 列的最小路径和：

$$
f[i][j] = \min_{k \neq j} f[i - 1][k] + \textit{grid}[i - 1][j]
$$

答案为 $\min_{0 \leq j < n} f[n][j]$。滚动之后只保留最后一行，也就是一维数组 $f$ 的最小值。

$f[i][j]$ 只依赖上一行，因此用两个长度为 $n$ 的一维数组 $f$、 $g$ 滚动即可。

时间复杂度 $O(n^3)$，空间复杂度 $O(n)$。其中 $n$ 为矩阵的行数。




#### Python3


```python
class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        n = len(grid)
        f = [0] * n
        for row in grid:
            g = row[:]
            for i in range(n):
                g[i] += min((f[j] for j in range(n) if j != i), default=0)
            f = g
        return min(f)
```


#### TypeScript


```ts
function minFallingPathSum(grid: number[][]): number {
    const n = grid.length;
    const f: number[] = Array(n).fill(0);
    for (const row of grid) {
        const g = [...row];
        for (let i = 0; i < n; ++i) {
            let t = Infinity;
            for (let j = 0; j < n; ++j) {
                if (j !== i) {
                    t = Math.min(t, f[j]);
                }
            }
            g[i] += t === Infinity ? 0 : t;
        }
        f.splice(0, n, ...g);
    }
    return Math.min(...f);
}
```

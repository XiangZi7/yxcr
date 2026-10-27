## 解法




### 方法一：动态规划



> **思考**
>
> 两个机器人同行向下，各可左/中/右一列。 $rows,cols\le 70$，分别搜索路径会重复计算。同行同步后状态只需「行、两人列号」。
>
> $f[i][j_1][j_2]$ 为两人在第 $i$ 行处于 $j_1,j_2$ 时的最大樱桃；同格只计一次。由上一行九种相邻列转移。答案取最后一行最大值。



我们定义 $f[i][j_1][j_2]$ 表示两个机器人分别在第 $i$ 行的位置 $j_1$ 和 $j_2$ 时能够摘到的最多樱桃数目。初始时 $f[0][0][n-1] = grid[0][0] + grid[0][n-1]$，其余值均为 $-1$。答案为 $\max_{0 \leq j_1, j_2 < n} f[m-1][j_1][j_2]$。

考虑 $f[i][j_1][j_2]$，如果 $j_1 \neq j_2$，那么机器人在第 $i$ 行能摘到的樱桃数目为 $grid[i][j_1] + grid[i][j_2]$；如果 $j_1 = j_2$，那么机器人在第 $i$ 行能摘到的樱桃数目为 $grid[i][j_1]$。我们可以枚举两个机器人的上一个状态 $f[i-1][y1][y2]$，其中 $y_1, y_2$ 分别是两个机器人在第 $i-1$ 行的位置，那么有 $y_1 \in \{j_1-1, j_1, j_1+1\}$ 且 $y_2 \in \{j_2-1, j_2, j_2+1\}$。状态转移方程如下：

$$
f[i][j_1][j_2] = \max_{y_1 \in \{j_1-1, j_1, j_1+1\}, y_2 \in \{j_2-1, j_2, j_2+1\}} f[i-1][y_1][y_2] + \begin{cases} grid[i][j_1] + grid[i][j_2], & j_1 \neq j_2 \\ grid[i][j_1], & j_1 = j_2 \end{cases}
$$

其中 $f[i-1][y_1][y_2]$ 为 $-1$ 时需要忽略。

最终的答案即为 $\max_{0 \leq j_1, j_2 < n} f[m-1][j_1][j_2]$。

时间复杂度 $O(m \times n^2)$，空间复杂度 $O(m \times n^2)$。其中 $m$ 和 $n$ 分别是网格的行数和列数。




#### Python3


```python
class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        f = [[[-1] * n for _ in range(n)] for _ in range(m)]
        f[0][0][n - 1] = grid[0][0] + grid[0][n - 1]
        for i in range(1, m):
            for j1 in range(n):
                for j2 in range(n):
                    x = grid[i][j1] + (0 if j1 == j2 else grid[i][j2])
                    for y1 in range(j1 - 1, j1 + 2):
                        for y2 in range(j2 - 1, j2 + 2):
                            if 0 <= y1 < n and 0 <= y2 < n and f[i - 1][y1][y2] != -1:
                                f[i][j1][j2] = max(f[i][j1][j2], f[i - 1][y1][y2] + x)
        return max(f[-1][j1][j2] for j1, j2 in product(range(n), range(n)))
```


#### TypeScript


```ts
function cherryPickup(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const f = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => Array.from({ length: n }, () => -1)),
    );
    f[0][0][n - 1] = grid[0][0] + grid[0][n - 1];
    for (let i = 1; i < m; ++i) {
        for (let j1 = 0; j1 < n; ++j1) {
            for (let j2 = 0; j2 < n; ++j2) {
                const x = grid[i][j1] + (j1 === j2 ? 0 : grid[i][j2]);
                for (let y1 = j1 - 1; y1 <= j1 + 1; ++y1) {
                    for (let y2 = j2 - 1; y2 <= j2 + 1; ++y2) {
                        if (y1 >= 0 && y1 < n && y2 >= 0 && y2 < n && f[i - 1][y1][y2] !== -1) {
                            f[i][j1][j2] = Math.max(f[i][j1][j2], f[i - 1][y1][y2] + x);
                        }
                    }
                }
            }
        }
    }
    return Math.max(...f[m - 1].flat());
}
```








### 方法二：动态规划（空间优化）



> **思考**
>
> 方法一的第 $i$ 层只依赖第 $i-1$ 层，用两张 $n\times n$ 表滚动即可，时间不变、空间少一维。



注意到 $f[i][j_1][j_2]$ 的计算只和 $f[i-1][y_1][y_2]$ 有关，因此我们可以使用滚动数组优化空间复杂度，空间复杂度优化后的时间复杂度为 $O(n^2)$。




#### Python3


```python
class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        f = [[-1] * n for _ in range(n)]
        g = [[-1] * n for _ in range(n)]
        f[0][n - 1] = grid[0][0] + grid[0][n - 1]
        for i in range(1, m):
            for j1 in range(n):
                for j2 in range(n):
                    x = grid[i][j1] + (0 if j1 == j2 else grid[i][j2])
                    for y1 in range(j1 - 1, j1 + 2):
                        for y2 in range(j2 - 1, j2 + 2):
                            if 0 <= y1 < n and 0 <= y2 < n and f[y1][y2] != -1:
                                g[j1][j2] = max(g[j1][j2], f[y1][y2] + x)
            f, g = g, f
        return max(f[j1][j2] for j1, j2 in product(range(n), range(n)))
```


#### TypeScript


```ts
function cherryPickup(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    let f: number[][] = Array.from({ length: n }, () => Array.from({ length: n }, () => -1));
    let g: number[][] = Array.from({ length: n }, () => Array.from({ length: n }, () => -1));
    f[0][n - 1] = grid[0][0] + grid[0][n - 1];
    for (let i = 1; i < m; ++i) {
        for (let j1 = 0; j1 < n; ++j1) {
            for (let j2 = 0; j2 < n; ++j2) {
                const x = grid[i][j1] + (j1 === j2 ? 0 : grid[i][j2]);
                for (let y1 = j1 - 1; y1 <= j1 + 1; ++y1) {
                    for (let y2 = j2 - 1; y2 <= j2 + 1; ++y2) {
                        if (y1 >= 0 && y1 < n && y2 >= 0 && y2 < n && f[y1][y2] !== -1) {
                            g[j1][j2] = Math.max(g[j1][j2], f[y1][y2] + x);
                        }
                    }
                }
            }
        }
        [f, g] = [g, f];
    }
    return Math.max(...f.flat());
}
```

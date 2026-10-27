## 解法




### 方法一：动态规划



> **思考**
>
> 骑士走 $k$ 步仍在 $n\times n$ 棋盘上的概率。每步 $8$ 向，搜索树为 $8^k$， $k$ 可达 $100$。
>
> $f[h][i][j]$ 表示从 $(i,j)$ 再走 $h$ 步仍在棋上的概率。 $h=0$ 为 $1$；否则对八个合法落点累加 $f[h-1]/8$。答案为 $f[k][row][column]$。



我们定义 $f[h][i][j]$ 表示骑士从 $(i, j)$ 位置出发，走了 $h$ 步以后还留在棋盘上的概率。那么最终答案就是 $f[k][\textit{row}][\textit{column}]$。

当 $h=0$ 时，骑士一定在棋盘上，概率为 $1$，即 $f[0][i][j]=1$。

当 $h \gt 0$ 时，骑士在 $(i, j)$ 位置上的概率可以由其上一步的 $8$ 个位置上的概率转移得到，即：

$$
f[h][i][j] = \sum_{x, y} f[h - 1][x][y] \times \frac{1}{8}
$$

其中 $(x, y)$ 是从 $(i, j)$ 位置可以走到的 $8$ 个位置中的一个。

最终答案即为 $f[k][\textit{row}][\textit{column}]$。

时间复杂度 $O(k \times n^2)$，空间复杂度 $O(k \times n^2)$。其中 $k$ 和 $n$ 分别是给定的步数和棋盘大小。




#### Python3


```python
class Solution:
    def knightProbability(self, n: int, k: int, row: int, column: int) -> float:
        f = [[[0] * n for _ in range(n)] for _ in range(k + 1)]
        for i in range(n):
            for j in range(n):
                f[0][i][j] = 1
        for h in range(1, k + 1):
            for i in range(n):
                for j in range(n):
                    for a, b in pairwise((-2, -1, 2, 1, -2, 1, 2, -1, -2)):
                        x, y = i + a, j + b
                        if 0 <= x < n and 0 <= y < n:
                            f[h][i][j] += f[h - 1][x][y] / 8
        return f[k][row][column]
```


#### TypeScript


```ts
function knightProbability(n: number, k: number, row: number, column: number): number {
    const f = Array.from({ length: k + 1 }, () =>
        Array.from({ length: n }, () => Array(n).fill(0)),
    );
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            f[0][i][j] = 1;
        }
    }
    const dirs = [-2, -1, 2, 1, -2, 1, 2, -1, -2];
    for (let h = 1; h <= k; ++h) {
        for (let i = 0; i < n; ++i) {
            for (let j = 0; j < n; ++j) {
                for (let p = 0; p < 8; ++p) {
                    const x = i + dirs[p];
                    const y = j + dirs[p + 1];
                    if (x >= 0 && x < n && y >= 0 && y < n) {
                        f[h][i][j] += f[h - 1][x][y] / 8;
                    }
                }
            }
        }
    }
    return f[k][row][column];
}
```

## 解法




### 方法一：DFS



> **思考**
>
> 先找出与 $(row,col)$ 同色的连通块，再判断每个格子是否在块的边界上， $m,n\le 50$ 时一次搜索足够。边界格子要么贴着网格外缘，要么有异色邻居。
>
> 深度优先遍历该连通块，对每个格子检查四邻：越界或颜色不同则当前格是边界，改为 $\textit{color}$。访问标记防止重复进入。
>
> 从给定起点出发搜完即完成重着色。



我们从位置 $(row, col)$ 出发，利用 DFS 搜索所有颜色为 $grid[row][col]$ 的网格块，如果该网格块的某个相邻位置的颜色不为 $grid[row][col]$，或者该网格块在网格的边界上，则将该网格块的颜色改为 $color$。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是网格的行数和列数。




#### Python3


```python
class Solution:
    def colorBorder(
        self, grid: List[List[int]], row: int, col: int, color: int
    ) -> List[List[int]]:
        def dfs(i: int, j: int, c: int) -> None:
            vis[i][j] = True
            for a, b in pairwise((-1, 0, 1, 0, -1)):
                x, y = i + a, j + b
                if 0 <= x < m and 0 <= y < n:
                    if not vis[x][y]:
                        if grid[x][y] == c:
                            dfs(x, y, c)
                        else:
                            grid[i][j] = color
                else:
                    grid[i][j] = color

        m, n = len(grid), len(grid[0])
        vis = [[False] * n for _ in range(m)]
        dfs(row, col, grid[row][col])
        return grid
```


#### TypeScript


```ts
function colorBorder(grid: number[][], row: number, col: number, color: number): number[][] {
    const m = grid.length;
    const n = grid[0].length;
    const vis = new Array(m).fill(0).map(() => new Array(n).fill(false));
    const dirs = [-1, 0, 1, 0, -1];
    const dfs = (i: number, j: number, c: number) => {
        vis[i][j] = true;
        for (let k = 0; k < 4; ++k) {
            const x = i + dirs[k];
            const y = j + dirs[k + 1];
            if (x >= 0 && x < m && y >= 0 && y < n) {
                if (!vis[x][y]) {
                    if (grid[x][y] == c) {
                        dfs(x, y, c);
                    } else {
                        grid[i][j] = color;
                    }
                }
            } else {
                grid[i][j] = color;
            }
        }
    };
    dfs(row, col, grid[row][col]);
    return grid;
}
```

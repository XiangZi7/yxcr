## 解法




### 方法一：DFS



> **思考**
>
> 网格至多 $15\times 15$，含金格子不超过 $25$，穷举所有不重复路径可行。路径不能回头，且须从任意含金格出发取最大和。
>
> DFS 进入格子时把金币置零表示占用，向四邻递归并累加，回溯时恢复。从每个格子启动一次，取全局最大。现场修改兼作访问标记，避免额外集合。



我们可以枚举每个格子作为起点，然后从起点开始进行深度优先搜索。在搜索的过程中，每遇到一个非零的格子，就将其变成零，并继续搜索。当无法继续搜索时，计算当前的路径的黄金总数，然后将当前的格子变回非零的格子，从而进行回溯。

时间复杂度 $O(m \times n \times 3^k)$，其中 $k$ 是每条路径的最大长度。由于每个格子最多只能被访问一次，因此时间复杂度不会超过 $O(m \times n \times 3^k)$。空间复杂度 $O(m \times n)$。




#### Python3


```python
class Solution:
    def getMaximumGold(self, grid: List[List[int]]) -> int:
        def dfs(i: int, j: int) -> int:
            if not (0 <= i < m and 0 <= j < n and grid[i][j]):
                return 0
            v = grid[i][j]
            grid[i][j] = 0
            ans = max(dfs(i + a, j + b) for a, b in pairwise(dirs)) + v
            grid[i][j] = v
            return ans

        m, n = len(grid), len(grid[0])
        dirs = (-1, 0, 1, 0, -1)
        return max(dfs(i, j) for i in range(m) for j in range(n))
```


#### TypeScript


```ts
function getMaximumGold(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const dfs = (i: number, j: number): number => {
        if (i < 0 || i >= m || j < 0 || j >= n || !grid[i][j]) {
            return 0;
        }
        const v = grid[i][j];
        grid[i][j] = 0;
        let ans = v + Math.max(dfs(i - 1, j), dfs(i + 1, j), dfs(i, j - 1), dfs(i, j + 1));
        grid[i][j] = v;
        return ans;
    };
    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            ans = Math.max(ans, dfs(i, j));
        }
    }
    return ans;
}
```

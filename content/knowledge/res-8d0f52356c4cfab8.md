## 解法




### 方法一：BFS



> **思考**
>
> 判断网格中是否存在长度至少为 $4$、字符相同的环。 $m,n$ 不大，一次图搜索即可，但必须排除立刻走回父格造成的假环。
>
> 对每个未访问格做广度优先：只走向同字符邻居，并记下父坐标。若邻居已被访问且不是父格，则找到环。同一连通块只搜一次。



我们可以遍历二维网格中的每一个格子，对于每一个格子，如果格子 $grid[i][j]$ 未被访问过，我们就从该格子开始进行广度优先搜索，搜索过程中，我们需要记录每一个格子的父节点，以及上一个格子的坐标，如果下一个格子的值与当前格子的值相同，且不是上一个格子，并且已经被访问过，那么就说明存在环，返回 $\textit{true}$。遍历完所有格子后，如果没有找到环，返回 $\textit{false}$。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是二维网格的行数和列数。




#### Python3


```python
class Solution:
    def containsCycle(self, grid: List[List[str]]) -> bool:
        m, n = len(grid), len(grid[0])
        vis = [[False] * n for _ in range(m)]
        dirs = (-1, 0, 1, 0, -1)
        for i, row in enumerate(grid):
            for j, x in enumerate(row):
                if vis[i][j]:
                    continue
                vis[i][j] = True
                q = [(i, j, -1, -1)]
                while q:
                    x, y, px, py = q.pop()
                    for dx, dy in pairwise(dirs):
                        nx, ny = x + dx, y + dy
                        if 0 <= nx < m and 0 <= ny < n:
                            if grid[nx][ny] != grid[i][j] or (nx == px and ny == py):
                                continue
                            if vis[nx][ny]:
                                return True
                            vis[nx][ny] = True
                            q.append((nx, ny, x, y))
        return False
```


#### TypeScript


```ts
function containsCycle(grid: string[][]): boolean {
    const [m, n] = [grid.length, grid[0].length];
    const vis: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false));
    const dirs = [-1, 0, 1, 0, -1];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (!vis[i][j]) {
                const q: [number, number, number, number][] = [[i, j, -1, -1]];
                vis[i][j] = true;
                for (const [x, y, px, py] of q) {
                    for (let k = 0; k < 4; k++) {
                        const [nx, ny] = [x + dirs[k], y + dirs[k + 1]];
                        if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
                            if (grid[nx][ny] !== grid[x][y] || (nx === px && ny === py)) {
                                continue;
                            }
                            if (vis[nx][ny]) {
                                return true;
                            }
                            q.push([nx, ny, x, y]);
                            vis[nx][ny] = true;
                        }
                    }
                }
            }
        }
    }
    return false;
}
```


### 方法二：DFS



> **思考**
>
> 广度优先需要显式队列，深度优先用递归栈表达同一父指针判定，代码更短。访问标记与「非父且已访问则为环」的规则不变，只是遍历次序不同。



我们可以遍历二维网格中的每一个格子，对于每一个格子，如果格子 $grid[i][j]$ 未被访问过，我们就从该格子开始进行深度优先搜索，搜索过程中，我们需要记录每一个格子的父节点，以及上一个格子的坐标，如果下一个格子的值与当前格子的值相同，且不是上一个格子，并且已经被访问过，那么就说明存在环，返回 $\textit{true}$。遍历完所有格子后，如果没有找到环，返回 $\textit{false}$。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是二维网格的行数和列数。




#### Python3


```python
class Solution:
    def containsCycle(self, grid: List[List[str]]) -> bool:
        def dfs(x: int, y: int, px: int, py: int) -> bool:
            vis[x][y] = True
            for dx, dy in pairwise(dirs):
                nx, ny = x + dx, y + dy
                if 0 <= nx < m and 0 <= ny < n:
                    if grid[nx][ny] != grid[x][y] or (nx == px and ny == py):
                        continue
                    if vis[nx][ny] or dfs(nx, ny, x, y):
                        return True
            return False

        m, n = len(grid), len(grid[0])
        vis = [[False] * n for _ in range(m)]
        dirs = (-1, 0, 1, 0, -1)
        for i in range(m):
            for j in range(n):
                if vis[i][j]:
                    continue
                if dfs(i, j, -1, -1):
                    return True
        return False
```


#### TypeScript


```ts
function containsCycle(grid: string[][]): boolean {
    const [m, n] = [grid.length, grid[0].length];
    const vis: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false));
    const dfs = (x: number, y: number, px: number, py: number): boolean => {
        vis[x][y] = true;
        const dirs = [-1, 0, 1, 0, -1];
        for (let k = 0; k < 4; k++) {
            const [nx, ny] = [x + dirs[k], y + dirs[k + 1]];
            if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
                if (grid[nx][ny] !== grid[x][y] || (nx === px && ny === py)) {
                    continue;
                }
                if (vis[nx][ny] || dfs(nx, ny, x, y)) {
                    return true;
                }
            }
        }
        return false;
    };
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (!vis[i][j] && dfs(i, j, -1, -1)) {
                return true;
            }
        }
    }
    return false;
}
```

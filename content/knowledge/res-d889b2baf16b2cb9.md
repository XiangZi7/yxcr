## 解法




### 方法一：记忆化搜索



> **思考**
>
> 与「不同路径」相同，每步只能向下或向右。若直接递归搜索， $m, n \le 100$ 时同一格子会被反复展开，时间无法接受；网格中还有障碍，第一行、第一列也不再处处可达。
>
> 从 $(i, j)$ 出发，越界或遇到障碍则路径数为 $0$，到达终点则为 $1$，否则等于向下、向右两支之和。为 $\textit{dfs}(i, j)$ 加上记忆化后，每个格子只计算一次，时间与空间均为 $O(mn)$。



我们设计一个函数 $\textit{dfs}(i, j)$ 表示从网格 $(i, j)$ 到网格 $(m - 1, n - 1)$ 的路径数。其中 $m$ 和 $n$ 分别是网格的行数和列数。

函数 $\textit{dfs}(i, j)$ 的执行过程如下：

- 如果 $i \ge m$ 或者 $j \ge n$，或者 $\textit{obstacleGrid}[i][j] = 1$，则路径数为 $0$；
- 如果 $i = m - 1$ 且 $j = n - 1$，则路径数为 $1$；
- 否则，路径数为 $\textit{dfs}(i + 1, j) + \textit{dfs}(i, j + 1)$。

为了避免重复计算，我们可以使用记忆化搜索的方法。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是网格的行数和列数。




#### Python3


```python
class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        @cache
        def dfs(i: int, j: int) -> int:
            if i >= m or j >= n or obstacleGrid[i][j]:
                return 0
            if i == m - 1 and j == n - 1:
                return 1
            return dfs(i + 1, j) + dfs(i, j + 1)

        m, n = len(obstacleGrid), len(obstacleGrid[0])
        return dfs(0, 0)
```


#### TypeScript


```ts
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    const f: number[][] = Array.from({ length: m }, () => Array(n).fill(-1));
    const dfs = (i: number, j: number): number => {
        if (i >= m || j >= n || obstacleGrid[i][j] === 1) {
            return 0;
        }
        if (i === m - 1 && j === n - 1) {
            return 1;
        }
        if (f[i][j] === -1) {
            f[i][j] = dfs(i + 1, j) + dfs(i, j + 1);
        }
        return f[i][j];
    };
    return dfs(0, 0);
}
```


### 方法二：动态规划



> **思考**
>
> 方法一记忆化后渐近复杂度已是 $O(mn)$，但仍依赖递归，调用栈较深，常系数也更大。障碍会切断边界上的通路，第一行与第一列不再整段为 $1$，自底向上按依赖顺序填表即可避开递归，并自然处理障碍格。



我们可以使用动态规划的方法，定义一个二维数组 $f$，其中 $f[i][j]$ 表示从网格 $(0,0)$ 到网格 $(i,j)$ 的路径数。

我们首先初始化 $f$ 的第一列和第一行的所有值，然后遍历其它行和列，有两种情况：

- 若 $\textit{obstacleGrid}[i][j] = 1$，说明路径数为 $0$，那么 $f[i][j] = 0$；
- 若 $\textit{obstacleGrid}[i][j] = 0$，则 $f[i][j] = f[i - 1][j] + f[i][j - 1]$。

最后返回 $f[m - 1][n - 1]$ 即可。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是网格的行数和列数。




#### Python3


```python
class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        m, n = len(obstacleGrid), len(obstacleGrid[0])
        f = [[0] * n for _ in range(m)]
        for i in range(m):
            if obstacleGrid[i][0] == 1:
                break
            f[i][0] = 1
        for j in range(n):
            if obstacleGrid[0][j] == 1:
                break
            f[0][j] = 1
        for i in range(1, m):
            for j in range(1, n):
                if obstacleGrid[i][j] == 0:
                    f[i][j] = f[i - 1][j] + f[i][j - 1]
        return f[-1][-1]
```


#### TypeScript


```ts
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    const f = Array.from({ length: m }, () => Array(n).fill(0));
    for (let i = 0; i < m; i++) {
        if (obstacleGrid[i][0] === 1) {
            break;
        }
        f[i][0] = 1;
    }
    for (let i = 0; i < n; i++) {
        if (obstacleGrid[0][i] === 1) {
            break;
        }
        f[0][i] = 1;
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                continue;
            }
            f[i][j] = f[i - 1][j] + f[i][j - 1];
        }
    }
    return f[m - 1][n - 1];
}
```

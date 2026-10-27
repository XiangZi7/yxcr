## 解法




### 方法一：计数



> **思考**
>
> 能通信当且仅当同行或同列还有另一台服务器。 $m,n \le 250$，先统计每行每列台数，再扫每个服务器：所在行或列计数大于 $1$ 则计入。两次遍历，额外 $O(m+n)$。



我们可以统计每一行、每一列的服务器数量，然后遍历每个服务器，若当前服务器所在的行或者列的服务器数量超过 $1$，说明当前服务器满足条件，结果加 $1$。

遍历结束后，返回结果即可。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m + n)$。其中 $m$ 和 $n$ 分别为矩阵的行数和列数。




#### Python3


```python
class Solution:
    def countServers(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        row = [0] * m
        col = [0] * n
        for i in range(m):
            for j in range(n):
                row[i] += grid[i][j]
                col[j] += grid[i][j]
        return sum(
            grid[i][j] and (row[i] > 1 or col[j] > 1)
            for i in range(m)
            for j in range(n)
        )
```


#### TypeScript


```ts
function countServers(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const row = new Array(m).fill(0);
    const col = new Array(n).fill(0);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            row[i] += grid[i][j];
            col[j] += grid[i][j];
        }
    }
    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1 && (row[i] > 1 || col[j] > 1)) {
                ans++;
            }
        }
    }
    return ans;
}
```

## 解法




### 方法一：分情况讨论 + DFS



> **思考**
>
> 每列顶端放一球，挡板将球导向左或右。网格规模有限，可对每颗球独立模拟下落。
>
> 卡住的情形只有四类：贴边且挡板把球推出网格，或相邻两格形成 $V$ 形。除此以外，球沿挡板斜向进入下一行。
>
> 用 $\textit{dfs}(i,j)$ 表示从 $(i,j)$ 出发的出口列：先判卡住返回 $-1$，否则递归到 $(i+1,j\pm 1)$；到达第 $m$ 行则返回当前列。



我们可以使用 DFS 来模拟球的运动过程，设计一个函数 $\textit{dfs}(i, j)$，表示球从第 $i$ 行第 $j$ 列出发，最终会落在第几列。对于以下情况，球会卡住：

1. 球位于最左一列，并且球所在的单元格单元格挡板将球导向左侧
1. 球位于最右一列，并且此单元格挡板将球导向右侧
1. 球所在的单元格挡板将球导向右侧，并且球右侧相邻单元格挡板将球导向左侧
1. 球所在的单元格挡板将球导向左侧，并且球左侧相邻单元格挡板将球导向右侧

如果满足以上任意一种情况，我们就可以判断球会卡住，返回 $-1$。否则，我们就可以继续递归地寻找球的下一个位置。最后，如果球到了最后一行，我们就可以返回当前列的编号。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m)$。其中 $m$ 和 $n$ 分别是数组 $\textit{grid}$ 的行数和列数。




#### Python3


```python
class Solution:
    def findBall(self, grid: List[List[int]]) -> List[int]:
        def dfs(i: int, j: int) -> int:
            if i == m:
                return j
            if j == 0 and grid[i][j] == -1:
                return -1
            if j == n - 1 and grid[i][j] == 1:
                return -1
            if grid[i][j] == 1 and grid[i][j + 1] == -1:
                return -1
            if grid[i][j] == -1 and grid[i][j - 1] == 1:
                return -1
            return dfs(i + 1, j + 1) if grid[i][j] == 1 else dfs(i + 1, j - 1)

        m, n = len(grid), len(grid[0])
        return [dfs(0, j) for j in range(n)]
```


#### TypeScript


```ts
function findBall(grid: number[][]): number[] {
    const m = grid.length;
    const n = grid[0].length;
    const dfs = (i: number, j: number) => {
        if (i === m) {
            return j;
        }
        if (grid[i][j] === 1) {
            if (j === n - 1 || grid[i][j + 1] === -1) {
                return -1;
            }
            return dfs(i + 1, j + 1);
        } else {
            if (j === 0 || grid[i][j - 1] === 1) {
                return -1;
            }
            return dfs(i + 1, j - 1);
        }
    };
    return Array.from({ length: n }, (_, j) => dfs(0, j));
}
```

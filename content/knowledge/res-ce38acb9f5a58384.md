## 解法




### 方法一：BFS



> **思考**
>
> 所求是海洋格到最近陆地的距离的最大值。对每个海洋分别 BFS 会重复访问。把全部陆地同时入队做多源 BFS，每扩散一层距离加一，最后一层海洋被染上的步数即最远距。全是陆地或全是海洋时不存在答案，返回 $-1$。



我们可以将所有陆地单元格加入队列 $q$ 中，如果队列为空，或者队列中元素个数等于网格中的单元格个数，则说明网格中只有陆地或者海洋，返回 $-1$。

否则，我们从陆地单元格开始进行广度优先搜索。定义初始步数 $ans=-1$。

在每一轮搜索中，我们将队列中的所有单元格向四个方向扩散，若单元格是海洋单元格，则将其标记为陆地单元格，并加入队列。在一轮扩散完成后，我们将步数加 $1$。重复这一过程，直到队列为空。

最后，我们返回步数 $ans$。

时间复杂度 $O(n^2)$，空间复杂度 $O(n^2)$。其中 $n$ 是网格的边长。




#### Python3


```python
class Solution:
    def maxDistance(self, grid: List[List[int]]) -> int:
        n = len(grid)
        q = deque((i, j) for i in range(n) for j in range(n) if grid[i][j])
        ans = -1
        if len(q) in (0, n * n):
            return ans
        dirs = (-1, 0, 1, 0, -1)
        while q:
            for _ in range(len(q)):
                i, j = q.popleft()
                for a, b in pairwise(dirs):
                    x, y = i + a, j + b
                    if 0 <= x < n and 0 <= y < n and grid[x][y] == 0:
                        grid[x][y] = 1
                        q.append((x, y))
            ans += 1
        return ans
```


#### TypeScript


```ts
function maxDistance(grid: number[][]): number {
    const n = grid.length;
    const q: [number, number][] = [];
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            if (grid[i][j] === 1) {
                q.push([i, j]);
            }
        }
    }
    let ans = -1;
    if (q.length === 0 || q.length === n * n) {
        return ans;
    }
    const dirs: number[] = [-1, 0, 1, 0, -1];
    while (q.length > 0) {
        for (let m = q.length; m; --m) {
            const [i, j] = q.shift()!;
            for (let k = 0; k < 4; ++k) {
                const x = i + dirs[k];
                const y = j + dirs[k + 1];
                if (x >= 0 && x < n && y >= 0 && y < n && grid[x][y] === 0) {
                    grid[x][y] = 1;
                    q.push([x, y]);
                }
            }
        }
        ++ans;
    }
    return ans;
}
```

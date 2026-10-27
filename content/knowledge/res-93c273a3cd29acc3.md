## 解法




### 方法一：双端队列 BFS



> **思考**
>
> 格子箭头指定下一步，改一个箭头代价为 $1$，求到右下的最少修改。普通最短路带堆是 $O(mn\log)$。边权只有 $0$（沿箭头）和 $1$（改方向），可用 0-1 BFS：沿箭头的邻居插入队首且代价不变，改方向的插入队尾且代价加一。首次到达终点即为最少修改。



本题实际上也是最短路模型，只不过求解的是改变方向的最小次数。

在一个边权只有 0、1 的无向图中搜索最短路径可以使用双端队列进行 BFS。其原理是当前可以扩展到的点的权重为 0 时，将其加入队首；权重为 1 时，将其加入队尾。

> 如果某条边权值为 0，那么新拓展出的节点权值就和当前队首节点权值相同，显然可以作为下一次拓展的起点。




#### Python3


```python
class Solution:
    def minCost(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dirs = [[0, 0], [0, 1], [0, -1], [1, 0], [-1, 0]]
        q = deque([(0, 0, 0)])
        vis = set()
        while q:
            i, j, d = q.popleft()
            if (i, j) in vis:
                continue
            vis.add((i, j))
            if i == m - 1 and j == n - 1:
                return d
            for k in range(1, 5):
                x, y = i + dirs[k][0], j + dirs[k][1]
                if 0 <= x < m and 0 <= y < n:
                    if grid[i][j] == k:
                        q.appendleft((x, y, d))
                    else:
                        q.append((x, y, d + 1))
        return -1
```


#### TypeScript


```ts
function minCost(grid: number[][]): number {
    const m = grid.length,
        n = grid[0].length;
    let ans = Array.from({ length: m }, v => new Array(n).fill(Infinity));
    ans[0][0] = 0;
    let queue = [[0, 0]];
    const dirs = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];
    while (queue.length) {
        let [x, y] = queue.shift();
        for (let step = 1; step < 5; step++) {
            let [dx, dy] = dirs[step - 1];
            let [i, j] = [x + dx, y + dy];
            if (i < 0 || i >= m || j < 0 || j >= n) continue;
            let cost = ~~(grid[x][y] != step) + ans[x][y];
            if (cost >= ans[i][j]) continue;
            ans[i][j] = cost;
            if (grid[x][y] == step) {
                queue.unshift([i, j]);
            } else {
                queue.push([i, j]);
            }
        }
    }
    return ans[m - 1][n - 1];
}
```

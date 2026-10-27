## 解法




### 方法一：并查集



> **思考**
>
> 水位随时间上涨，时刻 $t$ 只能走高度 $\le t$ 的格子，求从左上到右下的最早时刻。高度是 $0..n^2-1$ 的排列，可按高度从低到高加入格子。
>
> 加入高度为 $t$ 的格并与已加入的四邻连通后，若起点与终点连通，则 $t$ 就是答案。并查集维护连通。
>
> 先把高度映射到坐标，再按 $t$ 递增合并。时间 $O(n^2\alpha)$。



我们可以将每个位置 $(i, j)$ 映射为一个编号 $id = i \times n + j$，并使用并查集维护连通分量。

我们首先用一个一维数组 $hi$ 记录每个高度对应的位置编号，即 $hi[h]$ 表示高度为 $h$ 的位置编号。

然后我们从高度 $0$ 开始遍历到高度 $n^2 - 1$，对于每个高度 $t$，我们将位置 $hi[t]$ 与其四个相邻且高度不超过 $t$ 的位置进行合并。如果合并后，位置 $0$ 和位置 $n^2 - 1$ 连通了，那么我们就找到了最小的时间 $t$，返回 $t$ 即可。

时间复杂度 $O(n^2 \times \log n)$，空间复杂度 $O(n^2)$。其中 $n$ 是矩阵的边长。




#### Python3


```python
class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        def find(x: int) -> int:
            if p[x] != x:
                p[x] = find(p[x])
            return p[x]

        n = len(grid)
        m = n * n
        p = list(range(m))
        hi = [0] * m
        for i, row in enumerate(grid):
            for j, h in enumerate(row):
                hi[h] = i * n + j
        dirs = (-1, 0, 1, 0, -1)
        for t in range(m):
            x, y = divmod(hi[t], n)
            for dx, dy in pairwise(dirs):
                nx, ny = x + dx, y + dy
                if 0 <= nx < n and 0 <= ny < n and grid[nx][ny] <= t:
                    p[find(x * n + y)] = find(nx * n + ny)
            if find(0) == find(m - 1):
                return t
        return 0
```


#### TypeScript


```ts
function swimInWater(grid: number[][]): number {
    const n = grid.length;
    const m = n * n;
    const p = Array.from({ length: m }, (_, i) => i);
    const hi = new Array<number>(m);
    const find = (x: number): number => (p[x] === x ? x : (p[x] = find(p[x])));

    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            hi[grid[i][j]] = i * n + j;
        }
    }

    const dirs = [-1, 0, 1, 0, -1];

    for (let t = 0; t < m; ++t) {
        const id = hi[t];
        const x = Math.floor(id / n);
        const y = id % n;

        for (let k = 0; k < 4; ++k) {
            const nx = x + dirs[k];
            const ny = y + dirs[k + 1];
            if (nx >= 0 && nx < n && ny >= 0 && ny < n && grid[nx][ny] <= t) {
                p[find(x * n + y)] = find(nx * n + ny);
            }
        }
        if (find(0) === find(m - 1)) {
            return t;
        }
    }

    return 0;
}
```

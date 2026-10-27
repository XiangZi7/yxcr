## 解法




### 方法一：DFS



> **思考**
>
> 封闭岛是不碰边界的陆地连通块。 $m,n \le 100$，洪水填充即可。从每块未访陆地 DFS，途中把格子改成水以免重复；若整块都在内部则计数加一。
>
> 返回值用与运算汇合「当前格不在边界」与所有邻居的结果。现场修改兼作访问标记。



遍历矩阵，对于每个陆地，我们进行深度优先搜索，找到与其相连的所有陆地，然后判断是否存在边界上的陆地，如果存在，则不是封闭岛屿，否则是封闭岛屿，答案加一。

最后返回答案即可。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是矩阵的行数和列数。




#### Python3


```python
class Solution:
    def closedIsland(self, grid: List[List[int]]) -> int:
        def dfs(i: int, j: int) -> int:
            res = int(0 < i < m - 1 and 0 < j < n - 1)
            grid[i][j] = 1
            for a, b in pairwise(dirs):
                x, y = i + a, j + b
                if 0 <= x < m and 0 <= y < n and grid[x][y] == 0:
                    res &= dfs(x, y)
            return res

        m, n = len(grid), len(grid[0])
        dirs = (-1, 0, 1, 0, -1)
        return sum(grid[i][j] == 0 and dfs(i, j) for i in range(m) for j in range(n))
```


#### TypeScript


```ts
function closedIsland(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const dirs = [-1, 0, 1, 0, -1];
    const dfs = (i: number, j: number): number => {
        let res = i > 0 && j > 0 && i < m - 1 && j < n - 1 ? 1 : 0;
        grid[i][j] = 1;
        for (let k = 0; k < 4; ++k) {
            const [x, y] = [i + dirs[k], j + dirs[k + 1]];
            if (x >= 0 && y >= 0 && x < m && y < n && grid[x][y] === 0) {
                res &= dfs(x, y);
            }
        }
        return res;
    };
    let ans = 0;
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) {
                ans += dfs(i, j);
            }
        }
    }
    return ans;
}
```


### 方法二：并查集



> **思考**
>
> DFS 依赖递归栈与现场改图。并查集把相邻陆地连成块，边界格子再与虚拟节点相连；统计根等于自身且未连到虚拟点的陆地即可。迭代合并避免递归，语义仍是「不与边界连通的陆地块」。



我们可以用并查集维护每一块连通的陆地。

遍历矩阵，如果当前位置是在边界上，我们将其与虚拟节点 $m \times n$ 连接。如果当前位置是陆地，我们将其与下方和右方的陆地连接。

接着，我们再次遍历矩阵，对于每一块陆地，如果其根节点就是本身，那么答案加一。

最后返回答案即可。

时间复杂度 $O(m \times n \times \alpha(m \times n))$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是矩阵的行数和列数。




#### Python3


```python
class UnionFind:
    def __init__(self, n: int):
        self.p = list(range(n))
        self.size = [1] * n

    def find(self, x: int) -> int:
        if self.p[x] != x:
            self.p[x] = self.find(self.p[x])
        return self.p[x]

    def union(self, a: int, b: int):
        pa, pb = self.find(a), self.find(b)
        if pa != pb:
            if self.size[pa] > self.size[pb]:
                self.p[pb] = pa
                self.size[pa] += self.size[pb]
            else:
                self.p[pa] = pb
                self.size[pb] += self.size[pa]


class Solution:
    def closedIsland(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        uf = UnionFind(m * n + 1)
        for i in range(m):
            for j in range(n):
                if i == 0 or i == m - 1 or j == 0 or j == n - 1:
                    uf.union(i * n + j, m * n)
                if grid[i][j] == 0:
                    if i < m - 1 and grid[i + 1][j] == 0:
                        uf.union(i * n + j, (i + 1) * n + j)
                    if j < n - 1 and grid[i][j + 1] == 0:
                        uf.union(i * n + j, i * n + j + 1)
        ans = 0
        for i in range(m):
            for j in range(n):
                ans += grid[i][j] == 0 and uf.find(i * n + j) == i * n + j
        return ans
```


#### TypeScript


```ts
function closedIsland(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const uf = new UnionFind(m * n + 1);
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (i === 0 || i === m - 1 || j === 0 || j === n - 1) {
                uf.union(i * n + j, m * n);
            }
            if (grid[i][j] === 0) {
                if (i + 1 < m && grid[i + 1][j] === 0) {
                    uf.union(i * n + j, (i + 1) * n + j);
                }
                if (j + 1 < n && grid[i][j + 1] === 0) {
                    uf.union(i * n + j, i * n + j + 1);
                }
            }
        }
    }
    let ans = 0;
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0 && uf.find(i * n + j) === i * n + j) {
                ++ans;
            }
        }
    }
    return ans;
}

class UnionFind {
    private p: number[];
    private size: number[];

    constructor(n: number) {
        this.p = Array(n)
            .fill(0)
            .map((_, i) => i);
        this.size = Array(n).fill(1);
    }

    find(x: number): number {
        if (this.p[x] !== x) {
            this.p[x] = this.find(this.p[x]);
        }
        return this.p[x];
    }

    union(a: number, b: number): void {
        const [pa, pb] = [this.find(a), this.find(b)];
        if (pa === pb) {
            return;
        }
        if (this.size[pa] > this.size[pb]) {
            this.p[pb] = pa;
            this.size[pa] += this.size[pb];
        } else {
            this.p[pa] = pb;
            this.size[pb] += this.size[pa];
        }
    }
}
```

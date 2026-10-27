## 解法




### 方法一：BFS



> **思考**
>
> 从每个格子沿下降路径流向海洋，同一格子会被反复搜索。 $m,n\le 200$，正向搜索重复过多。
>
> 水往低处流的逆过程，是从海洋向「高度不低于当前」的格子爬。从太平洋、大西洋的边界分别 BFS，两份访问集合的交即为答案。
>
> 逆流时邻格高度需 $\ge$ 当前高度；从边界出发保证到达的格子一定能流回对应海洋。



我们可以从太平洋和大西洋的边界出发，分别进行广度优先搜索（BFS），找到所有能够流向太平洋和大西洋的单元格。最后，我们取两个结果的交集，即为既能流向太平洋又能流向大西洋的单元格。

具体地，我们定义一个队列 $q_1$ 来存储所有与太平洋相邻的单元格，并定义一个布尔矩阵 $vis_1$ 来记录哪些单元格能够流向太平洋。类似地，我们定义队列 $q_2$ 和布尔矩阵 $vis_2$ 来处理大西洋。初始时，我们将所有与太平洋相邻的单元格加入队列 $q_1$，并将它们在 $vis_1$ 中标记为已访问。同样地，将所有与大西洋相邻的单元格加入队列 $q_2$，并在 $vis_2$ 中标记为已访问。

然后，我们分别对 $q_1$ 和 $q_2$ 进行 BFS。在每次 BFS 中，我们从队列中取出一个单元格 $(x, y)$，并检查它的四个相邻单元格 $(nx, ny)$。如果相邻单元格在矩阵范围内，且未被访问过，并且其高度不小于当前单元格的高度（即水可以流向该单元格），我们将其加入队列并标记为已访问。

最后，我们遍历整个矩阵，找出同时在 $vis_1$ 和 $vis_2$ 中被标记为已访问的单元格，这些单元格即为答案。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是矩阵的行数和列数。




#### Python3


```python
class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        def bfs(q: Deque[Tuple[int, int]], vis: List[List[bool]]) -> None:
            while q:
                x, y = q.popleft()
                for dx, dy in pairwise(dirs):
                    nx, ny = x + dx, y + dy
                    if (
                        0 <= nx < m
                        and 0 <= ny < n
                        and not vis[nx][ny]
                        and heights[nx][ny] >= heights[x][y]
                    ):
                        vis[nx][ny] = True
                        q.append((nx, ny))

        m, n = len(heights), len(heights[0])
        vis1 = [[False] * n for _ in range(m)]
        vis2 = [[False] * n for _ in range(m)]
        q1: Deque[Tuple[int, int]] = deque()
        q2: Deque[Tuple[int, int]] = deque()
        dirs = (-1, 0, 1, 0, -1)

        for i in range(m):
            q1.append((i, 0))
            vis1[i][0] = True
            q2.append((i, n - 1))
            vis2[i][n - 1] = True

        for j in range(n):
            q1.append((0, j))
            vis1[0][j] = True
            q2.append((m - 1, j))
            vis2[m - 1][j] = True

        bfs(q1, vis1)
        bfs(q2, vis2)

        return [[i, j] for i in range(m) for j in range(n) if vis1[i][j] and vis2[i][j]]
```


#### TypeScript


```ts
function pacificAtlantic(heights: number[][]): number[][] {
    const m = heights.length,
        n = heights[0].length;
    const vis1: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false));
    const vis2: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false));
    const q1: [number, number][] = [];
    const q2: [number, number][] = [];
    const dirs = [-1, 0, 1, 0, -1];

    for (let i = 0; i < m; ++i) {
        q1.push([i, 0]);
        vis1[i][0] = true;
        q2.push([i, n - 1]);
        vis2[i][n - 1] = true;
    }
    for (let j = 0; j < n; ++j) {
        q1.push([0, j]);
        vis1[0][j] = true;
        q2.push([m - 1, j]);
        vis2[m - 1][j] = true;
    }

    const bfs = (q: [number, number][], vis: boolean[][]) => {
        while (q.length) {
            const [x, y] = q.shift()!;
            for (let k = 0; k < 4; ++k) {
                const nx = x + dirs[k],
                    ny = y + dirs[k + 1];
                if (
                    nx >= 0 &&
                    nx < m &&
                    ny >= 0 &&
                    ny < n &&
                    !vis[nx][ny] &&
                    heights[nx][ny] >= heights[x][y]
                ) {
                    vis[nx][ny] = true;
                    q.push([nx, ny]);
                }
            }
        }
    };

    bfs(q1, vis1);
    bfs(q2, vis2);

    const ans: number[][] = [];
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (vis1[i][j] && vis2[i][j]) {
                ans.push([i, j]);
            }
        }
    }
    return ans;
}
```

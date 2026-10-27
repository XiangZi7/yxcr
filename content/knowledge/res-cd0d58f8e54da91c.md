## 解法




### 方法一：BFS



> **思考**
>
> 边有红蓝两种颜色，相邻边必须异色，同一结点可能因到达颜色不同而需要分别访问。把状态定为 $(\textit{结点},\textit{上一条边颜色})$，从 $0$ 分别以红、蓝虚边出发做 BFS，首次到达某结点的层数即最短路。
>
> 按颜色分存邻接表，扩展时翻转颜色，避免走同色边。



题目实际上是最短路问题，我们可以考虑使用 BFS 来解决。

首先，我们对所有的边进行预处理，将所有的边按照颜色分类，存储到多维数组 $g$ 中。其中 $g[0]$ 存储所有红色边，而 $g[1]$ 存储所有蓝色边。

接着，我们定义以下数据结构或变量：

- 队列 $q$：用来存储当前搜索到的节点，以及当前边的颜色；
- 集合 $vis$：用来存储已经搜索过的节点，以及当前边的颜色；
- 变量 $d$：用来表示当前搜索的层数，即当前搜索到的节点到起点的距离；
- 数组 $ans$：用来存储每个节点到起点的最短距离。初始时，我们将 $ans$ 数组中的所有元素初始化为 $-1$，表示所有节点到起点的距离都未知。

我们首先将起点 $0$ 和起点边的颜色 $0$ 或 $1$ 入队，表示从起点出发，且当前是红色或蓝色边。

接下来，我们开始进行 BFS 搜索。我们每次从队列中取出一个节点 $(i, c)$，如果当前节点的答案还未更新，则将当前节点的答案更新为当前层数 $d$，即 $ans[i] = d$。然后，我们将当前边的颜色 $c$ 取反，即如果当前边为红色，则将其变为蓝色，反之亦然。我们取出颜色对应的所有边，如果边的另一端节点 $j$ 未被搜索过，则将其入队。

搜索结束后，返回答案数组即可。

时间复杂度 $O(n + m)$，空间复杂度 $O(n + m)$。其中 $n$ 和 $m$ 分别为节点数和边数。




#### Python3


```python
class Solution:
    def shortestAlternatingPaths(
        self, n: int, redEdges: List[List[int]], blueEdges: List[List[int]]
    ) -> List[int]:
        g = [defaultdict(list), defaultdict(list)]
        for i, j in redEdges:
            g[0][i].append(j)
        for i, j in blueEdges:
            g[1][i].append(j)
        ans = [-1] * n
        vis = set()
        q = deque([(0, 0), (0, 1)])
        d = 0
        while q:
            for _ in range(len(q)):
                i, c = q.popleft()
                if ans[i] == -1:
                    ans[i] = d
                vis.add((i, c))
                c ^= 1
                for j in g[c][i]:
                    if (j, c) not in vis:
                        q.append((j, c))
            d += 1
        return ans
```


#### TypeScript


```ts
function shortestAlternatingPaths(
    n: number,
    redEdges: number[][],
    blueEdges: number[][],
): number[] {
    const g: [Graph, Graph] = [{}, {}];
    const ans = Array(n).fill(-1);
    const vis = Array.from({ length: n }, () => Array.from({ length: 2 }, () => false));
    let q: Vertex[] = [
        [0, 0],
        [0, 1],
    ];
    vis[0][0] = vis[0][1] = true;
    let d = 0;
    for (const [i, j] of redEdges) {
        (g[0][i] ??= []).push(j);
    }
    for (const [i, j] of blueEdges) {
        (g[1][i] ??= []).push(j);
    }
    while (q.length) {
        const qNext: Vertex[] = [];
        for (let [i, color] of q) {
            if (ans[i] === -1) {
                ans[i] = d;
            }
            color ^= 1;
            for (const j of g[color][i] ?? []) {
                if (!vis[j][color]) {
                    vis[j][color] = true;
                    qNext.push([j, color as Color]);
                }
            }
        }
        q = qNext;
        d++;
    }
    return ans;
}

type Graph = Record<number, number[]>;
type Color = 0 | 1;
type Vertex = [number, Color];
```

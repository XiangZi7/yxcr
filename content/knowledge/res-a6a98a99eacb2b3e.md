## 解法




### 方法一：并查集



> **思考**
>
> 与上一题不同，被删节点不再传播，且其余初始点仍会感染邻居。先把所有干净节点按边合并成连通块，再看每个初始点触及哪些干净块。
>
> 一块若只被一个初始点碰到，删掉该点即可拯救整块。对每个初始点累加其独占块的大小，取拯救最多（并列取编号最小）的点。



我们可以使用并查集，将所有不在 $initial$ 中的节点，并且满足 $graph[i][j] = 1$ 的节点 $(i, j)$ 进行合并。

接下来，我们创建一个哈希表 $g$，其中 $g[i]$ 表示所有与节点 $i$ 相连的连通分量的根节点。我们还需要一个计数器 $cnt$，用来统计每个根节点被多少个初始节点感染。

对于每个初始时被感染的节点 $i$，我们遍历所有与节点 $i$ 相连的节点 $j$，如果节点 $j$ 不在 $initial$ 中，我们将节点 $j$ 的根节点加入到集合 $g[i]$ 中。同时，我们统计每个根节点被多少个初始节点感染，将结果保存到计数器 $cnt$ 中。

然后，我们用一个变量 $ans$ 记录答案，用 $mx$ 记录最多可以减少的被感染节点的数量。初始时 $ans = 0$, $mx = -1$。

遍历所有初始时被感染的节点，对于每个节点 $i$，我们遍历 $g[i]$ 中的所有根节点，如果根节点只被一个初始节点感染，我们累加这个根节点所在的连通分量的大小到 $t$ 中。如果 $t > mx$ 或者 $t = mx$ 且 $i < ans$，我们更新 $ans = i$, $mx = t$。

最后返回 $ans$ 即可。

时间复杂度 $O(n^2 \times \alpha(n))$，空间复杂度 $O(n^2)$。其中 $n$ 是节点的数量，而 $\alpha(n)$ 是 Ackermann 函数的反函数。




#### Python3


```python
class UnionFind:
    __slots__ = "p", "size"

    def __init__(self, n: int):
        self.p = list(range(n))
        self.size = [1] * n

    def find(self, x: int) -> int:
        if self.p[x] != x:
            self.p[x] = self.find(self.p[x])
        return self.p[x]

    def union(self, a: int, b: int) -> bool:
        pa, pb = self.find(a), self.find(b)
        if pa == pb:
            return False
        if self.size[pa] > self.size[pb]:
            self.p[pb] = pa
            self.size[pa] += self.size[pb]
        else:
            self.p[pa] = pb
            self.size[pb] += self.size[pa]
        return True

    def get_size(self, root: int) -> int:
        return self.size[root]


class Solution:
    def minMalwareSpread(self, graph: List[List[int]], initial: List[int]) -> int:
        n = len(graph)
        s = set(initial)
        uf = UnionFind(n)
        for i in range(n):
            if i not in s:
                for j in range(i + 1, n):
                    graph[i][j] and j not in s and uf.union(i, j)

        g = defaultdict(set)
        cnt = Counter()
        for i in initial:
            for j in range(n):
                if j not in s and graph[i][j]:
                    g[i].add(uf.find(j))
            for root in g[i]:
                cnt[root] += 1

        ans, mx = 0, -1
        for i in initial:
            t = sum(uf.get_size(root) for root in g[i] if cnt[root] == 1)
            if t > mx or (t == mx and i < ans):
                ans, mx = i, t
        return ans
```


#### TypeScript


```ts
class UnionFind {
    p: number[];
    size: number[];
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

    union(a: number, b: number): boolean {
        const [pa, pb] = [this.find(a), this.find(b)];
        if (pa === pb) {
            return false;
        }
        if (this.size[pa] > this.size[pb]) {
            this.p[pb] = pa;
            this.size[pa] += this.size[pb];
        } else {
            this.p[pa] = pb;
            this.size[pb] += this.size[pa];
        }
        return true;
    }

    getSize(root: number): number {
        return this.size[root];
    }
}

function minMalwareSpread(graph: number[][], initial: number[]): number {
    const n = graph.length;
    const s = new Set(initial);
    const uf = new UnionFind(n);
    for (let i = 0; i < n; ++i) {
        if (!s.has(i)) {
            for (let j = i + 1; j < n; ++j) {
                if (graph[i][j] && !s.has(j)) {
                    uf.union(i, j);
                }
            }
        }
    }
    const g: Set<number>[] = Array.from({ length: n }, () => new Set());
    const cnt: number[] = Array(n).fill(0);
    for (const i of initial) {
        for (let j = 0; j < n; ++j) {
            if (graph[i][j] && !s.has(j)) {
                g[i].add(uf.find(j));
            }
        }
        for (const root of g[i]) {
            ++cnt[root];
        }
    }
    let ans = 0;
    let mx = -1;
    for (const i of initial) {
        let t = 0;
        for (const root of g[i]) {
            if (cnt[root] === 1) {
                t += uf.getSize(root);
            }
        }
        if (t > mx || (t === mx && i < ans)) {
            [ans, mx] = [i, t];
        }
    }
    return ans;
}
```

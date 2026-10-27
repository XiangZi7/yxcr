## 解法




### 方法一：并查集



> **思考**
>
> 有向树多一条边后，可能出现入度为 $2$ 的点，或指向根形成环，或二者兼有。无向并查集不能直接处理双入边。
>
> 先找入度为 $2$ 的两条边。若存在，尝试丢掉较后的那条再并查：仍成环则应删较早的。若没有双入边，则按无向情形删掉成环的那条。



根据题目描述，对于一棵有根树，根节点的入度为 $0$，其余节点的入度为 $1$。在向树中添加一条边之后，可能会出现以下三种情况：

1. 添加的边指向了非根节点，该节点的入度变为 $2$，此时图中不存在有向环；

    ```plaintext
       1
      / \
     v   v
     2-->3
    ```

1. 添加的边指向了非根节点，该节点的入度变为 $2$，此时图中存在有向环；

    ```plaintext
       1
       |
       v
       2 <--> 3
    ```

1. 添加的边指向了根节点，根节点的入度变为 $1$，此时图中存在有向环，但不存在入度为 $2$ 的节点。

    ```plaintext
        1
        /^
       v  \
       2-->3
    ```

因此，我们首先计算每个节点的入度，如果存在入度为 $2$ 的节点，我们定位到该节点对应的两条边，分别记为 $\textit{dup}[0]$ 和 $\textit{dup}[1]$。如果在删除 $\textit{dup}[1]$ 之后，剩余的边无法形成树，则说明 $\textit{dup}[0]$ 是需要删除的边；否则 $\textit{dup}[1]$ 是需要删除的边。

如果不存在入度为 $2$ 的节点，我们遍历数组 $\textit{edges}$，对于每条边 $(u, v)$，我们使用并查集维护节点之间的连通性。如果 $u$ 和 $v$ 已经连通，说明图中存在有向环，此时当前边即为需要删除的边。

时间复杂度 $O(n \log n)$，空间复杂度 $O(n)$。其中 $n$ 为边的数量。




#### Python3


```python
class Solution:
    def findRedundantDirectedConnection(self, edges: List[List[int]]) -> List[int]:
        def find(x: int) -> int:
            if p[x] != x:
                p[x] = find(p[x])
            return p[x]

        n = len(edges)
        ind = [0] * n
        for _, v in edges:
            ind[v - 1] += 1
        dup = [i for i, (_, v) in enumerate(edges) if ind[v - 1] == 2]
        p = list(range(n))
        if dup:
            for i, (u, v) in enumerate(edges):
                if i == dup[1]:
                    continue
                pu, pv = find(u - 1), find(v - 1)
                if pu == pv:
                    return edges[dup[0]]
                p[pu] = pv
            return edges[dup[1]]
        for i, (u, v) in enumerate(edges):
            pu, pv = find(u - 1), find(v - 1)
            if pu == pv:
                return edges[i]
            p[pu] = pv
```


#### TypeScript


```ts
function findRedundantDirectedConnection(edges: number[][]): number[] {
    const n = edges.length;
    const ind: number[] = Array(n).fill(0);
    for (const [_, v] of edges) {
        ++ind[v - 1];
    }
    const dup: number[] = [];
    for (let i = 0; i < n; ++i) {
        if (ind[edges[i][1] - 1] === 2) {
            dup.push(i);
        }
    }
    const p: number[] = Array.from({ length: n }, (_, i) => i);
    const find = (x: number): number => {
        if (p[x] !== x) {
            p[x] = find(p[x]);
        }
        return p[x];
    };
    if (dup.length) {
        for (let i = 0; i < n; ++i) {
            if (i === dup[1]) {
                continue;
            }
            const [pu, pv] = [find(edges[i][0] - 1), find(edges[i][1] - 1)];
            if (pu === pv) {
                return edges[dup[0]];
            }
            p[pu] = pv;
        }
        return edges[dup[1]];
    }
    for (let i = 0; ; ++i) {
        const [pu, pv] = [find(edges[i][0] - 1), find(edges[i][1] - 1)];
        if (pu === pv) {
            return edges[i];
        }
        p[pu] = pv;
    }
}
```


### 方法二：并查集（模板做法）



> **思考**
>
> 判定逻辑与方法一相同，只是把路径压缩与按秩合并收进模板类，主函数只处理 `dup` 与 `union` 失败。



这里给出一个并查集的模板做法，供大家参考。

时间复杂度 $O(n \alpha(n))$，空间复杂度 $O(n)$。其中 $n$ 为边的数量，而 $\alpha(n)$ 是阿克曼函数的反函数，可以认为是一个很小的常数。




#### Python3


```python
class UnionFind:
    __slots__ = "p", "size"

    def __init__(self, n: int):
        self.p: List[int] = list(range(n))
        self.size: List[int] = [1] * n

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


class Solution:
    def findRedundantDirectedConnection(self, edges: List[List[int]]) -> List[int]:
        n = len(edges)
        ind = [0] * n
        for _, v in edges:
            ind[v - 1] += 1
        dup = [i for i, (_, v) in enumerate(edges) if ind[v - 1] == 2]
        uf = UnionFind(n)
        if dup:
            for i, (u, v) in enumerate(edges):
                if i == dup[1]:
                    continue
                if not uf.union(u - 1, v - 1):
                    return edges[dup[0]]
            return edges[dup[1]]
        for i, (u, v) in enumerate(edges):
            if not uf.union(u - 1, v - 1):
                return edges[i]
```


#### TypeScript


```ts
class UnionFind {
    p: number[];
    size: number[];
    constructor(n: number) {
        this.p = Array.from({ length: n }, (_, i) => i);
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
}

function findRedundantDirectedConnection(edges: number[][]): number[] {
    const n = edges.length;
    const ind: number[] = Array(n).fill(0);
    for (const [_, v] of edges) {
        ++ind[v - 1];
    }
    const dup: number[] = [];
    for (let i = 0; i < n; ++i) {
        if (ind[edges[i][1] - 1] === 2) {
            dup.push(i);
        }
    }
    const uf = new UnionFind(n);
    if (dup.length) {
        for (let i = 0; i < n; ++i) {
            if (i === dup[1]) {
                continue;
            }
            if (!uf.union(edges[i][0] - 1, edges[i][1] - 1)) {
                return edges[dup[0]];
            }
        }
        return edges[dup[1]];
    }
    for (let i = 0; ; ++i) {
        if (!uf.union(edges[i][0] - 1, edges[i][1] - 1)) {
            return edges[i];
        }
    }
}
```

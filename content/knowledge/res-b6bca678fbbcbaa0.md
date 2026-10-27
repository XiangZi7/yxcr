## 解法




### 方法一：染色法判定二分图



> **思考**
>
> 判断无向图是否二分。 $n\le 100$，从每个未染色点用两种颜色 DFS，邻点必须异色；若已染色且同色则失败。
>
> 图可能不连通，要对每个连通块都染一遍。



遍历所有节点进行染色，比如初始为白色，DFS 对节点相邻的点染上另外一种颜色。如果要染色某节点时，要染的目标颜色和该节点的已经染过的颜色不同，则说明不能构成二分图。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为节点数。




#### Python3


```python
class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        def dfs(a: int, c: int) -> bool:
            color[a] = c
            for b in graph[a]:
                if color[b] == c or (color[b] == 0 and not dfs(b, -c)):
                    return False
            return True

        n = len(graph)
        color = [0] * n
        for i in range(n):
            if color[i] == 0 and not dfs(i, 1):
                return False
        return True
```


#### TypeScript


```ts
function isBipartite(graph: number[][]): boolean {
    const n = graph.length;
    const color: number[] = Array(n).fill(0);
    const dfs = (a: number, c: number): boolean => {
        color[a] = c;
        for (const b of graph[a]) {
            if (color[b] === c || (color[b] === 0 && !dfs(b, -c))) {
                return false;
            }
        }
        return true;
    };
    for (let i = 0; i < n; i++) {
        if (color[i] === 0 && !dfs(i, 1)) {
            return false;
        }
    }
    return true;
}
```


### 方法二：并查集



> **思考**
>
> 染色可用并查集改写：一个点的所有邻居应在同一部，且不与该点同部。
>
> 若某点与邻居已在同一集合则不是二分图；否则把该点的邻居互相合并。



对于本题，如果是二分图，那么图中每个顶点的所有邻接点都应该属于同一集合，且不与顶点处于同一集合，因此我们可以使用并查集。遍历图中每个顶点，如果发现存在当前顶点与对应的邻接点处于同一个集合，说明不是二分图。否则将当前节点的邻接点相互进行合并。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 为节点数。




#### Python3


```python
class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        def find(x: int) -> int:
            if p[x] != x:
                p[x] = find(p[x])
            return p[x]

        p = list(range(len(graph)))
        for a, bs in enumerate(graph):
            for b in bs:
                pa, pb = find(a), find(b)
                if pa == pb:
                    return False
                p[pb] = find(bs[0])
        return True
```


#### TypeScript


```ts
function isBipartite(graph: number[][]): boolean {
    const n = graph.length;
    const p: number[] = Array.from({ length: n }, (_, i) => i);
    const find = (x: number): number => {
        if (x !== p[x]) {
            p[x] = find(p[x]);
        }
        return p[x];
    };
    for (let a = 0; a < n; ++a) {
        for (const b of graph[a]) {
            const [pa, pb] = [find(a), find(b)];
            if (pa === pb) {
                return false;
            }
            p[pb] = find(graph[a][0]);
        }
    }
    return true;
}
```

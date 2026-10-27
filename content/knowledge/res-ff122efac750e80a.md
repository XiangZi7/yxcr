## 解法




### 方法一：堆优化 Dijkstra 算法



> **思考**
>
> 在无向带权图上求从起点到终点的最大成功概率，边权为乘法意义下的成功率。 $n\le 10^4$、 $m\le 2\times 10^4$，枚举全部简单路径不可行。
>
> 若把边权看成代价的相反数，问题与最短路同构：概率沿路径相乘，且均在 $(0,1]$ 内，越长通常越小，满足最优子结构。用最大堆按当前概率松弛邻接边，即 Dijkstra 的最大化版本；堆中以相反数模拟大根堆，首次确定终点时即为答案。



我们可以使用 Dijkstra 算法求解最短路径，这里我们稍微修改一下，求解最大概率路径。

我们可以使用一个优先队列（大根堆） $\textit{pq}$ 来存储从起点到各个节点的概率以及节点编号。初始时我们将起点的概率设为 $1$，其余节点的概率设为 $0$，然后将起点加入到 $\textit{pq}$ 中。

在每一次的迭代中，我们取出 $\textit{pq}$ 中概率最大的节点 $a$，以及 $a$ 的概率 $w$。如果节点 $a$ 的概率已经大于 $w$，那么我们就可以跳过这个节点。否则我们遍历 $a$ 的所有邻接边 $(a, b)$。如果 $b$ 的概率小于 $a$ 的概率乘以 $(a, b)$ 的概率，那么我们就可以更新 $b$ 的概率，并将 $b$ 加入到 $\textit{pq}$ 中。

最终，我们可以得到从起点到终点的最大概率。

时间复杂度 $O(m \times \log m)$，空间复杂度 $O(m)$。其中 $m$ 为边的数量。




#### Python3


```python
class Solution:
    def maxProbability(
        self,
        n: int,
        edges: List[List[int]],
        succProb: List[float],
        start_node: int,
        end_node: int,
    ) -> float:
        g: List[List[Tuple[int, float]]] = [[] for _ in range(n)]
        for (a, b), p in zip(edges, succProb):
            g[a].append((b, p))
            g[b].append((a, p))
        pq = [(-1, start_node)]
        dist = [0] * n
        dist[start_node] = 1
        while pq:
            w, a = heappop(pq)
            w = -w
            if dist[a] > w:
                continue
            for b, p in g[a]:
                if (t := w * p) > dist[b]:
                    dist[b] = t
                    heappush(pq, (-t, b))
        return dist[end_node]
```


#### TypeScript


```ts
function maxProbability(
    n: number,
    edges: number[][],
    succProb: number[],
    start_node: number,
    end_node: number,
): number {
    const pq = new PriorityQueue<number[]>((a, b) => b[0] - a[0]);
    const g: [number, number][][] = Array.from({ length: n }, () => []);
    for (let i = 0; i < edges.length; ++i) {
        const [a, b] = edges[i];
        g[a].push([b, succProb[i]]);
        g[b].push([a, succProb[i]]);
    }
    const dist = Array.from({ length: n }, () => 0);
    dist[start_node] = 1;
    pq.enqueue([1, start_node]);
    while (!pq.isEmpty()) {
        const [w, a] = pq.dequeue();
        if (dist[a] > w) {
            continue;
        }
        for (const [b, p] of g[a]) {
            const nw = w * p;
            if (nw > dist[b]) {
                dist[b] = nw;
                pq.enqueue([nw, b]);
            }
        }
    }
    return dist[end_node];
}
```

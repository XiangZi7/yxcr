## 解法




### 方法一：Dijkstra 算法



> **思考**
>
> 原图每条边被细分成 $\textit{cnt}$ 个新点，问从 $0$ 出发在 $\textit{maxMoves}$ 步内能到达多少点。细分点极多，不能建出显式图。
>
> 把边权当作 $\textit{cnt}+1$，对原图结点跑 Dijkstra，得到到达各原结点的最短路。原结点可达则计数；边上的细分点由两端剩余步数夹逼，不超过 $\textit{cnt}$。



这道题本质是求从节点 $0$ 出发，最多经过 $maxMoves$ 步，可以到达多少个节点。单源最短路，且边权非负，我们可以考虑使用 Dijkstra 算法。

根据题目描述，节点 $u_i$ 到节点 $v_i$ 之间存在 $cnt_i$ 个新节点，那么节点 $u_i$ 到节点 $v_i$ 的距离为 $cnt_i + 1$。

我们举个简单的例子，以下节点 $1$ 和节点 $2$ 之间存在 $3$ 个新节点，那么节点 $1$ 到节点 $2$ 之间有 $4$ 条边，也即距离为 $4$。

```
1 -- o -- o -- o -- 2
```

因此，我们可以将原图中两点之间新节点的个数 $cnt_i$ 加 $1$，得到两点之间的距离。然后构建一个邻接表 $g$，用于存储每个节点的邻接节点以及到达邻接节点的距离。

接下来，我们使用 Dijkstra 算法求出从节点 $0$ 到原始图其余所有节点的最短距离，存储在数组 $dist$ 中。

然后，我们遍历数组 $dist$，统计其中小于等于 $maxMoves$ 的节点个数，也就是我们可以到达的节点数。不过，这并不是最终答案，我们还需要加上新节点中符合条件的节点个数。

我们可以发现，如果我们能在 $dist[u]$ 步到达节点 $u$（其中 $dist[u] \leq maxMoves$），并且节点 $u$ 到节点 $v$ 之间有 $cnt$ 个新节点，那么我们能通过节点 $u$ 到达的新节点个数 $a=\min(cnt, maxMoves - dist[u])$。同理，我们能通过节点 $v$ 到达的新节点个数 $b=\min(cnt, maxMoves - dist[v])$。那么，我们能到达节点 $u$ 和节点 $v$ 之间的新节点个数为 $\min(cnt, a + b)$。

因此，我们再遍历所有的边，统计其中能到达的新节点个数，累加到答案中即可。

时间复杂度 $O(n + m \times \log n)$，其中 $m$ 和 $n$ 分别为边数和节点数。




#### Python3


```python
class Solution:
    def reachableNodes(self, edges: List[List[int]], maxMoves: int, n: int) -> int:
        g = defaultdict(list)
        for u, v, cnt in edges:
            g[u].append((v, cnt + 1))
            g[v].append((u, cnt + 1))
        q = [(0, 0)]
        dist = [0] + [inf] * n
        while q:
            d, u = heappop(q)
            for v, cnt in g[u]:
                if (t := d + cnt) < dist[v]:
                    dist[v] = t
                    heappush(q, (t, v))
        ans = sum(d <= maxMoves for d in dist)
        for u, v, cnt in edges:
            a = min(cnt, max(0, maxMoves - dist[u]))
            b = min(cnt, max(0, maxMoves - dist[v]))
            ans += min(cnt, a + b)
        return ans
```

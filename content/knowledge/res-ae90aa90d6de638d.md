## 解法




### 方法一：Bellman Ford 算法



> **思考**
>
> 最多 $k$ 次中转的最便宜机票，边权非负但中转限制使普通 Dijkstra 要带上剩余步数。 $n\le 100$，限制松弛轮次的 Bellman-Ford 更直接。
>
> 最多 $k$ 次中转即最多 $k+1$ 条边。每轮用上一轮的距离备份松弛，避免同一轮内走多条边。
>
> $k+1$ 轮后 $dist[dst]$ 若仍为无穷则无解。






#### Python3


```python
class Solution:
    def findCheapestPrice(
        self, n: int, flights: List[List[int]], src: int, dst: int, k: int
    ) -> int:
        INF = 0x3F3F3F3F
        dist = [INF] * n
        dist[src] = 0
        for _ in range(k + 1):
            backup = dist.copy()
            for f, t, p in flights:
                dist[t] = min(dist[t], backup[f] + p)
        return -1 if dist[dst] == INF else dist[dst]
```


### 方法二：DFS + 记忆化搜索



> **思考**
>
> Bellman-Ford 枚举全部边。从 $src$ 出发、还剩 $k$ 条边时的最小花费也可记忆化搜索：到达 $dst$ 为 $0$，边用尽为无穷。
>
> $dfs(u,k)$ 枚举出边。边数仍是 $k+1$（含出发）。状态 $O(nk)$。






#### Python3


```python
class Solution:
    def findCheapestPrice(
        self, n: int, flights: List[List[int]], src: int, dst: int, k: int
    ) -> int:
        @cache
        def dfs(u, k):
            if u == dst:
                return 0
            if k <= 0:
                return inf
            k -= 1
            ans = inf
            for v, p in g[u]:
                ans = min(ans, dfs(v, k) + p)
            return ans

        g = defaultdict(list)
        for u, v, p in flights:
            g[u].append((v, p))
        ans = dfs(src, k + 1)
        return -1 if ans >= inf else ans
```

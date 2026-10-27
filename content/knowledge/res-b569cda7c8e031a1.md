## 解法




### 方法一：Dijkstra 算法



> **思考**
>
> 对每个城市统计阈值内可达城市数，取个数最少且编号最大者。 $n \le 100$，可对每个起点做最短路。建邻接矩阵后，从编号大到小跑 Dijkstra，统计 $\textit{dist}[j] \le \textit{distanceThreshold}$ 的个数，遇到更小计数就更新答案，从而在并列时保留较大编号。



我们可以枚举每个城市 $i$ 作为起点，使用 Dijkstra 算法求出从 $i$ 到其他城市的最短距离，然后统计距离不超过阈值的城市个数，最后取最小的个数且编号最大的城市。

时间复杂度 $O(n^3)$，空间复杂度 $O(n^2)$。其中 $n$ 为城市个数。




#### Python3


```python
class Solution:
    def findTheCity(
        self, n: int, edges: List[List[int]], distanceThreshold: int
    ) -> int:
        def dijkstra(u: int) -> int:
            dist = [inf] * n
            dist[u] = 0
            vis = [False] * n
            for _ in range(n):
                k = -1
                for j in range(n):
                    if not vis[j] and (k == -1 or dist[k] > dist[j]):
                        k = j
                vis[k] = True
                for j in range(n):
                    # dist[j] = min(dist[j], dist[k] + g[k][j])
                    if dist[k] + g[k][j] < dist[j]:
                        dist[j] = dist[k] + g[k][j]
            return sum(d <= distanceThreshold for d in dist)

        g = [[inf] * n for _ in range(n)]
        for f, t, w in edges:
            g[f][t] = g[t][f] = w
        ans, cnt = n, inf
        for i in range(n - 1, -1, -1):
            if (t := dijkstra(i)) < cnt:
                cnt, ans = t, i
        return ans
```


#### TypeScript


```ts
function findTheCity(n: number, edges: number[][], distanceThreshold: number): number {
    const g: number[][] = Array.from({ length: n }, () => Array(n).fill(Infinity));
    const dist: number[] = Array(n).fill(Infinity);
    const vis: boolean[] = Array(n).fill(false);
    for (const [f, t, w] of edges) {
        g[f][t] = g[t][f] = w;
    }

    const dijkstra = (u: number): number => {
        dist.fill(Infinity);
        vis.fill(false);
        dist[u] = 0;
        for (let i = 0; i < n; ++i) {
            let k = -1;
            for (let j = 0; j < n; ++j) {
                if (!vis[j] && (k === -1 || dist[j] < dist[k])) {
                    k = j;
                }
            }
            vis[k] = true;
            for (let j = 0; j < n; ++j) {
                dist[j] = Math.min(dist[j], dist[k] + g[k][j]);
            }
        }
        return dist.filter(d => d <= distanceThreshold).length;
    };

    let ans = n;
    let cnt = Infinity;
    for (let i = n - 1; i >= 0; --i) {
        const t = dijkstra(i);
        if (t < cnt) {
            cnt = t;
            ans = i;
        }
    }

    return ans;
}
```


### 方法二：Floyd 算法



> **思考**
>
> 逐源 Dijkstra 要跑 $n$ 遍。Floyd 一次求出全源最短路，之后对每行统计不超过阈值的个数即可，实现更直，渐近仍为 $O(n^3)$。



我们定义 $g[i][j]$ 表示城市 $i$ 到城市 $j$ 的最短距离，初始时 $g[i][j] = \infty$, $g[i][i] = 0$，然后我们遍历所有边，对于每条边 $(f, t, w)$，我们令 $g[f][t] = g[t][f] = w$。

接下来，我们用 Floyd 算法求出任意两点之间的最短距离。具体地，我们先枚举中间点 $k$，再枚举起点 $i$ 和终点 $j$，如果 $g[i][k] + g[k][j] \lt g[i][j]$，那么我们就用更短的距离 $g[i][k] + g[k][j]$ 更新 $g[i][j]$。

最后，我们枚举每个城市 $i$ 作为起点，统计距离不超过阈值的城市个数，最后取最小的个数且编号最大的城市。

时间复杂度 $O(n^3)$，空间复杂度 $O(n^2)$。其中 $n$ 为城市个数。




#### Python3


```python
class Solution:
    def findTheCity(
        self, n: int, edges: List[List[int]], distanceThreshold: int
    ) -> int:
        g = [[inf] * n for _ in range(n)]
        for f, t, w in edges:
            g[f][t] = g[t][f] = w

        for k in range(n):
            g[k][k] = 0
            for i in range(n):
                for j in range(n):
                    # g[i][j] = min(g[i][j], g[i][k] + g[k][j])
                    if g[i][k] + g[k][j] < g[i][j]:
                        g[i][j] = g[i][k] + g[k][j]

        ans, cnt = n, inf
        for i in range(n - 1, -1, -1):
            t = sum(d <= distanceThreshold for d in g[i])
            if t < cnt:
                cnt, ans = t, i
        return ans
```


#### TypeScript


```ts
function findTheCity(n: number, edges: number[][], distanceThreshold: number): number {
    const g: number[][] = Array.from({ length: n }, () => Array(n).fill(Infinity));
    for (const [f, t, w] of edges) {
        g[f][t] = g[t][f] = w;
    }
    for (let k = 0; k < n; ++k) {
        g[k][k] = 0;
        for (let i = 0; i < n; ++i) {
            for (let j = 0; j < n; ++j) {
                g[i][j] = Math.min(g[i][j], g[i][k] + g[k][j]);
            }
        }
    }

    let ans = n,
        cnt = n + 1;
    for (let i = n - 1; i >= 0; --i) {
        const t = g[i].filter(x => x <= distanceThreshold).length;
        if (t < cnt) {
            cnt = t;
            ans = i;
        }
    }
    return ans;
}
```

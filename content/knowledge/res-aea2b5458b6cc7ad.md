## 解法




### 方法一：BFS



> **思考**
>
> 树上青蛙每秒等概率跳到未访问邻居，求 $t$ 秒在 $\textit{target}$ 的概率。路径唯一，按秒 BFS 即可携带概率。出队时若已是目标：无未访问邻居或时间用尽则停在此处，返回当前概率，否则还会跳走，概率为 $0$。否则把概率均分给未访问邻居并标记访问。



我们先根据题目给出的无向树的边，建立一个邻接表 $g$，其中 $g[u]$ 表示顶点 $u$ 的所有相邻顶点。

然后，我们定义以下数据结构：

- 队列 $q$，用于存储每一轮搜索的顶点及其概率，初始时 $q = [(1, 1.0)]$，表示青蛙在顶点 $1$ 的概率为 $1.0$；
- 数组 $vis$，用于记录每个顶点是否被访问过，初始时 $vis[1] = true$，其余元素均为 $false$。

接下来，我们开始进行广度优先搜索。

在每一轮搜索中，我们每次取出队首元素 $(u, p)$，其中 $u$ 和 $p$ 分别表示当前顶点及其概率。当前顶点 $u$ 的相邻顶点中未被访问过的顶点的个数记为 $cnt$。

- 如果 $u = target$，说明青蛙已经到达目标顶点，此时我们判断青蛙是否在 $t$ 秒到达目标顶点，或者不到 $t$ 秒到达目标顶点但是无法再跳跃到其它顶点（即 $t=0$ 或者 $cnt=0$）。如果是，则返回 $p$，否则返回 $0$。
- 如果 $u \neq target$，那么我们将概率 $p$ 均分给 $u$ 的所有未被访问过的相邻顶点，然后将这些顶点加入队列 $q$ 中，并且将这些顶点标记为已访问。

在一轮搜索结束后，我们将 $t$ 减少 $1$，然后继续进行下一轮搜索，直到队列为空或者 $t \lt 0$。

最后，若青蛙仍然没有到达目标顶点，那么我们返回 $0$。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是无向树的顶点数。




#### Python3


```python
class Solution:
    def frogPosition(
        self, n: int, edges: List[List[int]], t: int, target: int
    ) -> float:
        g = defaultdict(list)
        for u, v in edges:
            g[u].append(v)
            g[v].append(u)
        q = deque([(1, 1.0)])
        vis = [False] * (n + 1)
        vis[1] = True
        while q and t >= 0:
            for _ in range(len(q)):
                u, p = q.popleft()
                cnt = len(g[u]) - int(u != 1)
                if u == target:
                    return p if cnt * t == 0 else 0
                for v in g[u]:
                    if not vis[v]:
                        vis[v] = True
                        q.append((v, p / cnt))
            t -= 1
        return 0
```


#### TypeScript


```ts
function frogPosition(n: number, edges: number[][], t: number, target: number): number {
    const g: number[][] = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
        g[u].push(v);
        g[v].push(u);
    }
    const q: number[][] = [[1, 1]];
    const vis: boolean[] = Array.from({ length: n + 1 }, () => false);
    vis[1] = true;
    for (; q.length > 0 && t >= 0; --t) {
        for (let k = q.length; k > 0; --k) {
            const [u, p] = q.shift()!;
            const cnt = g[u].length - (u === 1 ? 0 : 1);
            if (u === target) {
                return cnt * t === 0 ? p : 0;
            }
            for (const v of g[u]) {
                if (!vis[v]) {
                    vis[v] = true;
                    q.push([v, p / cnt]);
                }
            }
        }
    }
    return 0;
}
```

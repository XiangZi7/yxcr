## 解法




### 方法一：BFS



> **思考**
>
> 每次乘坐一辆公交可到达该线路上的任意站点，求最少乘坐次数。按站点逐步走边会把同一辆车重复展开；站点与线路规模较大，应把「换乘」作为 BFS 的一层。
>
> 先建站点到线路的倒排。队列中存站点与已乘车次数，每条线路只展开一次，把它的全部未访问站点入队。这样每辆车至多处理一遍。



我们首先判断 $\textit{source}$ 和 $\textit{target}$ 是否相同，如果相同则直接返回 $0$。

然后我们使用一个哈希表 $\textit{g}$ 来构建站点到公交线路的映射。对于每一条公交线路，我们遍历其经过的所有站点，将每个站点映射到该公交线路，即 $\textit{g}[\textit{stop}]$ 为经过站点 $\textit{stop}$ 的所有公交线路。

接着我们判断 $\textit{source}$ 和 $\textit{target}$ 是否在站点映射中，如果不在则返回 $-1$。

我们使用一个队列 $\textit{q}$ 来进行广度优先搜索，队列中的每个元素为一个二元组 $(\textit{stop}, \textit{busCount})$，表示当前站点 $\textit{stop}$ 和到达当前站点所需的公交次数 $\textit{busCount}$。

我们初始化一个集合 $\textit{visBus}$ 来记录已经访问过的公交线路，一个集合 $\textit{visStop}$ 来记录已经访问过的站点。然后我们将 $\textit{source}$ 加入到 $\textit{visStop}$ 中，并将 $(\textit{source}, 0)$ 加入到队列 $\textit{q}$ 中。

接下来我们开始广度优先搜索，当队列 $\textit{q}$ 不为空时，我们取出队列的第一个元素，即当前站点 $\textit{stop}$ 和到达当前站点所需的公交次数 $\textit{busCount}$。

如果当前站点 $\textit{stop}$ 是目标站点 $\textit{target}$，我们返回到达目标站点所需的公交次数 $\textit{busCount}$。

否则，我们遍历经过当前站点的所有公交线路，对于每一条公交线路，我们遍历该线路上的所有站点，如果某个站点 $\textit{nextStop}$ 没有被访问过，则将其加入到 $\textit{visStop}$ 中，并将 $(\textit{nextStop}, \textit{busCount} + 1)$ 加入到队列 $\textit{q}$ 中。

最后，如果无法到达目标站点，则返回 $-1$。

时间复杂度 $O(L)$，空间复杂度 $O(L)$，其中 $L$ 为所有公交线路上的站点总数。




#### Python3


```python
class Solution:
    def numBusesToDestination(
        self, routes: List[List[int]], source: int, target: int
    ) -> int:
        if source == target:
            return 0
        # 使用 defaultdict 构建站点到公交线路的映射
        g = defaultdict(list)
        for i, route in enumerate(routes):
            for stop in route:
                g[stop].append(i)

        # 如果 source 或 target 不在站点映射中，返回 -1
        if source not in g or target not in g:
            return -1

        # 初始化队列和访问集合
        q = [(source, 0)]
        vis_bus = set()
        vis_stop = {source}

        # 开始广度优先搜索
        for stop, bus_count in q:
            # 如果当前站点是目标站点，返回所需的公交次数
            if stop == target:
                return bus_count

            # 遍历经过当前站点的所有公交线路
            for bus in g[stop]:
                if bus not in vis_bus:
                    vis_bus.add(bus)

                    # 遍历该线路上的所有站点
                    for next_stop in routes[bus]:
                        if next_stop not in vis_stop:
                            vis_stop.add(next_stop)
                            q.append((next_stop, bus_count + 1))
        return -1 # 如果无法到达目标站点，返回 -1
```


#### TypeScript


```ts
function numBusesToDestination(routes: number[][], source: number, target: number): number {
    if (source === target) {
        return 0;
    }

    // 使用 Map 构建站点到公交线路的映射
    const g: Map<number, number[]> = new Map();
    for (let i = 0; i < routes.length; i++) {
        for (const stop of routes[i]) {
            if (!g.has(stop)) {
                g.set(stop, []);
            }
            g.get(stop)!.push(i);
        }
    }

    // 如果 source 或 target 不在站点映射中，返回 -1
    if (!g.has(source) || !g.has(target)) {
        return -1;
    }

    // 初始化队列和访问集合
    const q: [number, number][] = [[source, 0]];
    const visBus: Set<number> = new Set();
    const visStop: Set<number> = new Set([source]);

    // 开始广度优先搜索
    for (const [stop, busCount] of q) {
        // 如果当前站点是目标站点，返回所需的公交次数
        if (stop === target) {
            return busCount;
        }

        // 遍历经过当前站点的所有公交线路
        for (const bus of g.get(stop)!) {
            if (!visBus.has(bus)) {
                visBus.add(bus);
                // 遍历该线路上的所有站点
                for (const nextStop of routes[bus]) {
                    if (!visStop.has(nextStop)) {
                        visStop.add(nextStop);
                        q.push([nextStop, busCount + 1]);
                    }
                }
            }
        }
    }

    return -1; // 如果无法到达目标站点，返回 -1
}
```

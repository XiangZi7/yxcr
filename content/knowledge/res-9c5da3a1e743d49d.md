## 解法




### 方法一：拓扑排序



> **思考**
>
> 最终安全点是出发后必然进入出度为 $0$ 的结点、且途中不进入环的点。对每个点沿出边搜索是否能走到环，会在同一条链上重复遍历。
>
> 将边反向后，原图出度变为入度。从入度为 $0$ 的点做拓扑删除，能被删掉的点恰好是无法走到环的点，亦即安全点。 $n\le 10^4$ 时一次线性遍历即可。



出度为零的点是安全的，如果一个点**只能**到达安全的点，那么它同样是安全的，所以问题转换成了拓扑排序。

我们可以将图中所有边反向，得到一个反图，然后在反图上运行拓扑排序。

时间复杂度 $O(n+m)$，其中 $n$ 表示图中的点数， $m$ 表示图中的边数。




#### Python3


```python
class Solution:
    def eventualSafeNodes(self, graph: List[List[int]]) -> List[int]:
        rg = defaultdict(list)
        indeg = [0] * len(graph)
        for i, vs in enumerate(graph):
            for j in vs:
                rg[j].append(i)
            indeg[i] = len(vs)
        q = deque([i for i, v in enumerate(indeg) if v == 0])
        while q:
            i = q.popleft()
            for j in rg[i]:
                indeg[j] -= 1
                if indeg[j] == 0:
                    q.append(j)
        return [i for i, v in enumerate(indeg) if v == 0]
```


#### JavaScript


```js
/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function (graph) {
    const n = graph.length;
    const rg = new Array(n).fill(0).map(() => new Array());
    const indeg = new Array(n).fill(0);
    const q = [];
    for (let i = 0; i < n; ++i) {
        for (let j of graph[i]) {
            rg[j].push(i);
        }
        indeg[i] = graph[i].length;
        if (indeg[i] == 0) {
            q.push(i);
        }
    }
    while (q.length) {
        const i = q.shift();
        for (let j of rg[i]) {
            if (--indeg[j] == 0) {
                q.push(j);
            }
        }
    }
    let ans = [];
    for (let i = 0; i < n; ++i) {
        if (indeg[i] == 0) {
            ans.push(i);
        }
    }
    return ans;
};
```








### 方法二：DFS + 三色标记法



> **思考**
>
> 拓扑排序需要建反图并维护入度。若希望沿原图直接判定，可用三色标记做一次 DFS：访问中的灰色表示当前路径成环，递归结束后标为黑色表示从该点出发皆安全。
>
> 空间上不再需要反图，答案由「该点 DFS 返回真」筛出，复杂度同为线性。



若起始节点位于一个环内，或者能到达一个环，则该节点不是安全的。否则，该节点是安全的。

- 白色（用 0 表示）：该节点尚未被访问；
- 灰色（用 1 表示）：该节点位于递归栈中，或者在某个环上；
- 黑色（用 2 表示）：该节点搜索完毕，是一个安全节点。




#### Python3


```python
class Solution:
    def eventualSafeNodes(self, graph: List[List[int]]) -> List[int]:
        def dfs(i):
            if color[i]:
                return color[i] == 2
            color[i] = 1
            for j in graph[i]:
                if not dfs(j):
                    return False
            color[i] = 2
            return True

        n = len(graph)
        color = [0] * n
        return [i for i in range(n) if dfs(i)]
```


#### JavaScript


```js
/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function (graph) {
    const n = graph.length;
    const color = new Array(n).fill(0);
    function dfs(i) {
        if (color[i]) {
            return color[i] == 2;
        }
        color[i] = 1;
        for (const j of graph[i]) {
            if (!dfs(j)) {
                return false;
            }
        }
        color[i] = 2;
        return true;
    }
    let ans = [];
    for (let i = 0; i < n; ++i) {
        if (dfs(i)) {
            ans.push(i);
        }
    }
    return ans;
};
```

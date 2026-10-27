## 解法




### 方法一：暴力枚举



> **思考**
>
> 连通三元组的度为三结点度数之和减 $6$。图规模允许 $O(n^3)$ 枚举三角形。
>
> 邻接矩阵判边、 $\textit{deg}$ 存度数。枚举 $i<j<k$ 且三边都在时更新 $\textit{deg}[i]+\textit{deg}[j]+\textit{deg}[k]-6$。无三角形则返回 $-1$。



我们先将所有边存入邻接矩阵 $\textit{g}$ 中，再将每个节点的度数存入数组 $\textit{deg}$ 中。初始化答案 $\textit{ans}=+\infty$。

然后枚举所有的三元组 $(i, j, k)$，其中 $i \lt j \lt k$，如果 $\textit{g}[i][j] = \textit{g}[j][k] = \textit{g}[i][k] = 1$，则说明这三个节点构成了一个连通三元组，此时更新答案为 $\textit{ans} = \min(\textit{ans}, \textit{deg}[i] + \textit{deg}[j] + \textit{deg}[k] - 6)$。

枚举完所有的三元组后，如果答案仍然为 $+\infty$，说明图中不存在连通三元组，返回 $-1$，否则返回答案。

时间复杂度 $O(n^3)$，空间复杂度 $O(n^2)$。其中 $n$ 为节点数。




#### Python3


```python
def min(a: int, b: int) -> int:
    return a if a < b else b


class Solution:
    def minTrioDegree(self, n: int, edges: List[List[int]]) -> int:
        g = [[False] * n for _ in range(n)]
        deg = [0] * n
        for u, v in edges:
            u, v = u - 1, v - 1
            g[u][v] = g[v][u] = True
            deg[u] += 1
            deg[v] += 1
        ans = inf
        for i in range(n):
            for j in range(i + 1, n):
                if g[i][j]:
                    for k in range(j + 1, n):
                        if g[i][k] and g[j][k]:
                            ans = min(ans, deg[i] + deg[j] + deg[k] - 6)
        return -1 if ans == inf else ans
```


#### TypeScript


```ts
function minTrioDegree(n: number, edges: number[][]): number {
    const g = Array.from({ length: n }, () => Array(n).fill(false));
    const deg: number[] = Array(n).fill(0);
    for (let [u, v] of edges) {
        u--;
        v--;
        g[u][v] = g[v][u] = true;
        ++deg[u];
        ++deg[v];
    }
    let ans = Infinity;
    for (let i = 0; i < n; ++i) {
        for (let j = i + 1; j < n; ++j) {
            if (g[i][j]) {
                for (let k = j + 1; k < n; ++k) {
                    if (g[i][k] && g[j][k]) {
                        ans = Math.min(ans, deg[i] + deg[j] + deg[k] - 6);
                    }
                }
            }
        }
    }
    return ans === Infinity ? -1 : ans;
}
```

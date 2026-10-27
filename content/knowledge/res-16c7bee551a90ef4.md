## 解法




### 方法一：计数



> **思考**
>
> 网络秩是两座城市的度数之和，若它们之间有边则再减一以免重复计算。城市数量通常不大，枚举所有无序对即可。
>
> 若每对城市都回头扫描道路列表，判断相邻的代价会乘上道路条数。
>
> 建边时用一维数组 $\textit{cnt}$ 累加度数，用二维数组 $\textit{g}$ 以 $0/1$ 记下是否相邻。枚举 $a \lt b$ 时秩为 $\textit{cnt}[a] + \textit{cnt}[b] - \textit{g}[a][b]$，二重循环取最大值。



我们可以用一维数组 $\textit{cnt}$ 记录每个城市的度，用二维数组 $\textit{g}$ 记录每对城市之间是否有道路相连，如果城市 $a$ 和城市 $b$ 之间有道路相连，则 $\textit{g}[a][b] = \textit{g}[b][a] = 1$，否则 $\textit{g}[a][b] = \textit{g}[b][a] = 0$。

接下来，我们枚举每对城市 $(a, b)$，其中 $a \lt b$，计算它们的网络秩，即 $\textit{cnt}[a] + \textit{cnt}[b] - \textit{g}[a][b]$，取其中的最大值即为答案。

时间复杂度 $O(n^2)$，空间复杂度 $O(n^2)$。其中 $n$ 是城市的数量。




#### Python3


```python
class Solution:
    def maximalNetworkRank(self, n: int, roads: List[List[int]]) -> int:
        g = [[0] * n for _ in range(n)]
        cnt = [0] * n
        for a, b in roads:
            g[a][b] = g[b][a] = 1
            cnt[a] += 1
            cnt[b] += 1
        return max(cnt[a] + cnt[b] - g[a][b] for a in range(n) for b in range(a + 1, n))
```


#### TypeScript


```ts
function maximalNetworkRank(n: number, roads: number[][]): number {
    const g: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    const cnt: number[] = Array(n).fill(0);
    for (const [a, b] of roads) {
        g[a][b] = 1;
        g[b][a] = 1;
        ++cnt[a];
        ++cnt[b];
    }
    let ans = 0;
    for (let a = 0; a < n; ++a) {
        for (let b = a + 1; b < n; ++b) {
            ans = Math.max(ans, cnt[a] + cnt[b] - g[a][b]);
        }
    }
    return ans;
}
```

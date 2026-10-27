## 解法




### 方法一：动态规划（区间 DP）



> **思考**
>
> 在长度为 $n$ 的木棍上按给定切点切割，每次代价等于当前这段的长度，求最小总代价。 $n$ 可达 $10^6$，但切点至多 $100$，应在切点上 DP 而不是在木棍坐标上。
>
> 把 $0$ 与 $n$ 并入切点并排序。 $f[i][j]$ 表示切完开区间 $(cuts[i],cuts[j])$ 内全部点的最小代价，最后一刀落在 $cuts[k]$ 时转移为 $f[i][k]+f[k][j]+cuts[j]-cuts[i]$。按区间长度递增填表，保证子区间先算完。



我们可以往切割点数组 $\textit{cuts}$ 中添加两个元素，分别是 $0$ 和 $n$，表示棍子的两端。然后我们对 $\textit{cuts}$ 数组进行排序，这样我们就可以将整个棍子切割为若干个区间，每个区间都有两个切割点。不妨设此时 $\textit{cuts}$ 数组的长度为 $m$。

接下来，我们定义 $\textit{f}[i][j]$ 表示切割区间 $[\textit{cuts}[i],..\textit{cuts}[j]]$ 的最小成本。

如果一个区间只有两个切割点，也就是说，我们无需切割这个区间，那么 $\textit{f}[i][j] = 0$。

否则，我们枚举区间的长度 $l$，其中 $l$ 等于切割点的数量减去 $1$。然后我们枚举区间的左端点 $i$，右端点 $j$ 可以由 $i + l$ 得到。对于每个区间，我们枚举它的切割点 $k$，其中 $i \lt k \lt j$，那么我们可以将区间 $[i, j]$ 切割为 $[i, k]$ 和 $[k, j]$，此时的成本为 $\textit{f}[i][k] + \textit{f}[k][j] + \textit{cuts}[j] - \textit{cuts}[i]$，我们取所有可能的 $k$ 中的最小值，即为 $\textit{f}[i][j]$ 的值。

最后，我们返回 $\textit{f}[0][m - 1]$。

时间复杂度 $O(m^3)$，空间复杂度 $O(m^2)$。其中 $m$ 为修改后的 $\textit{cuts}$ 数组的长度。




#### Python3


```python
class Solution:
    def minCost(self, n: int, cuts: List[int]) -> int:
        cuts.extend([0, n])
        cuts.sort()
        m = len(cuts)
        f = [[0] * m for _ in range(m)]
        for l in range(2, m):
            for i in range(m - l):
                j = i + l
                f[i][j] = inf
                for k in range(i + 1, j):
                    f[i][j] = min(f[i][j], f[i][k] + f[k][j] + cuts[j] - cuts[i])
        return f[0][-1]
```


#### TypeScript


```ts
function minCost(n: number, cuts: number[]): number {
    cuts.push(0, n);
    cuts.sort((a, b) => a - b);
    const m = cuts.length;
    const f: number[][] = Array.from({ length: m }, () => Array(m).fill(0));
    for (let l = 2; l < m; l++) {
        for (let i = 0; i < m - l; i++) {
            const j = i + l;
            f[i][j] = Infinity;
            for (let k = i + 1; k < j; k++) {
                f[i][j] = Math.min(f[i][j], f[i][k] + f[k][j] + cuts[j] - cuts[i]);
            }
        }
    }
    return f[0][m - 1];
}
```








### 方法二：动态规划（另一种枚举方式）



> **思考**
>
> 方法一按长度分层枚举，只是为了满足「短区间先于长区间」。同一转移也可以先逆序枚举左端 $i$、再顺序枚举右端 $j$，同样保证 $i<k<j$ 的子状态已算出。渐近复杂度不变，仅枚举次序不同。



我们也可以从大到小枚举 $i$，从小到大枚举 $j$，这样可以保证在计算 $f[i][j]$ 时，状态 $f[i][k]$ 和 $f[k][j]$ 都已经被计算过了，其中 $i \lt k \lt j$。

时间复杂度 $O(m^3)$，空间复杂度 $O(m^2)$。其中 $m$ 为修改后的 $\textit{cuts}$ 数组的长度。




#### Python3


```python
class Solution:
    def minCost(self, n: int, cuts: List[int]) -> int:
        cuts.extend([0, n])
        cuts.sort()
        m = len(cuts)
        f = [[0] * m for _ in range(m)]
        for i in range(m - 1, -1, -1):
            for j in range(i + 2, m):
                f[i][j] = inf
                for k in range(i + 1, j):
                    f[i][j] = min(f[i][j], f[i][k] + f[k][j] + cuts[j] - cuts[i])
        return f[0][-1]
```


#### TypeScript


```ts
function minCost(n: number, cuts: number[]): number {
    cuts.push(0);
    cuts.push(n);
    cuts.sort((a, b) => a - b);
    const m = cuts.length;
    const f: number[][] = Array.from({ length: m }, () => Array(m).fill(0));
    for (let i = m - 2; i >= 0; --i) {
        for (let j = i + 2; j < m; ++j) {
            f[i][j] = 1 << 30;
            for (let k = i + 1; k < j; ++k) {
                f[i][j] = Math.min(f[i][j], f[i][k] + f[k][j] + cuts[j] - cuts[i]);
            }
        }
    }
    return f[0][m - 1];
}
```

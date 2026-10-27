## 解法




### 方法一：动态规划



> **思考**
>
> 把工作序列切成 $d$ 段，每段难度为段内最大值，总和尽量小。工作不可重排， $n \le 300$、 $d \le 10$，枚举切分点仍过多。前 $i$ 份工作用 $j$ 天的最优只依赖「最后一天做完 $[k..i]$」。
>
> 令 $f[i][j]$ 为该最优。倒序枚举 $k$ 时可同步维护段内最大值，转移到 $f[k-1][j-1]$。工作数不足天数则无解。



我们定义 $f[i][j]$ 表示完成前 $i$ 项工作，且一共用了 $j$ 天的最小难度。初始时 $f[0][0] = 0$，其余 $f[i][j]$ 均为 $\infty$。

考虑第 $j$ 天的工作安排，我们可以枚举第 $j$ 天完成的工作 $[k,..i]$，那么有状态转移方程：

$$
f[i][j] = \min_{k \in [1,i]} \{f[k-1][j-1] + \max_{k \leq t \leq i} \{jobDifficulty[t-1]\}\}
$$

最终答案即为 $f[n][d]$。

时间复杂度 $O(n^2 \times d)$，空间复杂度 $O(n \times d)$。其中 $n$ 和 $d$ 分别为工作数量和需要计划的天数。




#### Python3


```python
class Solution:
    def minDifficulty(self, jobDifficulty: List[int], d: int) -> int:
        n = len(jobDifficulty)
        f = [[inf] * (d + 1) for _ in range(n + 1)]
        f[0][0] = 0
        for i in range(1, n + 1):
            for j in range(1, min(d + 1, i + 1)):
                mx = 0
                for k in range(i, 0, -1):
                    mx = max(mx, jobDifficulty[k - 1])
                    f[i][j] = min(f[i][j], f[k - 1][j - 1] + mx)
        return -1 if f[n][d] >= inf else f[n][d]
```


#### TypeScript


```ts
function minDifficulty(jobDifficulty: number[], d: number): number {
    const n = jobDifficulty.length;
    const inf = 1 << 30;
    const f: number[][] = new Array(n + 1).fill(0).map(() => new Array(d + 1).fill(inf));
    f[0][0] = 0;
    for (let i = 1; i <= n; ++i) {
        for (let j = 1; j <= Math.min(d, i); ++j) {
            let mx = 0;
            for (let k = i; k > 0; --k) {
                mx = Math.max(mx, jobDifficulty[k - 1]);
                f[i][j] = Math.min(f[i][j], f[k - 1][j - 1] + mx);
            }
        }
    }
    return f[n][d] < inf ? f[n][d] : -1;
}
```

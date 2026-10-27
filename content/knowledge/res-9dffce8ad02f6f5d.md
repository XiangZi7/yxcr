## 解法




### 方法一：动态规划



> **思考**
>
> 在 $n\le 500$ 的网格上找最大阶加号， $O(n^3)$ 对每个中心扩臂偏紧。阶数等于中心向四方向连续 $1$ 的最小值。
>
> 四个方向的连续长度可各做一次线性扫描。把地雷先标成 $0$，其余初始化为 $n$，再取与四向计数的最小值。
>
> 同一趟里用 $j$ 与 $n-1-j$ 同时更新左右、上下四个计数，最后取全表最大。时间 $O(n^2)$。



我们定义 $dp[i][j]$ 表示以 $(i, j)$ 为中心的最大加号标志的阶数，答案即为所有 $dp[i][j]$ 的最大值。

我们可以发现，对于每个 $(i, j)$，其最大加号标志的阶数不会超过其上下左右四个方向上连续的 $1$ 的个数的最小值。因此，我们可以预处理出每个位置上下左右四个方向上连续的 $1$ 的个数，然后遍历所有的 $(i, j)$，求出 $dp[i][j]$ 的最大值即可。

时间复杂度 $O(n^2)$，空间复杂度 $O(n^2)$。其中 $n$ 为网格的边长。




#### Python3


```python
class Solution:
    def orderOfLargestPlusSign(self, n: int, mines: List[List[int]]) -> int:
        dp = [[n] * n for _ in range(n)]
        for x, y in mines:
            dp[x][y] = 0
        for i in range(n):
            left = right = up = down = 0
            for j, k in zip(range(n), reversed(range(n))):
                left = left + 1 if dp[i][j] else 0
                right = right + 1 if dp[i][k] else 0
                up = up + 1 if dp[j][i] else 0
                down = down + 1 if dp[k][i] else 0
                dp[i][j] = min(dp[i][j], left)
                dp[i][k] = min(dp[i][k], right)
                dp[j][i] = min(dp[j][i], up)
                dp[k][i] = min(dp[k][i], down)
        return max(max(v) for v in dp)
```

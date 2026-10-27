## 解法




### 方法一：动态规划



> **思考**
>
> 枚举每个右下角并向上检查正方形，在网格较大时重复访问。以 $(i,j)$ 为右下角的最大边长，受限于其左、上、左上三个位置的最大边长。
>
> 为此令 $dp[i+1][j+1]$ 表示该最大边长：格子为 $0$ 则为 $0$，否则取三者最小值加一。答案是最大边长的平方。



我们定义 $dp[i + 1][j + 1]$ 表示以下标 $(i, j)$ 作为正方形右下角的最大正方形边长。答案为所有 $dp[i + 1][j + 1]$ 中的最大值。

状态转移方程为：

$$
dp[i + 1][j + 1] =
\begin{cases}
0 & \textit{if } matrix[i][j] = '0' \\
\min(dp[i][j], dp[i][j + 1], dp[i + 1][j]) + 1 & \textit{if } matrix[i][j] = '1'
\end{cases}
$$

时间复杂度 $O(m\times n)$，空间复杂度 $O(m\times n)$。其中 $m$ 和 $n$ 分别是矩阵的行数和列数。




#### Python3


```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        m, n = len(matrix), len(matrix[0])
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        mx = 0
        for i in range(m):
            for j in range(n):
                if matrix[i][j] == '1':
                    dp[i + 1][j + 1] = min(dp[i][j + 1], dp[i + 1][j], dp[i][j]) + 1
                    mx = max(mx, dp[i + 1][j + 1])
        return mx * mx
```

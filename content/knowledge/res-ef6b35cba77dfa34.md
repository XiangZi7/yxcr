## 解法




### 方法一：区间 DP



> **思考**
>
> 统计不同的回文子序列个数，长度为 $1000$ 且只有四种字母。枚举所有子序列不可行；普通回文子序列 DP 会计重，因为同一字符串可由多段区间产生。
>
> 按两端字母分类可以去掉重复：以字符 $c$ 为两端的回文，由其内部四种字母的回文再包上一层 $c$ 得到。区间变短后子问题只依赖更短区间。
>
> 令 $dp[i][j][k]$ 为 $s[i..j]$ 中以字母 $k$ 两端的不同回文数。两端都是该字母则 $2+\sum dp[i+1][j-1]$，否则向不含该端的一侧收缩。答案为 $dp[0][n-1]$ 四项之和。






#### Python3


```python
class Solution:
    def countPalindromicSubsequences(self, s: str) -> int:
        mod = 10**9 + 7
        n = len(s)
        dp = [[[0] * 4 for _ in range(n)] for _ in range(n)]
        for i, c in enumerate(s):
            dp[i][i][ord(c) - ord('a')] = 1
        for l in range(2, n + 1):
            for i in range(n - l + 1):
                j = i + l - 1
                for c in 'abcd':
                    k = ord(c) - ord('a')
                    if s[i] == s[j] == c:
                        dp[i][j][k] = 2 + sum(dp[i + 1][j - 1])
                    elif s[i] == c:
                        dp[i][j][k] = dp[i][j - 1][k]
                    elif s[j] == c:
                        dp[i][j][k] = dp[i + 1][j][k]
                    else:
                        dp[i][j][k] = dp[i + 1][j - 1][k]
        return sum(dp[0][-1]) % mod
```

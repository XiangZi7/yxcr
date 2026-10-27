## 解法




### 方法一：动态规划



> **思考**
>
> 最长回文子序列不是子串，不能只扩中心。枚举所有子序列再判断回文，数量过多。
>
> 设 $f[i][j]$ 为 $s[i..j]$ 的最长回文子序列长度。两端相等则由内段加 $2$，否则取丢掉左端或右端的较优者。按区间长度从短到长（代码中 $i$ 从右向左、 $j$ 向右）填表，保证转移依赖已算出。 $f[0][n-1]$ 即为答案。



我们定义 $f[i][j]$ 表示字符串 $s$ 的第 $i$ 个字符到第 $j$ 个字符之间的最长回文子序列的长度。初始时 $f[i][i] = 1$，其余位置的值均为 $0$。

如果 $s[i] = s[j]$，那么 $f[i][j] = f[i + 1][j - 1] + 2$；否则 $f[i][j] = \max(f[i + 1][j], f[i][j - 1])$。

由于 $f[i][j]$ 的值与 $f[i + 1][j - 1]$, $f[i + 1][j]$, $f[i][j - 1]$ 有关，所以我们应该从大到小枚举 $i$，从小到大枚举 $j$。

答案即为 $f[0][n - 1]$。

时间复杂度 $O(n^2)$，空间复杂度 $O(n^2)$。其中 $n$ 为字符串 $s$ 的长度。




#### Python3


```python
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        f = [[0] * n for _ in range(n)]
        for i in range(n):
            f[i][i] = 1
        for i in range(n - 1, -1, -1):
            for j in range(i + 1, n):
                if s[i] == s[j]:
                    f[i][j] = f[i + 1][j - 1] + 2
                else:
                    f[i][j] = max(f[i + 1][j], f[i][j - 1])
        return f[0][-1]
```


#### TypeScript


```ts
function longestPalindromeSubseq(s: string): number {
    const n = s.length;
    const f: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; ++i) {
        f[i][i] = 1;
    }
    for (let i = n - 2; ~i; --i) {
        for (let j = i + 1; j < n; ++j) {
            if (s[i] === s[j]) {
                f[i][j] = f[i + 1][j - 1] + 2;
            } else {
                f[i][j] = Math.max(f[i + 1][j], f[i][j - 1]);
            }
        }
    }
    return f[0][n - 1];
}
```

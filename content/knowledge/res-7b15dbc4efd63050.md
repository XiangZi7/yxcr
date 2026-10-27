## 解法




### 方法一：动态规划



> **思考**
>
> 把串分成 $k$ 段并使各段成为回文的修改次数最少。 $n \le 100$，适合 DP。一段改成回文的费用可预处理：两端不同则加一，再加内段费用。
>
> $f[i][j]$ 为前 $i$ 个字符分成 $j$ 段的最少修改，枚举上一段结尾 $h$，加上 $g[h][i-1]$。预处理 $O(n^2)$，转移 $O(n^2 k)$。



我们定义 $f[i][j]$ 表示将字符串 $s$ 的前 $i$ 个字符分割成 $j$ 个回文串所需要的最少修改次数，我们假定 $i$ 下标从 $1$ 开始，答案为 $f[n][k]$。

对于 $f[i][j]$，我们可以枚举第 $j-1$ 个回文串的最后一个字符的位置 $h$，那么 $f[i][j]$ 就等于 $f[h][j-1] + g[h][i-1]$ 的较小值，其中 $g[h][i-1]$ 表示将字符串 $s[h..i-1]$ 变成回文串所需要的最少修改次数（这一部分我们可以通过预处理得到，时间复杂度 $O(n^2)$。

时间复杂度 $O(n^2 \times k)$，空间复杂度 $O(n \times (n + k))$。其中 $n$ 为字符串 $s$ 的长度。




#### Python3


```python
class Solution:
    def palindromePartition(self, s: str, k: int) -> int:
        n = len(s)
        g = [[0] * n for _ in range(n)]
        for i in range(n - 1, -1, -1):
            for j in range(i + 1, n):
                g[i][j] = int(s[i] != s[j])
                if i + 1 < j:
                    g[i][j] += g[i + 1][j - 1]

        f = [[0] * (k + 1) for _ in range(n + 1)]
        for i in range(1, n + 1):
            for j in range(1, min(i, k) + 1):
                if j == 1:
                    f[i][j] = g[0][i - 1]
                else:
                    f[i][j] = inf
                    for h in range(j - 1, i):
                        f[i][j] = min(f[i][j], f[h][j - 1] + g[h][i - 1])
        return f[n][k]
```


#### TypeScript


```ts
function palindromePartition(s: string, k: number): number {
    const n = s.length;
    const g: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            g[i][j] = s[i] !== s[j] ? 1 : 0;
            if (i + 1 < j) {
                g[i][j] += g[i + 1][j - 1];
            }
        }
    }
    const f: number[][] = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= Math.min(i, k); j++) {
            if (j === 1) {
                f[i][j] = g[0][i - 1];
            } else {
                f[i][j] = 1 << 30;
                for (let h = j - 1; h < i; h++) {
                    f[i][j] = Math.min(f[i][j], f[h][j - 1] + g[h][i - 1]);
                }
            }
        }
    }
    return f[n][k];
}
```

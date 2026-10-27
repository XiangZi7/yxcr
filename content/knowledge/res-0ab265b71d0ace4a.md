## 解法




### 方法一：动态规划



> **思考**
>
> 两指在 $6\times 5$ 键盘上打完 $\textit{word}$，每步由曼哈顿距离计费，首字母可任选一指且不计费。 $n \le 300$，若按指法搜索全部序列，状态随长度指数增长。打完第 $i$ 个字母后，只需知道两指各自停在哪个字母。
>
> 令 $f[i][j][k]$ 为打完 $\textit{word}[i]$、两指分别在 $j$、 $k$ 的最小花费。第一个字母令一指落在其上、另一指任意，代价为 $0$。之后枚举是哪一指移到当前字母，另一指不动，用键盘曼哈顿距离转移。答案为最后一层的最小值。



我们定义 $f[i][j][k]$ 表示输入完 $\textit{word}[i]$，且手指 $1$ 位于位置 $j$，手指 $2$ 位于位置 $k$ 时，最小的移动距离。这里的位置 $j$ 和 $k$ 表示的是字母对应的数字，取值范围为 $[0,..25]$。初始时 $f[i][j][k]=\infty$。

我们实现一个函数 $\textit{dist}(a, b)$，表示位置 $a$ 和位置 $b$ 之间的距离，即 $\textit{dist}(a, b) = |\frac{a}{6} - \frac{b}{6}| + |a \bmod 6 - b \bmod 6|$。

接下来，我们考虑输入 $\textit{word}[0]$，即只有一个字母的的情况，此时有两种选择：

- 手指 $1$ 位于 $\textit{word}[0]$ 所在的位置，手指 $2$ 位于任意位置，此时 $f[0][\textit{word}[0]][k] = 0$，其中 $k \in [0,..25]$。
- 手指 $2$ 位于 $\textit{word}[0]$ 所在的位置，手指 $1$ 位于任意位置，此时 $f[0][k][\textit{word}[0]] = 0$，其中 $k \in [0,..25]$。

然后我们考虑输入 $\textit{word}[1,..n-1]$，我们记上一个字母和当前字母所在的位置分别为 $a$ 和 $b$，接下来我们进行分情况讨论：

如果当前手指 $1$ 位于位置 $b$，我们枚举手指 $2$ 的位置 $j$，假如上一个位置 $a$ 也是手指 $1$ 的位置，那么此时有 $f[i][b][j]=\min(f[i][b][j], f[i-1][a][j]+\textit{dist}(a, b))$。如果手指 $2$ 的位置与上一个位置 $a$ 相同，即 $j=a$，那么我们枚举上一个位置的手指 $1$ 所在的位置 $k$，此时有 $f[i][j][j]=\min(f[i][b][j], f[i-1][k][a]+\textit{dist}(k, b))$。

同理，如果当前手指 $2$ 位于位置 $b$，我们枚举手指 $1$ 的位置 $j$，假如上一个位置 $a$ 也是手指 $2$ 的位置，那么此时有 $f[i][j][b]=\min(f[i][j][b], f[i-1][j][a]+\textit{dist}(a, b))$。如果手指 $1$ 的位置与上一个位置 $a$ 相同，即 $j=a$，那么我们枚举上一个位置的手指 $2$ 所在的位置 $k$，此时有 $f[i][j][b]=\min(f[i][j][b], f[i-1][a][k]+\textit{dist}(k, b))$。

最后，我们枚举最后一个位置的手指 $1$ 和手指 $2$ 所在的位置，取最小值即为答案。

时间复杂度 $O(n \times |\Sigma|^2)$，空间复杂度 $O(n \times |\Sigma|^2)$。其中 $n$ 为字符串 $\textit{word}$ 的长度，而 $|\Sigma|$ 为字母表的大小，本题中 $|\Sigma|=26$。




#### Python3


```python
class Solution:
    def minimumDistance(self, word: str) -> int:
        def dist(a: int, b: int) -> int:
            x1, y1 = divmod(a, 6)
            x2, y2 = divmod(b, 6)
            return abs(x1 - x2) + abs(y1 - y2)

        n = len(word)
        f = [[[inf] * 26 for _ in range(26)] for _ in range(n)]
        for j in range(26):
            f[0][ord(word[0]) - ord('A')][j] = 0
            f[0][j][ord(word[0]) - ord('A')] = 0
        for i in range(1, n):
            a, b = ord(word[i - 1]) - ord('A'), ord(word[i]) - ord('A')
            d = dist(a, b)
            for j in range(26):
                f[i][b][j] = min(f[i][b][j], f[i - 1][a][j] + d)
                f[i][j][b] = min(f[i][j][b], f[i - 1][j][a] + d)
                if j == a:
                    for k in range(26):
                        t = dist(k, b)
                        f[i][b][j] = min(f[i][b][j], f[i - 1][k][a] + t)
                        f[i][j][b] = min(f[i][j][b], f[i - 1][a][k] + t)
        a = min(f[n - 1][ord(word[-1]) - ord('A')])
        b = min(f[n - 1][j][ord(word[-1]) - ord('A')] for j in range(26))
        return int(min(a, b))
```

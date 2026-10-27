## 解法




### 方法一：动态规划



> **思考**
>
> 若枚举所有子串 $s[i..j]$ 再逐一判断是否回文，时间复杂度为 $O(n^3)$。 $n \le 10^3$，无法通过。
>
> 每个子串若都从两端重新比较，内层更短的区间会被反复判断。回文具有最优子结构： $s[i..j]$ 为回文，当且仅当两端字符相同且 $s[i+1..j-1]$ 已是回文；长度为 $1$ 的区间显然成立。
>
> 因此可以按区间依赖填表，而不必反复扫描。 $f[i][j]$ 依赖于更短的内层，枚举顺序须保证内层先算完；填表过程中记录当前最长回文的起点与长度即可。



我们定义 $f[i][j]$ 表示字符串 $s[i..j]$ 是否为回文串，初始时 $f[i][j] = true$。

接下来，我们定义变量 $k$ 和 $mx$，其中 $k$ 表示最长回文串的起始位置， $mx$ 表示最长回文串的长度。初始时 $k = 0$, $mx = 1$。

考虑 $f[i][j]$，如果 $s[i] = s[j]$，那么 $f[i][j] = f[i + 1][j - 1]$；否则 $f[i][j] = false$。如果 $f[i][j] = true$ 并且 $mx \lt j - i + 1$，那么我们更新 $k = i$, $mx = j - i + 1$。

由于 $f[i][j]$ 依赖于 $f[i + 1][j - 1]$，因此我们需要保证 $i + 1$ 在 $j - 1$ 之前，因此我们需要从大到小地枚举 $i$，从小到大地枚举 $j$。

时间复杂度 $O(n^2)$，空间复杂度 $O(n^2)$。其中 $n$ 是字符串 $s$ 的长度。




#### Python3


```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        n = len(s)
        f = [[True] * n for _ in range(n)]
        k, mx = 0, 1
        for i in range(n - 2, -1, -1):
            for j in range(i + 1, n):
                f[i][j] = False
                if s[i] == s[j]:
                    f[i][j] = f[i + 1][j - 1]
                    if f[i][j] and mx < j - i + 1:
                        k, mx = i, j - i + 1
        return s[k : k + mx]
```


#### TypeScript


```ts
function longestPalindrome(s: string): string {
    const n = s.length;
    const f: boolean[][] = Array(n)
        .fill(0)
        .map(() => Array(n).fill(true));
    let k = 0;
    let mx = 1;
    for (let i = n - 2; i >= 0; --i) {
        for (let j = i + 1; j < n; ++j) {
            f[i][j] = false;
            if (s[i] === s[j]) {
                f[i][j] = f[i + 1][j - 1];
                if (f[i][j] && mx < j - i + 1) {
                    mx = j - i + 1;
                    k = i;
                }
            }
        }
    }
    return s.slice(k, k + mx);
}
```


### 方法二：枚举回文中间点



> **思考**
>
> 方法一的时间复杂度已是 $O(n^2)$，但仍需 $O(n^2)$ 的二维表。判断某一区间是否回文时，实际只依赖内一层是否回文，不必保存整张表。
>
> 注意到回文关于中心对称：固定中心向两侧扩展，直到字符不等，即可得到该中心对应的最长回文。奇数长度与偶数长度的中心不同，需要同时枚举 $(i,i)$ 与 $(i,i+1)$，否则会遗漏形如 `"bb"` 的子串。扩展得到长度 $t$ 后，可由中心下标 $i$ 反推起点，额外空间降至 $O(1)$。



我们可以枚举回文中间点，向两边扩散，找到最长的回文串。

时间复杂度 $O(n^2)$，空间复杂度 $O(1)$。其中 $n$ 是字符串 $s$ 的长度。




#### Python3


```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        def f(l, r):
            while l >= 0 and r < n and s[l] == s[r]:
                l, r = l - 1, r + 1
            return r - l - 1

        n = len(s)
        start, mx = 0, 1
        for i in range(n):
            a = f(i, i)
            b = f(i, i + 1)
            t = max(a, b)
            if mx < t:
                mx = t
                start = i - ((t - 1) >> 1)
        return s[start : start + mx]
```

## 解法




### 方法一：记忆化搜索



> **思考**
>
> 若对模式中的每个 `*` 枚举它匹配 $0,1,2,\ldots$ 个字符，时间复杂度为指数级。 $s$ 与 $p$ 最长仅为 $20$，但同一对位置会被反复计算，直接枚举难以稳定通过。
>
> `*` 只作用于其前一个元素：要么匹配 $0$ 次，模式下标前进 $2$；要么当前字符与该元素相符（含 `.`），再让同一个 `*` 继续匹配 $s$ 的下一个字符。普通字符则必须与 $s$ 中对应位置一一匹配。
>
> 因此可以将状态定义为： $s$ 从下标 $i$ 起的后缀与 $p$ 从下标 $j$ 起的后缀能否匹配。递归求解时加以记忆化，即可避免同一对 $(i,j)$ 被重复计算。



我们设计一个函数 $dfs(i, j)$，表示从 $s$ 的第 $i$ 个字符开始，和 $p$ 的第 $j$ 个字符开始是否匹配。那么答案就是 $dfs(0, 0)$。

函数 $dfs(i, j)$ 的计算过程如下：

- 如果 $j$ 已经到达 $p$ 的末尾，那么如果 $i$ 也到达了 $s$ 的末尾，那么匹配成功，否则匹配失败。
- 如果 $j$ 的下一个字符是 `'*'`，我们可以选择匹配 $0$ 个 $s[i]$ 字符，那么就是 $dfs(i, j + 2)$。如果此时 $i \lt m$ 并且 $s[i]$ 和 $p[j]$ 匹配，那么我们可以选择匹配 $1$ 个 $s[i]$ 字符，那么就是 $dfs(i + 1, j)$。
- 如果 $j$ 的下一个字符不是 `'*'`，那么如果 $i \lt m$ 并且 $s[i]$ 和 $p[j]$ 匹配，那么就是 $dfs(i + 1, j + 1)$。否则匹配失败。

过程中，我们可以使用记忆化搜索，避免重复计算。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是 $s$ 和 $p$ 的长度。




#### Python3


```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        @cache
        def dfs(i, j):
            if j >= n:
                return i == m
            if j + 1 < n and p[j + 1] == '*':
                return dfs(i, j + 2) or (
                    i < m and (s[i] == p[j] or p[j] == '.') and dfs(i + 1, j)
                )
            return i < m and (s[i] == p[j] or p[j] == '.') and dfs(i + 1, j + 1)

        m, n = len(s), len(p)
        return dfs(0, 0)
```


#### JavaScript


```js
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    const m = s.length;
    const n = p.length;
    const f = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    const dfs = (i, j) => {
        if (j >= n) {
            return i === m;
        }
        if (f[i][j]) {
            return f[i][j] === 1;
        }
        let res = -1;
        if (j + 1 < n && p[j + 1] === '*') {
            if (dfs(i, j + 2) || (i < m && (s[i] === p[j] || p[j] === '.') && dfs(i + 1, j))) {
                res = 1;
            }
        } else if (i < m && (s[i] === p[j] || p[j] === '.') && dfs(i + 1, j + 1)) {
            res = 1;
        }
        f[i][j] = res;
        return res === 1;
    };
    return dfs(0, 0);
};
```


### 方法二：动态规划



> **思考**
>
> 方法一经记忆化后时间复杂度已是 $O(mn)$，但仍依赖递归，调用栈与常系数都更大。转移没有后效，可以按 $i$、 $j$ 从小到大填表。
>
> 定义 $f[i][j]$ 表示 $s$ 的前 $i$ 个字符与 $p$ 的前 $j$ 个字符是否匹配。空串与空模式匹配；还须允许 $i=0$ 去匹配形如 `a*` 这类可以匹配空串的模式，因此外层循环从空串开始。
>
> `*` 的转移与方法一相同：跳过两个模式字符，或在当前字符匹配时再消耗 $s$ 的一个字符。迭代填完后直接读取 $f[m][n]$。



我们可以将方法一中的记忆化搜索转换为动态规划。

定义 $f[i][j]$ 表示字符串 $s$ 的前 $i$ 个字符和字符串 $p$ 的前 $j$ 个字符是否匹配。那么答案就是 $f[m][n]$。初始化 $f[0][0] = true$，表示空字符串和空正则表达式是匹配的。

与方法一类似，我们可以分情况来讨论。

- 如果 $p[j - 1]$ 是 `'*'`，那么我们可以选择匹配 $0$ 个 $s[i - 1]$ 字符，那么就是 $f[i][j] = f[i][j - 2]$。如果此时 $s[i - 1]$ 和 $p[j - 2]$ 匹配，那么我们可以选择匹配 $1$ 个 $s[i - 1]$ 字符，那么就是 $f[i][j] = f[i][j] \lor f[i - 1][j]$。
- 如果 $p[j - 1]$ 不是 `'*'`，那么如果 $s[i - 1]$ 和 $p[j - 1]$ 匹配，那么就是 $f[i][j] = f[i - 1][j - 1]$。否则匹配失败。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是 $s$ 和 $p$ 的长度。




#### Python3


```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)
        f = [[False] * (n + 1) for _ in range(m + 1)]
        f[0][0] = True
        for i in range(m + 1):
            for j in range(1, n + 1):
                if p[j - 1] == "*":
                    f[i][j] = f[i][j - 2]
                    if i > 0 and (p[j - 2] == "." or s[i - 1] == p[j - 2]):
                        f[i][j] |= f[i - 1][j]
                elif i > 0 and (p[j - 1] == "." or s[i - 1] == p[j - 1]):
                    f[i][j] = f[i - 1][j - 1]
        return f[m][n]
```


#### JavaScript


```js
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    const m = s.length;
    const n = p.length;
    const f = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
    f[0][0] = true;
    for (let i = 0; i <= m; ++i) {
        for (let j = 1; j <= n; ++j) {
            if (p[j - 1] === '*') {
                f[i][j] = f[i][j - 2];
                if (i && (p[j - 2] === '.' || p[j - 2] === s[i - 1])) {
                    f[i][j] |= f[i - 1][j];
                }
            } else if (i && (p[j - 1] === '.' || p[j - 1] === s[i - 1])) {
                f[i][j] = f[i - 1][j - 1];
            }
        }
    }
    return f[m][n];
};
```

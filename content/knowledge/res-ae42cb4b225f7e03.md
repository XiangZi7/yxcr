## 解法




### 方法一：记忆化搜索



> **思考**
>
> 交错串要求 $s_3$ 由 $s_1$、 $s_2$ 保序穿插而成，长度必须先相等。每一步从 $s_1$ 或 $s_2$ 取下一个字符，搜索树规模过大。
>
> 状态其实只有「 $s_1$ 用了几个、 $s_2$ 用了几个」：当前位置 $k = i + j$ 对 $s_3$ 是确定的。能否继续，取决于 $s_1[i]$ 或 $s_2[j]$ 是否等于 $s_3[k]$。对 $(i, j)$ 记忆化后，子问题个数为 $O(mn)$。



我们记字符串 $s_1$ 的长度为 $m$，字符串 $s_2$ 的长度为 $n$，如果 $m + n \neq |s_3|$，那么 $s_3$ 一定不是 $s_1$ 和 $s_2$ 的交错字符串，返回 `false`。

接下来，我们设计一个函数 $dfs(i, j)$，表示从 $s_1$ 的第 $i$ 个字符和 $s_2$ 的第 $j$ 个字符开始，能否交错组成 $s_3$ 的剩余部分。那么答案就是 $dfs(0, 0)$。

函数 $dfs(i, j)$ 的计算过程如下：

如果 $i \geq m$ 并且 $j \geq n$，那么说明 $s_1$ 和 $s_2$ 都已经遍历完毕，返回 `true`。

如果 $i < m$ 并且 $s_1[i] = s_3[i + j]$，那么说明 $s_1[i]$ 这个字符是 $s_3[i + j]$ 中的一部分，因此递归地调用 $dfs(i + 1, j)$ 判断 $s_1$ 的下一个字符能否和 $s_2$ 的当前字符匹配，如果能匹配成功，就返回 `true`。

同理，如果 $j < n$ 并且 $s_2[j] = s_3[i + j]$，那么说明 $s_2[j]$ 这个字符是 $s_3[i + j]$ 中的一部分，因此递归地调用 $dfs(i, j + 1)$ 判断 $s_2$ 的下一个字符能否和 $s_1$ 的当前字符匹配，如果能匹配成功，就返回 `true`。

否则，返回 `false`。

为了避免重复计算，我们可以使用记忆化搜索。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是字符串 $s_1$ 和 $s_2$ 的长度。




#### Python3


```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        @cache
        def dfs(i: int, j: int) -> bool:
            if i >= m and j >= n:
                return True
            k = i + j
            if i < m and s1[i] == s3[k] and dfs(i + 1, j):
                return True
            if j < n and s2[j] == s3[k] and dfs(i, j + 1):
                return True
            return False

        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        return dfs(0, 0)
```


#### TypeScript


```ts
function isInterleave(s1: string, s2: string, s3: string): boolean {
    const m = s1.length;
    const n = s2.length;
    if (m + n !== s3.length) {
        return false;
    }
    const f: number[][] = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    const dfs = (i: number, j: number): boolean => {
        if (i >= m && j >= n) {
            return true;
        }
        if (f[i][j]) {
            return f[i][j] === 1;
        }
        f[i][j] = -1;
        if (i < m && s1[i] === s3[i + j] && dfs(i + 1, j)) {
            f[i][j] = 1;
        }
        if (f[i][j] === -1 && j < n && s2[j] === s3[i + j] && dfs(i, j + 1)) {
            f[i][j] = 1;
        }
        return f[i][j] === 1;
    };
    return dfs(0, 0);
}
```


### 方法二：动态规划



> **思考**
>
> 方法一的递归已经给出转移。改成自底向上：令 $f[i][j]$ 表示 $s_1$ 前 $i$ 个与 $s_2$ 前 $j$ 个能否拼出 $s_3$ 前 $i+j$ 个。空串对空串为真，按 $i$、 $j$ 填表即可，避免递归栈。



我们可以将方法一中的记忆化搜索转化为动态规划。

定义 $f[i][j]$ 表示字符串 $s_1$ 的前 $i$ 个字符和字符串 $s_2$ 的前 $j$ 个字符是否能交错组成字符串 $s_3$ 的前 $i + j$ 个字符。在进行状态转移时，我们可以考虑当前字符是由 $s_1$ 的最后一个字符还是 $s_2$ 的最后一个字符得到的，因此有状态转移方程：

$$
f[i][j] = \begin{cases}
f[i - 1][j] & \textit{if } s_1[i - 1] = s_3[i + j - 1] \\
\textit{or } f[i][j - 1] & \textit{if } s_2[j - 1] = s_3[i + j - 1] \\
\textit{false} & \textit{otherwise}
\end{cases}
$$

其中 $f[0][0] = \textit{true}$ 表示空串是两个空串的交错字符串。

答案即为 $f[m][n]$。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是字符串 $s_1$ 和 $s_2$ 的长度。




#### Python3


```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        f = [[False] * (n + 1) for _ in range(m + 1)]
        f[0][0] = True
        for i in range(m + 1):
            for j in range(n + 1):
                k = i + j - 1
                if i and s1[i - 1] == s3[k]:
                    f[i][j] = f[i - 1][j]
                if j and s2[j - 1] == s3[k]:
                    f[i][j] |= f[i][j - 1]
        return f[m][n]
```


#### TypeScript


```ts
function isInterleave(s1: string, s2: string, s3: string): boolean {
    const m = s1.length;
    const n = s2.length;
    if (m + n !== s3.length) {
        return false;
    }
    const f: boolean[][] = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(false));
    f[0][0] = true;
    for (let i = 0; i <= m; ++i) {
        for (let j = 0; j <= n; ++j) {
            const k = i + j - 1;
            if (i > 0 && s1[i - 1] === s3[k]) {
                f[i][j] = f[i - 1][j];
            }
            if (j > 0 && s2[j - 1] === s3[k]) {
                f[i][j] = f[i][j] || f[i][j - 1];
            }
        }
    }
    return f[m][n];
}
```


### 方法三：滚动数组优化



> **思考**
>
> 方法二仍用 $O(mn)$ 空间。进阶只要 $O(|s_2|)$ 额外空间。 $f[i][j]$ 只依赖上一行与本行左侧，一行滚动数组就能放下，对应题目要求的 $O(n)$ 空间。



我们注意到，状态 $f[i][j]$ 只和 $f[i - 1][j]$、 $f[i][j - 1]$ 有关，因此可以使用滚动数组将空间复杂度优化到 $O(n)$。时间复杂度仍为 $O(m \times n)$。




#### Python3


```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        f = [True] + [False] * n
        for i in range(m + 1):
            for j in range(n + 1):
                k = i + j - 1
                if i:
                    f[j] &= s1[i - 1] == s3[k]
                if j:
                    f[j] |= f[j - 1] and s2[j - 1] == s3[k]
        return f[n]
```


#### TypeScript


```ts
function isInterleave(s1: string, s2: string, s3: string): boolean {
    const m = s1.length;
    const n = s2.length;
    if (m + n !== s3.length) {
        return false;
    }
    const f: boolean[] = new Array(n + 1).fill(false);
    f[0] = true;
    for (let i = 0; i <= m; ++i) {
        for (let j = 0; j <= n; ++j) {
            const k = i + j - 1;
            if (i) {
                f[j] = f[j] && s1[i - 1] === s3[k];
            }
            if (j) {
                f[j] = f[j] || (f[j - 1] && s2[j - 1] === s3[k]);
            }
        }
    }
    return f[n];
}
```

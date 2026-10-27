## 解法




### 方法一：动态规划



> **思考**
>
> 不同非空子序列的个数， $n\le 2000$，不能枚举子集。以末字符分类： $f[c]$ 表示当前以 $c$ 结尾的不同子序列数。读入 $c$ 时，它可以接在此前任意子序列之后，也可以单独成串，故 $f[c]\leftarrow \sum f+1$，重复字符会覆盖旧的以 $c$ 结尾的集合。



我们定义 $f[i]$ 表示以第 $i$ 个小写字母结尾的不同子序列的个数。初始时 $f$ 中所有元素均为 $0$。

遍历字符串 $s$，对于当前字符 $c$，我们将 $f[c]$ 更新为 $\sum_{i=0}^{25} f[i] + 1$。其中 $\sum_{i=0}^{25} f[i]$ 表示此前已经得到的所有不同子序列的个数，而 $+1$ 表示字符 $c$ 本身也可以作为一个子序列。

最后，答案为 $\sum_{i=0}^{25} f[i]$，对 $10^9 + 7$ 取余。

时间复杂度 $O(n \times C)$，空间复杂度 $O(C)$。其中 $n$ 是字符串 $s$ 的长度，而 $C$ 是字符集的大小，本题中 $C = 26$。




#### Python3


```python
class Solution:
    def distinctSubseqII(self, s: str) -> int:
        mod = 10**9 + 7
        f = [0] * 26
        for c in s:
            f[ord(c) - ord("a")] = (sum(f) + 1) % mod
        return sum(f) % mod
```


#### TypeScript


```ts
function distinctSubseqII(s: string): number {
    const mod = 1e9 + 7;
    const f: number[] = Array(26).fill(0);
    for (const c of s) {
        f[c.charCodeAt(0) - 97] = f.reduce((acc, v) => (acc + v) % mod, 1);
    }
    return f.reduce((acc, v) => (acc + v) % mod);
}
```


### 方法二：动态规划优化



> **思考**
>
> 方法一每次更新要扫 $26$ 个格子。维护总和 $\textit{ans}$，新增量为 $\textit{ans}-f[i]+1$，即可 $O(1)$ 更新 $f[i]$ 与 $\textit{ans}$。



在方法一的基础上，我们可以维护一个变量 $\textit{ans}$ 表示当前 $f$ 数组中所有元素的和。每次更新 $f[i]$ 时，新增的不同子序列个数为 $\textit{ans} - f[i] + 1$，据此同时更新 $\textit{ans}$ 与 $f[i]$ 即可。

时间复杂度 $O(n)$，空间复杂度 $O(C)$。

相似题目：

- [1987. 不同的好子序列数目](https://github.com/doocs/leetcode/blob/main/solution/1900-1999/1987.Number%20of%20Unique%20Good%20Subsequences/README.md)




#### Python3


```python
class Solution:
    def distinctSubseqII(self, s: str) -> int:
        mod = 10**9 + 7
        f = [0] * 26
        ans = 0
        for c in s:
            i = ord(c) - ord("a")
            add = (ans + 1 - f[i]) % mod
            ans = (ans + add) % mod
            f[i] = (f[i] + add) % mod
        return ans
```


#### TypeScript


```ts
function distinctSubseqII(s: string): number {
    const mod = 1e9 + 7;
    const f: number[] = Array(26).fill(0);
    let ans = 0;
    for (const c of s) {
        const i = c.charCodeAt(0) - 97;
        const add = (ans + 1 + mod - f[i]) % mod;
        ans = (ans + add) % mod;
        f[i] = (f[i] + add) % mod;
    }
    return ans;
}
```

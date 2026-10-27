## 解法




### 方法一：动态规划



> **思考**
>
> 递归走到第 $i$ 位时，可以单独解码 $s[i]$（非 $0$），或与前一位拼成 $10$– $26$。 $n \le 100$，若不记忆化，同一前缀会被反复计算，搜索规模过大。
>
> 「前 $i$ 个字符有多少种解法」只取决于更短前缀，且合法划分只有一位或两位两种。结构与爬楼梯相同，约束换成数字编码是否合法。
>
> 令 $f[i]$ 为前 $i$ 个字符的方案数。空串一种； $0$ 不能单独成码， $10$– $26$ 才能两位成码。按位递推即可，不必枚举所有划分。



我们定义 $f[i]$ 表示字符串的前 $i$ 个字符的解码方法数，初始时 $f[0]=1$，其余 $f[i]=0$。

考虑 $f[i]$ 如何进行状态转移。

- 如果第 $i$ 个字符（即 $s[i-1]$）单独形成编码，那么它对应一种解码方式，即 $f[i]=f[i-1]$。前提是 $s[i-1] \neq 0$。
- 如果第 $i-1$ 个字符和第 $i$ 个字符组成的字符串在 $[1,26]$ 范围内，那么它们可以作为一个整体，对应一种解码方式，即 $f[i] = f[i] + f[i-2]$。前提是 $s[i-2] \neq 0$，且 $s[i-2]s[i-1]$ 在 $[1,26]$ 范围内。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是字符串的长度。




#### Python3


```python
class Solution:
    def numDecodings(self, s: str) -> int:
        n = len(s)
        f = [1] + [0] * n
        for i, c in enumerate(s, 1):
            if c != "0":
                f[i] = f[i - 1]
            if i > 1 and s[i - 2] != "0" and int(s[i - 2 : i]) <= 26:
                f[i] += f[i - 2]
        return f[n]
```


#### TypeScript


```ts
function numDecodings(s: string): number {
    const n = s.length;
    const f: number[] = new Array(n + 1).fill(0);
    f[0] = 1;
    for (let i = 1; i <= n; ++i) {
        if (s[i - 1] !== '0') {
            f[i] = f[i - 1];
        }
        if (i > 1 && (s[i - 2] === '1' || (s[i - 2] === '2' && s[i - 1] <= '6'))) {
            f[i] += f[i - 2];
        }
    }
    return f[n];
}
```


### 方法二：动态规划优化



> **思考**
>
> 方法一的递推已经正确。每次转移只用到 $f[i-1]$ 与 $f[i-2]$，不必保留整张表。用两个变量滚动即可把空间降到 $O(1)$，时间仍是一遍扫描。



我们注意到，状态 $f[i]$ 仅与状态 $f[i-1]$ 和状态 $f[i-2]$ 有关，因此我们可以使用两个变量代替这两个状态，将空间复杂度从 $O(n)$ 降低至 $O(1)$。时间复杂度仍为 $O(n)$。




#### Python3


```python
class Solution:
    def numDecodings(self, s: str) -> int:
        f, g = 0, 1
        for i, c in enumerate(s, 1):
            h = g if c != "0" else 0
            if i > 1 and s[i - 2] != "0" and int(s[i - 2 : i]) <= 26:
                h += f
            f, g = g, h
        return g
```


#### TypeScript


```ts
function numDecodings(s: string): number {
    const n = s.length;
    let [f, g] = [0, 1];
    for (let i = 1; i <= n; ++i) {
        let h = s[i - 1] !== '0' ? g : 0;
        if (i > 1 && (s[i - 2] === '1' || (s[i - 2] === '2' && s[i - 1] <= '6'))) {
            h += f;
        }
        [f, g] = [g, h];
    }
    return g;
}
```

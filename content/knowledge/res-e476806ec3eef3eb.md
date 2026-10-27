## 解法




### 方法一：哈希表



> **思考**
>
> 长度为 $k$ 的二进制串共 $2^k$ 种， $k\le 20$。若 $s$ 的 $k$ 子串个数不足 $2^k$，直接失败；否则把所有子串放入集合，看是否凑满。



首先，对于一个长度为 $n$ 的字符串 $s$，长度为 $k$ 的子串的个数为 $n - k + 1$，如果 $n - k + 1 < 2^k$，则一定存在长度为 $k$ 的二进制串不是 $s$ 的子串，返回 `false`。

接下来，我们遍历字符串 $s$，将所有长度为 $k$ 的子串存入集合 $ss$，最后判断集合 $ss$ 的大小是否等于 $2^k$。

时间复杂度 $O(n \times k)$，空间复杂度 $O(n)$。其中 $n$ 是字符串 $s$ 的长度。




#### Python3


```python
class Solution:
    def hasAllCodes(self, s: str, k: int) -> bool:
        n = len(s)
        m = 1 << k
        if n - k + 1 < m:
            return False
        ss = {s[i : i + k] for i in range(n - k + 1)}
        return len(ss) == m
```


#### TypeScript


```ts
function hasAllCodes(s: string, k: number): boolean {
    const n = s.length;
    const m = 1 << k;
    if (n - k + 1 < m) {
        return false;
    }
    const ss = new Set<string>();
    for (let i = 0; i + k <= n; ++i) {
        ss.add(s.slice(i, i + k));
    }
    return ss.size === m;
}
```








### 方法二：滑动窗口



> **思考**
>
> 方法一每个窗口复制 $k$ 个字符。把窗口看成整数，滑入新位、滑出最高位，插入集合的代价降为 $O(1)$。



方法一中，我们存储了所有长度为 $k$ 的不同子串，子串的处理需要 $O(k)$ 的时间，我们可以改用滑动窗口，每次添加最新字符时，删除窗口最左边的字符。此过程中用一个整型数字 $x$ 来存放子串。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是字符串 $s$ 的长度。




#### Python3


```python
class Solution:
    def hasAllCodes(self, s: str, k: int) -> bool:
        n = len(s)
        m = 1 << k
        if n - k + 1 < m:
            return False
        ss = set()
        x = int(s[:k], 2)
        ss.add(x)
        for i in range(k, n):
            a = int(s[i - k]) << (k - 1)
            b = int(s[i])
            x = (x - a) << 1 | b
            ss.add(x)
        return len(ss) == m
```


#### TypeScript


```ts
function hasAllCodes(s: string, k: number): boolean {
    const n = s.length;
    const m = 1 << k;
    if (n - k + 1 < m) {
        return false;
    }
    let x = +`0b${s.slice(0, k)}`;
    const ss = new Set<number>();
    ss.add(x);
    for (let i = k; i < n; ++i) {
        const a = +s[i - k] << (k - 1);
        const b = +s[i];
        x = ((x - a) << 1) | b;
        ss.add(x);
    }
    return ss.size === m;
}
```

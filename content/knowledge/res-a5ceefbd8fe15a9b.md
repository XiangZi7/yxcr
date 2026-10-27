## 解法




### 方法一：逆向思维



> **思考**
>
> 解码串由字母与重复数字生成，长度可达 $10^{18}$ 量级， $k$ 达 $10^9$，不能真正展开。第 $k$ 个字符由最后一次使长度覆盖 $k$ 的操作决定。
>
> 先正向累加解码长度 $m$，再逆向：数字把 $k$ 对当前长度取模并缩短 $m$，字母在 $k\equiv 0$ 时即为所求。这样只走两遍原串。



我们可以先计算出解码字符串的总长度 $m$，然后从后向前遍历字符串，每次更新 $k$ 为 $k \bmod m$，直到 $k$ 为 $0$ 且当前字符为字母，返回当前字符。否则，如果当前字符为数字，则将 $m$ 除以该数字。如果当前字符为字母，则将 $m$ 减 $1$。

时间复杂度 $O(n)$，其中 $n$ 为字符串的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def decodeAtIndex(self, s: str, k: int) -> str:
        m = 0
        for c in s:
            if c.isdigit():
                m *= int(c)
            else:
                m += 1
        for c in s[::-1]:
            k %= m
            if k == 0 and c.isalpha():
                return c
            if c.isdigit():
                m //= int(c)
            else:
                m -= 1
```


#### TypeScript


```ts
function decodeAtIndex(s: string, k: number): string {
    let m = 0n;
    for (const c of s) {
        if (c >= '1' && c <= '9') {
            m *= BigInt(c);
        } else {
            ++m;
        }
    }
    for (let i = s.length - 1; ; --i) {
        if (k >= m) {
            k %= Number(m);
        }
        if (k === 0 && s[i] >= 'a' && s[i] <= 'z') {
            return s[i];
        }
        if (s[i] >= '1' && s[i] <= '9') {
            m = (m / BigInt(s[i])) | 0n;
        } else {
            --m;
        }
    }
}
```

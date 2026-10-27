## 解法




### 方法一：脑筋急转弯



> **思考**
>
> $n$ 可达 $10^9$，逐个检查 $[1,n]$ 的二进制是否为 $s$ 的子串不可行。 $s$ 长度至多 $1000$，它能提供的互异子串远少于 $10^9$，故 $n>1000$ 时可直接判否。
>
> 若整数 $x$ 的二进制出现在 $s$ 中，则 $\lfloor x/2\rfloor$ 相当于去掉最低位，也一定作为子串出现。因此只需验证较大的一半，即 $[\lfloor n/2\rfloor+1,n]$。
>
> 在 $n\le 1000$ 的前提下对这些值调用子串查找即可。



我们注意到，字符串 $s$ 的长度不超过 $1000$，所以字符串 $s$ 能表示不超过 $1000$ 个 二进制整数，因此，如果 $n \gt 1000$，那么 $s$ 肯定不能表示 $[1,.. n]$ 范围内的所有整数的二进制表示。

另外，对于一个整数 $x$，如果 $x$ 的二进制表示是 $s$ 的子串，那么 $\lfloor x / 2 \rfloor$ 的二进制表示也是 $s$ 的子串。因此，我们只需要判断 $[\lfloor n / 2 \rfloor + 1,.. n]$ 范围内的整数的二进制表示是否是 $s$ 的子串即可。

时间复杂度 $O(m^2 \times \log m)$，空间复杂度 $O(\log n)$，其中 $m$ 是字符串 $s$ 的长度，而 $n$ 为题目给定的正整数。




#### Python3


```python
class Solution:
    def queryString(self, s: str, n: int) -> bool:
        if n > 1000:
            return False
        return all(bin(i)[2:] in s for i in range(n, n // 2, -1))
```


#### TypeScript


```ts
function queryString(s: string, n: number): boolean {
    if (n > 1000) {
        return false;
    }
    for (let i = n; i > n / 2; --i) {
        if (s.indexOf(i.toString(2)) === -1) {
            return false;
        }
    }
    return true;
}
```

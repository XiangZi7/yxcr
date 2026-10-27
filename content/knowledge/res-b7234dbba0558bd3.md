## 解法




### 方法一：数学 + 位运算



> **思考**
>
> 区间长度不超过 $10^4$，上界 $10^6$，二进制中 $1$ 的个数至多 $20$。枚举每个数统计比特再判断质数完全可行。
>
> $20$ 以内质数只有八个，放进集合后 $\textit{bit\_count}$ 一次查询即可。不必对每个个数做试除。



题目中 $\textit{left}$ 和 $\textit{right}$ 的范围均在 $10^6$ 以内，而 $2^{20} = 1048576$，因此，二进制中 $1$ 的个数最多也就 $20$ 个，而 $20$ 以内的质数有 $[2, 3, 5, 7, 11, 13, 17, 19]$。

我们枚举 $[\textit{left},.. \textit{right}]$ 范围内的每个数，统计其二进制中 $1$ 的个数，然后判断该个数是否为质数，如果是，答案加一。

时间复杂度 $O(n\times \log m)$。其中 $n = \textit{right} - \textit{left} + 1$，而 $m$ 为 $[\textit{left},.. \textit{right}]$ 范围内的最大数。




#### Python3


```python
class Solution:
    def countPrimeSetBits(self, left: int, right: int) -> int:
        primes = {2, 3, 5, 7, 11, 13, 17, 19}
        return sum(i.bit_count() in primes for i in range(left, right + 1))
```


#### TypeScript


```ts
function countPrimeSetBits(left: number, right: number): number {
    const primes = new Set<number>([2, 3, 5, 7, 11, 13, 17, 19]);
    let ans = 0;

    for (let i = left; i <= right; i++) {
        const bits = bitCount(i);
        if (primes.has(bits)) {
            ans++;
        }
    }

    return ans;
}

function bitCount(i: number): number {
    i = i - ((i >>> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
    i = (i + (i >>> 4)) & 0x0f0f0f0f;
    i = i + (i >>> 8);
    i = i + (i >>> 16);
    return i & 0x3f;
}
```

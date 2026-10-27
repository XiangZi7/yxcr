## 解法




### 方法一：埃氏筛



> **思考**
>
> 对每个 $x$ 试除到 $\sqrt{x}$ 可统计素数，但 $n$ 可达 $5\times 10^6$，重复试除偏慢。若 $x$ 为素数，则 $2x,3x,\ldots$ 必为合数。
>
> 为此用埃氏筛：从小到大扫描，遇到素数便将其倍数标记为合数，最后统计仍为素数的个数。每个合数只被其因子划去，时间约为 $O(n\log\log n)$。



如果 $x$ 是质数，那么大于 $x$ 的 $x$ 的倍数 $2x$,$3x$,… 一定不是质数，因此我们可以从这里入手。

设 $primes[i]$ 表示数 $i$ 是不是质数，如果是质数则为 $true$，否则为 $false$。

我们在 $[2,n]$ 范围内顺序遍历每个数 $i$，如果这个数为质数（ $primes[i]==true$），质数个数增 1，然后将其所有的倍数 $j$ 都标记为合数（除了该质数本身），即 $primes[j]=false$，这样在运行结束的时候我们即能知道质数的个数。

时间复杂度 $O(nloglogn)$。




#### Python3


```python
class Solution:
    def countPrimes(self, n: int) -> int:
        primes = [True] * n
        ans = 0
        for i in range(2, n):
            if primes[i]:
                ans += 1
                for j in range(i + i, n, i):
                    primes[j] = False
        return ans
```


#### JavaScript


```js
/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
    let primes = new Array(n).fill(true);
    let ans = 0;
    for (let i = 2; i < n; ++i) {
        if (primes[i]) {
            ++ans;
            for (let j = i + i; j < n; j += i) {
                primes[j] = false;
            }
        }
    }
    return ans;
};
```

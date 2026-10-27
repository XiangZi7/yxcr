## 解法




### 方法一：数学



> **思考**
>
> 若将整数逐个拼接成字符串再取第 $n$ 位， $n$ 可达 $2^{31}-1$，整段序列无法物化。
>
> 同一位数的整数所贡献的位数可以闭式求出： $k$ 位数共 $9\times 10^{k-1}$ 个，合计 $k\times 9\times 10^{k-1}$ 位。因此先按 $k$ 从 $1$ 递增，用减法判断 $n$ 落在哪一段，再由剩余偏移算出具体整数及其内部下标。
>
> 必须先扣完整段再定位，才能把「全局第 $n$ 位」化成「某个数的第 $\textit{idx}$ 位」。



位数为 $k$ 的最小整数和最大整数分别为 $10^{k-1}$ 和 $10^k-1$，因此 $k$ 位数的总位数为 $k \times 9 \times 10^{k-1}$。

我们用 $k$ 表示当前数字的位数，用 $cnt$ 表示当前位数的数字的总数，初始时 $k=1$, $cnt=9$。

每次将 $n$ 减去 $cnt \times k$，当 $n$ 小于等于 $cnt \times k$ 时，说明 $n$ 对应的数字在当前位数的数字范围内，此时可以计算出对应的数字。

具体做法是，首先计算出 $n$ 对应的是当前位数的哪一个数字，然后计算出是该数字的第几位，从而得到该位上的数字。

时间复杂度 $O(\log_{10} n)$。




#### Python3


```python
class Solution:
    def findNthDigit(self, n: int) -> int:
        k, cnt = 1, 9
        while k * cnt < n:
            n -= k * cnt
            k += 1
            cnt *= 10
        num = 10 ** (k - 1) + (n - 1) // k
        idx = (n - 1) % k
        return int(str(num)[idx])
```


#### JavaScript


```js
/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function (n) {
    let k = 1,
        cnt = 9;
    while (k * cnt < n) {
        n -= k * cnt;
        ++k;
        cnt *= 10;
    }
    const num = Math.pow(10, k - 1) + Math.floor((n - 1) / k);
    const idx = (n - 1) % k;
    return Number(num.toString()[idx]);
};
```

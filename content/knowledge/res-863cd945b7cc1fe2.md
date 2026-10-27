## 解法




### 方法一：数学（快速幂）



> **思考**
>
> 若把 $x$ 连乘 $|n|$ 次， $|n|$ 最大约 $2^{31}$，线性乘法容易超时；还要单独处理 $n < 0$ 时取倒数。
>
> 一次只乘一个 $x$ 没有利用幂的倍增结构。注意到 $x^{2k} = (x^k)^2$， $x^{2k+1} = x \cdot (x^k)^2$，指数每次可以折半。
>
> 因此按 $n$ 的二进制位累乘：当前底不断平方，遇到 $1$ 位就乘进答案。负数指数先算正幂再取倒数。快速幂把 $O(|n|)$ 压成 $O(\log |n|)$。



快速幂算法的核心思想是将幂指数 $n$ 拆分为若干个二进制位上的 $1$ 的和，然后将 $x$ 的 $n$ 次幂转化为 $x$ 的若干个幂的乘积。

时间复杂度 $O(\log n)$，空间复杂度 $O(1)$。其中 $n$ 为幂指数。




#### Python3


```python
class Solution:
    def myPow(self, x: float, n: int) -> float:
        def qpow(a: float, n: int) -> float:
            ans = 1
            while n:
                if n & 1:
                    ans *= a
                a *= a
                n >>= 1
            return ans

        return qpow(x, n) if n >= 0 else 1 / qpow(x, -n)
```


#### TypeScript


```ts
function myPow(x: number, n: number): number {
    const qpow = (a: number, n: number): number => {
        let ans = 1;
        for (; n; n >>>= 1) {
            if (n & 1) {
                ans *= a;
            }
            a *= a;
        }
        return ans;
    };
    return n >= 0 ? qpow(x, n) : 1 / qpow(x, -n);
}
```

## 解法




### 方法一：数学 + 二分查找



> **思考**
>
> 第 $n$ 个能被 $a$ 或 $b$ 整除的正整数， $n$ 达 $10^9$。直接按倍数枚举过慢。不超过 $x$ 的神奇数个数为 $x/a+x/b-x/\mathrm{lcm}(a,b)$，该函数对 $x$ 单调。
>
> 在足够大的上界上二分最小的 $x$ 使计数达到 $n$，再取模。上界取 $(a+b)\cdot n$ 已覆盖。



根据题目描述，神奇数字是能被 $a$ 或 $b$ 整除的正整数。

而我们知道，对于任意正整数 $x$，在 $[1,..x]$ 范围内，能被 $a$ 整除的数有 $\lfloor \frac{x}{a} \rfloor$ 个，能被 $b$ 整除的数有 $\lfloor \frac{x}{b} \rfloor$ 个，能被 $a$ 和 $b$ 同时整除的数有 $\lfloor \frac{x}{c} \rfloor$ 个，其中 $c$ 是 $a$ 和 $b$ 的最小公倍数。最小公倍数的计算公式为 $c = lcm(a, b) = \frac{a \times b}{gcd(a, b)}$。

因此，对于任意正整数 $x$，在 $[1,..x]$ 范围内，神奇数字的个数为：

$$
\lfloor \frac{x}{a} \rfloor + \lfloor \frac{x}{b} \rfloor - \lfloor \frac{x}{c} \rfloor
$$

为什么要减去 $\lfloor \frac{x}{c} \rfloor$ 呢？可以这样理解，在 $[1,..x]$ 范围内，能被 $a$ 和 $b$ 同时整除的数，它们既能被 $a$ 整除，也能被 $b$ 整除，因此它们被计算了两次，需要减去一次。

题目要我们找到第 $n$ 个神奇数字，也即是说，要找到一个最小的正整数 $x$，使得以下式子成立：

$$
\lfloor \frac{x}{a} \rfloor + \lfloor \frac{x}{b} \rfloor - \lfloor \frac{x}{c} \rfloor \geq n
$$

随着 $x$ 的增大，神奇数字的个数也会增大，因此我们可以使用二分查找的方法，找到最小的正整数 $x$，使得上述式子成立。

注意答案的取模操作。

时间复杂度 $O(\log M)$，空间复杂度 $O(1)$。其中 $M$ 是二分查找的上界，本题可以取 $M=(a+b) \times n$。




#### Python3


```python
class Solution:
    def nthMagicalNumber(self, n: int, a: int, b: int) -> int:
        mod = 10**9 + 7
        c = lcm(a, b)
        r = (a + b) * n
        return bisect_left(range(r), x=n, key=lambda x: x // a + x // b - x // c) % mod
```

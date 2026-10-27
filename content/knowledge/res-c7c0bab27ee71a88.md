## 解法




### 方法一：快速幂



> **思考**
>
> $a$ 的指数是大整数 $b$ 的十进制数组，求 $a^b \bmod 1337$。直接把 $b$ 拼成整数再幂在语言限制下不便。按位展开 $b=\cdots+e_i\cdot 10^i$。
>
> 自低位向高位：答案乘 $a^{e}$，再把底数换成 $a^{10}$。快速幂取模保证每步 $O(\log e)$。



我们初始化答案变量 $ans = 1$。

接下来，倒序遍历数组 $b$，每次遍历到一个元素 $e$，我们将答案变量 $ans$ 自乘 $a^e$ 并对 $1337$ 取模，然后将 $a$ 自乘 $10$ 次并对 $1337$ 取模。这里需要用到快速幂。

遍历完数组后，返回答案即可。

时间复杂度 $O(\sum_{i=0}^{n-1} \log b_i)$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def superPow(self, a: int, b: List[int]) -> int:
        mod = 1337
        ans = 1
        for e in b[::-1]:
            ans = ans * pow(a, e, mod) % mod
            a = pow(a, 10, mod)
        return ans
```


#### TypeScript


```ts
function superPow(a: number, b: number[]): number {
    let ans = 1;
    const mod = 1337;
    const qpow = (a: number, n: number): number => {
        let ans = 1;
        for (; n; n >>= 1) {
            if (n & 1) {
                ans = Number((BigInt(ans) * BigInt(a)) % BigInt(mod));
            }
            a = Number((BigInt(a) * BigInt(a)) % BigInt(mod));
        }
        return ans;
    };
    for (let i = b.length - 1; ~i; --i) {
        ans = Number((BigInt(ans) * BigInt(qpow(a, b[i]))) % BigInt(mod));
        a = qpow(a, 10);
    }
    return ans;
}
```

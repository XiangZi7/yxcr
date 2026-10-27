## 解法




### 方法一：试除法



> **思考**
>
> 判断 $n$ 是否为 $3$ 的幂。连乘直到溢出再比较亦可，但试除更直接：在 $n>2$ 时若不能被 $3$ 整除则否，否则除以 $3$。最终只剩 $1$ 则为是。 $n\le 1$ 的情况自然落到最后的相等判断。



如果 $n \gt 2$，我们可以不断地将 $n$ 除以 $3$，如果不能整除，说明 $n$ 不是 $3$ 的幂，否则继续除以 $3$，直到 $n$ 小于等于 $2$。如果 $n$ 等于 $1$，说明 $n$ 是 $3$ 的幂，否则不是 $3$ 的幂。

时间复杂度 $O(\log_3n)$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def isPowerOfThree(self, n: int) -> bool:
        while n > 2:
            if n % 3:
                return False
            n //= 3
        return n == 1
```


#### TypeScript


```ts
function isPowerOfThree(n: number): boolean {
    while (n > 2) {
        if (n % 3 !== 0) {
            return false;
        }
        n = Math.floor(n / 3);
    }
    return n === 1;
}
```


### 方法二：数学



> **思考**
>
> 试除需 $O(\log n)$ 次除法。 $32$ 位内最大 $3$ 的幂为 $3^{19}=1162261467$，正整数 $n$ 为 $3$ 的幂当且仅当它整除该值。一次取模即可。



如果 $n$ 是 $3$ 的幂，那么 $n$ 最大是 $3^{19} = 1162261467$，因此我们只需要判断 $n$ 是否是 $3^{19}$ 的约数即可。

时间复杂度 $O(1)$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def isPowerOfThree(self, n: int) -> bool:
        return n > 0 and 1162261467 % n == 0
```


#### TypeScript


```ts
function isPowerOfThree(n: number): boolean {
    return n > 0 && 1162261467 % n == 0;
}
```

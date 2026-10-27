## 解法




### 方法一：模拟



> **思考**
>
> 判断相邻二进制位是否严格交替。逐位比较即可。
>
> 反复取最低位并右移，与上一比特相同则失败，扫完为真。



我们将 $n$ 循环右移直至为 $0$，依次检测 $n$ 的二进制位是否交替出现。若循环过程中发现 $0$, $1$ 没有交替出现，直接返回 $\textit{false}$。否则循环结束返回 $\textit{true}$。

时间复杂度 $O(\log n)$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def hasAlternatingBits(self, n: int) -> bool:
        prev = -1
        while n:
            curr = n & 1
            if prev == curr:
                return False
            prev = curr
            n >>= 1
        return True
```


#### TypeScript


```ts
function hasAlternatingBits(n: number): boolean {
    let prev = -1;

    while (n !== 0) {
        const curr = n & 1;
        if (prev === curr) {
            return false;
        }
        prev = curr;
        n >>= 1;
    }

    return true;
}
```


### 方法二：位运算



> **思考**
>
> 模拟是 $O(\log n)$。 $n\oplus(n\gg 1)$ 若各位交替会变成一串 $1$，再与 $n+1$ 相与应为 $0$，常数时间判定。



假设 $\text{01}$ 交替出现，那么我们可以通过错位异或将尾部全部转为 $\text{1}$，加 $\text{1}$ 可以得到 $2$ 的幂次的一个数 $n$（ $n$ 中只有一个位是 $\text{1}$），接着利用 $\text{n} \& (\text{n} + 1)$ 可以消除最后一位的 $\text{1}$。

此时判断是否为 $\text{0}$，若是，说明假设成立，是 $\text{01}$ 交替串。

时间复杂度 $O(1)$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def hasAlternatingBits(self, n: int) -> bool:
        n ^= n >> 1
        return (n & (n + 1)) == 0
```


#### TypeScript


```ts
function hasAlternatingBits(n: number): boolean {
    n ^= n >> 1;
    return (n & (n + 1)) === 0;
}
```

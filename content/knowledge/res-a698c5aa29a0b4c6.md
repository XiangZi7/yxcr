## 解法




### 方法一：位运算



> **思考**
>
> 循环除以 $2$ 可判定，但位运算一步即可。2 的幂在二进制中恰有一个 $1$，因此 $n>0$ 且 $n\mathrel{\&}(n-1)=0$。



根据位运算的性质，执行 $\texttt{n\&(n-1)}$ 可以消去二进制形式的 $n$ 的最后一位 $1$。因此，如果 $n \gt 0$，并且满足 $\texttt{n\&(n-1)}$ 结果为 $0$，则说明 $n$ 是 $2$ 的幂。

时间复杂度 $O(1)$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0
```


#### TypeScript


```ts
function isPowerOfTwo(n: number): boolean {
    return n > 0 && (n & (n - 1)) === 0;
}
```


### 方法二：Lowbit



> **思考**
>
> 消去最低位 $1$ 与取 $\mathrm{lowbit}$ 等价。若 $n>0$ 且 $n=n\mathrel{\&}(-n)$，则 $n$ 只有这一位 $1$，同为 2 的幂。



根据 $\text{lowbit}$ 的定义，我们知道 $\text{lowbit}(x) = x \& (-x)$，可以得到 $n$ 的最后一位 $1$ 表示的十进制数。因此，如果 $n > 0$，并且满足 $\text{lowbit}(n)$ 等于 $n$，则说明 $n$ 是 $2$ 的幂。

时间复杂度 $O(1)$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and n == n & (-n)
```


#### TypeScript


```ts
function isPowerOfTwo(n: number): boolean {
    return n > 0 && n === (n & -n);
}
```

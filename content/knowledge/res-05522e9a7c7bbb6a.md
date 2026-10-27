## 解法




### 方法一：模拟



> **思考**
>
> $n \le 10^5$，逐位取模即可同时累乘与累加，最后相减。不必转成字符串。循环次数为位数。



我们用两个变量 $x$ 和 $y$ 分别记录各位数之积、各位数之和，初始时 $x=1,y=0$。

当 $n \gt 0$ 时，每次将 $n$ 对 $10$ 取模得到当前位的数字 $v$，并将 $n$ 除以 $10$ 后继续进行下一次循环。在每次循环中，我们更新 $x = x \times v$, $y = y + v$。

最终，我们返回 $x - y$ 即可。

时间复杂度 $O(\log n)$，其中 $n$ 是题目给定的整数。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def subtractProductAndSum(self, n: int) -> int:
        x, y = 1, 0
        while n:
            n, v = divmod(n, 10)
            x *= v
            y += v
        return x - y
```


#### TypeScript


```ts
function subtractProductAndSum(n: number): number {
    let [x, y] = [1, 0];
    for (; n > 0; n = Math.floor(n / 10)) {
        const v = n % 10;
        x *= v;
        y += v;
    }
    return x - y;
}
```

## 解法




### 方法一：数学推导



> **思考**
>
> 第 $x$ 行用 $x$ 枚硬币，完整行数满足 $x(x+1)/2\le n$。枚举 $x$ 是线性的， $n$ 可达 $2^{31}-1$。
>
> 解不等式得到 $x\le \sqrt{2}\,\sqrt{n+1/8}-1/2$，直接取整。把 $2n$ 拆成 $\sqrt{2}\sqrt{n+1/8}$，减轻中间溢出。
>
> 闭式一次求值，代价为常数次浮点运算。



`(1 + x) * x / 2 <= n`，求解 x。

`(x + 1/2)² <= 2n + 1/4`，即 `x <= sqrt(2n + 1/4) - 1/2`。

由于 2n 可能溢出，故转换为 `x <= sqrt(2) * sqrt(n + 1/8) - 1/2`。




#### Python3


```python
class Solution:
    def arrangeCoins(self, n: int) -> int:
        return int(math.sqrt(2) * math.sqrt(n + 0.125) - 0.5)
```


### 方法二：二分查找



> **思考**
>
> 方法一依赖浮点开方，极大 $n$ 时精度可能偏差。对行数二分：判断 $mid(mid+1)/2\le n$，上取整更新左界，只用整数运算。






#### Python3


```python
class Solution:
    def arrangeCoins(self, n: int) -> int:
        left, right = 1, n
        while left < right:
            mid = (left + right + 1) >> 1
            if (1 + mid) * mid // 2 <= n:
                left = mid
            else:
                right = mid - 1
        return left
```

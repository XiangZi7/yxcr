## 解法




### 方法一：动态规划



> **思考**
>
> 把 $n$ 拆成至少两个正整数使乘积最大。枚举有序拆分过多。最后一段为 $j$ 时，其余部分可不再拆或取已算最优。
>
> $f[i]=\max_j \max(f[i-j]\cdot j,\,(i-j)\cdot j)$。 $f[1]=1$，按 $i$ 递增填表，答案 $f[n]$。 $n\le 58$ 时 $O(n^2)$ 足够。



我们定义 $f[i]$ 表示正整数 $i$ 拆分后能获得的最大乘积，初始时 $f[1] = 1$。答案即为 $f[n]$。

考虑 $i$ 最后拆分出的数字 $j$，其中 $j \in [1, i)$。对于 $i$ 拆分出的数字 $j$，有两种情况：

1. 将 $i$ 拆分成 $i - j$ 和 $j$ 的和，不继续拆分，此时乘积为 $(i - j) \times j$；
2. 将 $i$ 拆分成 $i - j$ 和 $j$ 的和，继续拆分，此时乘积为 $f[i - j] \times j$。

因此，我们可以得到状态转移方程：

$$
f[i] = \max(f[i], f[i - j] \times j, (i - j) \times j) \quad (j \in [0, i))
$$

最后返回 $f[n]$ 即可。

时间复杂度 $O(n^2)$，空间复杂度 $O(n)$。其中 $n$ 为给定的正整数。




#### Python3


```python
class Solution:
    def integerBreak(self, n: int) -> int:
        f = [1] * (n + 1)
        for i in range(2, n + 1):
            for j in range(1, i):
                f[i] = max(f[i], f[i - j] * j, (i - j) * j)
        return f[n]
```


#### TypeScript


```ts
function integerBreak(n: number): number {
    const f = Array(n + 1).fill(1);
    for (let i = 3; i <= n; i++) {
        for (let j = 1; j < i; j++) {
            f[i] = Math.max(f[i], j * (i - j), j * f[i - j]);
        }
    }
    return f[n];
}
```


### 方法二：数学



> **思考**
>
> 方法一给出数值，未解释最优拆法。当 $n\ge 4$ 时应尽量拆出 $3$；余数为 $1$ 时改用 $2+2$（避免 $3+1$），余 $2$ 则多一个 $2$。 $n<4$ 只能拆成 $n-1$。闭式 $O(1)$。



当 $n \lt 4$ 时，由于题目要求至少拆分成两个整数，因此 $n - 1$ 是最大乘积。当 $n \ge 4$ 时，我们尽可能多地拆分 $3$，当剩下的最后一段为 $4$ 时，我们将其拆分为 $2 + 2$，这样乘积最大。

时间复杂度 $O(1)$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def integerBreak(self, n: int) -> int:
        if n < 4:
            return n - 1
        if n % 3 == 0:
            return pow(3, n // 3)
        if n % 3 == 1:
            return pow(3, n // 3 - 1) * 4
        return pow(3, n // 3) * 2
```


#### TypeScript


```ts
function integerBreak(n: number): number {
    if (n < 4) {
        return n - 1;
    }
    const m = Math.floor(n / 3);
    if (n % 3 == 0) {
        return 3 ** m;
    }
    if (n % 3 == 1) {
        return 3 ** (m - 1) * 4;
    }
    return 3 ** m * 2;
}
```

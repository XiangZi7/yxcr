## 解法




### 方法一：记忆化搜索



> **思考**
>
> 在长为 $arrLen$ 的数组上走 $steps$ 步回到原点。 $arrLen$ 可达 $10^6$，但 $steps \le 500$，能到达的位置不超过 $steps$。方案数由位置与剩余步数决定。
>
> $dfs(i,j)$ 为位置 $i$、剩余 $j$ 步回到原点的方案；可左、右或停。 $i>j$ 时不可能赶回，直接剪掉。记忆化状态 $O(steps^2)$。



我们观察题目的数据范围，可以发现 $steps$ 最大不超过 $500$，这意味着我们最远只能往右走 $500$ 步。

我们可以设计一个函数 $dfs(i, j)$，表示当前在位置 $i$，并且剩余步数为 $j$ 的方案数。那么答案就是 $dfs(0, steps)$。

函数 $dfs(i, j)$ 的执行过程如下：

1. 如果 $i \gt j$ 或者 $i \geq arrLen$ 或者 $i \lt 0$ 或者 $j \lt 0$，那么返回 $0$。
1. 如果 $i = 0$ 且 $j = 0$，那么此时指针已经停在原地，并且没有剩余步数，所以返回 $1$。
1. 否则，我们可以选择向左走一步，向右走一步，或者不动，所以返回 $dfs(i - 1, j - 1) + dfs(i + 1, j - 1) + dfs(i, j - 1)$。注意答案的取模操作。

过程中，我们可以使用记忆化搜索避免重复计算。

时间复杂度 $O(steps \times steps)$，空间复杂度 $O(steps \times steps)$。其中 $steps$ 是题目给定的步数。




#### Python3


```python
class Solution:
    def numWays(self, steps: int, arrLen: int) -> int:
        @cache
        def dfs(i, j):
            if i > j or i >= arrLen or i < 0 or j < 0:
                return 0
            if i == 0 and j == 0:
                return 1
            ans = 0
            for k in range(-1, 2):
                ans += dfs(i + k, j - 1)
                ans %= mod
            return ans

        mod = 10**9 + 7
        return dfs(0, steps)
```


#### TypeScript


```ts
function numWays(steps: number, arrLen: number): number {
    const f = Array.from({ length: steps }, () => Array(steps + 1).fill(-1));
    const mod = 10 ** 9 + 7;
    const dfs = (i: number, j: number) => {
        if (i > j || i >= arrLen || i < 0 || j < 0) {
            return 0;
        }
        if (i == 0 && j == 0) {
            return 1;
        }
        if (f[i][j] != -1) {
            return f[i][j];
        }
        let ans = 0;
        for (let k = -1; k <= 1; ++k) {
            ans = (ans + dfs(i + k, j - 1)) % mod;
        }
        return (f[i][j] = ans);
    };
    return dfs(0, steps);
}
```

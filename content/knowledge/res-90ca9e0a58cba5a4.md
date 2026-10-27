## 解法




### 方法一：记忆化搜索



> **思考**
>
> 从 1 个 `A` 出发，只靠复制与粘贴得到 $n$ 个。操作序列对应把当前长度倍增或累加，搜索树很宽。
>
> 若最后一次是把长度为 $n/j$ 的文本粘贴到共 $j$ 份，则 $dfs(n)=\min(dfs(n/j)+j)$。对因子记忆化， $n=1$ 为 $0$。



定义 $dfs(i)$ 为输出 $i$ 个字符的最少操作次数。初始化 `dfs(1)=0`。

当 $i\gt 1$ 时，有：

$$
dfs(i)=\min _{j \mid i} (dfs(\frac{i}{j})+j, i), 2\leq j\lt i
$$

时间复杂度 $O(n\sqrt{n})$。




#### Python3


```python
class Solution:
    def minSteps(self, n: int) -> int:
        @cache
        def dfs(n):
            if n == 1:
                return 0
            i, ans = 2, n
            while i * i <= n:
                if n % i == 0:
                    ans = min(ans, dfs(n // i) + i)
                i += 1
            return ans

        return dfs(n)
```


### 方法二：动态规划



> **思考**
>
> 记忆化是自顶向下。改成 $dp[i]$ 自底向上枚举因子，转移相同，避免递归。



记忆化搜索也可以改成动态规划。

$$
dp[i]=\min _{j \mid i} (dp[\frac{i}{j}]+j, i), 2\leq j\lt i
$$

时间复杂度 $O(n\sqrt{n})$。




#### Python3


```python
class Solution:
    def minSteps(self, n: int) -> int:
        dp = list(range(n + 1))
        dp[1] = 0
        for i in range(2, n + 1):
            j = 2
            while j * j <= i:
                if i % j == 0:
                    dp[i] = min(dp[i], dp[i // j] + j)
                j += 1
        return dp[-1]
```


#### TypeScript


```ts
function minSteps(n: number): number {
    const dp = Array(n + 1).fill(1000);
    dp[1] = 0;

    for (let i = 2; i <= n; i++) {
        for (let j = 1, half = i / 2; j <= half; j++) {
            if (i % j === 0) {
                dp[i] = Math.min(dp[i], dp[j] + i / j);
            }
        }
    }

    return dp[n];
}
```


### 方法三：数学



> **思考**
>
> 最优操作次数等于 $n$ 的质因子之和：每个因子 $i$ 对应一次复制再粘贴 $i-1$ 次。直接分解 $n$ 即可，不必 DP。



将 $n$ 质因数分解，每个因子 $i$ 对应一次复制后连续粘贴 $i-1$ 次，贡献 $i$ 次操作。

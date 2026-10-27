## 解法




### 方法一：记忆化搜索



> **思考**
>
> 每个犯罪可选或不可选，受人数与最低利润约束，方案数取模。犯罪与人数规模有限，状态可记「考虑到第 $i$ 项、已用 $j$ 人、已获利润（封顶到 $\textit{minProfit}$）」。
>
> 记忆化 $dfs(i,j,k)$：不选则前进，人数够则再加选中的一支。利润封顶是为了让达到门槛后的状态合并。边界在物品用尽时看 $k$ 是否已达门槛。



我们设计一个函数 $dfs(i, j, k)$，表示从第 $i$ 个工作开始，且当前已经选择了 $j$ 个员工，且当前产生的利润为 $k$，这种情况下的方案数。那么答案就是 $dfs(0, 0, 0)$。

函数 $dfs(i, j, k)$ 的执行过程如下：

- 如果 $i = n$，表示所有工作都已经考虑过了，如果 $k \geq minProfit$，则方案数为 $1$，否则方案数为 $0$；
- 如果 $i \lt n$，我们可以选择不选择第 $i$ 个工作，此时方案数为 $dfs(i + 1, j, k)$；如果 $j + group[i] \leq n$，我们也可以选择第 $i$ 个工作，此时方案数为 $dfs(i + 1, j + group[i], \min(k + profit[i], minProfit))$。这里我们将利润上限限制在 $minProfit$，是因为利润超过 $minProfit$ 对我们的答案没有任何影响。

最后返回 $dfs(0, 0, 0)$ 即可。

为了避免重复计算，我们可以使用记忆化搜索的方法，用一个三维数组 $f$ 记录所有的 $dfs(i, j, k)$ 的结果。当我们计算出 $dfs(i, j, k)$ 的值后，我们将其存入 $f[i][j][k]$ 中。调用 $dfs(i, j, k)$ 时，如果 $f[i][j][k]$ 已经被计算过，我们直接返回 $f[i][j][k]$ 即可。

时间复杂度 $O(m \times n \times minProfit)$，空间复杂度 $O(m \times n \times minProfit)$。其中 $m$ 和 $n$ 分别为工作的数量和员工的数量，而 $minProfit$ 为至少产生的利润。




#### Python3


```python
class Solution:
    def profitableSchemes(
        self, n: int, minProfit: int, group: List[int], profit: List[int]
    ) -> int:
        @cache
        def dfs(i: int, j: int, k: int) -> int:
            if i >= len(group):
                return 1 if k == minProfit else 0
            ans = dfs(i + 1, j, k)
            if j + group[i] <= n:
                ans += dfs(i + 1, j + group[i], min(k + profit[i], minProfit))
            return ans % (10**9 + 7)

        return dfs(0, 0, 0)
```


### 方法二：动态规划



> **思考**
>
> 同一三维状态可按物品下标递推，避免递归。 $f[i][j][k]$ 表示前 $i$ 项、人数 $j$、利润至少 $k$ 的方案数。
>
> 不选抄上一件，选则从 $f[i-1][j-x][\max(0,k-p)]$ 转移。空方案在利润 $0$ 处为 $1$。答案为 $f[m][n][\textit{minProfit}]$。



我们定义 $f[i][j][k]$ 表示前 $i$ 个工作中，选择了不超过 $j$ 个员工，且至少产生 $k$ 的利润的方案数。初始时 $f[0][j][0] = 1$，表示不选择任何工作，且至少产生 $0$ 的利润的方案数为 $1$。答案即为 $f[m][n][minProfit]$。

对于第 $i$ 个工作，我们可以选择参与或不参与。如果不参与，则 $f[i][j][k] = f[i - 1][j][k]$；如果参与，则 $f[i][j][k] = f[i - 1][j - group[i - 1]][max(0, k - profit[i - 1])]$。我们需要枚举 $j$ 和 $k$，并将所有的方案数相加。

最终的答案即为 $f[m][n][minProfit]$。

时间复杂度 $O(m \times n \times minProfit)$，空间复杂度 $O(m \times n \times minProfit)$。其中 $m$ 和 $n$ 分别为工作的数量和员工的数量，而 $minProfit$ 为至少产生的利润。




#### Python3


```python
class Solution:
    def profitableSchemes(
        self, n: int, minProfit: int, group: List[int], profit: List[int]
    ) -> int:
        mod = 10**9 + 7
        m = len(group)
        f = [[[0] * (minProfit + 1) for _ in range(n + 1)] for _ in range(m + 1)]
        for j in range(n + 1):
            f[0][j][0] = 1
        for i, (x, p) in enumerate(zip(group, profit), 1):
            for j in range(n + 1):
                for k in range(minProfit + 1):
                    f[i][j][k] = f[i - 1][j][k]
                    if j >= x:
                        f[i][j][k] = (f[i][j][k] + f[i - 1][j - x][max(0, k - p)]) % mod
        return f[m][n][minProfit]
```

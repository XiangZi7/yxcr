## 解法




### 方法一：排序 + 回溯



> **思考**
>
> 四边等长即总和能被 $4$ 整除，且没有一根超过边长。把火柴分配到四条边， $n\le 15$，朴素 $4^n$ 需剪枝。
>
> 从大到小放：当前棍尝试加入每条尚未超长的边，相同长度的边只试一次。边长或最大棍不合法则直接失败。
>
> 大棍先放更容易提前超限；相等边去重避免对称状态。



用 $edges[i]$ 记录正方形每条边当前的长度，对于第 $u$ 根火柴，尝试把它加到 $edges[i]$ 每条边，若加入后 $edges[i]$ 不超过正方形期望长度 $x$，则继续往下递归 $u+1$ 根火柴。若所有火柴都能被加入，说明满足拼成正方形的要求。

这里对 $matchsticks$ 从大到小排序，可以减少搜索次数。

时间复杂度 $O(4^n)$，其中 $n$ 表示 $matchsticks$ 的长度。每根火柴可以被放入正方形的 $4$ 条边，共有 $n$ 根火柴。




#### Python3


```python
class Solution:
    def makesquare(self, matchsticks: List[int]) -> bool:
        def dfs(u):
            if u == len(matchsticks):
                return True
            for i in range(4):
                if i > 0 and edges[i - 1] == edges[i]:
                    continue
                edges[i] += matchsticks[u]
                if edges[i] <= x and dfs(u + 1):
                    return True
                edges[i] -= matchsticks[u]
            return False

        x, mod = divmod(sum(matchsticks), 4)
        if mod or x < max(matchsticks):
            return False
        edges = [0] * 4
        matchsticks.sort(reverse=True)
        return dfs(0)
```


### 方法二：状态压缩 + 记忆化搜索



> **思考**
>
> 方法一按边回溯，对称状态仍多。改为子集：用位掩码表示已用棍，当前边已累加 $t$，能放则 $t\gets (t+v)\bmod s$。升序后一旦 $t+v>s$ 即可中断。
>
> 状态 $(mask,t)$ 可记忆化，把重复划分压到 $O(n\,2^n)$。



记当前火柴被划分的情况为 $state$。对于第 $i$ 个数，若 $state \ \& \ (1<<i)=0$，说明第 $i$ 个火柴棒未被划分。我们的目标是从全部数字中凑出 $k$ 个和为 $s$ 的子集。

记当前子集的和为 $t$。在未划分第 $i$ 个火柴棒时：

- 若 $t+matchsticks[i]>s$，说明第 $i$ 个火柴棒不能被添加到当前子集中，由于我们对 $matchsticks$ 数组进行升序排列，因此从 $matchsticks$ 从第 $i$ 个火柴棒开始的所有数字都不能被添加到当前子集，直接返回 $false$。
- 否则，将第 $i$ 个火柴棒添加到当前子集中，状态变为 $state \ |\ (1<<i)$，继续对未划分的数字进行搜索。

注：若 $t+matchsticks[i]==s$，说明恰好可以得到一个和为 $s$ 的子集，下一步将 $t$ 归零（可以通过 $(t+matchsticks[i]) \%s$ 实现），并继续划分下一个子集。




#### Python3


```python
class Solution:
    def makesquare(self, matchsticks: List[int]) -> bool:
        @cache
        def dfs(state, t):
            if state == (1 << len(matchsticks)) - 1:
                return True
            for i, v in enumerate(matchsticks):
                if state & (1 << i):
                    continue
                if t + v > s:
                    break
                if dfs(state | (1 << i), (t + v) % s):
                    return True
            return False

        s, mod = divmod(sum(matchsticks), 4)
        matchsticks.sort()
        if mod:
            return False
        return dfs(0, 0)
```

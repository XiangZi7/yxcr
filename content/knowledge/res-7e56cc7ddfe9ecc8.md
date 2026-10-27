## 解法




### 方法一：DFS



> **思考**
>
> 两壶容量 $x,y$，问能否得到总量 $z$。贝祖定理给出 $z$ 为 $\gcd$ 的倍数即可，也可用状态搜索验证。状态数为 $O(xy)$，容量不大时可行。
>
> $dfs(i,j)$ 表示两壶当前水量。已访问则失败；某一壶或总和为 $z$ 则成功。否则尝试加满、倒空、相互倾倒。从 $(0,0)$ 出发。



我们不妨记 $\textit{jug1Capacity}$ 为 $x$, $\textit{jug2Capacity}$ 为 $y$, $\textit{targetCapacity}$ 为 $z$。

接下来，我们设计一个函数 $dfs(i, j)$，表示当前 $jug1$ 中有 $i$ 升水， $jug2$ 中有 $j$ 升水，是否可以得到 $z$ 升水。

函数 $dfs(i, j)$ 的执行过程如下：

- 如果 $(i, j)$ 已经被访问过，返回 $false$。
- 如果 $i = z$ 或者 $j = z$ 或者 $i + j = z$，返回 $true$。
- 如果我们给 $jug1$ 倒满水，或者给 $jug2$ 倒满水，或者将 $jug1$ 清空，或者将 $jug2$ 清空，可以得到 $z$ 升水，返回 $true$。
- 如果我们将 $jug1$ 中的水倒入 $jug2$，或者将 $jug2$ 中的水倒入 $jug1$，可以得到 $z$ 升水，返回 $true$。

答案即为 $dfs(0, 0)$。

时间复杂度 $O(x + y)$，空间复杂度 $O(x + y)$。其中 $x$ 和 $y$ 分别为 $\textit{jug1Capacity}$ 和 $\textit{jug2Capacity}$。




#### Python3


```python
class Solution:
    def canMeasureWater(self, x: int, y: int, z: int) -> bool:
        def dfs(i: int, j: int) -> bool:
            if (i, j) in vis:
                return False
            vis.add((i, j))
            if i == z or j == z or i + j == z:
                return True
            if dfs(x, j) or dfs(i, y) or dfs(0, j) or dfs(i, 0):
                return True
            a = min(i, y - j)
            b = min(j, x - i)
            return dfs(i - a, j + a) or dfs(i + b, j - b)

        vis = set()
        return dfs(0, 0)
```

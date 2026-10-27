## 解法




### 方法一：有序集合 + 记忆化搜索



> **思考**
>
> 奇数跳去右侧不小于当前值的最小者，偶数跳去不大于当前值的最大者，问有多少起点能到终点。从每个位置模拟跳跃会重复经过同一状态。从右往左用有序集合记下已出现的值与下标，即可 $O(\log n)$ 求出下一步 $g[i][0/1]$。能否到达只取决于 $(i,\text{奇偶})$，记忆化搜索即可。



我们先利用有序集合，预处理出每个位置能跳到的位置，记录在数组 $g$ 中，其中 $g[i][1]$ 和 $g[i][0]$ 分别表示当前位置是奇数次跳还是偶数次跳时能跳到的位置。如果不能跳到任何位置，那么 $g[i][1]$ 和 $g[i][0]$ 都为 $-1$。

然后利用记忆化搜索，从每个位置出发，且当前是奇数次跳跃，判断是否能跳到数组末尾，如果能，那么结果加一。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 为数组长度。




#### Python3


```python
class Solution:
    def oddEvenJumps(self, arr: List[int]) -> int:
        @cache
        def dfs(i: int, k: int) -> bool:
            if i == n - 1:
                return True
            if g[i][k] == -1:
                return False
            return dfs(g[i][k], k ^ 1)

        n = len(arr)
        g = [[0] * 2 for _ in range(n)]
        sd = SortedDict()
        for i in range(n - 1, -1, -1):
            j = sd.bisect_left(arr[i])
            g[i][1] = sd.values()[j] if j < len(sd) else -1
            j = sd.bisect_right(arr[i]) - 1
            g[i][0] = sd.values()[j] if j >= 0 else -1
            sd[arr[i]] = i
        return sum(dfs(i, 1) for i in range(n))
```


### 方法二：有序集合 + 动态规划



> **思考**
>
> 奇数跳去右侧不小于当前值的最小者，偶数跳去不大于当前值的最大者，问有多少起点能到终点。$n$ 可以到 $2 \times 10^4$。全部元素相等时，每一步都落到紧邻的下一个下标，调用链长度就是 $n$，会超出默认递归上限。
>
> 从右往左扫描时，有序集合里只有更靠右的下标，所以下一步 $g[i][0/1]$ 要么是更大的下标，要么是 $-1$。
>
> 能否到达只取决于 $(i,\text{奇偶})$，并且只依赖更靠右的位置。令 $f[i][k]$ 表示从 $i$ 出发、下一次按奇偶 $k$ 跳能否到终点。$f[n-1]$ 的两格都为真，$i$ 从 $n-2$ 递减到 $0$，有后继就把 $f[i][k]$ 设成后继上相反奇偶的结果。起点统计 $f[i][1]$。



我们先利用有序集合，预处理出每个位置能跳到的位置，记录在数组 $g$ 中，其中 $g[i][1]$ 和 $g[i][0]$ 分别表示当前位置是奇数次跳还是偶数次跳时能跳到的位置。如果不能跳到任何位置，那么 $g[i][1]$ 和 $g[i][0]$ 都为 $-1$。因为集合里只保存更靠右的下标，所以 $g[i][k]$ 要么为 $-1$，要么严格大于 $i$。

令 $f[i][k]$ 表示从下标 $i$ 出发、下一次跳跃的奇偶为 $k$ 时能否到达数组末尾。$f[n-1][0]$ 与 $f[n-1][1]$ 都为真。$i$ 从 $n-2$ 递减到 $0$：若 $g[i][k] \neq -1$，则 $f[i][k] = f[g[i][k]][k \oplus 1]$，否则 $f[i][k]$ 为假。右侧状态在填写时已经确定。

统计 $f[i][1]$ 为真的下标个数，即为答案。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 为数组长度。




#### Python3


```python
class Solution:
    def oddEvenJumps(self, arr: List[int]) -> int:
        n = len(arr)
        g = [[-1] * 2 for _ in range(n)]
        sd = SortedDict()
        for i in range(n - 1, -1, -1):
            j = sd.bisect_left(arr[i])
            g[i][1] = sd.values()[j] if j < len(sd) else -1
            j = sd.bisect_right(arr[i]) - 1
            g[i][0] = sd.values()[j] if j >= 0 else -1
            sd[arr[i]] = i
        f = [[False] * 2 for _ in range(n)]
        f[-1][0] = f[-1][1] = True
        for i in range(n - 2, -1, -1):
            for k in range(2):
                j = g[i][k]
                if j != -1:
                    f[i][k] = f[j][k ^ 1]
        return sum(f[i][1] for i in range(n))
```

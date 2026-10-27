## 解法




### 方法一：记忆化搜索



> **思考**
>
> 两人轮流取两端，求先手得分是否不少于后手。枚举取法树会重复同一区间。
>
> $dfs(i,j)$ 表示当前玩家在 $[i,j]$ 上相对对手的最大分差：取左得 $nums[i]-dfs(i+1,j)$，取右对称。先手获胜当且仅当 $dfs(0,n-1)\ge 0$。
>
> 区间状态 $O(n^2)$，记忆化后每人总是面对已经最优的残局。



我们设计一个函数 $\textit{dfs}(i, j)$，表示从第 $i$ 个数到第 $j$ 个数，当前玩家与另一个玩家的得分之差的最大值。那么答案就是 $\textit{dfs}(0, n - 1) \geq 0$。

函数 $\textit{dfs}(i, j)$ 的计算方法如下：

- 如果 $i > j$，说明当前没有数字了，所以当前玩家没有分数可以拿，差值为 $0$，即 $\textit{dfs}(i, j) = 0$。
- 否则，当前玩家有两种选择，如果选择第 $i$ 个数，那么当前玩家与另一个玩家的得分之差为 $\textit{nums}[i] - \textit{dfs}(i + 1, j)$；如果选择第 $j$ 个数，那么当前玩家与另一个玩家的得分之差为 $\textit{nums}[j] - \textit{dfs}(i, j - 1)$。当前玩家会选择两种情况中差值较大的情况，也就是说 $\textit{dfs}(i, j) = \max(\textit{nums}[i] - \textit{dfs}(i + 1, j), \textit{nums}[j] - \textit{dfs}(i, j - 1))$。

最后，我们只需要判断 $\textit{dfs}(0, n - 1) \geq 0$ 即可。

为了避免重复计算，我们可以使用记忆化搜索的方法，用一个数组 $f$ 记录所有的 $\textit{dfs}(i, j)$ 的值，当函数再次被调用到时，我们可以直接从 $f$ 中取出答案而不需要重新计算。

时间复杂度 $O(n^2)$，空间复杂度 $O(n^2)$。其中 $n$ 是数组 $\textit{nums}$ 的长度。




#### Python3


```python
class Solution:
    def predictTheWinner(self, nums: List[int]) -> bool:
        @cache
        def dfs(i: int, j: int) -> int:
            if i > j:
                return 0
            return max(nums[i] - dfs(i + 1, j), nums[j] - dfs(i, j - 1))

        return dfs(0, len(nums) - 1) >= 0
```


#### TypeScript


```ts
function predictTheWinner(nums: number[]): boolean {
    const n = nums.length;
    const f: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    const dfs = (i: number, j: number): number => {
        if (i > j) {
            return 0;
        }
        if (f[i][j] === 0) {
            f[i][j] = Math.max(nums[i] - dfs(i + 1, j), nums[j] - dfs(i, j - 1));
        }
        return f[i][j];
    };
    return dfs(0, n - 1) >= 0;
}
```


### 方法二：动态规划



> **思考**
>
> 方法一的转移可改成表： $f[i][j]$ 同义，先填长度为 $1$ 的对角线，再按区间从小到大（ $i$ 降 $j$ 升）填。去掉递归栈，复杂度相同。



我们也可以使用动态规划的方法，定义 $f[i][j]$ 表示当前玩家在 $\textit{nums}[i..j]$ 这些数字中能够获得的最大得分的差值。那么最后答案就是 $f[0][n - 1] \geq 0$。

初始时 $f[i][i]=\textit{nums}[i]$，因为只有一个数，所以当前玩家只能拿取这个数，得分差值为 $\textit{nums}[i]$。

考虑 $f[i][j]$，其中 $i < j$，有两种情况：

- 如果当前玩家拿走了 $\textit{nums}[i]$，那么剩下的数字为 $\textit{nums}[i + 1..j]$，此时轮到另一个玩家进行游戏，所以 $f[i][j] = \textit{nums}[i] - f[i + 1][j]$。
- 如果当前玩家拿走了 $\textit{nums}[j]$，那么剩下的数字为 $\textit{nums}[i..j - 1]$，此时轮到另一个玩家进行游戏，所以 $f[i][j] = \textit{nums}[j] - f[i][j - 1]$。

因此，最终的状态转移方程为 $f[i][j] = \max(\textit{nums}[i] - f[i + 1][j], \textit{nums}[j] - f[i][j - 1])$。

最后，我们只需要判断 $f[0][n - 1] \geq 0$ 即可。

时间复杂度 $O(n^2)$，空间复杂度 $O(n^2)$。其中 $n$ 是数组 $\textit{nums}$ 的长度。

相似题目：

- [877. 石子游戏](https://github.com/doocs/leetcode/blob/main/solution/0800-0899/0877.Stone%20Game/README.md)




#### Python3


```python
class Solution:
    def predictTheWinner(self, nums: List[int]) -> bool:
        n = len(nums)
        f = [[0] * n for _ in range(n)]
        for i, x in enumerate(nums):
            f[i][i] = x
        for i in range(n - 2, -1, -1):
            for j in range(i + 1, n):
                f[i][j] = max(nums[i] - f[i + 1][j], nums[j] - f[i][j - 1])
        return f[0][n - 1] >= 0
```


#### TypeScript


```ts
function predictTheWinner(nums: number[]): boolean {
    const n = nums.length;
    const f: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; ++i) {
        f[i][i] = nums[i];
    }
    for (let i = n - 2; i >= 0; --i) {
        for (let j = i + 1; j < n; ++j) {
            f[i][j] = Math.max(nums[i] - f[i + 1][j], nums[j] - f[i][j - 1]);
        }
    }
    return f[0][n - 1] >= 0;
}
```

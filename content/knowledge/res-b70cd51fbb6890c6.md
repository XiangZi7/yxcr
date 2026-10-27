## 解法




### 方法一：记忆化搜索



> **思考**
>
> 两端取石子的零和博弈，求先手是否得分更高。堆数 $\le 500$，状态可用区间 $[i,j]$ 上「当前手相对对手的净收益」表示。
>
> $dfs(i,j)$ 取 $piles[i]-dfs(i+1,j)$ 与 $piles[j]-dfs(i,j-1)$ 的较大者。先手净收益为正即获胜。题目条件下先手必胜，但代码仍按区间 DP 写出。



我们设计一个函数 $dfs(i, j)$，表示从第 $i$ 堆石子到第 $j$ 堆石子，当前玩家与另一个玩家的石子数量之差的最大值。那么答案就是 $dfs(0, n - 1) \gt 0$。

函数 $dfs(i, j)$ 的计算方法如下：

- 如果 $i \gt j$，说明当前没有石子了，所以当前玩家没有石子可以拿，差值为 $0$，即 $dfs(i, j) = 0$。
- 否则，当前玩家有两种选择，如果选择第 $i$ 堆石子，那么当前玩家与另一个玩家的石子数量之差为 $piles[i] - dfs(i + 1, j)$；如果选择第 $j$ 堆石子，那么当前玩家与另一个玩家的石子数量之差为 $piles[j] - dfs(i, j - 1)$。当前玩家会选择两种情况中差值较大的情况，也就是说 $dfs(i, j) = \max(piles[i] - dfs(i + 1, j), piles[j] - dfs(i, j - 1))$。

最后，我们只需要判断 $dfs(0, n - 1) \gt 0$ 即可。

为了避免重复计算，我们可以使用记忆化搜索的方法，用一个数组 $f$ 记录所有的 $dfs(i, j)$ 的值，当函数再次被调用到时，我们可以直接从 $f$ 中取出答案而不需要重新计算。

时间复杂度 $O(n^2)$，空间复杂度 $O(n^2)$。其中 $n$ 是石子的堆数。




#### Python3


```python
class Solution:
    def stoneGame(self, piles: List[int]) -> bool:
        @cache
        def dfs(i: int, j: int) -> int:
            if i > j:
                return 0
            return max(piles[i] - dfs(i + 1, j), piles[j] - dfs(i, j - 1))

        return dfs(0, len(piles) - 1) > 0
```


#### TypeScript


```ts
function stoneGame(piles: number[]): boolean {
    const n = piles.length;
    const f: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));
    const dfs = (i: number, j: number): number => {
        if (i > j) {
            return 0;
        }
        if (f[i][j] === 0) {
            f[i][j] = Math.max(piles[i] - dfs(i + 1, j), piles[j] - dfs(i, j - 1));
        }
        return f[i][j];
    };
    return dfs(0, n - 1) > 0;
}
```


### 方法二：动态规划



> **思考**
>
> 记忆化搜索的区间转移可改成递推，去掉递归。 $f[i][j]$ 表示区间 $[i,j]$ 上当前手的净收益，由长度为 $1$ 的对角线向外填。
>
> 转移式与方法一相同。答案看 $f[0][n-1]$ 是否为正。



我们也可以使用动态规划的方法，定义 $f[i][j]$ 表示当前玩家在 $piles[i..j]$ 这部分石子中能够获得的最大石子数的差值。那么最后答案就是 $f[0][n - 1] \gt 0$。

初始时 $f[i][i]=piles[i]$，因为只有一堆石子，所以当前玩家只能拿取这堆石子，差值为 $piles[i]$。

考虑 $f[i][j]$，其中 $i \lt j$，有两种情况：

- 如果当前玩家拿走了石子堆 $piles[i]$，那么剩下的石子堆为 $piles[i + 1..j]$，此时轮到另一个玩家进行游戏，所以 $f[i][j] = piles[i] - f[i + 1][j]$。
- 如果当前玩家拿走了石子堆 $piles[j]$，那么剩下的石子堆为 $piles[i..j - 1]$，此时轮到另一个玩家进行游戏，所以 $f[i][j] = piles[j] - f[i][j - 1]$。

因此，最终的状态转移方程为 $f[i][j] = \max(piles[i] - f[i + 1][j], piles[j] - f[i][j - 1])$。

最后，我们只需要判断 $f[0][n - 1] \gt 0$ 即可。

时间复杂度 $O(n^2)$，空间复杂度 $O(n^2)$。其中 $n$ 是石子的堆数。

相似题目：

- [486. 预测赢家](https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0486.Predict%20the%20Winner/README.md)




#### Python3


```python
class Solution:
    def stoneGame(self, piles: List[int]) -> bool:
        n = len(piles)
        f = [[0] * n for _ in range(n)]
        for i, x in enumerate(piles):
            f[i][i] = x
        for i in range(n - 2, -1, -1):
            for j in range(i + 1, n):
                f[i][j] = max(piles[i] - f[i + 1][j], piles[j] - f[i][j - 1])
        return f[0][n - 1] > 0
```


#### TypeScript


```ts
function stoneGame(piles: number[]): boolean {
    const n = piles.length;
    const f: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < n; ++i) {
        f[i][i] = piles[i];
    }
    for (let i = n - 2; i >= 0; --i) {
        for (let j = i + 1; j < n; ++j) {
            f[i][j] = Math.max(piles[i] - f[i + 1][j], piles[j] - f[i][j - 1]);
        }
    }
    return f[0][n - 1] > 0;
}
```

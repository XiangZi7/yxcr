## 解法




### 方法一：状态压缩 + 记忆化搜索



> **思考**
>
> 两人轮流从 $1..n$ 里不放回取数，累计先达到目标者胜。 $n\le 20$，状态是已选集合，全集枚举博弈树会重复。
>
> 总和不足则无人能赢。否则 $dfs(\textit{mask},s)$：枚举未选的 $i$，若 $s+i$ 已达目标或对手在新状态下必败，则当前赢。对 $\textit{mask}$ 记忆化。
>
> 位掩码把集合压成整数，子问题至多 $2^{n}$ 个。先判总和，避免在必输局面上搜索。



我们首先判断可以选择的所有整数的和是否小于目标值，如果是，说明无论如何都无法赢，直接返回 `false`。

然后，我们设计一个函数 $\textit{dfs}(mask, s)$，其中 `mask` 表示当前已选择的整数的状态，`s` 表示当前的累计和。函数返回值为当前玩家是否能赢。

函数 $\textit{dfs}(mask, s)$ 的执行过程如下：

我们遍历 $1$ 到 $maxChoosableInteger$ 中的每个整数 $i$，如果 $i$ 还没有被选择，我们可以选择 $i$，如果选择 $i$ 后的累计和 $s + i$ 大于等于目标值 `desiredTotal`，或者对手选择 $i$ 后的结果是输的，那么当前玩家就是赢的，返回 `true`。

如果没有任何一个选择能让当前玩家赢，那么当前玩家就是输的，返回 `false`。

为了避免重复计算，我们使用一个哈希表 `f` 记录已经计算过的状态，键为 `mask`，值为当前玩家是否能赢。

时间复杂度 $O(2^n)$，空间复杂度 $O(2^n)$。其中 $n$ 是 `maxChoosableInteger`。




#### Python3


```python
class Solution:
    def canIWin(self, maxChoosableInteger: int, desiredTotal: int) -> bool:
        @cache
        def dfs(mask: int, s: int) -> bool:
            for i in range(1, maxChoosableInteger + 1):
                if mask >> i & 1 ^ 1:
                    if s + i >= desiredTotal or not dfs(mask | 1 << i, s + i):
                        return True
            return False

        if (1 + maxChoosableInteger) * maxChoosableInteger // 2 < desiredTotal:
            return False
        return dfs(0, 0)
```


#### TypeScript


```ts
function canIWin(maxChoosableInteger: number, desiredTotal: number): boolean {
    if (((1 + maxChoosableInteger) * maxChoosableInteger) / 2 < desiredTotal) {
        return false;
    }
    const f: Record<string, boolean> = {};
    const dfs = (mask: number, s: number): boolean => {
        if (f.hasOwnProperty(mask)) {
            return f[mask];
        }
        for (let i = 1; i <= maxChoosableInteger; ++i) {
            if (((mask >> i) & 1) ^ 1) {
                if (s + i >= desiredTotal || !dfs(mask ^ (1 << i), s + i)) {
                    return (f[mask] = true);
                }
            }
        }
        return (f[mask] = false);
    };
    return dfs(0, 0);
}
```

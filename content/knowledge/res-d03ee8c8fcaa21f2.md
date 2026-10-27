## 解法




### 方法一：前缀和 + 记忆化搜索



> **思考**
>
> 双方轮流从剩余前缀取 $1..2M$ 堆，状态为起点下标与当前 $M$。直接搜索重复子问题很多。前缀和给出「从 $i$ 到末尾的石子总和」，当前人得到的是该总和减去对手在新状态的最优。
>
> 若 $2M$ 已覆盖剩余堆，则一次取完；否则枚举取堆数并记忆化。爱丽丝从 $(0,1)$ 出发。



由于玩家每次可以拿走前 $X$ 堆的所有石子，也就是说能拿走一个区间的石子，因此，我们可以先预处理出一个长度为 $n+1$ 的前缀和数组 $s$，其中 $s[i]$ 表示数组 `piles` 的前 $i$ 个元素的和。

然后我们设计一个函数 $dfs(i, m)$，表示当前轮到的人可以从数组 `piles` 的下标 $i$ 开始拿，且当前的 $M$ 为 $m$ 时，当前轮到的人能够拿到的最大石子数。初始时爱丽丝从下标 $0$ 开始，且 $M=1$，所以我们需要求的答案为 $dfs(0, 1)$。

函数 $dfs(i, m)$ 的计算过程如下：

- 如果当前轮到的人可以拿走剩下的所有石子，能够拿到的最大石子数为 $s[n] - s[i]$；
- 否则，当前轮到的人可以拿走剩下的前 $x$ 堆的所有石子，其中 $1 \leq x \leq 2m$，能够拿到的最大石子数为 $s[n] - s[i] - dfs(i + x, max(m, x))$。也即是说，当前轮的人能够拿到的石子数为当前剩下的所有石子数减去下一轮对手能够拿到的石子数。我们需要枚举所有的 $x$，取其中的最大值作为函数 $dfs(i, m)$ 的返回值。

为了避免重复计算，我们可以使用记忆化搜索。

最后，我们返回将 $dfs(0, 1)$ 作为答案返回即可。

时间复杂度为 $O(n^3)$，空间复杂度为 $O(n^2)$。其中 $n$ 为数组 `piles` 的长度。




#### Python3


```python
class Solution:
    def stoneGameII(self, piles: List[int]) -> int:
        @cache
        def dfs(i, m):
            if m * 2 >= n - i:
                return s[n] - s[i]
            return max(
                s[n] - s[i] - dfs(i + x, max(m, x)) for x in range(1, m << 1 | 1)
            )

        n = len(piles)
        s = list(accumulate(piles, initial=0))
        return dfs(0, 1)
```


#### TypeScript


```ts
function stoneGameII(piles: number[]): number {
    const n = piles.length;
    const f = Array.from({ length: n }, _ => new Array(n + 1).fill(0));
    const s = new Array(n + 1).fill(0);
    for (let i = 0; i < n; ++i) {
        s[i + 1] = s[i] + piles[i];
    }
    const dfs = (i: number, m: number) => {
        if (m * 2 >= n - i) {
            return s[n] - s[i];
        }
        if (f[i][m]) {
            return f[i][m];
        }
        let res = 0;
        for (let x = 1; x <= m * 2; ++x) {
            res = Math.max(res, s[n] - s[i] - dfs(i + x, Math.max(m, x)));
        }
        return (f[i][m] = res);
    };
    return dfs(0, 1);
}
```








### 方法二



> **思考**
>
> 方法一在能取完时直接返回后缀和。方法二统一枚举取堆数，用「后缀和减去对手最小值」表达同一最优，边界改为下标越界返回 $0$。状态含义不变，写法更整齐。






#### Python3


```python
class Solution:
    def stoneGameII(self, piles: List[int]) -> int:
        @cache
        def dfs(i: int, m: int = 1) -> int:
            if i >= len(piles):
                return 0
            t = inf
            for x in range(1, m << 1 | 1):
                t = min(t, dfs(i + x, max(m, x)))
            return s[-1] - s[i] - t

        s = list(accumulate(piles, initial=0))
        return dfs(0)
```

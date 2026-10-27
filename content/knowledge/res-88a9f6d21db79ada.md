## 解法




### 方法一：动态规划



> **思考**
>
> 枚举公差再对每个公差求最长子序列， $n\le 1000$ 且值域在 $[0,500]$，公差种类约 $10^3$，双重枚举下标即可在时限内完成。子序列不必连续，状态应落在「以某下标结尾、某公差」。
>
> 定义 $f[i][j]$ 为以 $i$ 结尾、公差为 $j$ 的最长长度。因公差可负，将 $j$ 平移 $500$ 后落在 $[0,1000]$。转移枚举 $k<i$，用 $f[k][j]+1$ 更新。
>
> 每个下标对更新一次，答案取所有 $f[i][j]$ 的最大者。



我们定义 $f[i][j]$ 表示以 $nums[i]$ 结尾且公差为 $j$ 的等差数列的最大长度。初始时 $f[i][j]=1$，即每个元素自身都是一个长度为 $1$ 的等差数列。

> 由于公差可能为负数，且最大差值为 $500$，因此，我们可以将统一将公差加上 $500$，这样公差的范围就变成了 $[0, 1000]$。

考虑 $f[i]$，我们可以枚举 $nums[i]$ 的前一个元素 $nums[k]$，那么公差 $j=nums[i]-nums[k]+500$，此时有 $f[i][j]=\max(f[i][j], f[k][j]+1)$，然后我们更新答案 $ans=\max(ans, f[i][j])$。

最后返回答案即可。

> 如果初始时 $f[i][j]=0$，那么我们需要在最后返回答案时加上 $1$。

时间复杂度 $O(n \times (d + n))$，空间复杂度 $O(n \times d)$。其中 $n$ 和 $d$ 分别是数组 $nums$ 的长度以及数组 $nums$ 中元素的最大值与最小值的差值。




#### Python3


```python
class Solution:
    def longestArithSeqLength(self, nums: List[int]) -> int:
        n = len(nums)
        f = [[1] * 1001 for _ in range(n)]
        ans = 0
        for i in range(1, n):
            for k in range(i):
                j = nums[i] - nums[k] + 500
                f[i][j] = max(f[i][j], f[k][j] + 1)
                ans = max(ans, f[i][j])
        return ans
```


#### TypeScript


```ts
function longestArithSeqLength(nums: number[]): number {
    const n = nums.length;
    let ans = 0;
    const f: number[][] = Array.from({ length: n }, () => new Array(1001).fill(0));
    for (let i = 1; i < n; ++i) {
        for (let k = 0; k < i; ++k) {
            const j = nums[i] - nums[k] + 500;
            f[i][j] = Math.max(f[i][j], f[k][j] + 1);
            ans = Math.max(ans, f[i][j]);
        }
    }
    return ans + 1;
}
```

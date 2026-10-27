## 解法




### 方法一：动态规划



> **思考**
>
> 环形排列中取 $n$ 块，不能取相邻，总和最大。证明可把问题化成「环上取 $n$ 个不相邻」。环的首尾互斥，故拆成去掉首、去掉尾的两段线性问题。线性部分用 $f[i][j]$：前 $i$ 个里选 $j$ 个不相邻的最大和，不选则 $f[i-1][j]$，选则 $f[i-2][j-1]+nums[i-1]$。两段取较大。



我们可以将这个问题转化为：在一个长度为 $3n$ 的环形数组中，选择其中 $n$ 个不相邻的数，使得这 $n$ 个数的和最大。

证明如下：

- 当 $n = 1$ 时，我们可以选择数组中的任意一个数。
- 当 $n \gt 1$ 时，那么一定存在一个数，使得它的某一侧有两个连续的数没有被选择，而另一侧至少有一个数没有被选择。因此，我们可以将这个数和它两侧的数一起从数组中删除，然后剩下的 $3(n - 1)$ 个数构成一个新的环形数组。问题规模缩小成了在长度为 $3(n - 1)$ 的环形数组中选择 $n - 1$ 个不相邻的数，使得这 $n - 1$ 个数的和最大。

因此，我们需要求解的问题可以转化为：在一个长度为 $3n$ 的环形数组中，选择其中 $n$ 个不相邻的数，使得这 $n$ 个数的和最大。

环形数组中，如果选择了第一个数，那么最后一个数就不能选择，如果选择了最后一个数，那么第一个数就不能选择，因此我们可以将环形数组拆成两个数组，一个是去掉第一个数的，一个是去掉最后一个数的，然后分别求解这两个数组的最大值，最后取两个最大值中的较大值即可。

我们用一个函数 $g(nums)$，表示在数组 $nums$ 中选择 $n$ 个不相邻的数，使得这 $n$ 个数的和最大，那么我们的目标就是求 $g(slices)$ 和 $g(slices[1:])$ 中的较大值。

函数 $g(nums)$ 的求解方法如下：

我们记数组 $nums$ 的长度为 $m$，定义 $f[i][j]$ 表示在数组 $nums$ 的前 $i$ 个数中选择 $j$ 个不相邻的数的最大和。

考虑 $f[i][j]$，如果我们不选择第 $i$ 个数，那么 $f[i][j] = f[i - 1][j]$，如果我们选择第 $i$ 个数，那么 $f[i][j] = f[i - 2][j - 1] + nums[i - 1]$，因此我们可以得到状态转移方程：

$$
f[i][j] = \max(f[i - 1][j], f[i - 2][j - 1] + nums[i - 1])
$$

最后返回 $f[m][n]$ 即可。

时间复杂度 $O(n^2)$，空间复杂度 $O(n^2)$。其中 $n$ 是数组 $slices$ 的长度。




#### Python3


```python
class Solution:
    def maxSizeSlices(self, slices: List[int]) -> int:
        def g(nums: List[int]) -> int:
            m = len(nums)
            f = [[0] * (n + 1) for _ in range(m + 1)]
            for i in range(1, m + 1):
                for j in range(1, n + 1):
                    f[i][j] = max(
                        f[i - 1][j], (f[i - 2][j - 1] if i >= 2 else 0) + nums[i - 1]
                    )
            return f[m][n]

        n = len(slices) // 3
        a, b = g(slices[:-1]), g(slices[1:])
        return max(a, b)
```


#### TypeScript


```ts
function maxSizeSlices(slices: number[]): number {
    const n = Math.floor(slices.length / 3);
    const g = (nums: number[]): number => {
        const m = nums.length;
        const f: number[][] = Array(m + 1)
            .fill(0)
            .map(() => Array(n + 1).fill(0));
        for (let i = 1; i <= m; ++i) {
            for (let j = 1; j <= n; ++j) {
                f[i][j] = Math.max(f[i - 1][j], (i > 1 ? f[i - 2][j - 1] : 0) + nums[i - 1]);
            }
        }
        return f[m][n];
    };
    const a = g(slices.slice(0, -1));
    const b = g(slices.slice(1));
    return Math.max(a, b);
}
```

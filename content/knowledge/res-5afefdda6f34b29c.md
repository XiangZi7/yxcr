## 解法




### 方法一：动态规划



> **思考**
>
> 连续子数组的个数为 $O(n^2)$。若枚举左右端点再求和，时间复杂度为 $O(n^2)$ 乃至 $O(n^3)$。 $n \le 10^5$，无法通过。
>
> 子数组彼此重叠，每次重新求和会重复计算。固定右端点 $i$ 时，以 $i$ 结尾的最优段只有两种选择：若「以 $i-1$ 结尾的最大和」为正，则接在其后；否则从 $i$ 单独开始。
>
> 因此以右端点为状态即可线性递推，且每一项只依赖前一项，用一个变量滚动维护，再取全程最大值即可。



我们定义 $f[i]$ 表示以元素 $\textit{nums}[i]$ 为结尾的连续子数组的最大和，初始时 $f[0] = \textit{nums}[0]$，那么最终我们要求的答案即为 $\max_{0 \leq i < n} f[i]$。

考虑 $f[i]$，其中 $i \geq 1$，它的状态转移方程为：

$$
f[i] = \max(f[i - 1] + \textit{nums}[i], \textit{nums}[i])
$$

也即：

$$
f[i] = \max(f[i - 1], 0) + \textit{nums}[i]
$$

由于 $f[i]$ 只与 $f[i - 1]$ 有关系，因此我们可以只用一个变量 $f$ 来维护对于当前 $f[i]$ 的值是多少，然后进行状态转移即可。答案为 $\max_{0 \leq i < n} f$。

时间复杂度 $O(n)$，其中 $n$ 为数组 $\textit{nums}$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        ans = f = nums[0]
        for x in nums[1:]:
            f = max(f, 0) + x
            ans = max(ans, f)
        return ans
```


#### TypeScript


```ts
function maxSubArray(nums: number[]): number {
    let [ans, f] = [nums[0], nums[0]];
    for (let i = 1; i < nums.length; ++i) {
        f = Math.max(f, 0) + nums[i];
        ans = Math.max(ans, f);
    }
    return ans;
}
```


### 方法二：分治



> **思考**
>
> 方法一已是线性时间与常数空间，对本题足够；但题目进阶要求分治，而以右端点递推的动态规划切不成互不重叠的子问题。
>
> 为此需要另一条结构：子数组相对中点只有「全在左侧、全在右侧、跨越中点」三种位置关系，跨越部分可由左右两侧的最大后缀和与最大前缀和相加得到。时间变为 $O(n \log n)$，用以回应进阶，而非追求更快。



将数组从中间切开。答案是以下三者的最大值：左半段的最大子数组和、右半段的最大子数组和、以及跨越中点的最大子数组和。跨越中点时，分别向左、向右累加求最大前缀/后缀和再相加。

时间复杂度 $O(n \log n)$，空间复杂度 $O(\log n)$。其中 $n$ 是数组长度。




#### Python3


```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        def crossMaxSub(nums, left, mid, right):
            lsum = rsum = 0
            lmx = rmx = -inf
            for i in range(mid, left - 1, -1):
                lsum += nums[i]
                lmx = max(lmx, lsum)
            for i in range(mid + 1, right + 1):
                rsum += nums[i]
                rmx = max(rmx, rsum)
            return lmx + rmx

        def maxSub(nums, left, right):
            if left == right:
                return nums[left]
            mid = (left + right) >> 1
            lsum = maxSub(nums, left, mid)
            rsum = maxSub(nums, mid + 1, right)
            csum = crossMaxSub(nums, left, mid, right)
            return max(lsum, rsum, csum)

        left, right = 0, len(nums) - 1
        return maxSub(nums, left, right)
```

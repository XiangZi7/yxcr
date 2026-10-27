## 解法




### 方法一：桶排序



> **思考**
>
> 求排序后相邻元素的最大差，要求线性时间。比较排序是 $O(n\log n)$， $n\le 10^5$。相邻差的最大值至少是 $(\textit{max}-\textit{min})/(n-1)$，以该值为桶宽做桶排序：同一桶内的差小于这个下界，答案只可能出现在相邻非空桶的「后桶最小减前桶最大」。每个桶只记最小与最大。



假设数组 $nums$ 有 $n$ 个元素，所有元素从小到大依次是 $nums_0$ 到 $nums_{n - 1}$，最大间距是 $maxGap$。考虑数组中的最大元素和最小元素之差。

$$
nums_{n - 1} - nums_0 = \sum_{i = 1}^{n - 1} (nums_i - nums_{i - 1}) \le{maxGap} \times (n - 1)
$$

因此 $maxGap \ge \dfrac{nums_{n - 1} - nums_0}{n - 1}$，即最大间距至少为 $\dfrac{nums_{n - 1} - nums_0}{n - 1}$。

可以利用桶排序的思想，设定桶的大小（即每个桶最多包含的不同元素个数）为 $\dfrac{nums_{n - 1} - nums_0}{n - 1}$，将元素按照元素值均匀分布到各个桶内，则同一个桶内的任意两个元素之差小于 ${maxGap}$，差为 ${maxGap}$ 的两个元素一定在两个不同的桶内。对于每个桶，维护桶内的最小值和最大值，初始时每个桶内的最小值和最大值分别是正无穷和负无穷，表示桶内没有元素。

遍历数组 ${nums}$ 中的所有元素。对于每个元素，根据该元素与最小元素之差以及桶的大小计算该元素应该分到的桶的编号，可以确保编号小的桶内的元素都小于编号大的桶内的元素，使用元素值更新元素所在的桶内的最小值和最大值。

遍历数组结束之后，每个非空的桶内的最小值和最大值都可以确定。按照桶的编号从小到大的顺序依次遍历每个桶，当前的桶的最小值和上一个非空的桶的最大值是排序后的相邻元素，计算两个相邻元素之差，并更新最大间距。遍历桶结束之后即可得到最大间距。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是数组 $nums$ 的长度。




#### Python3


```python
class Solution:
    def maximumGap(self, nums: List[int]) -> int:
        n = len(nums)
        if n < 2:
            return 0
        mi, mx = min(nums), max(nums)
        bucket_size = max(1, (mx - mi) // (n - 1))
        bucket_count = (mx - mi) // bucket_size + 1
        buckets = [[inf, -inf] for _ in range(bucket_count)]
        for v in nums:
            i = (v - mi) // bucket_size
            buckets[i][0] = min(buckets[i][0], v)
            buckets[i][1] = max(buckets[i][1], v)
        ans = 0
        prev = inf
        for curmin, curmax in buckets:
            if curmin > curmax:
                continue
            ans = max(ans, curmin - prev)
            prev = curmax
        return ans
```

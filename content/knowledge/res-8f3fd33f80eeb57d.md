## 解法




### 方法一：排序



> **思考**
>
> 竖直区域的宽度只取决于相邻点的横坐标之差， $n$ 达 $10^5$，按 $x$ 排序后扫一遍相邻差即可。
>
> 纵坐标不影响宽度，排序后取 $\max(x_{i+1}-x_i)$。



我们可以对数组 $points$ 按照 $x$ 升序排列，获取相邻点之间 $x$ 的差值的最大值。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(\log n)$。其中 $n$ 为数组 $points$ 的长度。




#### Python3


```python
class Solution:
    def maxWidthOfVerticalArea(self, points: List[List[int]]) -> int:
        points.sort()
        return max(b[0] - a[0] for a, b in pairwise(points))
```


#### TypeScript


```ts
function maxWidthOfVerticalArea(points: number[][]): number {
    points.sort((a, b) => a[0] - b[0]);
    let ans = 0;
    for (let i = 1; i < points.length; ++i) {
        ans = Math.max(ans, points[i][0] - points[i - 1][0]);
    }
    return ans;
}
```


### 方法二：桶排序



> **思考**
>
> 方法一排序是 $O(n\log n)$。最大间隙至少为 $(\textit{max}-\textit{min})/(n-1)$，用该值作桶宽时，答案只可能出现在相邻非空桶的「后桶最小减前桶最大」。
>
> 桶内维护最小、最大横坐标，线性扫桶即可，期望 $O(n)$。



方法一中排序的时间复杂度为 $O(n \times \log n)$，其实我们可以利用桶排序的思想，将时间复杂度降低到 $O(n)$。

我们将数组 $points$ 的横坐标放入数组 $nums$ 中。

假设数组 $nums$ 有 $n$ 个元素，所有元素从小到大依次是 $nums_0$ 到 $nums_{n - 1}$，最大间距是 $maxGap$。考虑数组中的最大元素和最小元素之差：

$$
nums_{n - 1} - nums_0 = \sum_{i = 1}^{n - 1} (nums_i - nums_{i - 1}) \le{maxGap} \times (n - 1)
$$

因此 $maxGap \ge \dfrac{nums_{n - 1} - nums_0}{n - 1}$，即最大间距至少为 $\dfrac{nums_{n - 1} - nums_0}{n - 1}$。

可以利用桶排序的思想，设定桶的大小（即每个桶最多包含的不同元素个数）为 $\dfrac{nums_{n - 1} - nums_0}{n - 1}$，将元素按照元素值均匀分布到各个桶内，则同一个桶内的任意两个元素之差小于 ${maxGap}$，差为 ${maxGap}$ 的两个元素一定在两个不同的桶内。对于每个桶，维护桶内的最小值和最大值，初始时每个桶内的最小值和最大值分别是正无穷和负无穷，表示桶内没有元素。

遍历数组 ${nums}$ 中的所有元素。对于每个元素，根据该元素与最小元素之差以及桶的大小计算该元素应该分到的桶的编号，可以确保编号小的桶内的元素都小于编号大的桶内的元素，使用元素值更新元素所在的桶内的最小值和最大值。

遍历数组结束之后，每个非空的桶内的最小值和最大值都可以确定。按照桶的编号从小到大的顺序依次遍历每个桶，当前的桶的最小值和上一个非空的桶的最大值是排序后的相邻元素，计算两个相邻元素之差，并更新最大间距。遍历桶结束之后即可得到最大间距。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为数组 $points$ 的长度。




#### Python3


```python
class Solution:
    def maxWidthOfVerticalArea(self, points: List[List[int]]) -> int:
        nums = [x for x, _ in points]
        n = len(nums)
        mi, mx = min(nums), max(nums)
        bucket_size = max(1, (mx - mi) // (n - 1))
        bucket_count = (mx - mi) // bucket_size + 1
        buckets = [[inf, -inf] for _ in range(bucket_count)]
        for x in nums:
            i = (x - mi) // bucket_size
            buckets[i][0] = min(buckets[i][0], x)
            buckets[i][1] = max(buckets[i][1], x)
        ans = 0
        prev = inf
        for curmin, curmax in buckets:
            if curmin > curmax:
                continue
            ans = max(ans, curmin - prev)
            prev = curmax
        return ans
```


#### TypeScript


```ts
function maxWidthOfVerticalArea(points: number[][]): number {
    const nums: number[] = points.map(point => point[0]);
    const inf = 1 << 30;
    const n = nums.length;
    let mi = inf;
    let mx = -inf;
    for (const x of nums) {
        mi = Math.min(mi, x);
        mx = Math.max(mx, x);
    }
    const bucketSize = Math.max(1, Math.floor((mx - mi) / (n - 1)));
    const bucketCount = Math.floor((mx - mi) / bucketSize) + 1;
    const buckets = new Array(bucketCount).fill(0).map(() => [inf, -inf]);
    for (const x of nums) {
        const i = Math.floor((x - mi) / bucketSize);
        buckets[i][0] = Math.min(buckets[i][0], x);
        buckets[i][1] = Math.max(buckets[i][1], x);
    }
    let prev = inf;
    let ans = 0;
    for (const [left, right] of buckets) {
        if (left > right) {
            continue;
        }
        ans = Math.max(ans, left - prev);
        prev = right;
    }
    return ans;
}
```

## 解法




### 方法一：双指针



> **思考**
>
> 恰含 $k$ 种整数的子数组个数。 $n\le 2\times 10^4$，不能枚举。种类数随窗口单调，于是“至多 $k$ 种”可用滑动窗口。恰为 $k$ 种等于“至多 $k$ 种的最左端”减去“至多 $k-1$ 种的最左端”，对每个右端点求和。



我们遍历数组 $nums$，对于每个 $i$，我们需要找到最小的 $j_1$，使得 $nums[j_1], nums[j_1 + 1], \dots, nums[i]$ 中不同的整数个数小于等于 $k$，以及最小的 $j_2$，使得 $nums[j_2], nums[j_2 + 1], \dots, nums[i]$ 中不同的整数个数小于等于 $k-1$。那么 $j_2 - j_1$ 就是以 $i$ 结尾的满足条件的子数组的个数。

在实现上，我们定义一个函数 $f(k)$，表示 $nums$ 中每个位置 $i$ 对应的最小的 $j$，使得 $nums[j], nums[j + 1], \dots, nums[i]$ 中不同的整数个数小于等于 $k$。该函数可以通过双指针实现，具体实现见代码。

然后我们调用 $f(k)$ 和 $f(k-1)$，计算出每个位置对应的 $j_1$ 和 $j_2$，然后计算出以每个位置 $i$ 结尾的满足条件的子数组的个数，最后求和即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为数组 $nums$ 的长度。




#### Python3


```python
class Solution:
    def subarraysWithKDistinct(self, nums: List[int], k: int) -> int:
        def f(k):
            pos = [0] * len(nums)
            cnt = Counter()
            j = 0
            for i, x in enumerate(nums):
                cnt[x] += 1
                while len(cnt) > k:
                    cnt[nums[j]] -= 1
                    if cnt[nums[j]] == 0:
                        cnt.pop(nums[j])
                    j += 1
                pos[i] = j
            return pos

        return sum(a - b for a, b in zip(f(k - 1), f(k)))
```

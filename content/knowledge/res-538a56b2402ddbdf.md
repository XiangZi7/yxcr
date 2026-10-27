## 解法




### 方法一：前缀和 + 枚举



> **思考**
>
> 枚举两段的左右端点需要 $O(n^2)$，长度 $n\le 1000$ 偏紧。固定其中一段后，另一段的最优位置只取决于它左侧（或右侧）定长窗口的最大和。
>
> 前缀和使任意定长窗口的和可在 $O(1)$ 取出。分「长为 $\textit{firstLen}$ 的段在左」与「长为 $\textit{secondLen}$ 的段在左」两种情形，扫右段左端点时用变量 $t$ 维护左侧窗口的历史最大和。
>
> 两种情形各扫一遍，取较大者。



我们先预处理得到数组 `nums` 的前缀和数组 $s$，其中 $s[i]$ 表示 $nums$ 中前 $i$ 个元素的和。

接下来，我们分两种情况枚举：

假设 $firstLen$ 个元素的子数组在 $secondLen$ 个元素的子数组的左边，那么我们可以枚举 $secondLen$ 个元素的子数组的左端点 $i$，用变量 $t$ 维护左边 $firstLen$ 个元素的子数组的最大和，那么答案就是 $t + s[i + secondLen] - s[i]$。枚举完所有的 $i$，就可以得到候选答案。

假设 $secondLen$ 个元素的子数组在 $firstLen$ 个元素的子数组的左边，那么我们可以枚举 $firstLen$ 个元素的子数组的左端点 $i$，用变量 $t$ 维护左边 $secondLen$ 个元素的子数组的最大和，那么答案就是 $t + s[i + firstLen] - s[i]$。枚举完所有的 $i$，就可以得到候选答案。

最后，我们取两种情况下的候选答案的最大值即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为数组 `nums` 的长度。




#### Python3


```python
class Solution:
    def maxSumTwoNoOverlap(self, nums: List[int], firstLen: int, secondLen: int) -> int:
        n = len(nums)
        s = list(accumulate(nums, initial=0))
        ans = t = 0
        i = firstLen
        while i + secondLen - 1 < n:
            t = max(t, s[i] - s[i - firstLen])
            ans = max(ans, t + s[i + secondLen] - s[i])
            i += 1
        t = 0
        i = secondLen
        while i + firstLen - 1 < n:
            t = max(t, s[i] - s[i - secondLen])
            ans = max(ans, t + s[i + firstLen] - s[i])
            i += 1
        return ans
```

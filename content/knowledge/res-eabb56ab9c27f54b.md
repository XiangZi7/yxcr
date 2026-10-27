## 解法




### 方法一：排序 + 前缀和 + 二分查找 + 枚举



> **思考**
>
> 若对每个候选 $\textit{value}$ 都扫描一遍数组求转变后的和，则复杂度为 $O(n \times M)$。其中 $n \le 10^4$、 $M \le 10^5$，难以稳定通过。
>
> 转变后的和只取决于「不超过 $\textit{value}$ 的部分原样保留、超过的部分一律改成 $\textit{value}$」。将数组排序后，分界点是一段前缀，可用二分定位，前缀和一次算出保留部分。因此按 $0$ 到 $\max(\textit{arr})$ 枚举 $\textit{value}$，每次 $O(\log n)$ 求转变和并维护与 $\textit{target}$ 的最小绝对差；差值相同时取更小的 $\textit{value}$。



我们注意到，题目中要把所有大于 `value` 的值变成 `value`，并且求和，因此我们可以考虑先对数组 `arr` 进行排序，然后求出前缀和数组 $s$，其中 $s[i]$ 表示数组前 $i$ 个元素之和。

接下来，我们可以从小到大枚举所有 `value` 值，对于每个 `value`，我们可以通过二分查找找到数组中第一个大于 `value` 的元素的下标 $i$，此时数组中大于 `value` 的元素个数为 $n - i$，因此数组中小于等于 `value` 的元素个数为 $i$，此时数组中小于等于 `value` 的元素之和为 $s[i]$，数组中大于 `value` 的元素之和为 $(n - i) \times \textit{value}$，因此数组中所有元素之和为 $s[i] + (n - i) \times \textit{value}$。如果 $s[i] + (n - i) \times \textit{value}$ 与 `target` 的差的绝对值小于当前的最小差值 `diff`，则更新 `diff` 和 `ans`。

枚举完所有 `value` 后，即可得到最终答案 `ans`。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 为数组 `arr` 的长度。




#### Python3


```python
class Solution:
    def findBestValue(self, arr: List[int], target: int) -> int:
        arr.sort()
        s = list(accumulate(arr, initial=0))
        ans, diff = 0, inf
        for value in range(max(arr) + 1):
            i = bisect_right(arr, value)
            d = abs(s[i] + (len(arr) - i) * value - target)
            if diff > d:
                diff = d
                ans = value
        return ans
```

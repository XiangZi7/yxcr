## 解法




### 方法一：二分查找



> **思考**
>
> 数组已升序，上一题的排序可以省去。 $citations[n-h]\ge h$ 当且仅当 $h$ 可行，对 $h$ 二分即可在对数时间内得到最大 $h$。



我们注意到，如果有至少 $x$ 篇论文的引用次数大于等于 $x$，那么对于任意 $y \lt x$，其引用次数也一定大于等于 $y$。这存在着单调性。

因此，我们二分枚举 $h$，获取满足条件的最大 $h$。由于要满足 $h$ 篇论文至少被引用 $h$ 次，因此 $citations[n - mid] \ge mid$。

时间复杂度 $O(\log n)$，其中 $n$ 是数组 $citations$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def hIndex(self, citations: List[int]) -> int:
        n = len(citations)
        left, right = 0, n
        while left < right:
            mid = (left + right + 1) >> 1
            if citations[n - mid] >= mid:
                left = mid
            else:
                right = mid - 1
        return left
```


#### TypeScript


```ts
function hIndex(citations: number[]): number {
    const n = citations.length;
    let left = 0,
        right = n;
    while (left < right) {
        const mid = (left + right + 1) >> 1;
        if (citations[n - mid] >= mid) {
            left = mid;
        } else {
            right = mid - 1;
        }
    }
    return left;
}
```

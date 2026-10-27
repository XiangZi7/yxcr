## 解法




### 方法一：双指针



> **思考**
>
> 另开数组、从前往后双指针合并再写回 $\textit{nums1}$，结果正确。 $m + n \le 200$，时间没有压力，却要 $O(m + n)$ 额外空间，也不满足原地改写。
>
> 从前往后写会覆盖 $\textit{nums1}$ 里尚未读出的数。空位却集中在尾部。因此可以从后往前：先放置当前较大者，不会踩到未处理元素。
>
> 用 $i$、 $j$ 分别扫两段有效末尾， $k$ 写合并后的末尾，直到 $\textit{nums2}$ 耗尽即可。



我们注意到数组的有序性，可以使用双指针的方法，从后向前遍历两个数组，每次取两个数组中较大的一个放进合并后的数组的最后面。

具体地，我们用两个指针 $i$ 和 $j$ 分别指向两个数组的末尾，用一个指针 $k$ 指向合并后的数组的末尾。每次比较两个数组的末尾元素，将较大的元素放在合并后的数组的末尾，然后将指针向前移动一位，重复这个过程，直到两个数组的指针都指向了数组的开头。

时间复杂度 $O(m + n)$，其中 $m$ 和 $n$ 分别是两个数组的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        k = m + n - 1
        i, j = m - 1, n - 1
        while j >= 0:
            if i >= 0 and nums1[i] > nums2[j]:
                nums1[k] = nums1[i]
                i -= 1
            else:
                nums1[k] = nums2[j]
                j -= 1
            k -= 1
```


#### TypeScript


```ts
/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    for (let i = m - 1, j = n - 1, k = m + n - 1; j >= 0; --k) {
        nums1[k] = i >= 0 && nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
    }
}
```

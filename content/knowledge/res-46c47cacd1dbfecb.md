## 解法




### 方法一：二分查找



> **思考**
>
> 与上一题相比允许重复。 $\textit{nums}[\textit{mid}]=\textit{nums}[r]$ 时无法判断最小值在哪一侧，只能把 $r$ 减一缩小范围。最坏全相等时退化为 $O(n)$，这是重复元素带来的代价。其余分支仍按旋转数组的二分收缩。



我们定义二分查找的左边界 $l = 0$，右边界 $r = n - 1$。每次计算中间位置 $mid = (l + r) \gg 1$，比较 $nums[mid]$ 和 $nums[r]$ 的大小关系：

- 如果 $nums[mid] > nums[r]$，说明最小值在 $mid$ 的右侧，因此将 $l$ 更新为 $mid + 1$。
- 如果 $nums[mid] = nums[r]$，无法确定最小值的位置，但可以将 $r$ 向左移动一位，即 $r = r - 1$，以缩小搜索范围。
- 如果 $nums[mid] < nums[r]$，说明最小值在 $mid$ 的左侧或 $mid$ 本身，因此将 $r$ 更新为 $mid$。

当 $l$ 与 $r$ 相遇时，指针 $l$ 就指向了最小值的位置，返回 $nums[l]$ 即可。

时间复杂度 $O(n)$，最坏情况下数组中所有元素都相同，需要遍历整个数组。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def findMin(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1
        while l < r:
            mid = (l + r) >> 1
            if nums[mid] > nums[r]:
                l = mid + 1
            elif nums[mid] == nums[r]:
                r -= 1
            else:
                r = mid
        return nums[l]
```


#### TypeScript


```ts
function findMin(nums: number[]): number {
    let l = 0,
        r = nums.length - 1;
    while (l < r) {
        let mid = (l + r) >> 1;
        if (nums[mid] > nums[r]) {
            l = mid + 1;
        } else if (nums[mid] == nums[r]) {
            r--;
        } else {
            r = mid;
        }
    }
    return nums[l];
}
```

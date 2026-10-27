## 解法




### 方法一：二分查找



> **思考**
>
> 从左扫描到第一个不小于 $target$ 的位置，时间复杂度为 $O(n)$。在 $n \le 10^4$ 的数据范围下可以接受，但数组已升序且无重复，线性遍历没有利用有序性。
>
> 插入位置恰好是第一个不小于 $target$ 的下标，即有序数组上的下界。为此维护半开区间 $[l, r)$：若 $nums[mid] \ge target$，则答案位于左半（含 $mid$）；否则位于 $mid$ 右侧。收缩至 $l = r$ 时， $l$ 即为插入点。



由于 $nums$ 数组已经有序，因此我们可以使用二分查找的方法找到目标值 $target$ 的插入位置。

时间复杂度 $O(\log n)$，空间复杂度 $O(1)$。其中 $n$ 为数组 $nums$ 的长度。




#### Python3


```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums)
        while l < r:
            mid = (l + r) >> 1
            if nums[mid] >= target:
                r = mid
            else:
                l = mid + 1
        return l
```


#### TypeScript


```ts
function searchInsert(nums: number[], target: number): number {
    let [l, r] = [0, nums.length];
    while (l < r) {
        const mid = (l + r) >> 1;
        if (nums[mid] >= target) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return l;
}
```


### 方法二：二分查找（内置函数）



> **思考**
>
> 方法一已经达到 $O(\log n)$，仍需手写二分循环。各语言标准库均提供下界查找：Python 的 `bisect_left`、C++ 的 `lower_bound`、Java 的 `Arrays.binarySearch`（未找到时返回 $-i-1$）。语义与方法一相同，直接调用即可。



我们也可以直接使用内置函数进行二分查找。

时间复杂度 $O(\log n)$，其中 $n$ 为数组 $nums$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        return bisect_left(nums, target)
```

## 解法




### 方法一：双指针



> **思考**
>
> 有序数组含负数，平方后应重新有序。逐个平方再排序为 $O(n\log n)$。平方后两端较大、中间较小，左右指针取平方较大者从后往前填（或先写入再反转），线性完成。



由于数组 $nums$ 已经按照非递减顺序排好序，所以数组中负数的平方值是递减的，正数的平方值是递增的。我们可以使用双指针，分别指向数组的两端，每次比较两个指针指向的元素的平方值，将较大的平方值放入结果数组的末尾。

时间复杂度 $O(n)$，其中 $n$ 是数组 $nums$ 的长度。忽略答案数组的空间消耗，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        ans = []
        i, j = 0, len(nums) - 1
        while i <= j:
            a = nums[i] * nums[i]
            b = nums[j] * nums[j]
            if a > b:
                ans.append(a)
                i += 1
            else:
                ans.append(b)
                j -= 1
        return ans[::-1]
```


#### JavaScript


```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    const n = nums.length;
    const ans = Array(n).fill(0);
    for (let i = 0, j = n - 1, k = n - 1; i <= j; --k) {
        const [a, b] = [nums[i] * nums[i], nums[j] * nums[j]];
        if (a > b) {
            ans[k] = a;
            ++i;
        } else {
            ans[k] = b;
            --j;
        }
    }
    return ans;
};
```

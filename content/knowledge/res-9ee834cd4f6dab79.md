## 解法




### 方法一：前缀和



> **思考**
>
> 输出每个前缀的和。 $n\le 1000$，一次 `accumulate` 即可。



我们直接遍历数组，对于当前元素 $nums[i]$，我们将其与前缀和 $nums[i-1]$ 相加，即可得到当前元素的前缀和 $nums[i]$。

时间复杂度 $O(n)$，其中 $n$ 为数组长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def runningSum(self, nums: List[int]) -> List[int]:
        return list(accumulate(nums))
```


#### TypeScript


```ts
function runningSum(nums: number[]): number[] {
    for (let i = 1; i < nums.length; ++i) {
        nums[i] += nums[i - 1];
    }
    return nums;
}
```

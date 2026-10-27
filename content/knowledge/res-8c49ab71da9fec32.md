## 解法




### 方法一：排序



> **思考**
>
> 两两配对后取每对较小值之和，要让这个和最大。较小值被浪费的是较大的那个数，因此应让较大值尽量小——即与接近的数配对。
>
> 排序后相邻两项组成一对， $a_1+a_3+\cdots$ 即为最优。证明上，任何交叉配对都可以调整成相邻配对且不变更差。



对于一个数对 $(a, b)$，我们不妨设 $a \leq b$，那么 $\min(a, b) = a$。为了使得总和尽可能大，我们取的 $b$ 应该与 $a$ 尽可能接近，这样可以保留更大的数。

因此，我们可以对数组 $nums$ 进行排序，然后将相邻的两个数分为一组，取每组的第一个数相加即可。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(\log n)$。其中 $n$ 为数组 $nums$ 的长度。




#### Python3


```python
class Solution:
    def arrayPairSum(self, nums: List[int]) -> int:
        nums.sort()
        return sum(nums[::2])
```


#### JavaScript


```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function (nums) {
    nums.sort((a, b) => a - b);
    return nums.reduce((acc, cur, i) => (i % 2 === 0 ? acc + cur : acc), 0);
};
```

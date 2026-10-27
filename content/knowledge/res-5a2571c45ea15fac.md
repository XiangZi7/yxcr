## 解法




### 方法一：贪心 + 枚举



> **思考**
>
> 每个数只能 $+k$ 或 $-k$，枚举 $2^n$ 种分配不可行。排序后，较小的应倾向 $+k$，较大的倾向 $-k$，最优划分是某个前缀加 $k$、后缀减 $k$。
>
> 枚举分界 $i$，新的最小值为 $\min(nums[0]+k,\,nums[i]-k)$，最大值为 $\max(nums[i-1]+k,\,nums[-1]-k)$，取所有极差与原极差的最小值。



根据题目要求，我们需要求数组中的元素最大值与最小值差值的最小值。每个元素可以加上或者减去 $k$，因此我们可以将数组中的元素分为两部分，一部分加上 $k$，一部分减去 $k$。那么，我们应该将数组中的较大值减去 $k$，较小值加上 $k$，这样才能保证最大值与最小值的差值最小。

因此，我们可以先将数组排序，然后枚举数组中的每个元素，将其分为两部分，一部分加上 $k$，一部分减去 $k$，并计算最大值与最小值的差值。最后，取所有差值中的最小值即可。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(\log n)$。其中 $n$ 为数组的长度。




#### Python3


```python
class Solution:
    def smallestRangeII(self, nums: List[int], k: int) -> int:
        nums.sort()
        ans = nums[-1] - nums[0]
        for i in range(1, len(nums)):
            mi = min(nums[0] + k, nums[i] - k)
            mx = max(nums[i - 1] + k, nums[-1] - k)
            ans = min(ans, mx - mi)
        return ans
```


#### TypeScript


```ts
function smallestRangeII(nums: number[], k: number): number {
    nums.sort((a, b) => a - b);
    let ans = nums.at(-1)! - nums[0];
    for (let i = 1; i < nums.length; ++i) {
        const mi = Math.min(nums[0] + k, nums[i] - k);
        const mx = Math.max(nums.at(-1)! - k, nums[i - 1] + k);
        ans = Math.min(ans, mx - mi);
    }
    return ans;
}
```

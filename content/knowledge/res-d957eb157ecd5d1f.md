## 解法




### 方法一：枚举 + 贪心



> **思考**
>
> 只能减小元素，锯齿有「偶数位较小」与「奇数位较小」两种形态，二者互斥，分别计算后取较小操作次数。对需要变小的位置，操作次数由它与左右邻居的差值决定，取能同时低于两侧的最小值即可，互不影响。



我们可以分别枚举偶数位和奇数位作为“比相邻元素小”的元素，然后计算需要的操作次数。取两者的最小值即可。

时间复杂度 $O(n)$，其中 $n$ 为数组 $nums$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def movesToMakeZigzag(self, nums: List[int]) -> int:
        ans = [0, 0]
        n = len(nums)
        for i in range(2):
            for j in range(i, n, 2):
                d = 0
                if j:
                    d = max(d, nums[j] - nums[j - 1] + 1)
                if j < n - 1:
                    d = max(d, nums[j] - nums[j + 1] + 1)
                ans[i] += d
        return min(ans)
```


#### TypeScript


```ts
function movesToMakeZigzag(nums: number[]): number {
    const ans: number[] = Array(2).fill(0);
    const n = nums.length;
    for (let i = 0; i < 2; ++i) {
        for (let j = i; j < n; j += 2) {
            let d = 0;
            if (j > 0) {
                d = Math.max(d, nums[j] - nums[j - 1] + 1);
            }
            if (j < n - 1) {
                d = Math.max(d, nums[j] - nums[j + 1] + 1);
            }
            ans[i] += d;
        }
    }
    return Math.min(...ans);
}
```

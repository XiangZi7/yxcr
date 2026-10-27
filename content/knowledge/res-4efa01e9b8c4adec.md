## 解法




### 方法一：贪心 + 前缀和 + 哈希表



> **思考**
>
> 选出尽量多段互不重叠、和为 $target$ 的子数组。 $n\le 10^5$，区间 DP 不可行。若两段相交，留下更靠左结束的那段不会减少后续可选数量。
>
> 从左到右用前缀和哈希表找最早结束的和为 $target$ 的段，计入答案后从下一段重新开始。贪心保证每段都尽量短、尽早结束，从而给后面留下更多空间。



我们遍历数组 $nums$，利用前缀和 + 哈希表的方法，寻找和为 $target$ 的子数组，若找到，则答案加一，然后我们将前缀和置为 $0$，继续遍历数组 $nums$，直到遍历完整个数组。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为数组 $nums$ 的长度。




#### Python3


```python
class Solution:
    def maxNonOverlapping(self, nums: List[int], target: int) -> int:
        ans = 0
        i, n = 0, len(nums)
        while i < n:
            s = 0
            vis = {0}
            while i < n:
                s += nums[i]
                if s - target in vis:
                    ans += 1
                    break
                i += 1
                vis.add(s)
            i += 1
        return ans
```


#### TypeScript


```ts
function maxNonOverlapping(nums: number[], target: number): number {
    const n = nums.length;
    let ans = 0;
    for (let i = 0; i < n; ++i) {
        let s = 0;
        const vis: Set<number> = new Set();
        vis.add(0);
        for (; i < n; ++i) {
            s += nums[i];
            if (vis.has(s - target)) {
                ++ans;
                break;
            }
            vis.add(s);
        }
    }
    return ans;
}
```

## 解法




### 方法一：排序 + 双指针



> **思考**
>
> 若枚举所有三元组并记录与 $target$ 最接近的和，时间复杂度为 $O(n^3)$。 $n \le 1000$，无法通过。
>
> 固定一个数后，问题退化为在剩余数组中找两个数，使其和最接近给定值。我们并不需要全部三元组，只要最接近 $target$ 的那个和。将数组排序后：若当前和偏大，只能缩小右端；若偏小，只能增大左端；若恰好等于 $target$，已经是最优。
>
> 因此枚举第一个数，在右侧用双指针按与 $target$ 的大小夹逼，并维护最小偏差。题目保证答案唯一，不必处理重复。



我们将数组排序，然后遍历数组，对于每个元素 $nums[i]$，我们使用指针 $j$ 和 $k$ 分别指向 $i+1$ 和 $n-1$，计算三数之和，如果三数之和等于 $target$，则直接返回 $target$，否则根据与 $target$ 的差值更新答案。如果三数之和大于 $target$，则将 $k$ 向左移动一位，否则将 $j$ 向右移动一位。

时间复杂度 $O(n^2)$，空间复杂度 $O(\log n)$。其中 $n$ 为数组长度。




#### Python3


```python
class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
        nums.sort()
        n = len(nums)
        ans = inf
        for i, v in enumerate(nums):
            j, k = i + 1, n - 1
            while j < k:
                t = v + nums[j] + nums[k]
                if t == target:
                    return t
                if abs(t - target) < abs(ans - target):
                    ans = t
                if t > target:
                    k -= 1
                else:
                    j += 1
        return ans
```


#### TypeScript


```ts
function threeSumClosest(nums: number[], target: number): number {
    nums.sort((a, b) => a - b);
    let ans: number = 1 << 30;
    const n = nums.length;
    for (let i = 0; i < n; ++i) {
        let j = i + 1;
        let k = n - 1;
        while (j < k) {
            const t: number = nums[i] + nums[j] + nums[k];
            if (t === target) {
                return t;
            }
            if (Math.abs(t - target) < Math.abs(ans - target)) {
                ans = t;
            }
            if (t > target) {
                --k;
            } else {
                ++j;
            }
        }
    }
    return ans;
}
```

## 解法




### 方法一：单调栈



> **思考**
>
> 对每个位置找右侧第一个更大元素，朴素向右扫描是 $O(n^2)$，在 $n \le 10^4$ 的循环数组上偏紧。循环意味着下标 $n$ 之后要回到开头。
>
> 从右往左维护单调递减栈，栈中存放「尚未被更小元素消耗」的候选。数组走两遍即可把环展开成线性下标，取模写回原位置。栈保证每个元素至多进出一次，因此是线性时间。



题目需要我们找到每个元素的下一个更大元素，那么我们可以从后往前遍历数组，这样可以将问题为求上一个更大元素。另外，由于数组是循环的，我们可以将数组遍历两次。

具体地，我们从下标 $n \times 2 - 1$ 开始向前遍历数组，其中 $n$ 是数组的长度。然后，我们记 $j = i \bmod n$，其中 $\bmod$ 表示取模运算。如果栈不为空且栈顶元素小于等于 $nums[j]$，那么我们就不断地弹出栈顶元素，直到栈为空或者栈顶元素大于 $nums[j]$。此时，栈顶元素就是 $nums[j]$ 的上一个更大元素，我们将其赋给 $ans[j]$。最后，我们将 $nums[j]$ 入栈。继续遍历下一个元素。

遍历结束后，我们就可以得到数组 $ans$，它是数组 $nums$ 中每个元素的下一个更大元素。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是数组 $nums$ 的长度。




#### Python3


```python
class Solution:
    def nextGreaterElements(self, nums: List[int]) -> List[int]:
        n = len(nums)
        ans = [-1] * n
        stk = []
        for i in range(n * 2 - 1, -1, -1):
            i %= n
            while stk and stk[-1] <= nums[i]:
                stk.pop()
            if stk:
                ans[i] = stk[-1]
            stk.append(nums[i])
        return ans
```


#### TypeScript


```ts
function nextGreaterElements(nums: number[]): number[] {
    const n = nums.length;
    const stk: number[] = [];
    const ans: number[] = Array(n).fill(-1);
    for (let i = n * 2 - 1; ~i; --i) {
        const j = i % n;
        while (stk.length && stk.at(-1)! <= nums[j]) {
            stk.pop();
        }
        if (stk.length) {
            ans[j] = stk.at(-1)!;
        }
        stk.push(nums[j]);
    }
    return ans;
}
```

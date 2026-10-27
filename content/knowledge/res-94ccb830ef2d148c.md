## 解法




### 方法一：单调栈



> **思考**
>
> 求最宽的 $i<j$ 且 $nums[i]\le nums[j]$。枚举所有对为平方级。可作为左端的下标必须构成从左开始的严格递减序列，否则更左且更小的值更优。单调栈记下这些候选，再从右往左用 $j$ 弹出能构成坡的栈顶，宽度取最大。



根据题意，我们可以发现，所有可能的 $\textit{nums}[i]$ 所构成的子序列一定是单调递减的。为什么呢？我们不妨用反证法证明一下。

假设存在 $i_1<i_2$，并且 $\textit{nums}[i_1]\leq\textit{nums}[i_2]$，那么实际上 $\textit{nums}[i_2]$ 一定不可能是一个候选值，因为 $\textit{nums}[i_1]$ 更靠左，会是一个更优的值。因此 $\textit{nums}[i]$ 所构成的子序列一定单调递减，并且 $i$ 一定是从 0 开始。

我们用一个从栈底到栈顶单调递减的栈 $\textit{stk}$ 来存储所有可能的 $\textit{nums}[i]$，然后我们从右边界开始遍历 $j$，若遇到 $\textit{nums}[\textit{stk.top()}]\leq\textit{nums}[j]$，说明此时构成一个坡，循环弹出栈顶元素，更新 $\textit{ans}$。

时间复杂度 $O(n)$，空间复杂度 $O(n)$，其中 $n$ 表示 $\textit{nums}$ 的长度。




#### Python3


```python
class Solution:
    def maxWidthRamp(self, nums: List[int]) -> int:
        stk = []
        for i, v in enumerate(nums):
            if not stk or nums[stk[-1]] > v:
                stk.append(i)
        ans = 0
        for i in range(len(nums) - 1, -1, -1):
            while stk and nums[stk[-1]] <= nums[i]:
                ans = max(ans, i - stk.pop())
            if not stk:
                break
        return ans
```


#### TypeScript


```ts
function maxWidthRamp(nums: number[]): number {
    let [ans, n] = [0, nums.length];
    const stk: number[] = [];

    for (let i = 0; i < n - 1; i++) {
        if (stk.length === 0 || nums[stk.at(-1)!] > nums[i]) {
            stk.push(i);
        }
    }

    for (let i = n - 1; i >= 0; i--) {
        while (stk.length && nums[stk.at(-1)!] <= nums[i]) {
            ans = Math.max(ans, i - stk.pop()!);
        }
        if (stk.length === 0) break;
    }

    return ans;
}
```

## 解法




### 方法一：前缀和



> **思考**
>
> 寻找左侧和等于右侧和的下标。 $n\le 10^4$，对每个位置重算左右和为 $O(n^2)$，可以再压一档。
>
> 左右两侧之和的总和是固定的：若已知数组总和 $S$，则下标 $i$ 满足 $2\cdot\textit{left}+nums[i]=S$。从左扫一遍维护左侧和即可。
>
> 实现上令 $\textit{right}$ 初值为总和，遇到 $x$ 先从右侧减去，再与 $\textit{left}$ 比较，最后把 $x$ 加入左侧。额外空间 $O(1)$。



我们定义变量 $left$ 表示数组 $\textit{nums}$ 中下标 $i$ 左侧元素之和，变量 $right$ 表示数组 $\textit{nums}$ 中下标 $i$ 右侧元素之和。初始时 $left = 0$, $right = \sum_{i = 0}^{n - 1} nums[i]$。

遍历数组 $\textit{nums}$，对于当前遍历到的数字 $x$，我们更新 $right = right - x$，此时如果 $left=right$，说明当前下标 $i$ 就是中间位置，直接返回即可。否则，我们更新 $left = left + x$，继续遍历下一个数字。

遍历结束，如果没有找到中间位置，返回 $-1$。

时间复杂度 $O(n)$，空间复杂度 $O(1)$。其中 $n$ 为数组 $\textit{nums}$ 的长度。

相似题目：

- [1991. 找到数组的中间位置](https://github.com/doocs/leetcode/blob/main/solution/1900-1999/1991.Find%20the%20Middle%20Index%20in%20Array/README.md)
- [2574. 左右元素和的差值](https://github.com/doocs/leetcode/blob/main/solution/2500-2599/2574.Left%20and%20Right%20Sum%20Differences/README.md)




#### Python3


```python
class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        left, right = 0, sum(nums)
        for i, x in enumerate(nums):
            right -= x
            if left == right:
                return i
            left += x
        return -1
```


#### TypeScript


```ts
function pivotIndex(nums: number[]): number {
    let left = 0,
        right = nums.reduce((a, b) => a + b);
    for (let i = 0; i < nums.length; ++i) {
        right -= nums[i];
        if (left == right) {
            return i;
        }
        left += nums[i];
    }
    return -1;
}
```

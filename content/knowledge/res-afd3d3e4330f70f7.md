## 解法




### 方法一：单调栈



> **思考**
>
> $nums1$ 是 $nums2$ 的子集，求各自在 $nums2$ 中下一个更大元。对每个 $nums1$ 的值在 $nums2$ 里向右扫是 $O(nm)$。
>
> 从右向左扫 $nums2$，维护单调递减栈：弹出所有更小的栈顶后，栈顶就是当前值的下一个更大元，记入哈希表。再按 $nums1$ 查表。
>
> 栈里从顶到底递增（右到左扫时保持递减栈），每个元素入出栈一次。先处理 $nums2$ 再回答 $nums1$，避免重复扫描。



我们可以从右往左遍历数组 $\textit{nums2}$，维护一个从栈顶到栈底单调递增的栈 $\textit{stk}$，并且用哈希表 $\textit{d}$ 记录每个元素的下一个更大元素。

遍历到元素 $x$ 时，如果栈不为空且栈顶元素小于 $x$，我们就不断弹出栈顶元素，直到栈为空或者栈顶元素大于等于 $x$。此时，如果栈不为空，栈顶元素就是 $x$ 的下一个更大元素，否则 $x$ 没有下一个更大元素。

最后我们遍历数组 $\textit{nums1}$，根据哈希表 $\textit{d}$ 得到答案。

时间复杂度 $O(m + n)$，空间复杂度 $O(n)$。其中 $m$ 和 $n$ 分别为数组 $\textit{nums1}$ 和 $\textit{nums2}$ 的长度。




#### Python3


```python
class Solution:
    def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
        stk = []
        d = {}
        for x in nums2[::-1]:
            while stk and stk[-1] < x:
                stk.pop()
            if stk:
                d[x] = stk[-1]
            stk.append(x)
        return [d.get(x, -1) for x in nums1]
```


#### TypeScript


```ts
function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    const stk: number[] = [];
    const d: Record<number, number> = {};
    for (const x of nums2.reverse()) {
        while (stk.length && stk.at(-1)! < x) {
            stk.pop();
        }
        d[x] = stk.length ? stk.at(-1)! : -1;
        stk.push(x);
    }
    return nums1.map(x => d[x]);
}
```

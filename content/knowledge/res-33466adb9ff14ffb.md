## 解法




### 方法一：贪心 + 一次遍历



> **思考**
>
> 数组是 $0..n-1$ 的排列，切块分别排序后应还原。能在 $i$ 切开，当且仅当前 $i+1$ 个数恰好是 $0..i$。
>
> 这等价于前缀最大值等于 $i$。一遍维护 $\textit{mx}$，相等则多一块。



由于 $\textit{arr}$ 是 $[0,..,n-1]$ 的一个排列，若已遍历过的数中的最大值 $\textit{mx}$ 与当前遍历到的下标 $i$ 相等，说明可以进行一次分割，累加答案。

时间复杂度 $O(n)$，空间复杂度 $O(1)$。其中 $n$ 为数组 $\textit{arr}$ 的长度。




#### Python3


```python
class Solution:
    def maxChunksToSorted(self, arr: List[int]) -> int:
        mx = ans = 0
        for i, v in enumerate(arr):
            mx = max(mx, v)
            if i == mx:
                ans += 1
        return ans
```


#### TypeScript


```ts
function maxChunksToSorted(arr: number[]): number {
    const n = arr.length;
    let ans = 0;
    let mx = 0;
    for (let i = 0; i < n; i++) {
        mx = Math.max(arr[i], mx);
        if (mx == i) {
            ans++;
        }
    }
    return ans;
}
```


### 方法二：单调栈



> **思考**
>
> 方法一用到了「值等于下标」这一排列性质，有重复时失效。块最大值单调栈与 768 相同，不依赖值域。
>
> 新值小于栈顶则合并前面的块，最后栈长为块数。



方法一的解法有一定的局限性，若数组中存在重复元素，就无法得到正确的答案。

根据题目，我们可以发现，从左到右，每个分块都有一个最大值，并且这些分块的最大值呈单调递增。我们可以用一个栈来存储这些分块的最大值。最后得到的栈的大小，也就是题目所求的最多能完成排序的块。

以上这种解法，不仅可以解决本题，也可以解决 [768. 最多能完成排序的块 II](https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0768.Max%20Chunks%20To%20Make%20Sorted%20II/README.md) 这道困难题。大家可以自行尝试。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为数组 $\textit{arr}$ 的长度。




#### Python3


```python
class Solution:
    def maxChunksToSorted(self, arr: List[int]) -> int:
        stk = []
        for v in arr:
            if not stk or v >= stk[-1]:
                stk.append(v)
            else:
                mx = stk.pop()
                while stk and stk[-1] > v:
                    stk.pop()
                stk.append(mx)
        return len(stk)
```


#### TypeScript


```ts
function maxChunksToSorted(arr: number[]): number {
    const stk: number[] = [];

    for (const x of arr) {
        if (stk.at(-1)! > x) {
            const top = stk.pop()!;
            while (stk.length && stk.at(-1)! > x) stk.pop();
            stk.push(top);
        } else stk.push(x);
    }

    return stk.length;
}
```

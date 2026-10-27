## 解法




### 方法一：图



> **思考**
>
> $A[i]$ 指向 $A[A[i]]$，形成若干互不相交的环。套的长度就是环长。从每个下标走环即可，但同一环不要重复走。
>
> 访问数组标记走过的下标；从尚未访问的起点沿指针走一圈并计数。环不相交，因此每个下标至多访问一次，最长环即答案。



嵌套数组最终一定会形成一个环，在枚举 $nums[i]$ 的过程中，可以用 $vis$ 数组剪枝，避免重复枚举同一个环。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。




#### Python3


```python
class Solution:
    def arrayNesting(self, nums: List[int]) -> int:
        n = len(nums)
        vis = [False] * n
        res = 0
        for i in range(n):
            if vis[i]:
                continue
            cur, m = nums[i], 1
            vis[cur] = True
            while nums[cur] != nums[i]:
                cur = nums[cur]
                m += 1
                vis[cur] = True
            res = max(res, m)
        return res
```


### 方法二：原地标记



> **思考**
>
> 方法一额外用了 $O(n)$ 访问数组。值域恰为 $[0,n-1]$，可用哨兵 $n$ 原地标记已访问。
>
> 沿环把经过的 $nums[i]$ 写成 $n$，同时计数。遇到 $n$ 说明此位置已属于算过的环。空间降为常数，语义与方法一相同。



由于 $nums$ 元素均在 $[0..n-1]$ 之间，因此，对于访问过的元素，我们可以令 $nums[i]=n$，从而省略 $vis$ 数组。

时间复杂度 $O(n)$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def arrayNesting(self, nums: List[int]) -> int:
        ans, n = 0, len(nums)
        for i in range(n):
            cnt = 0
            while nums[i] != n:
                j = nums[i]
                nums[i] = n
                i = j
                cnt += 1
            ans = max(ans, cnt)
        return ans
```

## 解法




### 方法一



> **思考**
>
> 每行每列递增，求第 $k$ 小。展开排序为 $O(n^2\log n)$。第 $k$ 小必在 $[matrix[0][0], matrix[n-1][n-1]]$，可对值二分。
>
> `check(mid)` 从左下（或右上）统计 $\le mid$ 的个数，利用单调性 $O(n)$。个数 $\ge k$ 则收缩右界。答案为最小可行 $mid$。






#### Python3


```python
class Solution:
    def kthSmallest(self, matrix: List[List[int]], k: int) -> int:
        def check(matrix, mid, k, n):
            count = 0
            i, j = n - 1, 0
            while i >= 0 and j < n:
                if matrix[i][j] <= mid:
                    count += i + 1
                    j += 1
                else:
                    i -= 1
            return count >= k

        n = len(matrix)
        left, right = matrix[0][0], matrix[n - 1][n - 1]
        while left < right:
            mid = (left + right) >> 1
            if check(matrix, mid, k, n):
                right = mid
            else:
                left = mid + 1
        return left
```

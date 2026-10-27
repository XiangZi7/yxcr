## 解法




### 方法一：遍历，逐个累加



> **思考**
>
> 堆叠立方体后求外表面。 $n\le 50$，对每个格子独立加 $2+4v$，再减去与左、上邻居贴合的面积。
>
> 贴合面数为 $2\cdot\min(v,\textit{neighbor})$。空格子不加表面积。



时间复杂度 $O(n^2)$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def surfaceArea(self, grid: List[List[int]]) -> int:
        ans = 0
        for i, row in enumerate(grid):
            for j, v in enumerate(row):
                if v:
                    ans += 2 + v * 4
                    if i:
                        ans -= min(v, grid[i - 1][j]) * 2
                    if j:
                        ans -= min(v, grid[i][j - 1]) * 2
        return ans
```

## 解法




### 方法一：数学



> **思考**
>
> 三个投影分别是俯视非零格数、每行最大值之和、每列最大值之和。 $n\le 50$，一次遍历即可算出三项。
>
> 俯视对 $v>0$ 计数，正视取每行之最大，侧视取每列之最大，三者相加。



我们可以分别计算三个投影的面积。

- xy 平面的投影面积：每个非零值都会投影到 xy 平面，所以 xy 的投影面积为非零值的个数。
- yz 平面的投影面积：每一行的最大值。
- zx 平面的投影面积：每一列的最大值。

最后将三个面积相加即可。

时间复杂度 $O(n^2)$，其中 $n$ 为网格 `grid` 的边长。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def projectionArea(self, grid: List[List[int]]) -> int:
        xy = sum(v > 0 for row in grid for v in row)
        yz = sum(max(row) for row in grid)
        zx = sum(max(col) for col in zip(*grid))
        return xy + yz + zx
```


#### TypeScript


```ts
function projectionArea(grid: number[][]): number {
    const xy: number = grid.flat().filter(v => v > 0).length;
    const yz: number = grid.reduce((acc, row) => acc + Math.max(...row), 0);
    const zx: number = grid[0]
        .map((_, i) => Math.max(...grid.map(row => row[i])))
        .reduce((acc, val) => acc + val, 0);
    return xy + yz + zx;
}
```

## 解法




### 方法一：二分查找



> **思考**
>
> 每行、每列均递增，可对每一行二分查找 $target$。行数为 $m$、列为 $n$ 时时间为 $O(m\log n)$，无需额外空间。



由于每一行的所有元素升序排列，因此，对于每一行，我们可以使用二分查找找到第一个大于等于 $\textit{target}$ 的元素，然后判断该元素是否等于 $\textit{target}$。如果等于 $\textit{target}$，说明找到了目标值，直接返回 $\text{true}$。如果不等于 $\textit{target}$，说明这一行的所有元素都小于 $\textit{target}$，应该继续搜索下一行。

如果所有行都搜索完了，都没有找到目标值，说明目标值不存在，返回 $\text{false}$。

时间复杂度 $O(m \times \log n)$，其中 $m$ 和 $n$ 分别为矩阵的行数和列数。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        for row in matrix:
            j = bisect_left(row, target)
            if j < len(matrix[0]) and row[j] == target:
                return True
        return False
```


#### TypeScript


```ts
function searchMatrix(matrix: number[][], target: number): boolean {
    const n = matrix[0].length;
    for (const row of matrix) {
        const j = _.sortedIndex(row, target);
        if (j < n && row[j] === target) {
            return true;
        }
    }
    return false;
}
```


### 方法二：从左下角或右上角搜索



> **思考**
>
> 逐行二分未同时利用列递增。从左下角出发：当前值过大则上移（排除本列上方），过小则右移（排除本行右侧）。
>
> 每步丢掉一行或一列，时间为 $O(m+n)$。



这里我们以左下角或右上角作为起始搜索点，往右上或左下方向开始搜索。比较当前元素 $\textit{matrix}[i][j]$ 与 $\textit{target}$ 的大小关系：

- 若 $\textit{matrix}[i][j] = \textit{target}$，说明找到了目标值，直接返回 $\text{true}$。
- 若 $\textit{matrix}[i][j] > \textit{target}$，说明这一列从当前位置开始往上的所有元素均大于 $\textit{target}$，应该让 $i$ 指针往上移动，即 $i \leftarrow i - 1$。
- 若 $\textit{matrix}[i][j] < \textit{target}$，说明这一行从当前位置开始往右的所有元素均小于 $\textit{target}$，应该让 $j$ 指针往右移动，即 $j \leftarrow j + 1$。

若搜索结束依然找不到 $\textit{target}$，返回 $\text{false}$。

时间复杂度 $O(m + n)$，其中 $m$ 和 $n$ 分别为矩阵的行数和列数。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        m, n = len(matrix), len(matrix[0])
        i, j = m - 1, 0
        while i >= 0 and j < n:
            if matrix[i][j] == target:
                return True
            if matrix[i][j] > target:
                i -= 1
            else:
                j += 1
        return False
```


#### TypeScript


```ts
function searchMatrix(matrix: number[][], target: number): boolean {
    const [m, n] = [matrix.length, matrix[0].length];
    let [i, j] = [m - 1, 0];
    while (i >= 0 && j < n) {
        if (matrix[i][j] === target) {
            return true;
        }
        if (matrix[i][j] > target) {
            --i;
        } else {
            ++j;
        }
    }
    return false;
}
```

## 解法




### 方法一：逐行遍历



> **思考**
>
> 求方阵主副对角线之和，中心在奇数阶时会被加两次。 $n$ 不大，按行各取两个对角元即可，注意中心只加一次。
>
> 第 $i$ 行主对角为 $row[i]$，副对角为 $row[n-i-1]$。当 $j=i$ 时只累加一个；否则两个都加。一遍行扫描完成。



我们可以遍历矩阵的每一行 $\textit{row}[i]$，对于每一行，我们可以计算出两个对角线上的元素，即 $\textit{row}[i][i]$ 和 $\textit{row}[i][n - i - 1]$，其中 $n$ 是矩阵的行数。如果 $i = n - i - 1$，则说明当前行的对角线上只有一个元素，否则有两个元素。我们将其加到答案中即可。
遍历完所有行后，即可得到答案。

时间复杂度 $O(n)$，其中 $n$ 是矩阵的行数。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def diagonalSum(self, mat: List[List[int]]) -> int:
        ans = 0
        n = len(mat)
        for i, row in enumerate(mat):
            j = n - i - 1
            ans += row[i] + (0 if j == i else row[j])
        return ans
```


#### TypeScript


```ts
function diagonalSum(mat: number[][]): number {
    let ans = 0;
    const n = mat.length;
    for (let i = 0; i < n; ++i) {
        const j = n - i - 1;
        ans += mat[i][i] + (i === j ? 0 : mat[i][j]);
    }
    return ans;
}
```

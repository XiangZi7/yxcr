## 解法




### 方法一：计数



> **思考**
>
> 统计值为 $1$ 且其所在行、列再无其它 $1$ 的位置。对每个 $1$ 再扫整行整列会达到 $O(mn(m+n))$，矩阵较大时偏慢。
>
> 先用两个数组记下每行、每列的 $1$ 的个数，再扫一遍：格子为 $1$ 且对应行列计数都为 $1$ 时计入答案。



我们可以用两个数组 $\textit{rows}$ 和 $\textit{cols}$ 分别记录每一行和每一列的 $1$ 的个数。

然后遍历矩阵，对于每一个 $1$，检查其所在的行和列是否只有一个 $1$，如果是则答案加一。

遍历结束后，返回答案即可。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m + n)$。其中 $m$ 和 $n$ 分别是矩阵 $\textit{mat}$ 的行数和列数。




#### Python3


```python
class Solution:
    def numSpecial(self, mat: List[List[int]]) -> int:
        rows = [0] * len(mat)
        cols = [0] * len(mat[0])
        for i, row in enumerate(mat):
            for j, x in enumerate(row):
                rows[i] += x
                cols[j] += x
        ans = 0
        for i, row in enumerate(mat):
            for j, x in enumerate(row):
                ans += x == 1 and rows[i] == 1 and cols[j] == 1
        return ans
```


#### TypeScript


```ts
function numSpecial(mat: number[][]): number {
    const m = mat.length;
    const n = mat[0].length;
    const rows: number[] = Array(m).fill(0);
    const cols: number[] = Array(n).fill(0);
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            rows[i] += mat[i][j];
            cols[j] += mat[i][j];
        }
    }
    let ans = 0;
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (mat[i][j] === 1 && rows[i] === 1 && cols[j] === 1) {
                ++ans;
            }
        }
    }
    return ans;
}
```

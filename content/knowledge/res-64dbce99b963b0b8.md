## 解法




### 方法一：数组标记



> **思考**
>
> 若遇到 $0$ 立刻把该行该列清零，尚未扫描到的原有 $0$ 会被覆盖，后续无法区分哪些零是原始的。另开一份 $O(mn)$ 矩阵再写回可以避免混淆，但进阶已经否定这笔空间。 $m, n \le 200$，两遍扫描在时间上可行。
>
> 因此先记录「哪些行、哪些列应当置零」，再统一修改。长度为 $m$ 的行标记与长度为 $n$ 的列标记已经足够：第一遍遇零只打标，第二遍按标记置零。额外空间从 $O(mn)$ 降到 $O(m+n)$，尚未达到进阶要求的常数空间。



设矩阵的行数和列数分别为 $m$ 和 $n$。我们用长度为 $m$ 的数组 $\textit{row}$ 和长度为 $n$ 的数组 $\textit{col}$ 记录哪些行、列需要被置零。

先遍历矩阵，遇到零元素就把对应行、列标记为 $\text{true}$。即若 $\textit{matrix}[i][j] = 0$，则 $\textit{row}[i] = \textit{col}[j] = \text{true}$。

再遍历一遍矩阵，根据 $\textit{row}$ 和 $\textit{col}$ 的标记更新元素。若 $\textit{row}[i]$ 或 $\textit{col}[j]$ 为 $\text{true}$，就把 $\textit{matrix}[i][j]$ 置零。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m + n)$。其中 $m$ 和 $n$ 分别为矩阵的行数和列数。




#### Python3


```python
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        m, n = len(matrix), len(matrix[0])
        row = [False] * m
        col = [False] * n
        for i in range(m):
            for j in range(n):
                if matrix[i][j] == 0:
                    row[i] = col[j] = True
        for i in range(m):
            for j in range(n):
                if row[i] or col[j]:
                    matrix[i][j] = 0
```


#### TypeScript


```ts
/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {
    const m = matrix.length;
    const n = matrix[0].length;
    const row: boolean[] = Array(m).fill(false);
    const col: boolean[] = Array(n).fill(false);
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (matrix[i][j] === 0) {
                row[i] = col[j] = true;
            }
        }
    }
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (row[i] || col[j]) {
                matrix[i][j] = 0;
            }
        }
    }
}
```


### 方法二：原地标记



> **思考**
>
> 方法一仍需 $O(m+n)$ 的标记数组，而进阶要求 $O(1)$ 额外空间。
>
> 矩阵的第一行与第一列本身可以充当行、列标记。由于这两条带同时保存原有数据，必须先用 $i0$、 $j0$ 记下它们自身是否含零，再处理内部，最后才根据 $i0$、 $j0$ 清零第一行与第一列，以免标记被提前覆盖。



方法一中使用了额外的数组标记待清零的行和列，实际上我们也可以直接用矩阵的第一行和第一列来标记，不需要开辟额外的数组空间。

由于第一行、第一列用来做标记，它们的值可能会因为标记而发生改变，因此，我们需要额外的变量 $i0$, $j0$ 来标记第一行、第一列是否需要被清零。

时间复杂度 $O(m\times n)$，空间复杂度 $O(1)$。其中 $m$ 和 $n$ 分别为矩阵的行数和列数。




#### Python3


```python
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        m, n = len(matrix), len(matrix[0])
        i0 = any(v == 0 for v in matrix[0])
        j0 = any(matrix[i][0] == 0 for i in range(m))
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][j] == 0:
                    matrix[i][0] = matrix[0][j] = 0
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][0] == 0 or matrix[0][j] == 0:
                    matrix[i][j] = 0
        if i0:
            for j in range(n):
                matrix[0][j] = 0
        if j0:
            for i in range(m):
                matrix[i][0] = 0
```


#### TypeScript


```ts
/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {
    const m = matrix.length;
    const n = matrix[0].length;
    const i0 = matrix[0].includes(0);
    const j0 = matrix.map(row => row[0]).includes(0);
    for (let i = 1; i < m; ++i) {
        for (let j = 1; j < n; ++j) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    for (let i = 1; i < m; ++i) {
        for (let j = 1; j < n; ++j) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }
    if (i0) {
        matrix[0].fill(0);
    }
    if (j0) {
        for (let i = 0; i < m; ++i) {
            matrix[i][0] = 0;
        }
    }
}
```

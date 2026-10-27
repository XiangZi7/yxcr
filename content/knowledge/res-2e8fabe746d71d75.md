## 解法




### 方法一：回溯



> **思考**
>
> 空格最多八十余个，每个有 $9$ 种填法，直接枚举全部填法不可行。必须在违反行、列、宫约束时立即停止。
>
> 与「有效的数独」相同，反复扫描棋盘以检查某数字是否已用，代价较高。我们可以先将已填数字记入 $row$、 $col$、 $block$，再只对空格列表 $t$ 做搜索。
>
> $dfs(k)$ 处理第 $k$ 个空格，枚举尚未占用的 $v$，写入后递归；找到解后用 $ok$ 截断，不再继续换数。回溯时恢复占用标记，成功路径上棋盘中的数字予以保留。



我们用数组 $\textit{row}$, $\textit{col}$, $\textit{box}$ 分别记录每一行、每一列、每个 3x3 宫格中数字是否出现过。如果数字 $i$ 在第 $r$ 行、第 $c$ 列、第 $b$ 个 3x3 宫格中出现过，那么 $\text{row[r][i]}$, $\text{col[c][i]}$, $\text{box[b][i]}$ 都为 $true$。

我们遍历 $\textit{board}$ 中的每一个空格，枚举它可以填入的数字 $v$，如果 $v$ 在当前行、当前列、当前 3x3 宫格中没有出现过，那么我们就可以尝试填入数字 $v$，并继续搜索下一个空格。如果搜索到最后，所有空格填充完毕，那么就说明找到了一个可行解。




#### Python3


```python
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        def dfs(k):
            nonlocal ok
            if k == len(t):
                ok = True
                return
            i, j = t[k]
            for v in range(9):
                if row[i][v] == col[j][v] == block[i // 3][j // 3][v] == False:
                    row[i][v] = col[j][v] = block[i // 3][j // 3][v] = True
                    board[i][j] = str(v + 1)
                    dfs(k + 1)
                    row[i][v] = col[j][v] = block[i // 3][j // 3][v] = False
                if ok:
                    return

        row = [[False] * 9 for _ in range(9)]
        col = [[False] * 9 for _ in range(9)]
        block = [[[False] * 9 for _ in range(3)] for _ in range(3)]
        t = []
        ok = False
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    t.append((i, j))
                else:
                    v = int(board[i][j]) - 1
                    row[i][v] = col[j][v] = block[i // 3][j // 3][v] = True
        dfs(0)
```

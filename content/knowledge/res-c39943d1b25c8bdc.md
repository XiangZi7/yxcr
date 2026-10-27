## 解法




### 方法一：DFS(回溯)



> **思考**
>
> 若从每个格子出发走出长度为 $|word|$ 的路径再比对，网格至多 $6 \times 6$、 $|word| \le 15$，不及时剪枝则搜索量过大。必须边走边比较，失配立刻返回，且同一格子不能使用两次。
>
> 路径必须与 $word$ 逐字符对齐，因此搜索状态可以写成 $dfs(i, j, k)$：当前位置 $(i, j)$ 对齐 $word[k]$。匹配后将格子改为 `'0'` 防止重入，再向四邻搜索 $k+1$，返回时还原。字母本身不是 `'0'`，因此不必另开访问数组。枚举每一个起点，任一成功即可。



我们可以枚举网格的每一个位置 $(i, j)$ 作为搜索的起点，然后从起点开始进行深度优先搜索，如果可以搜索到单词的末尾，就说明单词存在，否则说明单词不存在。

因此，我们设计一个函数 $dfs(i, j, k)$，表示从网格的 $(i, j)$ 位置出发，且从单词的第 $k$ 个字符开始搜索，是否能够搜索成功。函数 $dfs(i, j, k)$ 的执行步骤如下：

- 如果 $k = |word|-1$，说明已经搜索到单词的最后一个字符，此时只需要判断网格 $(i, j)$ 位置的字符是否等于 $word[k]$，如果相等则说明单词存在，否则说明单词不存在。无论单词是否存在，都无需继续往下搜索，因此直接返回结果。
- 否则，如果 $word[k]$ 字符不等于网格 $(i, j)$ 位置的字符，说明本次搜索失败，直接返回 `false`。
- 否则，我们将网格 $(i, j)$ 位置的字符暂存于 $c$ 中，然后将此位置的字符修改为一个特殊字符 `'0'`，代表此位置的字符已经被使用过，防止之后搜索时重复使用。然后我们从 $(i, j)$ 位置的上、下、左、右四个方向分别出发，去搜索网格中第 $k+1$ 个字符，如果四个方向有任何一个方向搜索成功，就说明搜索成功，否则说明搜索失败，此时我们需要还原网格 $(i, j)$ 位置的字符，即把 $c$ 放回网格 $(i, j)$ 位置（回溯）。

在主函数中，我们枚举网格中的每一个位置 $(i, j)$ 作为起点，如果调用 $dfs(i, j, 0)$ 返回 `true`，就说明单词存在，否则说明单词不存在，返回 `false`。

时间复杂度 $O(m \times n \times 3^k)$，空间复杂度 $O(\min(m \times n, k))$。其中 $m$ 和 $n$ 分别是网格的行数和列数；而 $k$ 是字符串 $word$ 的长度。




#### Python3


```python
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        def dfs(i: int, j: int, k: int) -> bool:
            if k == len(word) - 1:
                return board[i][j] == word[k]
            if board[i][j] != word[k]:
                return False
            c = board[i][j]
            board[i][j] = "0"
            for a, b in pairwise((-1, 0, 1, 0, -1)):
                x, y = i + a, j + b
                ok = 0 <= x < m and 0 <= y < n and board[x][y] != "0"
                if ok and dfs(x, y, k + 1):
                    return True
            board[i][j] = c
            return False

        m, n = len(board), len(board[0])
        return any(dfs(i, j, 0) for i in range(m) for j in range(n))
```


#### TypeScript


```ts
function exist(board: string[][], word: string): boolean {
    const [m, n] = [board.length, board[0].length];
    const dirs = [-1, 0, 1, 0, -1];
    const dfs = (i: number, j: number, k: number): boolean => {
        if (k === word.length - 1) {
            return board[i][j] === word[k];
        }
        if (board[i][j] !== word[k]) {
            return false;
        }
        const c = board[i][j];
        board[i][j] = '0';
        for (let u = 0; u < 4; ++u) {
            const [x, y] = [i + dirs[u], j + dirs[u + 1]];
            const ok = x >= 0 && x < m && y >= 0 && y < n;
            if (ok && board[x][y] !== '0' && dfs(x, y, k + 1)) {
                return true;
            }
        }
        board[i][j] = c;
        return false;
    };
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (dfs(i, j, 0)) {
                return true;
            }
        }
    }
    return false;
}
```

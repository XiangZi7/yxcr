## 解法




### 方法一：DFS



> **思考**
>
> 被包围的 `'O'` 要改成 `'X'`，与边界连通的 `'O'` 必须保留。 $m,n\le 200$。从内部出发判断「是否被围住」要处理整片连通块，且边界情况容易漏。
>
> 与其找被围住的，不如标记与边界相连的：从四条边上的 `'O'` 做 DFS，能走到的都先改成占位，其余 `'O'` 一律变成 `'X'`，占位再改回 `'O'`。



我们可以从矩阵的边界开始，将矩阵边界上的每个 `O` 作为起始点，开始进行深度优先搜索。将搜索到的 `O` 全部替换成 `.`。

然后我们再遍历这个矩阵，对于每个位置：

- 如果是 `.`，则替换成 `O`；
- 否则如果是 `O`，则替换成 `X`。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是矩阵的行数和列数。




#### Python3


```python
class Solution:
    def solve(self, board: List[List[str]]) -> None:
        def dfs(i: int, j: int):
            if not (0 <= i < m and 0 <= j < n and board[i][j] == "O"):
                return
            board[i][j] = "."
            for a, b in pairwise((-1, 0, 1, 0, -1)):
                dfs(i + a, j + b)

        m, n = len(board), len(board[0])
        for i in range(m):
            dfs(i, 0)
            dfs(i, n - 1)
        for j in range(n):
            dfs(0, j)
            dfs(m - 1, j)
        for i in range(m):
            for j in range(n):
                if board[i][j] == ".":
                    board[i][j] = "O"
                elif board[i][j] == "O":
                    board[i][j] = "X"
```


#### TypeScript


```ts
function solve(board: string[][]): void {
    const m = board.length;
    const n = board[0].length;
    const dirs: number[] = [-1, 0, 1, 0, -1];
    const dfs = (i: number, j: number): void => {
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== 'O') {
            return;
        }
        board[i][j] = '.';
        for (let k = 0; k < 4; ++k) {
            dfs(i + dirs[k], j + dirs[k + 1]);
        }
    };
    for (let i = 0; i < m; ++i) {
        dfs(i, 0);
        dfs(i, n - 1);
    }
    for (let j = 0; j < n; ++j) {
        dfs(0, j);
        dfs(m - 1, j);
    }
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (board[i][j] === '.') {
                board[i][j] = 'O';
            } else if (board[i][j] === 'O') {
                board[i][j] = 'X';
            }
        }
    }
}
```


### 方法二：并查集



> **思考**
>
> 方法一用 DFS 染色区分「与边界连通」。并查集把相邻 `'O'` 连成块，并另设一个超级节点连上所有边界 `'O'`。最后不与超级节点同根的 `'O'` 即被包围。避免递归栈，连通关系更直观。



我们也可以使用并查集，将矩阵边界上的每个 `O` 与一个超级节点 $m \times n$ 相连，将矩阵中的每个 `O` 与其上下左右的 `O` 相连。

然后我们遍历这个矩阵，对于每个位置，如果是 `O`，并且其与超级节点不相连，则将其替换成 `X`。

时间复杂度 $O(m \times n \times \alpha(m \times n))$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是矩阵的行数和列数， $\alpha$ 是阿克曼函数的反函数。




#### Python3


```python
class Solution:
    def solve(self, board: List[List[str]]) -> None:
        def find(x: int) -> int:
            if p[x] != x:
                p[x] = find(p[x])
            return p[x]

        m, n = len(board), len(board[0])
        p = list(range(m * n + 1))
        for i in range(m):
            for j in range(n):
                if board[i][j] == "O":
                    if i in (0, m - 1) or j in (0, n - 1):
                        p[find(i * n + j)] = find(m * n)
                    else:
                        for a, b in pairwise((-1, 0, 1, 0, -1)):
                            x, y = i + a, j + b
                            if board[x][y] == "O":
                                p[find(x * n + y)] = find(i * n + j)
        for i in range(m):
            for j in range(n):
                if board[i][j] == "O" and find(i * n + j) != find(m * n):
                    board[i][j] = "X"
```


#### TypeScript


```ts
function solve(board: string[][]): void {
    const m = board.length;
    const n = board[0].length;
    const p: number[] = Array(m * n + 1)
        .fill(0)
        .map((_, i) => i);
    const dirs: number[] = [-1, 0, 1, 0, -1];
    const find = (x: number): number => {
        if (p[x] !== x) {
            p[x] = find(p[x]);
        }
        return p[x];
    };
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (board[i][j] === 'O') {
                if (i === 0 || i === m - 1 || j === 0 || j === n - 1) {
                    p[find(i * n + j)] = find(m * n);
                } else {
                    for (let k = 0; k < 4; ++k) {
                        const [x, y] = [i + dirs[k], j + dirs[k + 1]];
                        if (board[x][y] === 'O') {
                            p[find(x * n + y)] = find(i * n + j);
                        }
                    }
                }
            }
        }
    }
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (board[i][j] === 'O' && find(i * n + j) !== find(m * n)) {
                board[i][j] = 'X';
            }
        }
    }
}
```

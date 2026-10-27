## 解法




### 方法一：分类讨论



> **思考**
>
> 判断 $3\times 3$ 是否可能由 X 先手的对局得到。格子很少，用棋子数与谁已连线约束即可，不必回溯整局。
>
> X 比 O 多 $0$ 或 $1$ 枚。X 获胜时必须恰好多一枚（刚落下），O 获胜时枚数必须相等。两者同时按规则获胜会被这些计数排除。



我们先统计当前棋盘上 `'X'` 和 `'O'` 的数量，记为 $x$ 和 $o$。接下来，我们分情况讨论：

- 如果 $x \neq o$ 且 $x - 1 \neq o$，则当前棋盘不可能是有效棋盘，返回 `false`。
- 如果当前棋盘上玩家 1 获胜，但 $x-1 \neq o$，则当前棋盘不可能是有效棋盘，返回 `false`。
- 如果当前棋盘上玩家 2 获胜，但 $x \neq o$，则当前棋盘不可能是有效棋盘，返回 `false`。
- 其他情况下，当前棋盘是有效棋盘，返回 `true`。

时间复杂度 $O(C)$，空间复杂度 $O(1)$。其中 $C$ 是棋盘上的格子数。本题中 $C = 9$。




#### Python3


```python
class Solution:
    def validTicTacToe(self, board: List[str]) -> bool:
        def win(x):
            for i in range(3):
                if all(board[i][j] == x for j in range(3)):
                    return True
                if all(board[j][i] == x for j in range(3)):
                    return True
            if all(board[i][i] == x for i in range(3)):
                return True
            return all(board[i][2 - i] == x for i in range(3))

        x = sum(board[i][j] == 'X' for i in range(3) for j in range(3))
        o = sum(board[i][j] == 'O' for i in range(3) for j in range(3))
        if x != o and x - 1 != o:
            return False
        if win('X') and x - 1 != o:
            return False
        return not (win('O') and x != o)
```


#### JavaScript


```js
/**
 * @param {string[]} board
 * @return {boolean}
 */
var validTicTacToe = function (board) {
    function count(x) {
        let cnt = 0;
        for (const row of board) {
            for (const c of row) {
                cnt += c == x;
            }
        }
        return cnt;
    }
    function win(x) {
        for (let i = 0; i < 3; ++i) {
            if (board[i][0] == x && board[i][1] == x && board[i][2] == x) {
                return true;
            }
            if (board[0][i] == x && board[1][i] == x && board[2][i] == x) {
                return true;
            }
        }
        if (board[0][0] == x && board[1][1] == x && board[2][2] == x) {
            return true;
        }
        return board[0][2] == x && board[1][1] == x && board[2][0] == x;
    }
    const [x, o] = [count('X'), count('O')];
    if (x != o && x - 1 != o) {
        return false;
    }
    if (win('X') && x - 1 != o) {
        return false;
    }
    return !(win('O') && x != o);
};
```

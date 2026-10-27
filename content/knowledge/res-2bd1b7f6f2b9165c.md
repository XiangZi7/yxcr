## 解法




### 方法一：规律观察 + 状态压缩



> **思考**
>
> 只允许整行整列交换，要变成棋盘染色。 $n\le 30$，枚举交换序列不可行。合法棋盘的行只能有两种且互为取反，列同理，且 $0/1$ 个数各半（或差一）。
>
> 用第一行、第一列的比特掩码代表这两种模式，其余行/列必须等于它或它的取反，否则无解。
>
> 再按奇偶分别计算把第一行（列）调成 $0101\ldots$ 或 $1010\ldots$ 的交换次数，取合法较小值。行、列次数相加。



在一个有效的棋盘中，有且仅有两种“行”。

例如，如果棋盘中有一行为“01010011”，那么任何其它行只能为“01010011”或者“10101100”。列也满足这种性质。

另外，每一行和每一列都有一半 $0$ 和一半 $1$。假设棋盘为 $n \times n$：

- 若 $n = 2 \times k$，则每一行和每一列都有 $k$ 个 $1$ 和 $k$ 个 $0$。
- 若 $n = 2 \times k + 1$，则每一行都有 $k$ 个 $1$ 和 $k + 1$ 个 $0$，或者 $k + 1$ 个 $1$ 和 $k$ 个 $0$。

基于以上的结论，我们可以判断一个棋盘是否有效。若有效，可以计算出最小的移动次数。

若 $n$ 为偶数，最终的合法棋盘有两种可能，即第一行的元素为“010101...”，或者“101010...”。我们计算出这两种可能所需要交换的次数的较小值作为答案。

若 $n$ 为奇数，那么最终的合法棋盘只有一种可能。如果第一行中 $0$ 的数目大于 $1$，那么最终一盘的第一行只能是“01010...”，否则就是“10101...”。同样算出次数作为答案。

时间复杂度 $O(n^2)$，其中 $n$ 是棋盘的大小。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def movesToChessboard(self, board: List[List[int]]) -> int:
        def f(mask, cnt):
            ones = mask.bit_count()
            if n & 1:
                if abs(n - 2 * ones) != 1 or abs(n - 2 * cnt) != 1:
                    return -1
                if ones == n // 2:
                    return n // 2 - (mask & 0xAAAAAAAA).bit_count()
                return (n + 1) // 2 - (mask & 0x55555555).bit_count()
            else:
                if ones != n // 2 or cnt != n // 2:
                    return -1
                cnt0 = n // 2 - (mask & 0xAAAAAAAA).bit_count()
                cnt1 = n // 2 - (mask & 0x55555555).bit_count()
                return min(cnt0, cnt1)

        n = len(board)
        mask = (1 << n) - 1
        rowMask = colMask = 0
        for i in range(n):
            rowMask |= board[0][i] << i
            colMask |= board[i][0] << i
        revRowMask = mask ^ rowMask
        revColMask = mask ^ colMask
        sameRow = sameCol = 0
        for i in range(n):
            curRowMask = curColMask = 0
            for j in range(n):
                curRowMask |= board[i][j] << j
                curColMask |= board[j][i] << j
            if curRowMask not in (rowMask, revRowMask) or curColMask not in (
                colMask,
                revColMask,
            ):
                return -1
            sameRow += curRowMask == rowMask
            sameCol += curColMask == colMask
        t1 = f(rowMask, sameRow)
        t2 = f(colMask, sameCol)
        return -1 if t1 == -1 or t2 == -1 else t1 + t2
```

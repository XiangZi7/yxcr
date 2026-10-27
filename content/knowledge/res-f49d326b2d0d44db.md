## 解法




### 方法一：模拟



> **思考**
>
> $m,n \le 50$，可直接建矩阵并对每次操作把整行整列加一，最后数奇数。模拟忠实于题意，作为后续优化的参照。



我们创建一个矩阵 $g$ 来存放操作的结果。对于 $\textit{indices}$ 中的每一对 $(r_i, c_i)$，我们将矩阵第 $r_i$ 行的所有数加 $1$，第 $c_i$ 列的所有元素加 $1$。

模拟结束后，遍历矩阵，统计奇数的个数。

时间复杂度 $O(k \times (m + n) + m \times n)$，空间复杂度 $O(m \times n)$。其中 $k$ 为 $\textit{indices}$ 的长度。




#### Python3


```python
class Solution:
    def oddCells(self, m: int, n: int, indices: List[List[int]]) -> int:
        g = [[0] * n for _ in range(m)]
        for r, c in indices:
            for i in range(m):
                g[i][c] += 1
            for j in range(n):
                g[r][j] += 1
        return sum(v % 2 for row in g for v in row)
```


### 方法二：空间优化



> **思考**
>
> 方法一每次改 $O(m+n)$ 个格子，并占用整张表。格子 $(i,j)$ 的终值只是第 $i$ 行被点次数加第 $j$ 列被点次数。用两个一维数组记录行、列增量，最后枚举格子看奇偶，空间降为 $O(m+n)$。



我们可以使用行数组 $\textit{row}$ 和列数组 $\textit{col}$ 来记录每一行、每一列被增加的次数。对于 $\textit{indices}$ 中的每一对 $(r_i, c_i)$，我们将 $\textit{row}[r_i]$ 和 $\textit{col}[c_i]$ 分别加 $1$。

操作结束后，可以算出 $(i, j)$ 位置的计数为 $\textit{row}[i]+\textit{col}[j]$。遍历矩阵，统计奇数的个数。

时间复杂度 $O(k + m \times n)$，空间复杂度 $O(m + n)$。其中 $k$ 为 $\textit{indices}$ 的长度。




#### Python3


```python
class Solution:
    def oddCells(self, m: int, n: int, indices: List[List[int]]) -> int:
        row = [0] * m
        col = [0] * n
        for r, c in indices:
            row[r] += 1
            col[c] += 1
        return sum((i + j) % 2 for i in row for j in col)
```


### 方法三：数学优化



> **思考**
>
> 方法二仍枚举全部格子。 $(i,j)$ 为奇数当且仅当行增量与列增量一奇一偶。统计奇行数 $cnt1$、奇列数 $cnt2$，奇数个数为 $cnt1(n-cnt2)+cnt2(m-cnt1)$，时间降到 $O(k+m+n)$。



我们注意到，只有当 $\textit{row}[i]$ 和 $\textit{col}[j]$ 中恰好为“一奇一偶”时，矩阵 $(i, j)$ 位置的数才会是奇数。

我们统计 $\textit{row}$ 中的奇数个数，记为 $\textit{cnt1}$；而 $\textit{col}$ 中的奇数个数，记为 $\textit{cnt2}$。那么最终得到的奇数个数为 $\textit{cnt1} \times (n - \textit{cnt2}) + \textit{cnt2} \times (m - \textit{cnt1})$。

时间复杂度 $O(k + m + n)$，空间复杂度 $O(m + n)$。其中 $k$ 为 $\textit{indices}$ 的长度。




#### Python3


```python
class Solution:
    def oddCells(self, m: int, n: int, indices: List[List[int]]) -> int:
        row = [0] * m
        col = [0] * n
        for r, c in indices:
            row[r] += 1
            col[c] += 1
        cnt1 = sum(v % 2 for v in row)
        cnt2 = sum(v % 2 for v in col)
        return cnt1 * (n - cnt2) + cnt2 * (m - cnt1)
```

## 解法




### 方法一：BFS



> **思考**
>
> 按曼哈顿距离对 $rows\times cols$ 个格子排序即可， $r,c\le 100$ 时 $O(rc\log(rc))$ 可过。距离为 $d$ 的格子恰好组成以中心为原点的菱形，按层扩展不必比较距离。
>
> 从 $(rCenter,cCenter)$ 做广度优先，每一层的格子距离比上一层恰好多 $1$，出队顺序就是题目要求的顺序。
>
> 用队列与访问标记避免重复入队，扫完所有格子即得答案。



我们定义一个队列 $q$，初始时将坐标点 $(rCenter, cCenter)$ 入队，用一个二维布尔数组 $vis$ 记录已经访问过的点，初始时 $vis[rCenter][cCenter]$ 为 $true$。

接下来，我们不断地从队列中取出一个点，将其加入答案数组，然后将其上下左右四个相邻点加入队列，注意要判断这些点是否已经访问过，如果没有访问过，就将其标记为已访问，并将其加入队列。一直重复这个过程，直到队列为空，此时答案数组中的点就是按照距离从小到大的顺序排列的。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是矩阵的行数和列数。




#### Python3


```python
class Solution:
    def allCellsDistOrder(
        self, rows: int, cols: int, rCenter: int, cCenter: int
    ) -> List[List[int]]:
        q = deque([[rCenter, cCenter]])
        vis = [[False] * cols for _ in range(rows)]
        vis[rCenter][cCenter] = True
        ans = []
        while q:
            for _ in range(len(q)):
                p = q.popleft()
                ans.append(p)
                for a, b in pairwise((-1, 0, 1, 0, -1)):
                    x, y = p[0] + a, p[1] + b
                    if 0 <= x < rows and 0 <= y < cols and not vis[x][y]:
                        vis[x][y] = True
                        q.append([x, y])
        return ans
```

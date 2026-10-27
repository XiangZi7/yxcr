## 解法




### 方法一：BFS



> **思考**
>
> $2\times 3$ 棋盘状态只有 $720$ 种，空格四向滑动求最少步数，即无权最短路。把局面编成六字符便于入队去重。
>
> 每次还原棋盘、找到 $0$ 的位置、交换生成邻居。第一次到达 `123450` 的层数即答案，搜完则无解。



将棋盘编码成字符串，从初始局面广搜所有合法移动，首次到达 `123450` 即为最少步数。




#### Python3


```python
class Solution:
    def slidingPuzzle(self, board: List[List[int]]) -> int:
        t = [None] * 6

        def gets():
            for i in range(2):
                for j in range(3):
                    t[i * 3 + j] = str(board[i][j])
            return ''.join(t)

        def setb(s):
            for i in range(2):
                for j in range(3):
                    board[i][j] = int(s[i * 3 + j])

        def f():
            res = []
            i, j = next((i, j) for i in range(2) for j in range(3) if board[i][j] == 0)
            for a, b in [[0, -1], [0, 1], [1, 0], [-1, 0]]:
                x, y = i + a, j + b
                if 0 <= x < 2 and 0 <= y < 3:
                    board[i][j], board[x][y] = board[x][y], board[i][j]
                    res.append(gets())
                    board[i][j], board[x][y] = board[x][y], board[i][j]
            return res

        start = gets()
        end = "123450"
        if start == end:
            return 0
        vis = {start}
        q = deque([(start)])
        ans = 0
        while q:
            ans += 1
            for _ in range(len(q)):
                x = q.popleft()
                setb(x)
                for y in f():
                    if y == end:
                        return ans
                    if y not in vis:
                        vis.add(y)
                        q.append(y)
        return -1
```


### 方法二：A* 算法



> **思考**
>
> 全状态 BFS 已经很小。先用逆序对奇偶剪掉不可达局面，再用曼哈顿距离作可采纳启发，优先扩展更接近目标的状态。
>
> 堆键为 $f+\textit{dist}$，终点首次出堆即为最短路。



先判断逆序对奇偶性是否可达，再用曼哈顿距离作启发，优先扩展更接近目标的局面。




#### Python3


```python
class Solution:
    def slidingPuzzle(self, board: List[List[int]]) -> int:
        m, n = 2, 3
        seq = []
        start, end = '', '123450'
        for i in range(m):
            for j in range(n):
                if board[i][j] != 0:
                    seq.append(board[i][j])
                start += str(board[i][j])

        def check(seq):
            n = len(seq)
            cnt = sum(seq[i] > seq[j] for i in range(n) for j in range(i, n))
            return cnt % 2 == 0

        def f(s):
            ans = 0
            for i in range(m * n):
                if s[i] != '0':
                    num = ord(s[i]) - ord('1')
                    ans += abs(i // n - num // n) + abs(i % n - num % n)
            return ans

        if not check(seq):
            return -1
        q = [(f(start), start)]
        dist = {start: 0}
        while q:
            _, state = heappop(q)
            if state == end:
                return dist[state]
            p1 = state.index('0')
            i, j = p1 // n, p1 % n
            s = list(state)
            for a, b in [[0, -1], [0, 1], [1, 0], [-1, 0]]:
                x, y = i + a, j + b
                if 0 <= x < m and 0 <= y < n:
                    p2 = x * n + y
                    s[p1], s[p2] = s[p2], s[p1]
                    next = ''.join(s)
                    s[p1], s[p2] = s[p2], s[p1]
                    if next not in dist or dist[next] > dist[state] + 1:
                        dist[next] = dist[state] + 1
                        heappush(q, (dist[next] + f(next), next))
        return -1
```

## 解法




### 方法一：BFS



> **思考**
>
> 每次交换 $s1$ 中两个字符，使之变成 $s2$，求最少次数。二者为异位词且长度 $\le 20$，字母种类很少，应把整串当状态做 BFS。
>
> 扩展时只交换「当前第一处不匹配」与后面某个能补上该位的字符，避免无用交换。层数即最少交换次数。



本题实际上是一类经典的问题：求解最小操作次数。从一个初始状态 $s_1$，经过最少 $k$ 次状态转换，变成目标状态 $s_2$。字符串长度不超过 $20$，我们考虑使用 BFS 搜索来求解。

首先将初始状态 $s_1$ 入队，用哈希表 `vis` 记录所有访问过的状态。

接下来每一轮，都是将队列中的所有状态转换到下一个状态，当遇到目标状态 $s_2$ 时，当前状态转换的轮数就是答案。

我们发现，题目的重点在于如何进行状态转换。对于本题，转换操作就是交换一个字符串中两个位置的字符。如果当前字符串 $s[i]$ 与 $s_2[i]$ 不相等，那么我们应该在 $s$ 中找到一个位置 $j$，满足 $s[j] = s_2[i]$ 并且 $s[j] \neq s_2[j]$，然后交换 $s[i]$ 和 $s[j]$。这样可以使得状态最接近于目标状态。这里的状态转换可以参考以下代码中的 `next()` 函数。

复杂度分析：BFS 剪枝不讨论时空复杂度。




#### Python3


```python
class Solution:
    def kSimilarity(self, s1: str, s2: str) -> int:
        def next(s):
            i = 0
            while s[i] == s2[i]:
                i += 1
            res = []
            for j in range(i + 1, n):
                if s[j] == s2[i] and s[j] != s2[j]:
                    res.append(s2[: i + 1] + s[i + 1 : j] + s[i] + s[j + 1 :])
            return res

        q = deque([s1])
        vis = {s1}
        ans, n = 0, len(s1)
        while 1:
            for _ in range(len(q)):
                s = q.popleft()
                if s == s2:
                    return ans
                for nxt in next(s):
                    if nxt not in vis:
                        vis.add(nxt)
                        q.append(nxt)
            ans += 1
```


### 方法二：A\* 算法（进阶）



> **思考**
>
> 普通 BFS 按层扩展，未匹配位数的一半是可采纳启发：一次交换最多修正两位。用 $dist+h$ 优先出队。
>
> 邻居生成与方法一相同，松弛条件仍是边权 $1$。启发不会高估，最优性保持，错位较少的串会更早出队。



A\* 搜索算法（A\* 读作 A-star），简称 A\* 算法，是一种在图形平面上，对于有多个节点的路径求出最低通过成本的算法。它属于图遍历和最佳优先搜索算法（英文：Best-first search），亦是 BFS 的改进。

A\* 算法主要步骤如下：

1. 将方法一中的 BFS 队列转换为优先队列（小根堆）；
1. 队列中的每个元素为 `(dist[s] + f(s), s)`，`dist[s]` 表示从初始状态 $s_1$ 到当前状态 $s$ 的距离，`f(s)` 表示从当前状态 $s$ 到目标状态 $s_2$ 的估计距离，这两个距离之和作为堆排序的依据；
1. 当终点第一次出队时，说明找到了从起点 $s_1$ 到终点 $s_2$ 的最短路径，直接返回对应的距离；
1. `f(s)` 是估价函数，并且估价函数要满足 `f(s) <= g(s)`，其中 `g(s)` 表示 $s$ 到终点 $s_2$ 的真实距离；

需要注意的是，A\* 算法只能保证终点第一次出队时，即找到了一条从起点到终点的最小路径，不能保证其他点出队时也是从起点到当前点的最短路径。

复杂度分析：启发式搜索不讨论时空复杂度。




#### Python3


```python
class Solution:
    def kSimilarity(self, s1: str, s2: str) -> int:
        def f(s):
            cnt = sum(c != s2[i] for i, c in enumerate(s))
            return (cnt + 1) >> 1

        def next(s):
            i = 0
            while s[i] == s2[i]:
                i += 1
            res = []
            for j in range(i + 1, n):
                if s[j] == s2[i] and s[j] != s2[j]:
                    res.append(s2[: i + 1] + s[i + 1 : j] + s[i] + s[j + 1 :])
            return res

        q = [(f(s1), s1)]
        dist = {s1: 0}
        n = len(s1)
        while 1:
            _, s = heappop(q)
            if s == s2:
                return dist[s]
            for nxt in next(s):
                if nxt not in dist or dist[nxt] > dist[s] + 1:
                    dist[nxt] = dist[s] + 1
                    heappush(q, (dist[nxt] + f(nxt), nxt))
```

## 解法




### 方法一：并查集



> **思考**
>
> 左右孩子数组描述 $n$ 个节点，判断是否恰为一棵二叉树。非法情形是多父、成环或不止一个连通块。并查集在连边时检测：孩子已有父、或两端已连通（成环）则失败；成功则合并并减少分量。最后分量必须为 $1$。



我们可以遍历每个节点 $i$ 以及对应的左右孩子 $l$, $r$，用 $vis$ 数组记录节点是否有父节点：

- 若孩子节点已存在父节点，说明有多个父亲，不满足条件，直接返回 `false`。
- 若孩子节点与父节点已经处于同一个连通分量，说明会形成环，不满足条件，直接返回 `false`。
- 否则，进行合并，并且将 $vis$ 数组对应位置置为 `true`，同时将连通分量个数减去 $1$。

遍历结束，判断并查集中连通分量个数是否为 $1$，若是返回 `true`，否则返回 `false`。

时间复杂度 $O(n \times \alpha(n))$，空间复杂度 $O(n)$。其中 $n$ 为节点个数，而 $\alpha(n)$ 为阿克曼函数的反函数，即反阿克曼函数，其值小于 $5$。




#### Python3


```python
class Solution:
    def validateBinaryTreeNodes(
        self, n: int, leftChild: List[int], rightChild: List[int]
    ) -> bool:
        def find(x: int) -> int:
            if p[x] != x:
                p[x] = find(p[x])
            return p[x]

        p = list(range(n))
        vis = [False] * n
        for i, (a, b) in enumerate(zip(leftChild, rightChild)):
            for j in (a, b):
                if j != -1:
                    if vis[j] or find(i) == find(j):
                        return False
                    p[find(i)] = find(j)
                    vis[j] = True
                    n -= 1
        return n == 1
```


### 方法二：入度统计 + BFS



> **思考**
>
> 并查集要维护父标记与分量。改为先数入度：没有入度 $0$ 则无根；有则从该根 BFS，遇已访问孩子说明多父或环，最后访问数须等于 $n$。无需并查数组。



我们可以先统计每个节点的入度，即有多少个父节点指向它。若不存在入度为 $0$ 的节点，说明图中存在环，直接返回 `false`；否则，该节点即为根节点。

接下来，从根节点出发进行广度优先搜索。遍历过程中，若某个子节点已被访问过，说明该节点有多个父节点或图中存在环，直接返回 `false`。

遍历结束后，判断访问过的节点数是否等于 $n$，若是则说明所有节点构成且仅构成一棵有效的二叉树，返回 `true`，否则返回 `false`。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为节点个数。




#### Python3


```python
class Solution:
    def validateBinaryTreeNodes(
        self, n: int, leftChild: List[int], rightChild: List[int]
    ) -> bool:
        indeg = [0] * n
        for c in chain(leftChild, rightChild):
            if c != -1:
                indeg[c] += 1
        root = next((i for i, x in enumerate(indeg) if x == 0), -1)
        if root == -1:
            return False
        q = deque([root])
        vis = {root}
        while q:
            i = q.popleft()
            for j in (leftChild[i], rightChild[i]):
                if j != -1:
                    if j in vis:
                        return False
                    vis.add(j)
                    q.append(j)
        return len(vis) == n
```

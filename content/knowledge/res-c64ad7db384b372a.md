## 解法




### 方法一：染色法



> **思考**
>
> 互讨厌的人不能同组，即嫌恶图是否二分。 $n\le 2000$，染色 DFS 即可：相邻必须异色，遇同色则失败。
>
> 对每个未染色点染成 $1$，沿边染成 $3-c$。全部连通块都成功则可以划分。



我们用两种颜色对图进行染色，如果可以完成染色，那么就说明可以将所有人分进两组。

具体的染色方法如下：

- 初始化所有人的颜色为 $0$，表示还没有染色。
- 遍历所有人，如果当前人没有染色，那么就用颜色 $1$ 对其进行染色，然后将其所有不喜欢的人用颜色 $2$ 进行染色。如果染色过程中出现了冲突，那么就说明无法将所有人分进两组，返回 `false`。
- 如果所有人都染色成功，那么就说明可以将所有人分进两组，返回 `true`。

时间复杂度 $O(n + m)$，其中 $n$, $m$ 分别是人数和不喜欢的关系数。




#### Python3


```python
class Solution:
    def possibleBipartition(self, n: int, dislikes: List[List[int]]) -> bool:
        def dfs(i, c):
            color[i] = c
            for j in g[i]:
                if color[j] == c:
                    return False
                if color[j] == 0 and not dfs(j, 3 - c):
                    return False
            return True

        g = defaultdict(list)
        color = [0] * n
        for a, b in dislikes:
            a, b = a - 1, b - 1
            g[a].append(b)
            g[b].append(a)
        return all(c or dfs(i, 1) for i, c in enumerate(color))
```


#### TypeScript


```ts
function possibleBipartition(n: number, dislikes: number[][]): boolean {
    const color = new Array(n + 1).fill(0);
    const g = Array.from({ length: n + 1 }, () => []);
    const dfs = (i: number, v: number) => {
        color[i] = v;
        for (const j of g[i]) {
            if (color[j] === color[i] || (color[j] === 0 && dfs(j, 3 ^ v))) {
                return true;
            }
        }
        return false;
    };
    for (const [a, b] of dislikes) {
        g[a].push(b);
        g[b].push(a);
    }
    for (let i = 1; i <= n; i++) {
        if (color[i] === 0 && dfs(i, 1)) {
            return false;
        }
    }
    return true;
}
```


### 方法二：并查集



> **思考**
>
> 方法一已经用显式栈完成染色。并查集不保存颜色，而是把必须同组的人合并：一个人讨厌的所有对象应当彼此同组，并且不能和这个人自己同组。若发现自己与某个讨厌对象已经在同一集合则失败，否则把这些讨厌对象合并到同一代表下。



并查集是一种树形的数据结构，顾名思义，它用于处理一些不交集的**合并**及**查询**问题。 它支持两种操作：

1. 查找（Find）：确定某个元素处于哪个子集，单次操作时间复杂度 $O(\alpha(n))$
1. 合并（Union）：将两个子集合并成一个集合，单次操作时间复杂度 $O(\alpha(n))$

其中 $\alpha$ 为阿克曼函数的反函数，其增长极其缓慢，也就是说其单次操作的平均运行时间可以认为是一个很小的常数。

以下是并查集的常用模板，需要熟练掌握。其中：

- `n` 表示节点数
- `p` 存储每个点的父节点，初始时每个点的父节点都是自己
- `size` 只有当节点是祖宗节点时才有意义，表示祖宗节点所在集合中，点的数量
- `find(x)` 函数用于查找 $x$ 所在集合的祖宗节点
- `union(a, b)` 函数用于合并 $a$ 和 $b$ 所在的集合

```python
p = list(range(n))
size = [1] * n


def find(x):
    if p[x] != x:
        # 路径压缩
        p[x] = find(p[x])
    return p[x]


def union(a, b):
    pa, pb = find(a), find(b)
    if pa == pb:
        return
    p[pa] = pb
    size[pb] += size[pa]
```

对于本题，我们遍历每一个人，他与他不喜欢的人不应该在同一个集合中，如果在同一个集合中，就产生了冲突，直接返回 `false`。如果没有冲突，那么就将他所有不喜欢的人合并到同一个集合中。

遍历结束，说明没有冲突，返回 `true`。

时间复杂度 $O(n + m\times \alpha(n))$。




#### Python3


```python
class Solution:
    def possibleBipartition(self, n: int, dislikes: List[List[int]]) -> bool:
        def find(x):
            if p[x] != x:
                p[x] = find(p[x])
            return p[x]

        g = defaultdict(list)
        for a, b in dislikes:
            a, b = a - 1, b - 1
            g[a].append(b)
            g[b].append(a)
        p = list(range(n))
        for i in range(n):
            for j in g[i]:
                if find(i) == find(j):
                    return False
                p[find(j)] = find(g[i][0])
        return True
```


### 方法三：显式栈染色



> **思考**
>
> 互不喜欢的人不能同组，嫌恶关系构成无向图，问它是否二分。$n\le 2000$，沿一条嫌恶链递归时，调用深度等于人数，链长达到 $1000$ 就会超出 Python 的递归上限。二分图等价于能用两种颜色染色且每条边两端异色。因此用栈扩展连通块：未染色的人染成 $1$ 后入栈，弹出时若邻居已是同色则失败，若尚未染色就染成 $3$ 减去当前颜色再入栈。每个连通块都染完则可以分组。



用颜色 $0$、$1$、$2$ 表示未染色和两组。输入编号先减 $1$，图按下标 $0$ 存放。对每个颜色仍为 $0$ 的人，染成 $1$ 并压入栈。弹出 $i$ 时检查每个邻居 $j$：若 $j$ 与 $i$ 同色，返回 `false`；若 $j$ 还没染色，染成 $3$ 减去 $i$ 的颜色并压入栈。所有人都处理完则返回 `true`。

时间复杂度 $O(n + m)$，空间复杂度 $O(n + m)$，其中 $n$ 和 $m$ 分别是人数和不喜欢的关系数。




#### Python3


```python
class Solution:
    def possibleBipartition(self, n: int, dislikes: List[List[int]]) -> bool:
        g = defaultdict(list)
        for a, b in dislikes:
            a, b = a - 1, b - 1
            g[a].append(b)
            g[b].append(a)
        color = [0] * n
        for start in range(n):
            if color[start]:
                continue
            color[start] = 1
            stk = [start]
            while stk:
                i = stk.pop()
                for j in g[i]:
                    if color[j] == color[i]:
                        return False
                    if color[j] == 0:
                        color[j] = 3 - color[i]
                        stk.append(j)
        return True
```


#### TypeScript


```ts
function possibleBipartition(n: number, dislikes: number[][]): boolean {
    const g: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of dislikes) {
        g[a - 1].push(b - 1);
        g[b - 1].push(a - 1);
    }
    const color: number[] = new Array(n).fill(0);
    for (let start = 0; start < n; start++) {
        if (color[start] !== 0) {
            continue;
        }
        color[start] = 1;
        const stk: number[] = [start];
        while (stk.length) {
            const i = stk.pop()!;
            for (const j of g[i]) {
                if (color[j] === color[i]) {
                    return false;
                }
                if (color[j] === 0) {
                    color[j] = 3 - color[i];
                    stk.push(j);
                }
            }
        }
    }
    return true;
}
```

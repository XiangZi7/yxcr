## 解法




### 方法一：离线查询 + 并查集



> **思考**
>
> 多次询问两点之间是否存在所有边权都严格小于 $\textit{limit}$ 的路径。在线对每问重建图过慢，询问之间互相独立，可离线。
>
> 边与询问都按权/限制升序，双指针把权小于当前 $\textit{limit}$ 的边加入并查集，再查询两点是否同根。
>
> 用下标记下原询问顺序，填回答案数组。



根据题目要求，我们需要对每个查询 $queries[i]$ 进行判断，即判断当前查询的两个点 $a$ 和 $b$ 之间是否存在一条边权小于等于 $limit$ 的路径。

判断两点是否连通可以通过并查集来实现。另外，由于查询的顺序对结果没有影响，因此我们可以先将所有查询按照 $limit$ 从小到大排序，所有边也按照边权从小到大排序。

然后对于每个查询，我们从边权最小的边开始，将边权严格小于 $limit$ 的所有边加入并查集，接着利用并查集的查询操作判断两点是否连通即可。

时间复杂度 $O(m \times \log m + q \times \log q)$，其中 $m$ 和 $q$ 分别为边数和查询数。




#### Python3


```python
class Solution:
    def distanceLimitedPathsExist(
        self, n: int, edgeList: List[List[int]], queries: List[List[int]]
    ) -> List[bool]:
        def find(x):
            if p[x] != x:
                p[x] = find(p[x])
            return p[x]

        p = list(range(n))
        edgeList.sort(key=lambda x: x[2])
        j = 0
        ans = [False] * len(queries)
        for i, (a, b, limit) in sorted(enumerate(queries), key=lambda x: x[1][2]):
            while j < len(edgeList) and edgeList[j][2] < limit:
                u, v, _ = edgeList[j]
                p[find(u)] = find(v)
                j += 1
            ans[i] = find(a) == find(b)
        return ans
```


#### Python3


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

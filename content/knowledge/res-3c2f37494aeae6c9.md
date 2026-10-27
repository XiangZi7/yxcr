## 解法




### 方法一：排序 + 并查集



> **思考**
>
> 秩由同行同列中更小的值决定，相同值还必须同秩。若无重复，按值从小到大扫描、取所在行与列已有最大秩加一即可； $m,n \le 500$ 且存在重复时，同值可能通过「同行/同列」连锁。
>
> 把同一数值的格子按行、列并查（列编号平移 $m$），每个连通块共享「块内行、列最大秩加一」。
>
> 按值排序处理，用行、列最大秩数组更新答案后重置并查集，以免不同数值互相粘连。



我们先考虑简化情形：没有相同的元素。那么显然最小的元素的秩为 $1$，第二小的元素则要考虑是否和最小元素同行或同列。于是得到贪心解法：从小到大遍历元素，并维护每行、每列的最大秩，该元素的秩即为同行、同列的最大秩加 $1$。见题目：[2371. 最小化网格中的最大值](https://github.com/doocs/leetcode/blob/main/solution/2300-2399/2371.Minimize%20Maximum%20Value%20in%20a%20Grid/README.md)。

存在相同元素时则较为复杂，假设两个相同元素同行（或同列），那么就要考虑到两个元素分别对应的行（或列）的最大秩。同时还可能出现联动，比如元素 `a` 和 `b` 同行，`b` 和 `c` 同列，那么要同时考虑这三个元素。

这种联动容易想到并查集，于是我们用并查集将元素分为几个连通块，对于每个连通块，里面所有元素对应的行或列的最大秩加 $1$，即为该连通块内所有元素的秩。

时间复杂度 $O(m \times n \times \log(m \times n))$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别为矩阵的行数和列数。




#### Python3


```python
class UnionFind:
    def __init__(self, n):
        self.p = list(range(n))
        self.size = [1] * n

    def find(self, x):
        if self.p[x] != x:
            self.p[x] = self.find(self.p[x])
        return self.p[x]

    def union(self, a, b):
        pa, pb = self.find(a), self.find(b)
        if pa != pb:
            if self.size[pa] > self.size[pb]:
                self.p[pb] = pa
                self.size[pa] += self.size[pb]
            else:
                self.p[pa] = pb
                self.size[pb] += self.size[pa]

    def reset(self, x):
        self.p[x] = x
        self.size[x] = 1


class Solution:
    def matrixRankTransform(self, matrix: List[List[int]]) -> List[List[int]]:
        m, n = len(matrix), len(matrix[0])
        d = defaultdict(list)
        for i, row in enumerate(matrix):
            for j, v in enumerate(row):
                d[v].append((i, j))
        row_max = [0] * m
        col_max = [0] * n
        ans = [[0] * n for _ in range(m)]
        uf = UnionFind(m + n)
        for v in sorted(d):
            rank = defaultdict(int)
            for i, j in d[v]:
                uf.union(i, j + m)
            for i, j in d[v]:
                rank[uf.find(i)] = max(rank[uf.find(i)], row_max[i], col_max[j])
            for i, j in d[v]:
                ans[i][j] = row_max[i] = col_max[j] = 1 + rank[uf.find(i)]
            for i, j in d[v]:
                uf.reset(i)
                uf.reset(j + m)
        return ans
```

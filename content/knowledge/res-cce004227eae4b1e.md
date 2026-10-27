## 解法




### 方法一：模拟



> **思考**
>
> $m\le 10^3$，每次查询在长度为 $m$ 的排列中定位元素并移到队首，单次 $O(m)$，总体 $O(m^2)$ 可以通过。
>
> 用列表维护当前排列，`index` 得到位置后弹出并插入开头，按查询顺序记下这些位置。



题目数据规模不大，可以直接模拟。




#### Python3


```python
class Solution:
    def processQueries(self, queries: List[int], m: int) -> List[int]:
        p = list(range(1, m + 1))
        ans = []
        for v in queries:
            j = p.index(v)
            ans.append(j)
            p.pop(j)
            p.insert(0, v)
        return ans
```


#### TypeScript


```ts
function processQueries(queries: number[], m: number): number[] {
    const p = Array.from({ length: m }, (_, i) => i + 1);
    const ans: number[] = [];
    for (const v of queries) {
        const j = p.indexOf(v);
        ans.push(j);
        p.splice(j, 1);
        p.unshift(v);
    }
    return ans;
}
```








### 方法二：树状数组



> **思考**
>
> 方法一每次线性扫描定位，当查询次数与 $m$ 同阶时常数偏大。若能在 $O(\log(m+n))$ 内回答「某元素左侧还有多少个元素」，即可加速。
>
> 将初始排列放在一段下标 $[n+1,n+m]$ 上，每次把查询值搬到更靠前的空位。树状数组维护各位置是否占用，查询前缀和即得当前下标。



树状数组，也称作“二叉索引树”（Binary Indexed Tree）或 Fenwick 树。 它可以高效地实现如下两个操作：

1. **单点更新** `update(x, delta)`： 把序列 x 位置的数加上一个值 delta；
1. **前缀和查询** `query(x)`：查询序列 `[1,...x]` 区间的区间和，即位置 x 的前缀和。

这两个操作的时间复杂度均为 $O(\log n)$。

树状数组最基本的功能就是求比某点 x 小的点的个数（这里的比较是抽象的概念，可以是数的大小、坐标的大小、质量的大小等等）。

比如给定数组 `a[5] = {2, 5, 3, 4, 1}`，求 `b[i] = 位置 i 左边小于等于 a[i] 的数的个数`。对于此例，`b[5] = {0, 1, 1, 2, 0}`。

解决方案是直接遍历数组，每个位置先求出 `query(a[i])`，然后再修改树状数组 `update(a[i], 1)` 即可。当数的范围比较大时，需要进行离散化，即先进行去重并排序，然后对每个数字进行编号。




#### Python3


```python
class BinaryIndexedTree:
    def __init__(self, n):
        self.n = n
        self.c = [0] * (n + 1)

    @staticmethod
    def lowbit(x):
        return x & -x

    def update(self, x, delta):
        while x <= self.n:
            self.c[x] += delta
            x += BinaryIndexedTree.lowbit(x)

    def query(self, x):
        s = 0
        while x > 0:
            s += self.c[x]
            x -= BinaryIndexedTree.lowbit(x)
        return s


class Solution:
    def processQueries(self, queries: List[int], m: int) -> List[int]:
        n = len(queries)
        pos = [0] * (m + 1)
        tree = BinaryIndexedTree(m + n)
        for i in range(1, m + 1):
            pos[i] = n + i
            tree.update(n + i, 1)

        ans = []
        for i, v in enumerate(queries):
            j = pos[v]
            tree.update(j, -1)
            ans.append(tree.query(j))
            pos[v] = n - i
            tree.update(n - i, 1)
        return ans
```

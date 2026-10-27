## 解法




### 方法一：并查集



> **思考**
>
> 用已有线缆把 $n$ 台机器连成一个网络，每次操作搬动一条线。 $n$、 $m$ 可达 $10^5$，不宜反复建图试连。连通分量数为 $k$ 时，至少需要 $k-1$ 条多余边才能拼成一棵生成树。
>
> 并查集扫描边：两端已在同一集合则记为冗余，否则合并并减少分量。若冗余边少于 $k-1$，无法连通，返回 $-1$；否则答案为 $k-1$。



我们可以用并查集维护计算机之间的联通关系。遍历所有的连接，对于每个连接 $(a, b)$，如果 $a$ 和 $b$ 已经联通，那么这个连接是多余的，我们将多余的连接数加一；否则，我们将 $a$ 和 $b$ 连通，然后将联通分量数减一。

最后，如果联通分量数减一大于多余的连接数，说明我们无法使所有计算机联通，返回 -1；否则，返回联通分量数减一。

时间复杂度 $O(m \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 和 $m$ 分别是计算机的数量和连接的数量。




#### Python3


```python
class Solution:
    def makeConnected(self, n: int, connections: List[List[int]]) -> int:
        def find(x: int) -> int:
            if p[x] != x:
                p[x] = find(p[x])
            return p[x]

        cnt = 0
        p = list(range(n))
        for a, b in connections:
            pa, pb = find(a), find(b)
            if pa == pb:
                cnt += 1
            else:
                p[pa] = pb
                n -= 1
        return -1 if n - 1 > cnt else n - 1
```


#### TypeScript


```ts
function makeConnected(n: number, connections: number[][]): number {
    const p: number[] = Array.from({ length: n }, (_, i) => i);
    const find = (x: number): number => {
        if (p[x] !== x) {
            p[x] = find(p[x]);
        }
        return p[x];
    };
    let cnt = 0;
    for (const [a, b] of connections) {
        const [pa, pb] = [find(a), find(b)];
        if (pa === pb) {
            ++cnt;
        } else {
            p[pa] = pb;
            --n;
        }
    }
    return cnt >= n - 1 ? n - 1 : -1;
}
```

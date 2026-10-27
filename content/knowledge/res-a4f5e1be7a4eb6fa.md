## 解法




### 方法一：欧拉路径



> **思考**
>
> 每张机票用且仅用一次，行程字典序最小。这是有向图的欧拉路径，Hierholzer 从 `JFK` 出发即可。
>
> 先按终点逆序存边，弹出时即得字典序最小的下一条。后序把结点写入答案再反转，保证死胡同先记下、主干后走。题目保证有解。



题目实际上是给定 $n$ 个点和 $m$ 条边，要求从指定的起点出发，经过所有的边恰好一次，使得路径字典序最小。这是一个典型的欧拉路径问题。

由于本题保证了至少存在一种合理的行程，因此，我们直接利用 Hierholzer 算法，输出从起点出发的欧拉路径即可。

时间复杂度 $O(m \times \log m)$，空间复杂度 $O(m)$。其中 $m$ 是边的数量。




#### Python3


```python
class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        def dfs(f: str):
            while g[f]:
                dfs(g[f].pop())
            ans.append(f)

        g = defaultdict(list)
        for f, t in sorted(tickets, reverse=True):
            g[f].append(t)
        ans = []
        dfs("JFK")
        return ans[::-1]
```


#### TypeScript


```ts
function findItinerary(tickets: string[][]): string[] {
    const g: Record<string, string[]> = {};
    tickets.sort((a, b) => b[1].localeCompare(a[1]));
    for (const [f, t] of tickets) {
        g[f] = g[f] || [];
        g[f].push(t);
    }
    const ans: string[] = [];
    const dfs = (f: string) => {
        while (g[f] && g[f].length) {
            const t = g[f].pop()!;
            dfs(t);
        }
        ans.push(f);
    };
    dfs('JFK');
    return ans.reverse();
}
```

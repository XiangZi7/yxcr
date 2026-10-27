## 解法




### 方法一



> **思考**
>
> 已知 $a/b$ 的值，查询其他比值。建图后 BFS/DFS 求路径乘积即可，变量多时并查集带权更省。
>
> $w[x]$ 表示 $x$ 相对根的比值。`find` 路径压缩时把权乘到根。合并 $a/b=v$ 时按 $w[pa]=w[b]\cdot v/w[a]$ 接上。查询若不同根或不存在则 $-1$，否则 $w[c]/w[d]$。






#### Python3


```python
class Solution:
    def calcEquation(
        self, equations: List[List[str]], values: List[float], queries: List[List[str]]
    ) -> List[float]:
        def find(x):
            if p[x] != x:
                origin = p[x]
                p[x] = find(p[x])
                w[x] *= w[origin]
            return p[x]

        w = defaultdict(lambda: 1)
        p = defaultdict()
        for a, b in equations:
            p[a], p[b] = a, b
        for i, v in enumerate(values):
            a, b = equations[i]
            pa, pb = find(a), find(b)
            if pa == pb:
                continue
            p[pa] = pb
            w[pa] = w[b] * v / w[a]
        return [
            -1 if c not in p or d not in p or find(c) != find(d) else w[c] / w[d]
            for c, d in queries
        ]
```


#### TypeScript


```ts
function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
    const g: Record<string, [string, number][]> = {};
    const ans = Array.from({ length: queries.length }, () => -1);

    for (let i = 0; i < equations.length; i++) {
        const [a, b] = equations[i];
        (g[a] ??= []).push([b, values[i]]);
        (g[b] ??= []).push([a, 1 / values[i]]);
    }

    for (let i = 0; i < queries.length; i++) {
        const [c, d] = queries[i];
        const vis = new Set<string>();
        const q: [string, number][] = [[c, 1]];

        if (!g[c] || !g[d]) continue;
        if (c === d) {
            ans[i] = 1;
            continue;
        }

        for (const [current, v] of q) {
            if (vis.has(current)) continue;
            vis.add(current);

            for (const [intermediate, multiplier] of g[current]) {
                if (vis.has(intermediate)) continue;

                if (intermediate === d) {
                    ans[i] = v * multiplier;
                    break;
                }

                q.push([intermediate, v * multiplier]);
            }

            if (ans[i] !== -1) break;
        }
    }

    return ans;
}
```

## 解法




### 方法一：枚举



> **思考**
>
> 每个花园至多三条边，四种花，四色定理保证可染，不必回溯搜索。按编号依次给尚未使用的颜色即可。
>
> 先建邻接表，对花园 $x$ 收集邻居已用颜色，再在 $1..4$ 中取一个未用的写入。
>
> 一度至多为 $3$，总能找到一种颜色，一遍线性扫完。



我们先根据数组 $\textit{paths}$ 构建图 $g$，其中 $g[x]$ 表示与花园 $x$ 相邻的花园列表。

接下来，对于每个花园 $x$，我们先找出与 $x$ 相邻的花园 $y$，并将 $y$ 花园中种植的花的种类标记为已使用。然后我们从花的种类 $1$ 开始枚举，直到找到一个未被使用的花的种类 $c$，将 $c$ 标记为 $x$ 花园中种植的花的种类，然后继续枚举下一个花园。

枚举结束后，返回答案即可。

时间复杂度 $O(n + m)$，空间复杂度 $O(n + m)$。其中 $n$ 和 $m$ 分别是花园的数量和路径的数量。




#### Python3


```python
class Solution:
    def gardenNoAdj(self, n: int, paths: List[List[int]]) -> List[int]:
        g = defaultdict(list)
        for x, y in paths:
            x, y = x - 1, y - 1
            g[x].append(y)
            g[y].append(x)
        ans = [0] * n
        for x in range(n):
            used = {ans[y] for y in g[x]}
            for c in range(1, 5):
                if c not in used:
                    ans[x] = c
                    break
        return ans
```


#### TypeScript


```ts
function gardenNoAdj(n: number, paths: number[][]): number[] {
    const g: number[][] = Array.from({ length: n }, () => []);
    for (const [x, y] of paths) {
        g[x - 1].push(y - 1);
        g[y - 1].push(x - 1);
    }
    const ans: number[] = Array(n).fill(0);
    for (let x = 0; x < n; ++x) {
        const used: boolean[] = Array(5).fill(false);
        for (const y of g[x]) {
            used[ans[y]] = true;
        }
        for (let c = 1; c < 5; ++c) {
            if (!used[c]) {
                ans[x] = c;
                break;
            }
        }
    }
    return ans;
}
```

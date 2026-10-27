## 解法




### 方法一：DFS



> **思考**
>
> 在「更富有」构成的 DAG 上，每人要找自己及所有更富者中最安静的人。 $n\le 500$，对每个人做一次搜索会重复走同一子图。
>
> 建从穷人指向富人的边，记忆化 DFS：答案先取自己，再与所有更富邻居的答案比安静值。每个点只算一次，再按编号输出。



我们先用邻接表 $g$ 存储 $richer$ 数组中的信息，其中 $g[i]$ 表示所有比 $i$ 更有钱的人的集合。

然后对于每个人 $i$，我们用 DFS 遍历所有比 $i$ 更有钱的人，找到其中安静值最小的人，即为答案。

时间复杂度 $O(m + n)$，空间复杂度 $O(m + n)$。其中 $m$ 和 $n$ 分别为 $richer$ 数组和 $quiet$ 数组的长度。




#### Python3


```python
class Solution:
    def loudAndRich(self, richer: List[List[int]], quiet: List[int]) -> List[int]:
        def dfs(i: int):
            if ans[i] != -1:
                return
            ans[i] = i
            for j in g[i]:
                dfs(j)
                if quiet[ans[j]] < quiet[ans[i]]:
                    ans[i] = ans[j]

        g = defaultdict(list)
        for a, b in richer:
            g[b].append(a)
        n = len(quiet)
        ans = [-1] * n
        for i in range(n):
            dfs(i)
        return ans
```


#### TypeScript


```ts
function loudAndRich(richer: number[][], quiet: number[]): number[] {
    const n = quiet.length;
    const g: number[][] = new Array(n).fill(0).map(() => []);
    for (const [a, b] of richer) {
        g[b].push(a);
    }
    const ans: number[] = new Array(n).fill(-1);
    const dfs = (i: number) => {
        if (ans[i] != -1) {
            return ans;
        }
        ans[i] = i;
        for (const j of g[i]) {
            dfs(j);
            if (quiet[ans[j]] < quiet[ans[i]]) {
                ans[i] = ans[j];
            }
        }
    };
    for (let i = 0; i < n; ++i) {
        dfs(i);
    }
    return ans;
}
```

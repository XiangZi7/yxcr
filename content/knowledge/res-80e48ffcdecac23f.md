## 解法




### 方法一：回溯



> **思考**
>
> 需要统计满足「位置 $i$ 上的数 $j$ 能整除或被整除」的排列数。 $n \le 15$，全排列 $15!$ 不可行，但每个位置的合法数字很少。
>
> 先预处理每个位置可放的数字列表，再按位置回溯并标记已用数字。搜到 $n+1$ 即得到一个合法排列。剪枝把搜索限制在整除条件上，对本规模足够。



按位置枚举还能放的数字，满足整除条件则继续搜索。




#### Python3


```python
class Solution:
    def countArrangement(self, n: int) -> int:
        def dfs(i):
            nonlocal ans, n
            if i == n + 1:
                ans += 1
                return
            for j in match[i]:
                if not vis[j]:
                    vis[j] = True
                    dfs(i + 1)
                    vis[j] = False

        ans = 0
        vis = [False] * (n + 1)
        match = defaultdict(list)
        for i in range(1, n + 1):
            for j in range(1, n + 1):
                if j % i == 0 or i % j == 0:
                    match[i].append(j)

        dfs(1)
        return ans
```


#### TypeScript


```ts
function countArrangement(n: number): number {
    const vis = new Array(n + 1).fill(0);
    const match = Array.from({ length: n + 1 }, () => []);
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            if (i % j === 0 || j % i === 0) {
                match[i].push(j);
            }
        }
    }

    let res = 0;
    const dfs = (i: number, n: number) => {
        if (i === n + 1) {
            res++;
            return;
        }
        for (const j of match[i]) {
            if (!vis[j]) {
                vis[j] = true;
                dfs(i + 1, n);
                vis[j] = false;
            }
        }
    };
    dfs(1, n);
    return res;
}
```


### 方法二：状态压缩动态规划



> **思考**
>
> 回溯仍按排列树展开，存在重复子状态：已选集合相同、下一步位置相同，方案数应相同。 $n \le 15$ 可用 $2^n$ 子集表示已选数字。
>
> $f[i]$ 为已选集合 $i$ 的方案数。集合大小 $s$ 对应即将填充的位置，枚举未选且与 $s$ 满足整除关系的 $j$ 进行转移。 $f[0]=1$，目标为全集。避免了同一集合的重复搜索。



$f[i]$ 表示已选数字集合为 $i$ 的方案数，按集合大小依次转移。

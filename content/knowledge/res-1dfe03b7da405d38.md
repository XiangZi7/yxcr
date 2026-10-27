## 解法




### 方法一：动态规划（背包问题）



> **思考**
>
> 数位 $1$～ $9$ 各有花费，可重复使用，目标和为 $target$。要字典序最大的整数，应先让位数尽量多，同长度再尽量用大数字。
>
> $f[i][j]$ 为使用前 $i$ 种数位、花费恰为 $j$ 的最大位数，完全背包转移；用 $g[i][j]$ 记录是否选取数字 $i$，以便从大到小回溯。无法凑成则返回 `0`。



我们定义 $f[i][j]$ 表示使用前 $i$ 个数位，花费恰好为 $j$ 的情况下，能够得到的最大位数。初始时， $f[0][0]=0$，其余为 $-\infty$。

考虑 $f[i][j]$，第 $i$ 个数的花费为 $c = cost[i-1]$，如果 $j \lt c$，那么我们无法选取第 $i$ 个数位，此时有 $f[i][j]=f[i-1][j]$；否则我们可以选取第 $i$ 个数位，此时有 $f[i][j]=f[i][j-c]+1$。

如果 $f[9][target] \lt 0$，那么说明无法得到满足要求的整数，返回 "0" 即可。

否则，我们需要从 $f[9][target]$ 开始，倒推出每一位的数字。我们可以使用一个数组 $g[i][j]$ 记录 $f[i][j]$ 的上一个状态，从而倒推出每一位的数字。

具体地，在状态转移时，如果 $j \lt c$，或者 $f[i][j-c]+1 \lt f[i-1][j]$，那么我们不选取第 $i$ 个数位，此时有 $g[i][j]=j$；否则我们选取第 $i$ 个数位，此时有 $g[i][j]=j-c$。

最后，我们定义 $i = 9$, $j = target$，从 $g[i][j]$ 开始不断地倒推，如果 $g[i][j]=j$，说明数字 $i$ 没有被选取，我们令 $i = i - 1$；否则说明数字 $i$ 被选取，我们令 $j = g[i][j]$，并将数字 $i$ 加入答案中。重复上述操作，直到 $i = 0$。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$，其中 $m$ 和 $n$ 分别为数组 $cost$ 和 $target$ 的长度。




#### Python3


```python
class Solution:
    def largestNumber(self, cost: List[int], target: int) -> str:
        f = [[-inf] * (target + 1) for _ in range(10)]
        f[0][0] = 0
        g = [[0] * (target + 1) for _ in range(10)]
        for i, c in enumerate(cost, 1):
            for j in range(target + 1):
                if j < c or f[i][j - c] + 1 < f[i - 1][j]:
                    f[i][j] = f[i - 1][j]
                    g[i][j] = j
                else:
                    f[i][j] = f[i][j - c] + 1
                    g[i][j] = j - c
        if f[9][target] < 0:
            return "0"
        ans = []
        i, j = 9, target
        while i:
            if j == g[i][j]:
                i -= 1
            else:
                ans.append(str(i))
                j = g[i][j]
        return "".join(ans)
```


#### TypeScript


```ts
function largestNumber(cost: number[], target: number): string {
    const inf = 1 << 30;
    const f: number[][] = Array(10)
        .fill(0)
        .map(() => Array(target + 1).fill(-inf));
    const g: number[][] = Array(10)
        .fill(0)
        .map(() => Array(target + 1).fill(0));
    f[0][0] = 0;
    for (let i = 1; i <= 9; ++i) {
        const c = cost[i - 1];
        for (let j = 0; j <= target; ++j) {
            if (j < c || f[i][j - c] + 1 < f[i - 1][j]) {
                f[i][j] = f[i - 1][j];
                g[i][j] = j;
            } else {
                f[i][j] = f[i][j - c] + 1;
                g[i][j] = j - c;
            }
        }
    }
    if (f[9][target] < 0) {
        return '0';
    }
    const ans: number[] = [];
    for (let i = 9, j = target; i;) {
        if (g[i][j] === j) {
            --i;
        } else {
            ans.push(i);
            j = g[i][j];
        }
    }
    return ans.join('');
}
```

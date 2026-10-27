## 解法




### 方法一：动态规划



> **思考**
>
> 在严格递增数组中找最长斐波那契子序列。 $n\le 1000$，枚举前两项再向后跳可行，但对同一对结尾会重复。
>
> 令 $f[i][j]$ 为以 $arr[j],arr[i]$ 结尾的最长长度。若 $arr[i]-arr[j]$ 出现在 $j$ 之前，则可接在那对后面。长度至少为 $3$ 才更新答案。



我们定义 $f[i][j]$ 表示以 $\textit{arr}[i]$ 作为最后一个元素，以 $\textit{arr}[j]$ 作为倒数第二个元素的最长斐波那契子序列的长度。初始时，对于任意的 $i \in [0, n)$ 和 $j \in [0, i)$，都有 $f[i][j] = 2$。其余的元素都是 $0$。

我们用一个哈希表 $d$ 记录数组 $\textit{arr}$ 中每个元素对应的下标。

然后，我们可以枚举 $\textit{arr}[i]$ 和 $\textit{arr}[j]$，其中 $i \in [2, n)$ 且 $j \in [1, i)$。假设当前枚举到的元素是 $\textit{arr}[i]$ 和 $\textit{arr}[j]$，我们可以得到 $\textit{arr}[i] - \textit{arr}[j]$，记作 $t$。如果 $t$ 在数组 $\textit{arr}$ 中，且 $t$ 的下标 $k$ 满足 $k < j$，那么我们可以得到一个以 $\textit{arr}[j]$ 和 $\textit{arr}[i]$ 作为最后两个元素的斐波那契子序列，其长度为 $f[i][j] = \max(f[i][j], f[j][k] + 1)$。我们可以用这种方法不断更新 $f[i][j]$ 的值，然后更新答案。

枚举结束后，返回答案即可。

时间复杂度 $O(n^2)$，空间复杂度 $O(n^2)$。其中 $n$ 是数组 $\textit{arr}$ 的长度。




#### Python3


```python
class Solution:
    def lenLongestFibSubseq(self, arr: List[int]) -> int:
        n = len(arr)
        f = [[0] * n for _ in range(n)]
        d = {x: i for i, x in enumerate(arr)}
        for i in range(n):
            for j in range(i):
                f[i][j] = 2
        ans = 0
        for i in range(2, n):
            for j in range(1, i):
                t = arr[i] - arr[j]
                if t in d and (k := d[t]) < j:
                    f[i][j] = max(f[i][j], f[j][k] + 1)
                    ans = max(ans, f[i][j])
        return ans
```


#### TypeScript


```ts
function lenLongestFibSubseq(arr: number[]): number {
    const n = arr.length;
    const f: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    const d: Map<number, number> = new Map();
    for (let i = 0; i < n; ++i) {
        d.set(arr[i], i);
        for (let j = 0; j < i; ++j) {
            f[i][j] = 2;
        }
    }
    let ans = 0;
    for (let i = 2; i < n; ++i) {
        for (let j = 1; j < i; ++j) {
            const t = arr[i] - arr[j];
            const k = d.get(t);
            if (k !== undefined && k < j) {
                f[i][j] = Math.max(f[i][j], f[j][k] + 1);
                ans = Math.max(ans, f[i][j]);
            }
        }
    }
    return ans;
}
```

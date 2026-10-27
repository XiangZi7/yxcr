## 解法




### 方法一：动态规划



> **思考**
>
> 可删任意列，使留下的列对每一行都非降，求最少删除。等价于在列下标上求最长“对所有行都非降”的子序列，删除数为 $n$ 减该长度。 $f[i]$ 以第 $i$ 列结尾，枚举 $j<i$ 且所有行 $s[j]\le s[i]$ 时转移。



我们定义 $f[i]$ 表示以第 $i$ 列结尾的最长不下降子序列的长度，初始时 $f[i] = 1$，答案即为 $n - \max(f)$。

考虑计算 $f[i]$，我们可以枚举 $j < i$，如果对于所有的字符串 $s$，有 $s[j] \le s[i]$，那么 $f[i] = \max(f[i], f[j] + 1)$。

最后，我们返回 $n - \max(f)$。

时间复杂度 $O(n^2 \times m)$，空间复杂度 $O(n)$。其中 $n$ 和 $m$ 分别是数组 $\textit{strs}$ 每个字符串的长度和数组的长度。




#### Python3


```python
class Solution:
    def minDeletionSize(self, strs: List[str]) -> int:
        n = len(strs[0])
        f = [1] * n
        for i in range(n):
            for j in range(i):
                if all(s[j] <= s[i] for s in strs):
                    f[i] = max(f[i], f[j] + 1)
        return n - max(f)
```


#### TypeScript


```ts
function minDeletionSize(strs: string[]): number {
    const n = strs[0].length;
    const f: number[] = Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            let ok = true;
            for (const s of strs) {
                if (s[j] > s[i]) {
                    ok = false;
                    break;
                }
            }
            if (ok) {
                f[i] = Math.max(f[i], f[j] + 1);
            }
        }
    }
    return n - Math.max(...f);
}
```

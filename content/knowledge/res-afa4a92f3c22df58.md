## 解法




### 方法一：动态规划



> **思考**
>
> 转盘每次转到 `key` 的下一个字符，可顺时可逆时，还要按确认键。若对每个字符枚举所有环上位置，朴素搜索分支随 `|key|` 增长。
>
> 设 $f[i][j]$ 为拼出 `key` 前 $i+1$ 个字符且指针停在 $j$ 的最少步数。同一字符的候选位置可预处理。从上一字符的位置转移到当前位置，代价是环上较短弧长再加一次确认。最后在 `key` 末字符的所有位置上取最小即可。



我们首先预处理出字符串 $ring$ 中每个字符 $c$ 出现的位置列表，记录在数组 $pos[c]$ 中。不妨假设字符串 $key$ 和 $ring$ 的长度分别为 $m$ 和 $n$。

然后我们定义 $f[i][j]$ 表示拼写完字符串 $key$ 的前 $i+1$ 个字符，且 $ring$ 的第 $j$ 个字符与 $12:00$ 方向对齐的最少步数。初始时 $f[i][j]=+\infty$。答案为 $\min_{0 \leq j < n} f[m - 1][j]$。

我们可以先初始化 $f[0][j]$，其中 $j$ 是字符 $key[0]$ 在 $ring$ 中出现的位置。由于 $ring$ 的第 $j$ 个字符与 $12:00$ 方向对齐，因此我们只需要 $1$ 步即可拼写出 $key[0]$。此外，我们还需要 $min(j, n - j)$ 步将 $ring$ 旋转到 $12:00$ 方向。因此 $f[0][j]=min(j, n - j) + 1$。

接下来，我们考虑当 $i \geq 1$ 时，状态如何转移。我们可以枚举 $key[i]$ 在 $ring$ 中的位置列表 $pos[key[i]]$，并枚举 $key[i-1]$ 在 $ring$ 中的位置列表 $pos[key[i-1]]$，然后更新 $f[i][j]$，即 $f[i][j]=\min_{k \in pos[key[i-1]]} f[i-1][k] + \min(\textit{abs}(j - k), n - \textit{abs}(j - k)) + 1$。

最后，我们返回 $\min_{0 \leq j \lt n} f[m - 1][j]$ 即可。

时间复杂度 $O(m \times n^2)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是字符串 $key$ 和 $ring$ 的长度。




#### Python3


```python
class Solution:
    def findRotateSteps(self, ring: str, key: str) -> int:
        m, n = len(key), len(ring)
        pos = defaultdict(list)
        for i, c in enumerate(ring):
            pos[c].append(i)
        f = [[inf] * n for _ in range(m)]
        for j in pos[key[0]]:
            f[0][j] = min(j, n - j) + 1
        for i in range(1, m):
            for j in pos[key[i]]:
                for k in pos[key[i - 1]]:
                    f[i][j] = min(
                        f[i][j], f[i - 1][k] + min(abs(j - k), n - abs(j - k)) + 1
                    )
        return min(f[-1][j] for j in pos[key[-1]])
```


#### TypeScript


```ts
function findRotateSteps(ring: string, key: string): number {
    const m: number = key.length;
    const n: number = ring.length;
    const pos: number[][] = Array.from({ length: 26 }, () => []);
    for (let i = 0; i < n; ++i) {
        const j: number = ring.charCodeAt(i) - 'a'.charCodeAt(0);
        pos[j].push(i);
    }

    const f: number[][] = Array.from({ length: m }, () => Array(n).fill(1 << 30));
    for (const j of pos[key.charCodeAt(0) - 'a'.charCodeAt(0)]) {
        f[0][j] = Math.min(j, n - j) + 1;
    }

    for (let i = 1; i < m; ++i) {
        for (const j of pos[key.charCodeAt(i) - 'a'.charCodeAt(0)]) {
            for (const k of pos[key.charCodeAt(i - 1) - 'a'.charCodeAt(0)]) {
                f[i][j] = Math.min(
                    f[i][j],
                    f[i - 1][k] + Math.min(Math.abs(j - k), n - Math.abs(j - k)) + 1,
                );
            }
        }
    }

    let ans: number = 1 << 30;
    for (const j of pos[key.charCodeAt(m - 1) - 'a'.charCodeAt(0)]) {
        ans = Math.min(ans, f[m - 1][j]);
    }
    return ans;
}
```

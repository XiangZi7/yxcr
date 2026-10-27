## 解法




### 方法一：预处理 + DFS(回溯)



> **思考**
>
> 要列出把 $s$ 切成回文子串的全部方案。 $n\le 16$，分割方案至多 $2^{n-1}$ 种，回溯可以接受。每次切一刀再判断回文会重复扫描同一区间。
>
> 先用 DP 预处理 $f[i][j]$ 表示 $s[i..j]$ 是否回文，再从左到右枚举下一个切点：只有 $f[i][j]$ 为真才进入下一层。



我们可以使用动态规划，预处理出字符串中的任意子串是否为回文串，即 $f[i][j]$ 表示子串 $s[i..j]$ 是否为回文串。

接下来，我们设计一个函数 $dfs(i)$，表示从字符串的第 $i$ 个字符开始，分割成若干回文串，当前分割方案为 $t$。

如果 $i=|s|$，说明已经分割完成，我们将 $t$ 放入答案数组中，然后返回。

否则，我们可以从 $i$ 开始，从小到大依次枚举结束位置 $j$，如果 $s[i..j]$ 是回文串，那么就把 $s[i..j]$ 加入到 $t$ 中，然后继续递归 $dfs(j+1)$，回溯的时候要弹出 $s[i..j]$。

时间复杂度 $O(n \times 2^n)$，空间复杂度 $O(n^2)$。其中 $n$ 是字符串的长度。




#### Python3


```python
class Solution:
    def partition(self, s: str) -> List[List[str]]:
        def dfs(i: int):
            if i == n:
                ans.append(t[:])
                return
            for j in range(i, n):
                if f[i][j]:
                    t.append(s[i : j + 1])
                    dfs(j + 1)
                    t.pop()

        n = len(s)
        f = [[True] * n for _ in range(n)]
        for i in range(n - 1, -1, -1):
            for j in range(i + 1, n):
                f[i][j] = s[i] == s[j] and f[i + 1][j - 1]
        ans = []
        t = []
        dfs(0)
        return ans
```


#### TypeScript


```ts
function partition(s: string): string[][] {
    const n = s.length;
    const f: boolean[][] = Array.from({ length: n }, () => Array(n).fill(true));
    for (let i = n - 1; i >= 0; --i) {
        for (let j = i + 1; j < n; ++j) {
            f[i][j] = s[i] === s[j] && f[i + 1][j - 1];
        }
    }
    const ans: string[][] = [];
    const t: string[] = [];
    const dfs = (i: number) => {
        if (i === n) {
            ans.push(t.slice());
            return;
        }
        for (let j = i; j < n; ++j) {
            if (f[i][j]) {
                t.push(s.slice(i, j + 1));
                dfs(j + 1);
                t.pop();
            }
        }
    };
    dfs(0);
    return ans;
}
```

## 解法




### 方法一：BFS + 状态压缩



> **思考**
>
> $\textit{target}$ 长度 $\le 15$，每张贴纸可重复使用。对贴纸次数做搜索会重复同一「已拼出集合」。
>
> 用二进制表示 $\textit{target}$ 各位是否已覆盖。从 $0$ 做 BFS，每层尝试每张贴纸把未覆盖字母尽量填上。到达全集的层数即最少贴纸数。



我们注意到，字符串 $\textit{target}$ 的长度不超过 $15$，我们可以使用一个长度为 $15$ 的二进制数来表示 $\textit{target}$ 的每个字符是否被拼出，如果第 $i$ 位为 $1$，表示 $\textit{target}$ 的第 $i$ 个字符已经被拼出，否则表示未被拼出。

我们定义一个初始状态 $0$，表示所有字符都未被拼出，然后我们使用广度优先搜索的方法，从初始状态开始，每次搜索时，我们枚举所有的贴纸，对于每一张贴纸，我们尝试拼出 $\textit{target}$ 的每一个字符，如果拼出了某个字符，我们就将对应的二进制数的第 $i$ 位设置为 $1$，表示该字符已经被拼出，然后我们继续搜索，直到我们拼出了 $\textit{target}$ 的所有字符。

时间复杂度 $O(2^n \times m \times (l + n))$，空间复杂度 $O(2^n)$。其中 $n$ 是字符串 $\textit{target}$ 的长度，而 $m$ 和 $l$ 分别是贴纸的数量和贴纸的平均长度。




#### Python3


```python
class Solution:
    def minStickers(self, stickers: List[str], target: str) -> int:
        n = len(target)
        q = deque([0])
        vis = [False] * (1 << n)
        vis[0] = True
        ans = 0
        while q:
            for _ in range(len(q)):
                cur = q.popleft()
                if cur == (1 << n) - 1:
                    return ans
                for s in stickers:
                    cnt = Counter(s)
                    nxt = cur
                    for i, c in enumerate(target):
                        if (cur >> i & 1) == 0 and cnt[c] > 0:
                            cnt[c] -= 1
                            nxt |= 1 << i
                    if not vis[nxt]:
                        vis[nxt] = True
                        q.append(nxt)
            ans += 1
        return -1
```


#### TypeScript


```ts
function minStickers(stickers: string[], target: string): number {
    const n = target.length;
    const q: number[] = [0];
    const vis: boolean[] = Array(1 << n).fill(false);
    vis[0] = true;
    for (let ans = 0; q.length; ++ans) {
        const qq: number[] = [];
        for (const cur of q) {
            if (cur === (1 << n) - 1) {
                return ans;
            }
            for (const s of stickers) {
                const cnt: number[] = Array(26).fill(0);
                for (const c of s) {
                    cnt[c.charCodeAt(0) - 97]++;
                }
                let nxt = cur;
                for (let i = 0; i < n; ++i) {
                    const j = target.charCodeAt(i) - 97;
                    if (((cur >> i) & 1) === 0 && cnt[j]) {
                        nxt |= 1 << i;
                        cnt[j]--;
                    }
                }
                if (!vis[nxt]) {
                    vis[nxt] = true;
                    qq.push(nxt);
                }
            }
        }
        q.splice(0, q.length, ...qq);
    }
    return -1;
}
```

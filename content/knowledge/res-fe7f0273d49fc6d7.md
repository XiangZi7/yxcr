## 解法




### 方法一：前缀和 + 枚举



> **思考**
>
> 单调递增即某分割点左侧全为 $0$、右侧全为 $1$。 $n\le 10^5$，对每个分割点重扫代价过高。记全串 $0$ 的个数为 $\textit{tot}$，枚举分割点时用前缀 $0$ 的个数 $\textit{cur}$ 即可算出左侧翻 $1$、右侧翻 $0$ 的次数 $i-\textit{cur}+\textit{tot}-\textit{cur}$，取最小者。



我们可以先统计字符串 $s$ 中 $0$ 的个数，记为 $tot$。定义一个答案变量 $ans$，初始时 $ans = tot$，表示将所有 $0$ 变成 $1$ 的翻转次数。

然后，我们可以枚举每个位置 $i$，将位置 $i$ 及其左边的所有 $1$ 变成 $0$，将位置 $i$ 右边的所有 $0$ 变成 $1$，计算这种情况下的翻转次数，即 $i + 1 - cur + tot - cur$，其中 $cur$ 表示位置 $i$ 及其左边的 $0$ 的个数，更新答案 $ans = \min(ans, i + 1 - cur + tot - cur)$。

最后返回答案 $ans$ 即可。

时间复杂度 $O(n)$，其中 $n$ 为字符串 $s$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def minFlipsMonoIncr(self, s: str) -> int:
        tot = s.count("0")
        ans, cur = tot, 0
        for i, c in enumerate(s, 1):
            cur += int(c == "0")
            ans = min(ans, i - cur + tot - cur)
        return ans
```


#### TypeScript


```ts
function minFlipsMonoIncr(s: string): number {
    let tot = 0;
    for (const c of s) {
        tot += c === '0' ? 1 : 0;
    }
    let [ans, cur] = [tot, 0];
    for (let i = 1; i <= s.length; ++i) {
        cur += s[i - 1] === '0' ? 1 : 0;
        ans = Math.min(ans, i - cur + tot - cur);
    }
    return ans;
}
```

## 解法




### 方法一：DFS + 剪枝



> **思考**
>
> 合法串须删除最少括号且枚举全部最优结果。若对每个括号独立选择删或不删，长度为 $n$ 时分支过多，且多数路径删除次数并不最小。
>
> 先扫描得到必须删除的左、右括号下界 $l$、 $r$。搜索时维护剩余删除额度与当前左右括号计数：剩余字符不足以删完、或右括号已多于左括号，则剪枝。每个位置优先尝试删除（额度允许时），再选择保留，并用集合去重。因此只展开删除次数恰好为最小的路径。



我们首先处理得到字符串 $s$ 待删除的左、右括号的最小数量，分别记为 $l$ 和 $r$。

然后我们设计一个递归函数 `dfs(i, l, r, lcnt, rcnt, t)`，其中：

- `i` 表示当前处理到字符串 $s$ 的第 $i$ 个字符；
- `l` 和 `r` 分别表示剩余待删除的左、右括号的数量；
- `t` 表示当前得到的字符串；
- `lcnt` 和 `rcnt` 分别表示当前得到的字符串中左、右括号的数量。

递归函数的逻辑如下：

- 如果 `i` 等于字符串 $s$ 的长度，且 `l` 和 `r` 都等于 $0$，则将 `t` 加入答案数组中；
- 如果剩余的待处理字符数 $n-i$ 小于剩余待删除的左右括号数量 $l+r$，或者当前得到的字符串中的左括号数量小于右括号数量，直接返回；
- 如果当前字符是左括号，我们可以选择删除或者保留，如果删除，需要满足 $l \gt 0$，然后递归调用 `dfs(i+1, l-1, r, lcnt, rcnt, t)`；
- 如果当前字符是右括号，我们可以选择删除或者保留，如果删除，需要满足 $r \gt 0$，然后递归调用 `dfs(i+1, l, r-1, lcnt, rcnt, t)`；
- 如果选择保留当前字符，我们需要判断当前字符是左括号、右括号还是字母。如果是左括号，我们需要更新 `lcnt`，如果是右括号，我们需要更新 `rcnt`，然后递归调用 `dfs(i+1, l, r, lcnt, rcnt, t+s[i])`。

我们调用 `dfs(0, l, r, 0, 0, "")`，搜索所有可能的字符串。

最后返回去重后的答案数组即可。

时间复杂度 $O(n\times 2^n)$，空间复杂度 $O(n)$。长度为 $n$ 的字符串有 $2^n$ 种可能的删除方式，每种删除方式需要 $O(n)$ 的时间复制字符串。因此总时间复杂度为 $O(n\times 2^n)$。




#### Python3


```python
class Solution:
    def removeInvalidParentheses(self, s: str) -> List[str]:
        def dfs(i, l, r, lcnt, rcnt, t):
            if i == n:
                if l == 0 and r == 0:
                    ans.add(t)
                return
            if n - i < l + r or lcnt < rcnt:
                return
            if s[i] == '(' and l:
                dfs(i + 1, l - 1, r, lcnt, rcnt, t)
            elif s[i] == ')' and r:
                dfs(i + 1, l, r - 1, lcnt, rcnt, t)
            dfs(i + 1, l, r, lcnt + (s[i] == '('), rcnt + (s[i] == ')'), t + s[i])

        l = r = 0
        for c in s:
            if c == '(':
                l += 1
            elif c == ')':
                if l:
                    l -= 1
                else:
                    r += 1
        ans = set()
        n = len(s)
        dfs(0, l, r, 0, 0, '')
        return list(ans)
```


#### TypeScript


```ts
function removeInvalidParentheses(s: string): string[] {
    const n = s.length;
    let l = 0,
        r = 0;
    for (const c of s) {
        if (c === '(') {
            l++;
        } else if (c === ')') {
            if (l > 0) {
                l--;
            } else {
                r++;
            }
        }
    }

    const ans = new Set<string>();

    const dfs = (i: number, l: number, r: number, lcnt: number, rcnt: number, t: string): void => {
        if (i === n) {
            if (l === 0 && r === 0) {
                ans.add(t);
            }
            return;
        }
        if (n - i < l + r || lcnt < rcnt) {
            return;
        }
        const c = s[i];
        if (c === '(' && l > 0) {
            dfs(i + 1, l - 1, r, lcnt, rcnt, t);
        }
        if (c === ')' && r > 0) {
            dfs(i + 1, l, r - 1, lcnt, rcnt, t);
        }
        const x = c === '(' ? 1 : 0;
        const y = c === ')' ? 1 : 0;
        dfs(i + 1, l, r, lcnt + x, rcnt + y, t + c);
    };

    dfs(0, l, r, 0, 0, '');
    return Array.from(ans);
}
```

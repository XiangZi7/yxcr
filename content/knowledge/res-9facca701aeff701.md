## 解法




### 方法一：哈希表



> **思考**
>
> 查询按“完全匹配、忽略大小写、元音视为相同”三级规则映射到词表，同级取词表中最先出现者。预处理三张表：原词集合、小写首次出现、元音替换为 `*` 后的首次出现。查询依次查三张表。



我们遍历 $\textit{wordlist}$，将单词按照大小写不敏感、元音不敏感的规则分别存入哈希表 $\textit{low}$ 和 $\textit{pat}$ 中，其中 $\textit{low}$ 的键为单词的小写形式， $\textit{pat}$ 的键为将单词的元音字母替换为 `*` 后的字符串，值为单词本身。用哈希表 $\textit{s}$ 存储 $\textit{wordlist}$ 中的单词。

遍历 $\textit{queries}$，对于每个单词 $\textit{q}$，如果 $\textit{q}$ 在 $\textit{s}$ 中，说明 $\textit{q}$ 在 $\textit{wordlist}$ 中，直接将 $\textit{q}$ 加入答案数组 $\textit{ans}$ 中。

否则，如果 $\textit{q}$ 的小写形式在 $\textit{low}$ 中，说明 $\textit{q}$ 在 $\textit{wordlist}$ 中，且大小写不敏感，将 $\textit{low}[q.\text{lower}()]$ 加入答案数组 $\textit{ans}$ 中。

否则，如果将 $\textit{q}$ 的元音字母替换为 `*` 后的字符串在 $\textit{pat}$ 中，说明 $\textit{q}$ 在 $\textit{wordlist}$ 中，且元音不敏感，将 $\textit{pat}[f(q)]$ 加入答案数组 $\textit{ans}$ 中。

否则，说明 $\textit{q}$ 在 $\textit{wordlist}$ 中，且大小写和元音都不敏感，将空字符串加入答案数组 $\textit{ans}$ 中。

最后返回答案数组 $\textit{ans}$ 即可。

时间复杂度 $O(n + m)$，空间复杂度 $O(n)$。其中 $n$ 和 $m$ 分别为 $\textit{wordlist}$ 和 $\textit{queries}$ 的长度。




#### Python3


```python
class Solution:
    def spellchecker(self, wordlist: List[str], queries: List[str]) -> List[str]:
        def f(w):
            t = []
            for c in w:
                t.append("*" if c in "aeiou" else c)
            return "".join(t)

        s = set(wordlist)
        low, pat = {}, {}
        for w in wordlist:
            t = w.lower()
            low.setdefault(t, w)
            pat.setdefault(f(t), w)

        ans = []
        for q in queries:
            if q in s:
                ans.append(q)
                continue
            q = q.lower()
            if q in low:
                ans.append(low[q])
                continue
            q = f(q)
            if q in pat:
                ans.append(pat[q])
                continue
            ans.append("")
        return ans
```


#### TypeScript


```ts
function spellchecker(wordlist: string[], queries: string[]): string[] {
    const s = new Set(wordlist);
    const low = new Map<string, string>();
    const pat = new Map<string, string>();

    const f = (w: string): string => {
        let res = '';
        for (const c of w) {
            if ('aeiou'.includes(c)) {
                res += '*';
            } else {
                res += c;
            }
        }
        return res;
    };

    for (const w of wordlist) {
        let t = w.toLowerCase();
        if (!low.has(t)) {
            low.set(t, w);
        }
        t = f(t);
        if (!pat.has(t)) {
            pat.set(t, w);
        }
    }

    const ans: string[] = [];
    for (let q of queries) {
        if (s.has(q)) {
            ans.push(q);
            continue;
        }
        q = q.toLowerCase();
        if (low.has(q)) {
            ans.push(low.get(q)!);
            continue;
        }
        q = f(q);
        if (pat.has(q)) {
            ans.push(pat.get(q)!);
            continue;
        }
        ans.push('');
    }
    return ans;
}
```

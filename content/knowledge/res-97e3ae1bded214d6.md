## 解法




### 方法一：计数



> **思考**
>
> $a$ 要覆盖 $words2$ 中每一个词的字母需求。对每个 $a$ 逐个检查每个 $b$ 仍可，但 $b$ 之间的约束可以合并：每个字母取 $words2$ 中的最大需求，得到一份总约束 $\textit{cnt}$，再对 $a$ 做一次计数比较即可。



遍历 `words2` 中的每个单词 `b`，统计每个字母出现的最大次数，记为 `cnt`。

然后遍历 `words1` 中的每个单词 `a`，统计每个字母出现的次数，记为 `t`。如果 `cnt` 中的每个字母的出现次数都不大于 `t` 中的出现次数，则 `a` 是通用单词，将其加入答案。

时间复杂度 $O(L)$，其中 $L$ 为 `words1` 和 `words2` 中所有单词的长度之和。




#### Python3


```python
class Solution:
    def wordSubsets(self, words1: List[str], words2: List[str]) -> List[str]:
        cnt = Counter()
        for b in words2:
            t = Counter(b)
            for c, v in t.items():
                cnt[c] = max(cnt[c], v)
        ans = []
        for a in words1:
            t = Counter(a)
            if all(v <= t[c] for c, v in cnt.items()):
                ans.append(a)
        return ans
```


#### TypeScript


```ts
function wordSubsets(words1: string[], words2: string[]): string[] {
    const cnt: number[] = Array(26).fill(0);
    for (const b of words2) {
        const t: number[] = Array(26).fill(0);
        for (const c of b) {
            t[c.charCodeAt(0) - 97]++;
        }
        for (let i = 0; i < 26; i++) {
            cnt[i] = Math.max(cnt[i], t[i]);
        }
    }

    const ans: string[] = [];
    for (const a of words1) {
        const t: number[] = Array(26).fill(0);
        for (const c of a) {
            t[c.charCodeAt(0) - 97]++;
        }

        let ok = true;
        for (let i = 0; i < 26; i++) {
            if (cnt[i] > t[i]) {
                ok = false;
                break;
            }
        }

        if (ok) {
            ans.push(a);
        }
    }

    return ans;
}
```

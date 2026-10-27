## 解法




### 方法一：计数



> **思考**
>
> 等长串 $t$ 改成 $s$ 的字母异位词，每次改一个字符。需要改的次数等于 $t$ 相对 $s$ 多出来的字符数。先统计 $s$ 的频次，再扫 $t$：每见到一个字符就减一，减成负数说明该字符在 $t$ 中超额，计入一步。



我们可以使用一个哈希表或者数组 $\textit{cnt}$ 来统计字符串 $\textit{s}$ 中每个字符出现的次数，然后遍历字符串 $\textit{t}$，对于每个字符，我们在 $\textit{cnt}$ 中将其出现的次数减一，如果减一后的值小于 $0$，说明这个字符在字符串 $\textit{t}$ 中出现的次数比在字符串 $\textit{s}$ 中多，我们需要将这个字符替换掉，将答案加一。

遍历结束后，返回答案即可。

时间复杂度 $O(m + n)$，空间复杂度 $O(|\Sigma|)$，其中 $m$ 和 $n$ 分别是字符串 $\textit{s}$ 和 $\textit{t}$ 的长度，而 $|\Sigma|$ 是字符集的大小，本题中字符集为小写字母，因此 $|\Sigma| = 26$。




#### Python3


```python
class Solution:
    def minSteps(self, s: str, t: str) -> int:
        cnt = Counter(s)
        ans = 0
        for c in t:
            cnt[c] -= 1
            ans += cnt[c] < 0
        return ans
```


#### TypeScript


```ts
function minSteps(s: string, t: string): number {
    const cnt: number[] = Array(26).fill(0);
    for (const c of s) {
        ++cnt[c.charCodeAt(0) - 97];
    }
    let ans = 0;
    for (const c of t) {
        if (--cnt[c.charCodeAt(0) - 97] < 0) {
            ++ans;
        }
    }
    return ans;
}
```

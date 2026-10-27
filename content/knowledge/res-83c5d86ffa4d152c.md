## 解法




### 方法一：滑动窗口



> **思考**
>
> 异位词是字母计数相同的等长子串。枚举每个起点再排序比较过慢。
>
> 固定长度 $n=|p|$ 的窗口，维护窗口计数与 $p$ 的计数，相等则记录左端。先放入前 $n-1$ 个字符，右端每进一步比较并弹出左端。
>
> 窗口长度始终为 $n$，只需比较两个长度为 $26$ 的计数。



我们不妨设字符串 $s$ 的长度为 $m$，字符串 $p$ 的长度为 $n$。

如果 $m \lt n$，那么 $s$ 中不可能存在任何一个子串同 $p$ 为异位词，返回空列表即可。

当 $m \ge n$ 时，我们可以使用一个固定长度为 $n$ 的滑动窗口来维护 $s$ 的子串。为了判断子串是否为 $p$ 的异位词，我们可以用一个固定长度为 $26$ 的数组 $cnt1$ 记录 $p$ 中每个字母的出现次数，再用另一个数组 $cnt2$ 记录当前滑动窗口中每个字母的出现次数，如果这两个数组相同，那么当前滑动窗口的子串就是 $p$ 的异位词，我们记录下起始位置。

时间复杂度 $O(m \times C)$，空间复杂度 $O(C)$。其中 $m$ 是字符串 $s$ 的长度；而 $C$ 是字符集大小，在本题中字符集为所有小写字母，所以 $C = 26$。




#### Python3


```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        m, n = len(s), len(p)
        ans = []
        if m < n:
            return ans
        cnt1 = Counter(p)
        cnt2 = Counter(s[: n - 1])
        for i in range(n - 1, m):
            cnt2[s[i]] += 1
            if cnt1 == cnt2:
                ans.append(i - n + 1)
            cnt2[s[i - n + 1]] -= 1
        return ans
```


#### TypeScript


```ts
function findAnagrams(s: string, p: string): number[] {
    const m = s.length;
    const n = p.length;
    const ans: number[] = [];
    if (m < n) {
        return ans;
    }
    const cnt1: number[] = new Array(26).fill(0);
    const cnt2: number[] = new Array(26).fill(0);
    const idx = (c: string) => c.charCodeAt(0) - 'a'.charCodeAt(0);
    for (const c of p) {
        ++cnt1[idx(c)];
    }
    for (const c of s.slice(0, n - 1)) {
        ++cnt2[idx(c)];
    }
    for (let i = n - 1; i < m; ++i) {
        ++cnt2[idx(s[i])];
        if (cnt1.toString() === cnt2.toString()) {
            ans.push(i - n + 1);
        }
        --cnt2[idx(s[i - n + 1])];
    }
    return ans;
}
```


### 方法二：双指针（滑动窗口优化）



> **思考**
>
> 方法一每次比较整个计数数组。改为右端加入后，若某字母超出 $p$ 的配额则左端收缩，窗口内每字母都不超额。此时长度恰为 $n$ 即异位词。
>
> 比较从 $O(|\Sigma|)$ 变成检查长度，滑动过程仍是线性。



我们可以对方法一进行优化，与方法一类似，我们用一个固定长度为 $26$ 的数组 $cnt1$ 记录 $p$ 中每个字母的出现次数，用另一个数组 $cnt2$ 记录当前滑动窗口中每个字母的出现次数，用指针 $i$ 和 $j$ 分别指向滑动窗口的左右边界。每一次移动指针 $j$，将 $cnt2[s[j]]$ 的值加 $1$，如果当前 $cnt2[s[j]]$ 的值大于 $cnt1[s[j]]$，则将指针 $i$ 不断右移，直到 $cnt2[s[j]]$ 的值不大于 $cnt1[s[j]]$。此时，如果滑动窗口的长度等于 $p$ 的长度，我们就找到了一个异位词，将起始位置加入答案。继续移动指针 $j$，重复上述操作，直到指针 $j$ 移动到 $s$ 的末尾。

时间复杂度 $O(m + n)$，空间复杂度 $O(C)$。其中 $m$ 和 $n$ 分别是字符串 $s$ 和 $p$ 的长度；而 $C$ 是字符集大小，在本题中字符集为所有小写字母，所以 $C = 26$。




#### Python3


```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        m, n = len(s), len(p)
        ans = []
        if m < n:
            return ans
        cnt1 = Counter(p)
        cnt2 = Counter()
        j = 0
        for i, c in enumerate(s):
            cnt2[c] += 1
            while cnt2[c] > cnt1[c]:
                cnt2[s[j]] -= 1
                j += 1
            if i - j + 1 == n:
                ans.append(j)
        return ans
```


#### TypeScript


```ts
function findAnagrams(s: string, p: string): number[] {
    const m = s.length;
    const n = p.length;
    const ans: number[] = [];
    if (m < n) {
        return ans;
    }
    const cnt1: number[] = Array(26).fill(0);
    const cnt2: number[] = Array(26).fill(0);
    const idx = (c: string) => c.charCodeAt(0) - 'a'.charCodeAt(0);
    for (const c of p) {
        ++cnt1[idx(c)];
    }
    for (let i = 0, j = 0; i < m; ++i) {
        const k = idx(s[i]);
        ++cnt2[k];
        while (cnt2[k] > cnt1[k]) {
            --cnt2[idx(s[j++])];
        }
        if (i - j + 1 === n) {
            ans.push(j);
        }
    }
    return ans;
}
```

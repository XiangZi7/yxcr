## 解法




### 方法一：判断子序列



> **思考**
>
> 要从字典里选一个可通过删除 $s$ 中字符得到的最长串，并列时取字典序最小。对 $s$ 的每个子序列查字典不现实。
>
> 反过来对字典中每个词判断它是否为 $s$ 的子序列，双指针一次扫描即可。同时用长度优先、字典序其次的规则维护当前最优。字典大小与词长均不大，总代价可接受。



我们定义一个函数 $check(s, t)$，用于判断字符串 $s$ 是否是字符串 $t$ 的子序列。我们可以使用双指针的方法，初始化两个指针 $i$ 和 $j$ 分别指向字符串 $s$ 和字符串 $t$ 的开头，然后不断移动指针 $j$，如果 $s[i]$ 和 $t[j]$ 相等，则移动指针 $i$，最后判断 $i$ 是否等于 $s$ 的长度即可。若 $i$ 等于 $s$ 的长度，则说明 $s$ 是 $t$ 的子序列。

我们初始化答案字符串 $ans$ 为空字符串，然后遍历数组 $dictionary$ 中的每个字符串 $t$，如果 $t$ 是 $s$ 的子序列，并且 $t$ 的长度大于 $ans$ 的长度，或者 $t$ 的长度等于 $ans$ 的长度且 $t$ 字典序小于 $ans$，则更新 $ans$ 为 $t$。

时间复杂度 $O(d \times (m + n))$，其中 $d$ 是字符串列表的长度，而 $m$ 和 $n$ 分别是字符串 $s$ 的长度和字符串列表中字符串的平均长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def findLongestWord(self, s: str, dictionary: List[str]) -> str:
        def check(s: str, t: str) -> bool:
            m, n = len(s), len(t)
            i = j = 0
            while i < m and j < n:
                if s[i] == t[j]:
                    i += 1
                j += 1
            return i == m

        ans = ""
        for t in dictionary:
            if check(t, s) and (len(ans) < len(t) or (len(ans) == len(t) and ans > t)):
                ans = t
        return ans
```


#### TypeScript


```ts
function findLongestWord(s: string, dictionary: string[]): string {
    const check = (s: string, t: string): boolean => {
        const [m, n] = [s.length, t.length];
        let i = 0;
        for (let j = 0; i < m && j < n; ++j) {
            if (s[i] === t[j]) {
                ++i;
            }
        }
        return i === m;
    };
    let ans: string = '';
    for (const t of dictionary) {
        const [a, b] = [ans.length, t.length];
        if (check(t, s) && (a < b || (a === b && ans > t))) {
            ans = t;
        }
    }
    return ans;
}
```

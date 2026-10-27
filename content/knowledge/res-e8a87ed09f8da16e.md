## 解法




### 方法一：字符统计



> **思考**
>
> 恰好交换 $s$ 中两个字符后等于 $\textit{goal}$。长度不同或字母计数不同则不可能。 $n\le 2\cdot 10^4$，一次扫描数出不同位置即可。
>
> 不同位置恰为 $2$ 时，交换这两处即可（计数已保证字母可对齐）。完全相同则需要某个字母出现至少两次，才能做一次无效果交换。



首先，先理解亲密字符串的意思：

- 若两个字符串的长度或字符出现的频数不等，一定不是亲密字符串；
- 若两个字符串对应位置不相等的字符数量为 2，或者数量为 0 并且字符串存在两个相同字符，则是亲密字符串。

因此，我们先判断两个字符串长度，若不等，直接返回 `false`。

接着，统计两个字符串的字符频数，记为 `cnt1` 和 `cnt2`，若 `cnt1` 不等于 `cnt2`，直接返回 `false`。

然后枚举两个字符串，统计对应位置不相等的字符数量，若为 2，则返回 `true`；若为 0，且字符串存在两个相同字符，则返回 `true`。

时间复杂度 $O(n)$，空间复杂度 $O(C)$。其中 $n$ 是字符串 `s` 或 `goal` 的长度；而 $C$ 为字符集大小。




#### Python3


```python
class Solution:
    def buddyStrings(self, s: str, goal: str) -> bool:
        m, n = len(s), len(goal)
        if m != n:
            return False
        cnt1, cnt2 = Counter(s), Counter(goal)
        if cnt1 != cnt2:
            return False
        diff = sum(s[i] != goal[i] for i in range(n))
        return diff == 2 or (diff == 0 and any(v > 1 for v in cnt1.values()))
```


#### TypeScript


```ts
function buddyStrings(s: string, goal: string): boolean {
    const m = s.length;
    const n = goal.length;
    if (m != n) {
        return false;
    }
    const cnt1 = new Array(26).fill(0);
    const cnt2 = new Array(26).fill(0);
    let diff = 0;
    for (let i = 0; i < n; ++i) {
        cnt1[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
        cnt2[goal.charCodeAt(i) - 'a'.charCodeAt(0)]++;
        if (s[i] != goal[i]) {
            ++diff;
        }
    }
    for (let i = 0; i < 26; ++i) {
        if (cnt1[i] != cnt2[i]) {
            return false;
        }
    }
    return diff == 2 || (diff == 0 && cnt1.some(v => v > 1));
}
```

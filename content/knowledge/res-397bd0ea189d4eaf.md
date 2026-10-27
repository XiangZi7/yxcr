## 解法




### 方法一：计数



> **思考**
>
> 字母异位词当且仅当字符计数相同。长度不等则可立即否决。
>
> 统计 $s$ 的频次，再扫 $t$ 递减；若某字符减到负数则不是。



我们先判断两个字符串的长度是否相等，如果不相等，说明两个字符串中的字符肯定不同，返回 `false`。

否则，我们用哈希表或者一个长度为 $26$ 的数组来记录字符串 $s$ 中每个字符出现的次数，然后遍历另一个字符串 $t$，每遍历到一个字符，就将哈希表中对应的字符次数减一，如果减一后的次数小于 $0$，说明该字符在两个字符串中出现的次数不同，返回 `false`。如果遍历完两个字符串后，哈希表中的所有字符次数都为 $0$，说明两个字符串中的字符出现次数相同，返回 `true`。

时间复杂度 $O(n)$，空间复杂度 $O(C)$，其中 $n$ 是字符串的长度；而 $C$ 是字符集的大小，本题中 $C=26$。




#### Python3


```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        cnt = Counter(s)
        for c in t:
            cnt[c] -= 1
            if cnt[c] < 0:
                return False
        return True
```


#### TypeScript


```ts
function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) {
        return false;
    }
    const cnt = new Array(26).fill(0);
    for (let i = 0; i < s.length; ++i) {
        ++cnt[s.charCodeAt(i) - 'a'.charCodeAt(0)];
        --cnt[t.charCodeAt(i) - 'a'.charCodeAt(0)];
    }
    return cnt.every(x => x === 0);
}
```


### 方法二



> **思考**
>
> 方法一手工维护计数。直接比较两个计数器是否相等，写法更短，复杂度相同。






#### Python3


```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return Counter(s) == Counter(t)
```

## 解法




### 方法一：计数



> **思考**
>
> 第一个只出现一次的字符下标。一次扫描无法同时知道后面是否还会出现。
>
> 先计数，再从左找频次为 $1$ 的位置；没有则 $-1$。两遍线性，空间为字母表大小。



我们用一个哈希表或者一个长度为 $26$ 的数组 $\text{cnt}$ 来存储每个字符出现的次数，然后从头开始遍历每个字符 $\text{s[i]}$，如果 $\text{cnt[s[i]]}$ 为 $1$，则返回 $i$。

遍历结束后，如果没有找到符合条件的字符，返回 $-1$。

时间复杂度 $O(n)$，其中 $n$ 是字符串的长度。空间复杂度 $O(|\Sigma|)$，其中 $\Sigma$ 是字符集，本题中字符集为小写字母，所以 $|\Sigma|=26$。




#### Python3


```python
class Solution:
    def firstUniqChar(self, s: str) -> int:
        cnt = Counter(s)
        for i, c in enumerate(s):
            if cnt[c] == 1:
                return i
        return -1
```


#### TypeScript


```ts
function firstUniqChar(s: string): number {
    const cnt = new Map<string, number>();
    for (const c of s) {
        cnt.set(c, (cnt.get(c) || 0) + 1);
    }
    for (let i = 0; i < s.length; ++i) {
        if (cnt.get(s[i]) === 1) {
            return i;
        }
    }
    return -1;
}
```

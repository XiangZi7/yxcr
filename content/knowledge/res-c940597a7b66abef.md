## 解法




### 方法一：字符串遍历



> **思考**
>
> 合法记录至多一个 `'A'`，且不能有连续三个 `'L'`。扫描一遍计数即可，无需正则。
>
> 统计 `'A'` 的个数，并检查是否出现子串 `LLL`。两者同时满足则返回真。字符串长度不超过 $1000$，线性扫描足够。



我们可以遍历字符串 $s$，记录字符 `'A'` 和字符串 `"LLL"` 的出现次数。如果字符 `'A'` 的出现次数小于 $2$，且字符串 `"LLL"` 没有出现过，则可以将该字符串视作记录合法，返回 `true`，否则返回 `false`。

时间复杂度 $O(n)$，其中 $n$ 是字符串 $s$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def checkRecord(self, s: str) -> bool:
        return s.count('A') < 2 and 'LLL' not in s
```


#### TypeScript


```ts
function checkRecord(s: string): boolean {
    return s.indexOf('A') === s.lastIndexOf('A') && s.indexOf('LLL') === -1;
}
```

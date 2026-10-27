## 解法




### 方法一：字符比较



> **思考**
>
> 拿第一个字符串作为候选前缀，再依次用其余字符串去截短它，时间复杂度为 $O(n \times m)$。 $n, m \le 200$，可以接受。字典树也能维护公共前缀，但对这道题而言结构过重。
>
> 公共前缀只会变短：某一列一旦对不上，更长的前缀不可能存在。把各串按列对齐，第 $i$ 列全部相同，才可能把前缀延长到位置 $i$。因此以 $strs[0]$ 为基准按列比较，遇到长度不够或字符不同就立即返回，不必先建树。



我们以第一个字符串 $strs[0]$ 为基准，依次比较后面的字符串的第 $i$ 个字符是否与 $strs[0]$ 的第 $i$ 个字符相同，如果相同则继续比较下一个字符，否则返回 $strs[0]$ 的前 $i$ 个字符。

遍历结束，说明所有字符串的前 $i$ 个字符都相同，返回 $strs[0]$ 即可。

时间复杂度 $O(n \times m)$，其中 $n$ 和 $m$ 分别为字符串数组的长度以及字符串的最小长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        for i in range(len(strs[0])):
            for s in strs[1:]:
                if len(s) <= i or s[i] != strs[0][i]:
                    return s[:i]
        return strs[0]
```


#### TypeScript


```ts
function longestCommonPrefix(strs: string[]): string {
    const len = strs.reduce((r, s) => Math.min(r, s.length), Infinity);
    for (let i = len; i > 0; i--) {
        const target = strs[0].slice(0, i);
        if (strs.every(s => s.slice(0, i) === target)) {
            return target;
        }
    }
    return '';
}
```

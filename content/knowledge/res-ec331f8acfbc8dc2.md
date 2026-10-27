## 解法




### 方法一：集合判断



> **思考**
>
> 若逐行扫描每个单词的每个字母，并与三行键盘字符比对，总代价与字母数成正比，在本题规模下可行。反复对同一行做成员判断，会把行内字符集构造多次。
>
> 注意到判定只依赖「字母集合是否落在某一行」，与字母顺序无关。为此把三行做成集合，将单词转成小写后取集合，再判断是否为某一行的子集。一次遍历即可筛出全部合法单词。



把三行键盘分别做成集合。对每个单词，把它的字母集合与三行比较，若是其中某一行的子集，则加入答案。

时间复杂度 $O(L)$，空间复杂度 $O(C)$。其中 $L$ 为所有字符串的长度之和；而 $C$ 为字符集的大小，本题中 $C = 26$。




#### Python3


```python
class Solution:
    def findWords(self, words: List[str]) -> List[str]:
        s1 = set('qwertyuiop')
        s2 = set('asdfghjkl')
        s3 = set('zxcvbnm')
        ans = []
        for w in words:
            s = set(w.lower())
            if s <= s1 or s <= s2 or s <= s3:
                ans.append(w)
        return ans
```








### 方法二：字符映射



> **思考**
>
> 集合判断已经是线性扫描，但每个单词都要新建集合并做三次子集比较，常数偏大。
>
> 将二十六字母预先映射到行号后，只需核对单词内所有字母是否与首字母同行。映射表长度为字符集大小，判断仍是一遍扫描，实现更直接。



将每个键盘行的字符映射到对应的行号，再判断单词中所有字母是否落在同一行。

时间复杂度 $O(L)$，空间复杂度 $O(C)$。其中 $L$ 为所有字符串的长度之和；而 $C$ 为字符集的大小，本题中 $C = 26$。




#### Python3


```python
class Solution:
    def findWords(self, words: List[str]) -> List[str]:
        ans = []
        s = "12210111011122000010020202"
        for w in words:
            x = s[ord(w[0].lower()) - ord('a')]
            if all(s[ord(c.lower()) - ord('a')] == x for c in w):
                ans.append(w)
        return ans
```


#### TypeScript


```ts
function findWords(words: string[]): string[] {
    const s = '12210111011122000010020202';
    const ans: string[] = [];
    for (const w of words) {
        const t = w.toLowerCase();
        const x = s[t.charCodeAt(0) - 'a'.charCodeAt(0)];
        let ok = true;
        for (const c of t) {
            if (s[c.charCodeAt(0) - 'a'.charCodeAt(0)] !== x) {
                ok = false;
                break;
            }
        }
        if (ok) {
            ans.push(w);
        }
    }
    return ans;
}
```

## 解法




### 方法一：双指针



> **思考**
>
> 要反转单词顺序并挤掉多余空格。 $n\le 10^4$。用双指针扫描，跳过空格后截出每个单词，收集后再整体反转拼接，首尾与词间空格自然消失。



我们可以使用双指针 $i$ 和 $j$，每次找到一个单词，将其添加到结果列表中，最后将结果列表反转，再拼接成字符串即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串的长度。




#### Python3


```python
class Solution:
    def reverseWords(self, s: str) -> str:
        words = []
        i, n = 0, len(s)
        while i < n:
            while i < n and s[i] == " ":
                i += 1
            if i < n:
                j = i
                while j < n and s[j] != " ":
                    j += 1
                words.append(s[i:j])
                i = j
        return " ".join(words[::-1])
```


#### TypeScript


```ts
function reverseWords(s: string): string {
    const words: string[] = [];
    const n = s.length;
    let i = 0;
    while (i < n) {
        while (i < n && s[i] === ' ') {
            i++;
        }
        if (i < n) {
            let j = i;
            while (j < n && s[j] !== ' ') {
                j++;
            }
            words.push(s.slice(i, j));
            i = j;
        }
    }
    return words.reverse().join(' ');
}
```


### 方法二：字符串分割



> **思考**
>
> 方法一手工切词。语言自带的按空白分割会丢掉多余空格，得到单词列表后再反转拼接，代码更短，复杂度相同。



我们可以使用语言内置的字符串分割函数，将字符串按空格分割成单词列表，然后将列表反转，再拼接成字符串即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串的长度。




#### Python3


```python
class Solution:
    def reverseWords(self, s: str) -> str:
        return " ".join(reversed(s.split()))
```


#### TypeScript


```ts
function reverseWords(s: string): string {
    return s.trim().split(/\s+/).reverse().join(' ');
}
```

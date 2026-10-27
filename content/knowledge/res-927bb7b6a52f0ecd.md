## 解法




### 方法一：逆向遍历 + 双指针



> **思考**
>
> 题目保证至少有一个单词，答案只取决于最后一个单词的长度。若按空格切分再取末段， $n \le 10^4$ 可以通过，但会扫完整串并分配若干子串。
>
> 中间的单词无需处理。最后一个单词贴在串尾，其右侧可能还有空格。
>
> 因此从右向左先跳过尾部空格，再继续走到该单词的左边界，两端下标之差即为长度。



我们从字符串 $s$ 末尾开始遍历，找到第一个不为空格的字符，即为最后一个单词的最后一个字符，下标记为 $i$。然后继续向前遍历，找到第一个为空格的字符，即为最后一个单词的第一个字符的前一个字符，记为 $j$。那么最后一个单词的长度即为 $i - j$。

时间复杂度 $O(n)$，其中 $n$ 为字符串 $s$ 长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        i = len(s) - 1
        while i >= 0 and s[i] == ' ':
            i -= 1
        j = i
        while j >= 0 and s[j] != ' ':
            j -= 1
        return i - j
```


#### TypeScript


```ts
function lengthOfLastWord(s: string): number {
    let i = s.length - 1;
    while (i >= 0 && s[i] === ' ') {
        --i;
    }
    let j = i;
    while (j >= 0 && s[j] !== ' ') {
        --j;
    }
    return i - j;
}
```

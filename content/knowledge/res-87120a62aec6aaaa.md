## 解法




### 方法一：贪心



> **思考**
>
> 改动恰好一个字符，使结果不是回文且字典序最小；长度为 $1$ 时无法做到。在前半段把某个非 `'a'` 改成 `'a'` 既破坏对称，又尽量靠左、尽量变小。若前半全是 `'a'`，只能把最后一个字符改成 `'b'`，否则改完仍是回文。



我们先判断字符串的长度是否为 $1$，若是则直接返回空串。

否则，我们从左到右遍历字符串的前半部分，找到第一个不为 `'a'` 的字符，将其改为 `'a'` 即可。如果不存在这样的字符，那么我们将最后一个字符改为 `'b'` 即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串的长度。




#### Python3


```python
class Solution:
    def breakPalindrome(self, palindrome: str) -> str:
        n = len(palindrome)
        if n == 1:
            return ""
        s = list(palindrome)
        i = 0
        while i < n // 2 and s[i] == "a":
            i += 1
        if i == n // 2:
            s[-1] = "b"
        else:
            s[i] = "a"
        return "".join(s)
```


#### TypeScript


```ts
function breakPalindrome(palindrome: string): string {
    const n = palindrome.length;
    if (n === 1) {
        return '';
    }
    const s = palindrome.split('');
    let i = 0;
    while (i < n >> 1 && s[i] === 'a') {
        i++;
    }
    if (i == n >> 1) {
        s[n - 1] = 'b';
    } else {
        s[i] = 'a';
    }
    return s.join('');
}
```

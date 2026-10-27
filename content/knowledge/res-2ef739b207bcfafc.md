## 解法




### 方法一：滑动窗口



> **思考**
>
> 定长 $k$ 的子串中元音最多。 $n\le 10^5$，不能对每个起点重数。先统计前 $k$ 个，再滑窗加减进出字符是否为元音。



我们首先统计前 $k$ 个字符中元音字母的个数，记为 $cnt$，初始化答案 $ans$ 为 $cnt$。

然后我们从 $k$ 开始遍历字符串，每次遍历时，我们将当前字符加入窗口，如果当前字符是元音字母，则 $cnt$ 加一；将窗口第一个字符移出窗口，如果移除的字符是元音字母，则 $cnt$ 减一。然后，我们更新答案 $ans = \max(ans, cnt)$。

遍历结束后，返回答案即可。

时间复杂度 $O(n)$，其中 $n$ 为字符串 $s$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def maxVowels(self, s: str, k: int) -> int:
        vowels = set("aeiou")
        ans = cnt = sum(c in vowels for c in s[:k])
        for i in range(k, len(s)):
            cnt += int(s[i] in vowels) - int(s[i - k] in vowels)
            ans = max(ans, cnt)
        return ans
```


#### TypeScript


```ts
function maxVowels(s: string, k: number): number {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let cnt = 0;
    for (let i = 0; i < k; i++) {
        if (vowels.has(s[i])) {
            cnt++;
        }
    }
    let ans = cnt;
    for (let i = k; i < s.length; i++) {
        if (vowels.has(s[i])) {
            cnt++;
        }
        if (vowels.has(s[i - k])) {
            cnt--;
        }
        ans = Math.max(ans, cnt);
    }
    return ans;
}
```

## 解法




### 方法一：字符串分割



> **思考**
>
> 段由空格分隔。手写扫描要处理首尾与连续空格； $\texttt{split}$ 默认按空白切开并丢掉空段，直接得到段数。
>
> 语言库一次遍历即可，适合作为第一解。



我们将字符串 $\textit{s}$ 按照空格进行分割，然后统计不为空的单词个数。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串 $\textit{s}$ 的长度。




#### Python3


```python
class Solution:
    def countSegments(self, s: str) -> int:
        return len(s.split())
```


#### TypeScript


```ts
function countSegments(s: string): number {
    return s.split(/\s+/).filter(Boolean).length;
}
```


### 方法二：模拟



> **思考**
>
> 方法一分配了单词列表。若只计数，遇到「非空格且前一格是空格（或位于开头）」即新段开始，额外空间降为常数。



我们也可以直接遍历字符串的每个字符 $\text{s[i]}$，如果 $\text{s[i]}$ 不是空格且 $\text{s[i-1]}$ 是空格或者 $i = 0$，那么就说明 $\text{s[i]}$ 是一个新的单词的开始，我们就将答案加一。

遍历结束后，返回答案即可。

时间复杂度 $O(n)$，其中 $n$ 为字符串 $\textit{s}$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def countSegments(self, s: str) -> int:
        ans = 0
        for i, c in enumerate(s):
            if c != ' ' and (i == 0 or s[i - 1] == ' '):
                ans += 1
        return ans
```


#### TypeScript


```ts
function countSegments(s: string): number {
    let ans = 0;
    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        if (c !== ' ' && (i === 0 || s[i - 1] === ' ')) {
            ans++;
        }
    }
    return ans;
}
```

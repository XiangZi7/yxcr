## 解法




### 方法一：模拟



> **思考**
>
> 要反转每个单词，单词之间的空格保留。按空格切开、逐词反转再拼回即可。
>
> `split` 得到单词数组，每个单词 `[::-1]` 后用空格连接。不必自己维护双指针，除非题目禁止库函数。



我们可以将字符串 $\textit{s}$ 按照空格分割成单词数组 $\textit{words}$，然后将每个单词反转后再拼接成字符串。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串 $\textit{s}$ 的长度。




#### Python3


```python
class Solution:
    def reverseWords(self, s: str) -> str:
        return " ".join(t[::-1] for t in s.split())
```


#### TypeScript


```ts
function reverseWords(s: string): string {
    return s
        .split(' ')
        .map(t => t.split('').reverse().join(''))
        .join(' ');
}
```

## 解法




### 方法一：栈



> **思考**
>
> 反复扫描删除相邻相等对， $n\le 10^5$ 时可能多次重扫。一次删除后新的相邻对应立即可见，适合用栈维护「当前压缩结果」。
>
> 读入字符若与栈顶相同则弹出（消掉这一对），否则入栈。
>
> 扫完后栈中剩余字符即为消除完毕的串。



遍历字符串 `s` 中的每个字符 `c`，若栈为空或者栈顶值不等于字符 `c`，将 `c` 入栈，否则栈顶元素出栈。

最后返回栈中元素所组成的字符串。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是字符串 `s` 的长度。




#### Python3


```python
class Solution:
    def removeDuplicates(self, s: str) -> str:
        stk = []
        for c in s:
            if stk and stk[-1] == c:
                stk.pop()
            else:
                stk.append(c)
        return ''.join(stk)
```


#### JavaScript


```js
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function (s) {
    const stk = [];
    for (const c of s) {
        if (stk.length && stk[stk.length - 1] == c) {
            stk.pop();
        } else {
            stk.push(c);
        }
    }
    return stk.join('');
};
```

## 解法




### 方法一：计数



> **思考**
>
> 先按原语拆分再去掉每段最外层括号可以得到答案， $n$ 通常为 $10^5$ 量级时多次切分没有必要。原语的最外层左右括号恰好出现在深度从 $0$ 进入 $1$、以及从 $1$ 回到 $0$ 之时。
>
> 因此用一个深度计数器扫描：遇到左括号先加一，仅当深度大于 $1$ 时保留；遇到右括号先减一，仅当减完后仍为正时保留。
>
> 一次遍历即可拼出结果，额外空间除答案外为常数。



遍历字符串，遇到左括号 `'('` 计数器加一，此时计数器不为 $1$ 时，说明当前括号不是最外层括号，将其加入结果字符串。遇到右括号 `')'` 计数器减一，此时计数器不为 $0$ 时，说明当前括号不是最外层括号，将其加入结果字符串。

时间复杂度 $O(n)$，其中 $n$ 为字符串长度。忽略答案字符串的空间开销，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def removeOuterParentheses(self, s: str) -> str:
        ans = []
        cnt = 0
        for c in s:
            if c == '(':
                cnt += 1
                if cnt > 1:
                    ans.append(c)
            else:
                cnt -= 1
                if cnt > 0:
                    ans.append(c)
        return ''.join(ans)
```


#### TypeScript


```ts
function removeOuterParentheses(s: string): string {
    let res = '';
    let depth = 0;
    for (const c of s) {
        if (c === '(') {
            depth++;
        }
        if (depth !== 1) {
            res += c;
        }
        if (c === ')') {
            depth--;
        }
    }
    return res;
}
```


### 方法二



> **思考**
>
> 方法一按括号种类分别判断是否写入，实现上要写两处对称条件。深度大于 $1$ 时当前字符一定属于某段内部，无论它是左还是右。
>
> 统一成「先按左括号更新深度，深度大于 $1$ 则写入，再按右括号回退」，与方法一同一计数，只是把写入收成一处。






#### Python3


```python
class Solution:
    def removeOuterParentheses(self, s: str) -> str:
        ans = []
        cnt = 0
        for c in s:
            if c == '(':
                cnt += 1
            if cnt > 1:
                ans.append(c)
            if c == ')':
                cnt -= 1
        return ''.join(ans)
```

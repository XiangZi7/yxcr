## 解法




### 方法一



> **思考**
>
> 解码 $k[encoded]$ 嵌套重复串。括号匹配可用递归，也可用栈同时记下倍数与外层已拼串。
>
> 数字累入 `num`，遇 `[` 把倍数与当前结果压栈并清空；遇 `]` 弹出外层，把当前段重复后接回；字母直接追加。栈保证由内向外展开。






#### Python3


```python
class Solution:
    def decodeString(self, s: str) -> str:
        s1, s2 = [], []
        num, res = 0, ''
        for c in s:
            if c.isdigit():
                num = num * 10 + int(c)
            elif c == '[':
                s1.append(num)
                s2.append(res)
                num, res = 0, ''
            elif c == ']':
                res = s2.pop() + res * s1.pop()
            else:
                res += c
        return res
```


#### TypeScript


```ts
function decodeString(s: string): string {
    let ans = '';
    let stack = [];
    let count = 0; // repeatCount
    for (let cur of s) {
        if (/[0-9]/.test(cur)) {
            count = count * 10 + Number(cur);
        } else if (/[a-z]/.test(cur)) {
            ans += cur;
        } else if ('[' == cur) {
            stack.push([ans, count]);
            // reset
            ans = '';
            count = 0;
        } else {
            // match ']'
            let [pre, count] = stack.pop();
            ans = pre + ans.repeat(count);
        }
    }
    return ans;
}
```

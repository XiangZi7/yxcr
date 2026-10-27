## 解法




### 方法一：栈



> **思考**
>
> 表达式含嵌套的 `!`、`&`、`|`，递归下降需要处理括号配对与逗号。从左到右扫描时，把 `t`、`f` 与算子压栈，遇 `)` 则弹出到算子，并按弹出的真假个数归约出新的 `t` 或 `f` 再入栈，相当于按括号层次求值。
>
> 逗号只作分隔，不必入栈。扫完后栈中只剩一个字符，即为整个表达式的值。



对于这种表达式解析问题，我们可以使用栈来辅助解决。

从左到右遍历表达式 `expression`，对于遍历到的每个字符 $c$：

- 如果 $c$ 是 `"tf!&|"` 中的一个，我们直接将其入栈；
- 如果 $c$ 是右括号 `')'`，我们将栈中元素依次出栈，直到遇到操作符 `'!'` 或 `'&'` 或 `'|'`。过程中我们用变量 $t$ 和 $f$ 记录出栈字符中 `'t'` 和 `'f'` 的个数。最后根据出栈字符的个数和操作符计算得到新的字符 `'t'` 或 `'f'`，并将其入栈。

遍历完表达式 `expression` 后，栈中只剩下一个字符，如果是 `'t'`，返回 `true`，否则返回 `false`。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是表达式 `expression` 的长度。




#### Python3


```python
class Solution:
    def parseBoolExpr(self, expression: str) -> bool:
        stk = []
        for c in expression:
            if c in 'tf!&|':
                stk.append(c)
            elif c == ')':
                t = f = 0
                while stk[-1] in 'tf':
                    t += stk[-1] == 't'
                    f += stk[-1] == 'f'
                    stk.pop()
                match stk.pop():
                    case '!':
                        c = 't' if f else 'f'
                    case '&':
                        c = 'f' if f else 't'
                    case '|':
                        c = 't' if t else 'f'
                stk.append(c)
        return stk[0] == 't'
```


#### TypeScript


```ts
function parseBoolExpr(expression: string): boolean {
    const expr = expression;
    const n = expr.length;
    let i = 0;
    const dfs = () => {
        let res: boolean[] = [];
        while (i < n) {
            const c = expr[i++];
            if (c === ')') {
                break;
            }

            if (c === '!') {
                res.push(!dfs()[0]);
            } else if (c === '|') {
                res.push(dfs().some(v => v));
            } else if (c === '&') {
                res.push(dfs().every(v => v));
            } else if (c === 't') {
                res.push(true);
            } else if (c === 'f') {
                res.push(false);
            }
        }
        return res;
    };
    return dfs()[0];
}
```

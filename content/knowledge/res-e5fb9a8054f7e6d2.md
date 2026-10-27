## 解法




### 方法一：动态规划



> **思考**
>
> 枚举每个子串再用栈判定是否有效，时间复杂度为 $O(n^2)$ 乃至 $O(n^3)$。 $n \le 3 \times 10^4$，无法通过。
>
> 大量子串互相重叠：以某一位置结尾的最长有效括号，可以由更短的有效段拼接得到。因此可以按结尾位置递推。
>
> 有效括号串只能以右括号结尾。若 $s[i-1]$ 与前一位配成一对，长度即为再往前那段加上 $2$；若前一位也是右括号，则先跨过已经配好的一段，再判断这段之前是否还能配上一个左括号。我们可以定义 $f[i]$ 为以 $s[i-1]$ 结尾的最长有效长度，按上述两种配对方式转移，答案取 $\max f[i]$。



我们定义 $f[i]$ 表示以 $s[i-1]$ 结尾的最长有效括号的长度，那么答案就是 $\max\limits_{i=1}^n f[i]$。

- 如果 $s[i-1]$ 是左括号，那么以 $s[i-1]$ 结尾的最长有效括号的长度一定为 $0$，因此 $f[i] = 0$。
- 如果 $s[i-1]$ 是右括号，有以下两种情况：
    - 如果 $s[i-2]$ 是左括号，那么以 $s[i-1]$ 结尾的最长有效括号的长度为 $f[i-2] + 2$。
    - 如果 $s[i-2]$ 是右括号，那么以 $s[i-1]$ 结尾的最长有效括号的长度为 $f[i-1] + 2$，但是还需要考虑 $s[i-f[i-1]-2]$ 是否是左括号，如果是左括号，那么以 $s[i-1]$ 结尾的最长有效括号的长度为 $f[i-1] + 2 + f[i-f[i-1]-2]$。

因此，我们可以得到状态转移方程：

$$
\begin{cases}
f[i] = 0, & \textit{if } s[i-1] = '(',\\
f[i] = f[i-2] + 2, & \textit{if } s[i-1] = ')' \textit{ and } s[i-2] = '(',\\
f[i] = f[i-1] + 2 + f[i-f[i-1]-2], & \textit{if } s[i-1] = ')' \textit{ and } s[i-2] = ')' \textit{ and } s[i-f[i-1]-2] = '(',\\
\end{cases}
$$

最后返回 $\max\limits_{i=1}^n f[i]$ 即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串的长度。




#### Python3


```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        n = len(s)
        f = [0] * (n + 1)
        for i, c in enumerate(s, 1):
            if c == ")":
                if i > 1 and s[i - 2] == "(":
                    f[i] = f[i - 2] + 2
                else:
                    j = i - f[i - 1] - 1
                    if j and s[j - 1] == "(":
                        f[i] = f[i - 1] + 2 + f[j - 1]
        return max(f)
```


#### TypeScript


```ts
function longestValidParentheses(s: string): number {
    const n = s.length;
    const f: number[] = new Array(n + 1).fill(0);
    for (let i = 2; i <= n; ++i) {
        if (s[i - 1] === ')') {
            if (s[i - 2] === '(') {
                f[i] = f[i - 2] + 2;
            } else {
                const j = i - f[i - 1] - 1;
                if (j && s[j - 1] === '(') {
                    f[i] = f[i - 1] + 2 + f[j - 1];
                }
            }
        }
    }
    return Math.max(...f);
}
```


### 方法二：使用栈



> **思考**
>
> 方法一已经是 $O(n)$ 时间，但转移需区分「前一位是否为左括号」以及「跨过一段有效括号再向前配对」，下标边界容易遗漏。
>
> 我们需要的并非更低的复杂度，而是更贴合配对过程的记录方式：尚未匹配的左括号下标，以及上一段失效从何处开始。栈恰好维护这两类信息：栈底先放入 $-1$ 作为基准，遇左括号压入下标，遇右括号弹出；若栈空则当前位置成为新基准，否则用栈顶更新长度。



- 使用栈来存储左括号的索引，栈底元素初始化为 `-1`，用于辅助计算有效括号的长度。
- 遍历字符串，对于每个字符：
    - 如果是左括号，将当前位置压入栈。
    - 如果是右括号，弹出栈顶元素表示匹配了一个左括号。
        - 如果栈为空，说明当前右括号无法匹配，将当前位置压入栈作为新的起点。
        - 如果栈不为空，计算当前有效括号子串的长度，更新最大长度。
- 最终返回最大长度。

总结：这个算法的关键在于维护一个线，栈内存放的是左括号的索引，通过弹出和压入的操作来更新有效括号子串的长度。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串的长度。




#### Python3


```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        stack = [-1]
        ans = 0
        for i in range(len(s)):
            if s[i] == '(':
                stack.append(i)
            else:
                stack.pop()
                if not stack:
                    stack.append(i)
                else:
                    ans = max(ans, i - stack[-1])
        return ans
```


#### TypeScript


```ts
function longestValidParentheses(s: string): number {
    let max_length: number = 0;
    const stack: number[] = [-1];
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) == '(') {
            stack.push(i);
        } else {
            stack.pop();

            if (stack.length === 0) {
                stack.push(i);
            } else {
                max_length = Math.max(max_length, i - stack[stack.length - 1]);
            }
        }
    }

    return max_length;
}
```

## 解法




### 方法一：模拟



> **思考**
>
> 括号从内向外反转，可用栈模拟：遇 `)` 则弹出至配对 `(`，倒序再压回。每层反转可能移动 $O(n)$ 个字符，最坏 $O(n^2)$，但 $n\le 2000$ 可接受。



我们可以直接用栈来模拟反转的过程。

时间复杂度 $O(n^2)$，空间复杂度 $O(n)$，其中 $n$ 为字符串 $s$ 的长度。




#### Python3


```python
class Solution:
    def reverseParentheses(self, s: str) -> str:
        stk = []
        for c in s:
            if c == ")":
                t = []
                while stk[-1] != "(":
                    t.append(stk.pop())
                stk.pop()
                stk.extend(t)
            else:
                stk.append(c)
        return "".join(stk)
```


#### TypeScript


```ts
function reverseParentheses(s: string): string {
    const stk: string[] = [];
    for (const c of s) {
        if (c === ')') {
            const t: string[] = [];
            while (stk.at(-1)! !== '(') {
                t.push(stk.pop()!);
            }
            stk.pop();
            stk.push(...t);
        } else {
            stk.push(c);
        }
    }
    return stk.join('');
}
```


### 方法二：脑筋急转弯



> **思考**
>
> 方法一反复搬动字符。配对括号相当于「跳到对端并掉头」：预处理每对括号的下标，遍历时遇括号则跳转并取反步长，只把字母写入答案，线性扫完。



我们观察发现，遍历字符串时，每一次遇到 `(` 或者 `)`，都是跳到对应的 `)` 或者 `(`，然后反转遍历的方向，继续遍历。

因此，我们可以用一个数组 $d$ 来记录每个 `(` 或者 `)` 对应的另一个括号的位置，即 $d[i]$ 表示 $i$ 处的括号对应的另一个括号的位置。直接用栈就可以求出 $d$ 数组。

然后，我们从左到右遍历字符串，遇到 `(` 或者 `)` 时，根据 $d$ 数组跳到对应的位置，然后反转方向，继续遍历，直到遍历完整个字符串。

时间复杂度 $O(n)$，空间复杂度 $O(n)$，其中 $n$ 为字符串 $s$ 的长度。




#### Python3


```python
class Solution:
    def reverseParentheses(self, s: str) -> str:
        n = len(s)
        d = [0] * n
        stk = []
        for i, c in enumerate(s):
            if c == "(":
                stk.append(i)
            elif c == ")":
                j = stk.pop()
                d[i], d[j] = j, i
        i, x = 0, 1
        ans = []
        while i < n:
            if s[i] in "()":
                i = d[i]
                x = -x
            else:
                ans.append(s[i])
            i += x
        return "".join(ans)
```


#### TypeScript


```ts
function reverseParentheses(s: string): string {
    const n = s.length;
    const d: number[] = Array(n).fill(0);
    const stk: number[] = [];
    for (let i = 0; i < n; ++i) {
        if (s[i] === '(') {
            stk.push(i);
        } else if (s[i] === ')') {
            const j = stk.pop()!;
            d[i] = j;
            d[j] = i;
        }
    }
    let i = 0;
    let x = 1;
    const ans: string[] = [];
    while (i < n) {
        const c = s.charAt(i);
        if ('()'.includes(c)) {
            i = d[i];
            x = -x;
        } else {
            ans.push(c);
        }
        i += x;
    }
    return ans.join('');
}
```

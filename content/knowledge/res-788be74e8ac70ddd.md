## 解法




### 方法一：栈



> **思考**
>
> 求最小字典序的去重子序列，且须用尽每种出现过的字符各一次。若在全部子序列中选最小者，状态过多。
>
> 记录每字符最后出现位置。从左扫描，已在栈中则跳过；否则在栈顶更大且后面还会出现时弹出，再压入当前字符。单调栈保证局部最小，最后出现位置保证弹出仍可补回。



我们用一个数组 `last` 记录每个字符最后一次出现的位置，用栈来保存结果字符串，用一个数组 `vis` 或者一个整型变量 `mask` 记录当前字符是否在栈中。

遍历字符串 $s$，对于每个字符 $c$，如果 $c$ 不在栈中，我们就需要判断栈顶元素是否大于 $c$，如果大于 $c$，且栈顶元素在后面还会出现，我们就将栈顶元素弹出，将 $c$ 压入栈中。

最后将栈中元素拼接成字符串作为结果返回。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串 $s$ 的长度。




#### Python3


```python
class Solution:
    def removeDuplicateLetters(self, s: str) -> str:
        last = {c: i for i, c in enumerate(s)}
        stk = []
        vis = set()
        for i, c in enumerate(s):
            if c in vis:
                continue
            while stk and stk[-1] > c and last[stk[-1]] > i:
                vis.remove(stk.pop())
            stk.append(c)
            vis.add(c)
        return ''.join(stk)
```


### 方法二



> **思考**
>
> 方法一用最后下标判断「后面是否还有」。改为先统计频次，扫描时递减，栈顶剩余次数仍为正即可弹出。判定条件等价，不必预存最后位置。






#### Python3


```python
class Solution:
    def removeDuplicateLetters(self, s: str) -> str:
        count, in_stack = [0] * 128, [False] * 128
        stack = []
        for c in s:
            count[ord(c)] += 1
        for c in s:
            count[ord(c)] -= 1
            if in_stack[ord(c)]:
                continue
            while len(stack) and stack[-1] > c:
                peek = stack[-1]
                if count[ord(peek)] < 1:
                    break
                in_stack[ord(peek)] = False
                stack.pop()
            stack.append(c)
            in_stack[ord(c)] = True
        return ''.join(stack)
```

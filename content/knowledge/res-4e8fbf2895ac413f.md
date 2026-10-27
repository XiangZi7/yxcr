## 解法




### 方法一：双指针



> **思考**
>
> 要找比 $n$ 大的最小整数，且所用数字是 $n$ 的一个排列。下一个排列算法正好做这件事。
>
> 从右找第一个下降位置 $i$（ $cs[i] < cs[i+1]$），再从右找刚好比 $cs[i]$ 大的 $j$，交换后把 $i$ 右侧反转成升序。若不存在下降位置则已是最大排列，返回 $-1$。结果超出 $32$ 位整数也返回 $-1$。






#### Python3


```python
class Solution:
    def nextGreaterElement(self, n: int) -> int:
        cs = list(str(n))
        n = len(cs)
        i, j = n - 2, n - 1
        while i >= 0 and cs[i] >= cs[i + 1]:
            i -= 1
        if i < 0:
            return -1
        while cs[i] >= cs[j]:
            j -= 1
        cs[i], cs[j] = cs[j], cs[i]
        cs[i + 1 :] = cs[i + 1 :][::-1]
        ans = int(''.join(cs))
        return -1 if ans > 2**31 - 1 else ans
```

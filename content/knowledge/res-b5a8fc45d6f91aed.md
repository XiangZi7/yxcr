## 解法




### 方法一：回溯 + 剪枝



> **思考**
>
> 把数字串拆成至少三项的斐波那契序列，且每项为 $32$ 位整数。串长 $\le 200$，前两项确定后其余被完全决定，适合回溯。
>
> 枚举下一项的结束位置，禁止前导零，超上界或已大于前两项之和则剪枝。已有两项时必须恰好等于其和。搜到末尾且长度大于 $2$ 即成功。



我们设计一个函数 $dfs(i)$，表示从字符串 $num$ 的第 $i$ 个字符开始拆分，拆分出的斐波那契式序列是否满足题目要求。如果满足，我们就返回 $true$，否则返回 $false$。

函数 $dfs(i)$ 的具体实现如下：

如果 $i$ 等于字符串 $num$ 的长度，说明我们已经拆分完整个字符串，此时我们只需要判断拆分出的序列的长度是否大于 $2$ 即可。如果大于 $2$，说明我们找到了一组满足题目要求的斐波那契式序列，返回 $true$；否则返回 $false$。

如果 $i$ 小于字符串 $num$ 的长度，我们需要枚举拆分出的第一个数 $x$，如果 $x$ 的长度大于 $1$，且以 $0$ 开头，说明 $x$ 不是一个合法的数，我们直接返回 $false$。否则我们将 $x$ 转换成十进制数，如果 $x$ 大于 $2^{31} - 1$，或者 $x$ 大于 $ans$ 的最后两个数之和，直接返回 $false$。如果 $ans$ 的长度小于 $2$，或者 $x$ 等于 $ans$ 的最后两个数之和，我们将 $x$ 加入到 $ans$ 中，然后继续拆分字符串 $num$ 的后面的部分，如果返回 $true$，说明我们找到了一组满足题目要求的斐波那契式序列，返回 $true$；否则我们将 $x$ 从 $ans$ 中移除，然后继续枚举拆分出的第一个数 $x$。

时间复杂度 $O(n \times \log^2 M)$，空间复杂度 $O(n)$。其中 $n$ 和 $M$ 分别是字符串 $num$ 的长度和整型数的最大值。




#### Python3


```python
class Solution:
    def splitIntoFibonacci(self, num: str) -> List[int]:
        def dfs(i):
            if i == n:
                return len(ans) > 2
            x = 0
            for j in range(i, n):
                if j > i and num[i] == '0':
                    break
                x = x * 10 + int(num[j])
                if x > 2**31 - 1 or (len(ans) > 2 and x > ans[-2] + ans[-1]):
                    break
                if len(ans) < 2 or ans[-2] + ans[-1] == x:
                    ans.append(x)
                    if dfs(j + 1):
                        return True
                    ans.pop()
            return False

        n = len(num)
        ans = []
        dfs(0)
        return ans
```

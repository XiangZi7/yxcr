## 解法




### 方法一



> **思考**
>
> 删除一个值 $x$ 会同时删掉所有 $x-1$ 与 $x+1$，并得到所有 $x$ 的总和。 $n\le 2\times 10^4$、值域 $\le 10^4$，按每次选择枚举会重复子问题。
>
> 同一数值要么全拿要么全不拿，相邻数值互斥，这与打家劫舍相同：把每个值的得分预加到 $total[x]$，再在值域上做「偷或不偷」。
>
> 滚动两个变量表示处理到 $i-2$、 $i-1$ 的最优， $i$ 取 $first+total[i]$ 与 $second$ 的较大者。时间与值域成正比。






#### Python3


```python
class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        mx = -inf
        for num in nums:
            mx = max(mx, num)
        total = [0] * (mx + 1)
        for num in nums:
            total[num] += num
        first = total[0]
        second = max(total[0], total[1])
        for i in range(2, mx + 1):
            cur = max(first + total[i], second)
            first = second
            second = cur
        return second
```

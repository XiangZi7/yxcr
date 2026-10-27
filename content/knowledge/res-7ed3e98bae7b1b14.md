## 解法




### 方法一



> **思考**
>
> 在环形数组上按步长跳，求是否存在长度大于 $1$ 的同向环。记录整条路径集合需要额外空间，且 $n$ 不大但要排除自环与变向。
>
> 对每个起点快慢指针同向追逐：符号乘积为正保证同向。相遇后若下一步不是自身则找到环。沿途走过的位置置 $0$，之后不再作为起点。
>
> 置 $0$ 相当于染色，避免在无环链上反复出发；自环用 $\textit{slow}\ne \textit{next}(\textit{slow})$ 排除。






#### Python3


```python
class Solution:
    def circularArrayLoop(self, nums: List[int]) -> bool:
        n = len(nums)

        def next(i):
            return (i + nums[i] % n + n) % n

        for i in range(n):
            if nums[i] == 0:
                continue
            slow, fast = i, next(i)
            while nums[slow] * nums[fast] > 0 and nums[slow] * nums[next(fast)] > 0:
                if slow == fast:
                    if slow != next(slow):
                        return True
                    break
                slow, fast = next(slow), next(next(fast))
            j = i
            while nums[j] * nums[next(j)] > 0:
                nums[j] = 0
                j = next(j)
        return False
```

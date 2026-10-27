## 解法




### 方法一



> **思考**
>
> 从 $1\ldots n$ 交替从左、从右每隔一个删除，求最后剩下的数。模拟链表为 $O(n)$，而 $n$ 达 $10^9$。每轮长度减半，首尾与步长有闭式。
>
> 维护当前区间首 $a1$、尾 $an$、步长与剩余个数。从左删则首一定右移；从右删且长度为奇时首也右移。尾对称更新。剩一个时返回 $a1$。






#### Python3


```python
class Solution:
    def lastRemaining(self, n: int) -> int:
        a1, an = 1, n
        i, step, cnt = 0, 1, n
        while cnt > 1:
            if i % 2:
                an -= step
                if cnt % 2:
                    a1 += step
            else:
                a1 += step
                if cnt % 2:
                    an -= step
            cnt >>= 1
            step <<= 1
            i += 1
        return a1
```

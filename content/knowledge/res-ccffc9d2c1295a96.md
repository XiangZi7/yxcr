## 解法




### 方法一：贪心



> **思考**
>
> 求不超过 $n$ 的最大各位非降数。从 $n$ 向下逐个检查位数过多；需要直接改数字本身。
>
> 从高位找到第一处下降后，若只把后面改成 $9$，前面可能仍大于原数。应把下降处左侧连续偏大的位都减一，直到重新非降，再把右侧全部置 $9$，得到的是不超过 $n$ 的最大非降数。
>
> 先扫到第一处 $s[i-1]>s[i]$，再回退减一，最后把 $i$ 之后写成 $9$。位数为 $O(\log n)$。



从数字 `n` 的高位开始，找到第一个不满足 $n_{i-1} \le n_i$ 的位置 $i$。

然后，从后往前，只要发现 $n_{i-1} \gt n_i$，就将 $n_{i-1}$ 减 1。

最后将位置 $i$ 之后的所有数字都置为 9 即可。

时间复杂度 $O(\log n)$，空间复杂度 $O(\log n)$。




#### Python3


```python
class Solution:
    def monotoneIncreasingDigits(self, n: int) -> int:
        s = list(str(n))
        i = 1
        while i < len(s) and s[i - 1] <= s[i]:
            i += 1
        if i < len(s):
            while i and s[i - 1] > s[i]:
                s[i - 1] = str(int(s[i - 1]) - 1)
                i -= 1
            i += 1
            while i < len(s):
                s[i] = '9'
                i += 1
        return int(''.join(s))
```

## 解法




### 方法一：哈希表 + 排序



> **思考**
>
> 把数组重排成每项都是前一项的两倍。 $0$ 只能与 $0$ 配对，奇数个则失败。其余应按绝对值从小到大匹配：较小的 $x$ 必须能在 $2x$ 上找到足够次数，否则大数可能已被更小的数占用。计数表记录剩余次数。






#### Python3


```python
class Solution:
    def canReorderDoubled(self, arr: List[int]) -> bool:
        freq = Counter(arr)
        if freq[0] & 1:
            return False
        for x in sorted(freq, key=abs):
            if freq[x << 1] < freq[x]:
                return False
            freq[x << 1] -= freq[x]
        return True
```

## 解法




### 方法一：枚举时分 + 计数验证



> **思考**
>
> 四个数字组成最大合法时刻。合法时分一共 $24\times 60$ 种，从大到小枚举 $h,m$，用计数数组判断四位是否恰为给定数字，第一个命中即为答案。



从大到小枚举合法时分 $h \in [0,23]$、 $m \in [0,59]$，用计数数组判断四个数字是否恰好等于给定数组。第一个命中的就是最大合法时间。

时间复杂度 $O(1)$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def largestTimeFromDigits(self, arr: List[int]) -> str:
        cnt = [0] * 10
        for v in arr:
            cnt[v] += 1
        for h in range(23, -1, -1):
            for m in range(59, -1, -1):
                t = [0] * 10
                t[h // 10] += 1
                t[h % 10] += 1
                t[m // 10] += 1
                t[m % 10] += 1
                if cnt == t:
                    return f'{h:02}:{m:02}'
        return ''
```








### 方法二：暴力枚举（全排列）



> **思考**
>
> 枚举时分是常数级，也可以直接枚举四个下标的排列构造时分，合法者取最大。排列数 $4!=24$，同样可接受。



枚举 4 个数字的排列，判断构成的时分是否合法，并取最大值。

时间复杂度 $O(4^3)$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def largestTimeFromDigits(self, arr: List[int]) -> str:
        ans = -1
        for i in range(4):
            for j in range(4):
                for k in range(4):
                    if i != j and i != k and j != k:
                        h = arr[i] * 10 + arr[j]
                        m = arr[k] * 10 + arr[6 - i - j - k]
                        if h < 24 and m < 60:
                            ans = max(ans, h * 60 + m)
        return '' if ans < 0 else f'{ans // 60:02}:{ans % 60:02}'
```

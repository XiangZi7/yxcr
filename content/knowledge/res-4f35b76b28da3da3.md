## 解法




### 方法一：折半查找 + 二进制枚举



> **思考**
>
> 将数组分成两个非空子集且平均值相等，等价于存在大小为 $k$ 的子集其和为 $k\cdot \mathrm{avg}$。 $n\le 30$ 时 $2^n$ 枚举偏慢，但折半后每半约 $15$ 个数，二进制枚举可接受。
>
> 先把每个数变为 $n\cdot a_i-S$，则目标转化为「存在非空真子集其和为 $0$」。左半子集和放入集合，右半枚举时若自身为 $0$ 或相反数已在左半出现（且不是全集对全集），即可判定。



根据题目要求，要判断是否可以将数组 $\textit{nums}$ 划分为两个子数组 $A$ 和 $B$，使得两个子数组的平均值相等。

我们记数组 $\textit{nums}$ 的和为 $s$，元素个数为 $n$。子数组 $A$ 的和以及个数分别为 $s_1$ 和 $k$，那么子数组 $B$ 的和为 $s_2 = s - s_1$，个数为 $n - k$，即：

$$
\frac{s_1}{k} = \frac{s_2}{n - k} = \frac{s-s_1}{n-k}
$$

整理可得：

$$
s_1 \times (n-k) = (s-s_1) \times k
$$

化简可得：

$$
\frac{s_1}{k} = \frac{s}{n}
$$

也就是说，要我们找出一个子数组 $A$，使得其平均值等于数组 $\textit{nums}$ 的平均值。我们考虑将数组 $\textit{nums}$ 每个元素都减去数组 $\textit{nums}$ 的平均值，这样问题就转化为了在数组 $\textit{nums}$ 中找出一个子数组，使得其和为 $0$。

但是，数组 $\textit{nums}$ 的平均值可能不是整数，浮点数计算可能存在精度问题，我们不妨将数组 $\textit{nums}$ 中的每个元素都乘以 $n$，即 $nums[i] \leftarrow nums[i] \times n$，上述式子就变成：

$$
\frac{s_1\times n}{k} = s
$$

此时我们将数组 $\textit{nums}$ 中每个元素都减去整数 $s$，题目就转化为：在数组 $nums$ 中找出一个子数组 $A$，使得其和为 $0$。

数组 $\textit{nums}$ 的长度范围为 $[1, 30]$，如果我们使用暴力枚举子数组的方法，时间复杂度为 $O(2^n)$，会超时。我们可以使用折半查找的方法，将时间复杂度降低到 $O(2^{n/2})$。

我们将数组 $\textit{nums}$ 分成左右两部分，那么子数组 $A$ 可能存在三种情况：

1. 子数组 $A$ 完全在数组 $\textit{nums}$ 的左半部分；
2. 子数组 $A$ 完全在数组 $\textit{nums}$ 的右半部分；
3. 子数组 $A$ 一部分在数组 $\textit{nums}$ 的左半部分，一部分在数组 $\textit{nums}$ 的右半部分。

我们可以使用二进制枚举的方法，先枚举左半部分所有子数组的和，如果存在一个子数组和为 $0$，直接返回 `true`，否则我们将其存入哈希表 $\textit{vis}$ 中；然后枚举右半部分所有子数组的和，如果存在一个子数组和为 $0$，直接返回 `true`，否则我们判断此时哈希表 $\textit{vis}$ 中是否存在该和的相反数，如果存在，直接返回 `true`。

需要注意的是，我们不能同时全选左半部分和右半部分，因为这样会导致子数组 $B$ 为空，这是不符合题意的。在实现上，我们只需要考虑数组的 $n-1$ 个数。

时间复杂度 $O(n\times 2^{\frac{n}{2}})$，空间复杂度 $O(2^{\frac{n}{2}})$。




#### Python3


```python
class Solution:
    def splitArraySameAverage(self, nums: List[int]) -> bool:
        n = len(nums)
        if n == 1:
            return False
        s = sum(nums)
        for i, v in enumerate(nums):
            nums[i] = v * n - s
        m = n >> 1
        vis = set()
        for i in range(1, 1 << m):
            t = sum(v for j, v in enumerate(nums[:m]) if i >> j & 1)
            if t == 0:
                return True
            vis.add(t)
        for i in range(1, 1 << (n - m)):
            t = sum(v for j, v in enumerate(nums[m:]) if i >> j & 1)
            if t == 0 or (i != (1 << (n - m)) - 1 and -t in vis):
                return True
        return False
```

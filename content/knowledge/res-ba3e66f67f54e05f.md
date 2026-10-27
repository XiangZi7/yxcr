## 解法




### 方法一：前缀和 + 哈希表



> **思考**
>
> 要最长的 $0$、 $1$ 个数相等的子数组。枚举两端再计数是 $O(n^2)$，在 $n \le 10^5$ 下过慢。
>
> 把 $0$ 看成 $-1$ 后，和为 $0$ 的子数组即 $0$、 $1$ 个数相等。前缀和相同的两个位置夹出一段平衡子数组。哈希表记下每个前缀和首次出现的下标，再次遇到时用间距更新答案。 $0$ 预置为 $-1$，以覆盖从开头出发的段。



根据题目描述，我们可以将数组中的 $0$ 视作 $-1$，这样当遇到 $0$ 时，前缀和 $s$ 就会减一，当遇到 $1$ 时，前缀和 $s$ 就会加一。因此，假设前缀和 $s$ 在下标 $j$ 和 $i$ 处的值相等，其中 $j < i$，那么从下标 $j + 1$ 到 $i$ 的子数组中 $0$ 和 $1$ 的数量就是相等的。

我们使用哈希表存储所有的前缀和以及它们第一次出现的下标，初始时，我们将 $0$ 的前缀和映射到 $-1$。

遍历数组，计算前缀和 $s$，如果 $s$ 已经在哈希表中，那么我们就找到了一个和为 $0$ 的子数组，其长度为 $i - d[s]$，其中 $d[s]$ 是哈希表中保存的 $s$ 第一次出现的下标。如果 $s$ 不在哈希表中，我们将 $s$ 与它的下标 $i$ 存入哈希表。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是数组的长度。




#### Python3


```python
class Solution:
    def findMaxLength(self, nums: List[int]) -> int:
        d = {0: -1}
        ans = s = 0
        for i, x in enumerate(nums):
            s += 1 if x else -1
            if s in d:
                ans = max(ans, i - d[s])
            else:
                d[s] = i
        return ans
```


#### TypeScript


```ts
function findMaxLength(nums: number[]): number {
    const d: Record<number, number> = { 0: -1 };
    let ans = 0;
    let s = 0;
    for (let i = 0; i < nums.length; ++i) {
        s += nums[i] ? 1 : -1;
        if (d.hasOwnProperty(s)) {
            ans = Math.max(ans, i - d[s]);
        } else {
            d[s] = i;
        }
    }
    return ans;
}
```

## 解法




### 方法一：排序



> **思考**
>
> 最小时间差出现在排序后的相邻时刻，还要比较「最后一个与第一个跨午夜」的差。时刻只有 $1440$ 种，点数超过 $1440$ 必有重复，差为 $0$。
>
> 化成分钟后排序，再把首元素加 $1440$ 接到末尾，相邻差的最小值即为答案。排序决定总复杂度。



我们注意到，时间点最多只有 $24 \times 60 = 1440$ 个，因此，当 $timePoints$ 长度超过 $1440$，说明有重复的时间点，提前返回 $0$。

接下来，我们首先遍历时间列表，将其转换为“分钟制”列表 $nums$，比如，对于时间点 `13:14`，将其转换为 $13 \times 60 + 14$。

接着将“分钟制”列表按升序排列，然后将此列表的最小时间 $nums[0]$ 加上 $1440$ 追加至列表尾部，用于处理最大值、最小值的差值这种特殊情况。

最后遍历“分钟制”列表，找出相邻两个时间的最小值即可。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 为时间点个数。




#### Python3


```python
class Solution:
    def findMinDifference(self, timePoints: List[str]) -> int:
        if len(timePoints) > 1440:
            return 0
        nums = sorted(int(x[:2]) * 60 + int(x[3:]) for x in timePoints)
        nums.append(nums[0] + 1440)
        return min(b - a for a, b in pairwise(nums))
```


#### TypeScript


```ts
function findMinDifference(timePoints: string[]): number {
    if (timePoints.length > 1440) {
        return 0;
    }
    const n = timePoints.length;
    const nums: number[] = Array(n + 1);
    for (let i = 0; i < n; ++i) {
        const [hours, minutes] = timePoints[i].split(':').map(Number);
        nums[i] = hours * 60 + minutes;
    }
    nums.sort((a, b) => a - b);
    nums[n] = nums[0] + 1440;
    let ans = 1 << 30;
    for (let i = 1; i <= n; ++i) {
        ans = Math.min(ans, nums[i] - nums[i - 1]);
    }
    return ans;
}
```

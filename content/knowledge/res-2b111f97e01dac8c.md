## 解法




### 方法一：贪心 + 优先队列（小根堆）



> **思考**
>
> 至多 $k$ 人，表现值为速度和乘以效率最小值。 $n \le 10^5$，枚举子集不可行。按效率从高到低加入：当前效率即团队效率下界，只需在已加入的人中保留速度最大的至多 $k$ 个。小根堆在人数达到 $k$ 时弹出最慢者，同时维护速度和，用和乘当前效率更新答案。



本题是求“速度和”与“效率最小值”乘积的最大值。变量有两个，我们可以从大到小枚举 `efficiency[i]` 作为效率最小值，在所有效率大于等于 `efficiency[i]` 的工程师中选取不超过 $k-1$ 个，让他们速度和最大。

时间复杂度 $O(n\log n)$。

相似题目：

- [857. 雇佣 K 名工人的最低成本](https://github.com/doocs/leetcode/blob/main/solution/0800-0899/0857.Minimum%20Cost%20to%20Hire%20K%20Workers/README.md)




#### Python3


```python
class Solution:
    def maxPerformance(
        self, n: int, speed: List[int], efficiency: List[int], k: int
    ) -> int:
        t = sorted(zip(speed, efficiency), key=lambda x: -x[1])
        ans = tot = 0
        mod = 10**9 + 7
        h = []
        for s, e in t:
            tot += s
            ans = max(ans, tot * e)
            heappush(h, s)
            if len(h) == k:
                tot -= heappop(h)
        return ans % mod
```

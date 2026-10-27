## 解法




### 方法一：排序 + 贪心



> **思考**
>
> 去掉最少区间使剩下的互不重叠，等价于选出最多互不重叠区间。枚举子集不可行。
>
> 按右端点升序后贪心：能接在上一段后面的就留下。先结束的区间给后面留出更多空间，因此按右端排序。
>
> 答案初值为区间总数，每留下一段减一，即「总数减去最大相容子集」。



我们首先将区间按照右边界升序排序，用一个变量 $\textit{pre}$ 记录上一个区间的右边界，用一个变量 $\textit{ans}$ 记录需要移除的区间数量，初始时 $\textit{ans} = \textit{intervals.length}$。

然后遍历区间，对于每一个区间：

- 若当前区间的左边界大于等于 $\textit{pre}$，说明该区间无需移除，直接更新 $\textit{pre}$ 为当前区间的右边界，然后将 $\textit{ans}$ 减一；
- 否则，说明该区间需要移除，不需要更新 $\textit{pre}$ 和 $\textit{ans}$。

最后返回 $\textit{ans}$ 即可。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(\log n)$。其中 $n$ 为区间的数量。




#### Python3


```python
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: x[1])
        ans = len(intervals)
        pre = -inf
        for l, r in intervals:
            if pre <= l:
                ans -= 1
                pre = r
        return ans
```


#### TypeScript


```ts
function eraseOverlapIntervals(intervals: number[][]): number {
    intervals.sort((a, b) => a[1] - b[1]);
    let [ans, pre] = [intervals.length, -Infinity];
    for (const [l, r] of intervals) {
        if (pre <= l) {
            --ans;
            pre = r;
        }
    }
    return ans;
}
```

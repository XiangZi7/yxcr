## 解法




### 方法一：排序 + 贪心



> **思考**
>
> 选尽量少的点，使每个区间至少盖住两个。区间 $3000$ 个，枚举子集不可行。应让点尽量靠右，以便被后续区间复用。
>
> 按右端升序、同右端按左端降序排序后，先处理更「紧」的区间。维护已放置的最后两点 $s<e$。
>
> 区间已含两点则跳过；只含 $e$ 则在右端补 $b$；两点都不含则放 $b-1$ 与 $b$。这样每步补点最少且最靠右。



我们希望在数轴上选出尽可能少的整数点，使得每个区间都至少包含两个点。一个经典而有效的策略是按照区间的右端点进行排序，并尽量让已选取的点位于区间的右侧，以便这些点能覆盖更多后续区间。

首先将所有区间按照如下规则排序：

1. 按右端点从小到大；
2. 若右端点相同，按左端点从大到小。

这样排序的原因是：右端点越小的区间“可操作空间”越少，应优先满足；当右端点相同时，左端点更大的区间更窄，更应优先被处理。

随后，我们使用两个变量 $s$ 和 $e$ 分别记录当前所有已处理区间所共同拥有的 **倒数第二个点** 和 **最后一个点**。初始时 $s = e = -1$，表示还没有放置任何点。

接下来依次处理排序后的区间 $[a, b]$，根据它与 $\{s, e\}$ 的关系分三种情况讨论：

1. **若 $a \leq s$**：
   当前区间已包含 $s$ 和 $e$ 两个点，无需额外放点。

2. **若 $s < a \leq e$**：
   当前区间只包含一个点（即 $e$），还需要补一个点。为了让新点对后续区间最有帮助，我们选择在区间最右侧的点 $b$。此时更新 $\textit{ans} = \textit{ans} + 1$，并将新的两点设为 $\{e, b\}$。

3. **若 $a > e$**：
   当前区间完全不包含已有的两个点，需要补两个点。最优选择是在区间最右侧放置 $\{b - 1, b\}$。此时更新 $\textit{ans} = \textit{ans} + 2$，并将新的两点设为 $\{b - 1, b\}$。

最终返回总共放置的点数 $\textit{ans}$。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(\log n)$。其中 $n$ 为区间的数量。




#### Python3


```python
class Solution:
    def intersectionSizeTwo(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: (x[1], -x[0]))
        s = e = -1
        ans = 0
        for a, b in intervals:
            if a <= s:
                continue
            if a > e:
                ans += 2
                s, e = b - 1, b
            else:
                ans += 1
                s, e = e, b
        return ans
```


#### TypeScript


```ts
function intersectionSizeTwo(intervals: number[][]): number {
    intervals.sort((a, b) => (a[1] !== b[1] ? a[1] - b[1] : b[0] - a[0]));
    let s = -1;
    let e = -1;
    let ans = 0;
    for (const [a, b] of intervals) {
        if (a <= s) {
            continue;
        }
        if (a > e) {
            ans += 2;
            s = b - 1;
            e = b;
        } else {
            ans += 1;
            s = e;
            e = b;
        }
    }
    return ans;
}
```

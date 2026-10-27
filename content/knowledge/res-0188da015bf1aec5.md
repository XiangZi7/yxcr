## 解法




### 方法一：二分查找



> **思考**
>
> 天数越大越容易凑齐 $m$ 束，具有单调性。 $n\le 10^5$、 $bloomDay_i\le 10^9$，对天数二分。判定时从左到右数连续已开且长度为 $k$ 的段数是否至少 $m$。找不到则返回 $-1$。



根据题目描述，如果一个天数 $t$ 可以满足制作 $m$ 束花，那么对任意 $t' > t$，也一定可以满足制作 $m$ 束花。因此，我们可以使用二分查找的方法找到最小的满足制作 $m$ 束花的天数。

我们记花园中最大的开花天数为 $mx$，接下来，我们定义二分查找的左边界 $l = 1$，右边界 $r = mx + 1$。

然后，我们进行二分查找，对于每一个中间值 $\textit{mid} = \frac{l + r}{2}$，我们判断是否可以制作 $m$ 束花。如果可以，我们将右边界 $r$ 更新为 $\textit{mid}$，否则，我们将左边界 $l$ 更新为 $\textit{mid} + 1$。

最终，当 $l = r$ 时，结束二分查找。此时如果 $l > mx$，说明无法制作 $m$ 束花，返回 $-1$，否则返回 $l$。

因此，问题转换为判断一个天数 $\textit{days}$ 是否可以制作 $m$ 束花。

我们可以使用一个函数 $\text{check}(\textit{days})$ 来判断是否可以制作 $m$ 束花。具体地，我们从左到右遍历花园中的每一朵花，如果当前花开的天数小于等于 $\textit{days}$，我们将当前花加入到当前花束中，否则，我们将当前花束清空。当当前花束中的花的数量等于 $k$ 时，我们将当前花束的数量加一，并清空当前花束。最后，我们判断当前花束的数量是否大于等于 $m$，如果是，说明可以制作 $m$ 束花，否则，说明无法制作 $m$ 束花。

时间复杂度 $O(n \times \log M)$，其中 $n$ 和 $M$ 分别为花园中的花的数量和最大的开花天数，本题中 $M \leq 10^9$。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def minDays(self, bloomDay: List[int], m: int, k: int) -> int:
        def check(days: int) -> int:
            cnt = cur = 0
            for x in bloomDay:
                cur = cur + 1 if x <= days else 0
                if cur == k:
                    cnt += 1
                    cur = 0
            return cnt >= m

        mx = max(bloomDay)
        l = bisect_left(range(mx + 2), True, key=check)
        return -1 if l > mx else l
```


#### TypeScript


```ts
function minDays(bloomDay: number[], m: number, k: number): number {
    const mx = Math.max(...bloomDay);
    let [l, r] = [1, mx + 1];
    const check = (days: number): boolean => {
        let [cnt, cur] = [0, 0];
        for (const x of bloomDay) {
            cur = x <= days ? cur + 1 : 0;
            if (cur === k) {
                cnt++;
                cur = 0;
            }
        }
        return cnt >= m;
    };
    while (l < r) {
        const mid = (l + r) >> 1;
        if (check(mid)) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return l > mx ? -1 : l;
}
```

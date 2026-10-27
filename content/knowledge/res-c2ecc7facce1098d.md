## 解法




### 方法一：贪心 + 计数



> **思考**
>
> 每次取当前最小元素取反并重复 $k$ 次可以得到最优解， $n$ 与 $k$ 均不超过 $10^4$，但反复找最小值需要额外的选择结构。元素范围只有 $[-100,100]$，不必在原数组上排序。
>
> 为使总和最大，应优先把绝对值最大的负数翻成正数；若次数用尽后仍剩奇数次且没有 $0$，则必须再翻一次最小的正数。
>
> 用计数数组按 $-100$ 到 $-1$ 依次消耗翻转次数，再在必要时对最小正数补一次翻转，最后按频次加权求和。



我们观察发现，要使得数组的和尽可能大，就应该尽可能地将数组中的最小负数变成正数。

而题目中元素的范围为 $[-100,100]$，因此，我们可以先用哈希表 $\textit{cnt}$ 统计数组 $\textit{nums}$ 中每个元素出现的次数。接着从 $-100$ 开始遍历 $x$，如果哈希表中存在 $x$，那么我们取 $m = \min(cnt[x], k)$ 作为元素 $x$ 取反的个数，然后我们将 $\textit{cnt}[x]$ 减去 $m$，将 $\textit{cnt}[-x]$ 加上 $m$，并将 $k$ 减去 $m$。如果 $k$ 为 $0$，说明操作已经结束，直接退出循环即可。

如果 $k$ 仍然为奇数，且 $\textit{cnt}[0]=0$，那么我们还需要取 $\textit{cnt}$ 中最小的一个正数 $x$，将 $\textit{cnt}[x]$ 减去 $1$，将 $\textit{cnt}[-x]$ 加上 $1$。

最后，我们遍历哈希表 $\textit{cnt}$，将 $x$ 与 $\textit{cnt}[x]$ 相乘的结果累加，即为答案。

时间复杂度 $O(n + M)$，空间复杂度 $O(M)$。其中 $n$ 和 $M$ 分别为数组 $\textit{nums}$ 的长度和 $\textit{nums}$ 的数据范围大小。




#### Python3


```python
class Solution:
    def largestSumAfterKNegations(self, nums: List[int], k: int) -> int:
        cnt = Counter(nums)
        for x in range(-100, 0):
            if cnt[x]:
                m = min(cnt[x], k)
                cnt[x] -= m
                cnt[-x] += m
                k -= m
                if k == 0:
                    break
        if k & 1 and cnt[0] == 0:
            for x in range(1, 101):
                if cnt[x]:
                    cnt[x] -= 1
                    cnt[-x] += 1
                    break
        return sum(x * v for x, v in cnt.items())
```


#### TypeScript


```ts
function largestSumAfterKNegations(nums: number[], k: number): number {
    const cnt: Map<number, number> = new Map();
    for (const x of nums) {
        cnt.set(x, (cnt.get(x) || 0) + 1);
    }
    for (let x = -100; x < 0 && k > 0; ++x) {
        if (cnt.get(x)! > 0) {
            const m = Math.min(cnt.get(x) || 0, k);
            cnt.set(x, (cnt.get(x) || 0) - m);
            cnt.set(-x, (cnt.get(-x) || 0) + m);
            k -= m;
        }
    }
    if ((k & 1) === 1 && (cnt.get(0) || 0) === 0) {
        for (let x = 1; x <= 100; ++x) {
            if (cnt.get(x)! > 0) {
                cnt.set(x, (cnt.get(x) || 0) - 1);
                cnt.set(-x, (cnt.get(-x) || 0) + 1);
                break;
            }
        }
    }
    return Array.from(cnt.entries()).reduce((acc, [k, v]) => acc + k * v, 0);
}
```

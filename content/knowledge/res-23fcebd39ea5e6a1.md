## 解法




### 方法一：一次遍历



> **思考**
>
> 每次攻击刷新中毒，持续时间 $\textit{duration}$，重叠只算一次。模拟每个时刻过慢。
>
> 最后一次攻击一定贡献完整 $\textit{duration}$。相邻两次间隔若小于 $\textit{duration}$，前一次只贡献间隔，否则贡献完整时长。
>
> 按相邻差取 $\min(\textit{duration},b-a)$，一次遍历覆盖所有重叠。



我们先考虑最后一次攻击，此次攻击一定可以使得艾希处于中毒状态，所以总中毒时间至少为 `duration`。

接下来，我们考虑前 $n-1$ 次攻击，每一次攻击的中毒持续时间为 $min(duration, timeSeries[i] - timeSeries[i-1])$，其中 $i$ 从 1 开始。我们将这些中毒持续时间累加起来，即为总中毒时间。

时间复杂度 $O(n)$，空间复杂度 $O(1)$。其中 $n$ 为数组 `timeSeries` 的长度。




#### Python3


```python
class Solution:
    def findPoisonedDuration(self, timeSeries: List[int], duration: int) -> int:
        ans = duration
        for a, b in pairwise(timeSeries):
            ans += min(duration, b - a)
        return ans
```


#### TypeScript


```ts
function findPoisonedDuration(timeSeries: number[], duration: number): number {
    const n = timeSeries.length;
    let ans = duration;
    for (let i = 1; i < n; ++i) {
        ans += Math.min(duration, timeSeries[i] - timeSeries[i - 1]);
    }
    return ans;
}
```

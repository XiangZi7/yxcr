## 解法




### 方法一：滑动窗口



> **思考**
>
> 不生气的顾客始终计入；技巧只能覆盖连续 $\textit{minutes}$ 分钟的生气顾客。 $n\le 2\times 10^4$，应一次扫清所有窗口。
>
> 先把不生气时段的客流求和，再在生气客流上维护长为 $\textit{minutes}$ 的滑动窗口最大值。
>
> 窗口右移时加上新分钟的 $customers[i]\cdot grumpy[i]$、减去滑出的对应项，答案为固定客流加上该最大值。



根据题目描述，我们只需要统计老板不生气时的客户数量 $tot$，再加上一个大小为 `minutes` 的滑动窗口中，老板生气时的客户数量的最大值 $mx$ 即可。

我们定义一个变量 $cnt$ 来记录滑动窗口中老板生气时的客户数量，初始值为前 `minutes` 分钟老板生气时的客户数量。然后我们遍历数组，每次移动滑动窗口时，更新 $cnt$ 的值，同时更新 $mx$ 的值。

最后返回 $tot + mx$ 即可。

时间复杂度 $O(n)$，其中 $n$ 为数组 `customers` 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def maxSatisfied(
        self, customers: List[int], grumpy: List[int], minutes: int
    ) -> int:
        mx = cnt = sum(c * g for c, g in zip(customers[:minutes], grumpy))
        for i in range(minutes, len(customers)):
            cnt += customers[i] * grumpy[i]
            cnt -= customers[i - minutes] * grumpy[i - minutes]
            mx = max(mx, cnt)
        return sum(c * (g ^ 1) for c, g in zip(customers, grumpy)) + mx
```


#### TypeScript


```ts
function maxSatisfied(customers: number[], grumpy: number[], minutes: number): number {
    let [cnt, tot] = [0, 0];
    for (let i = 0; i < minutes; ++i) {
        cnt += customers[i] * grumpy[i];
        tot += customers[i] * (grumpy[i] ^ 1);
    }
    let mx = cnt;
    for (let i = minutes; i < customers.length; ++i) {
        cnt += customers[i] * grumpy[i];
        cnt -= customers[i - minutes] * grumpy[i - minutes];
        mx = Math.max(mx, cnt);
        tot += customers[i] * (grumpy[i] ^ 1);
    }
    return tot + mx;
}
```

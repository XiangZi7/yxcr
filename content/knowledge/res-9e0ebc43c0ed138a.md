## 解法




### 方法一：贪心 + 自定义排序



> **思考**
>
> 每项任务有实际消耗 $a_i$ 与门槛 $m_i$，顺序可任选，求最小初始能量。 $n$ 达 $10^5$，应确定最优次序再一次扫描。
>
> 完成最后一项时， $E-\sum_{i<n}a_i \ge m_n$，整理后发现应让最后一项的 $m-a$ 尽量小，即按 $a-m$ 升序排列。
>
> 排序后若当前能量不足门槛则补齐，再减去 $a$，累计补齐量即答案。



我们假设任务数为 $n$，初始能量值为 $E$，考虑完成最后一个任务，这需要我们完成前 $n-1$ 个任务后，剩余的能量值不小于完成最后一个任务需要达到的能量值 $m_n$，即：

$$
E-\sum_{i=1}^{n-1} a_i \geq m_n
$$

我们可以将 $m_n$ 表示成 $a_n+(m_n - a_n)$，然后将上面的式子变形，得到：

$$
E-\sum_{i=1}^{n-1} a_i \geq a_n+(m_n - a_n)
$$

整理可得：

$$
E \geq \sum_{i=1}^{n} a_i + (m_n - a_n)
$$

其中 $\sum_{i=1}^{n} a_i$ 是固定不变的，要使得初始值能量值 $E$ 最小，我们需要让 $m_n - a_n$ 最小，即 $a_n-m_n$ 最大。

因此，我们可以将任务按照 $a_i-m_i$ 从小到大排序。然后从前往后遍历任务，对于每个任务，如果当前能量值 $cur$ 小于 $m_i$，则需要增加能量值 $m_i - cur$，使得当前能量值刚好等于 $m_i$，然后再完成任务，更新 $cur = cur - a_i$。继续遍历，直到完成所有任务，即可得到初始所需的最少能量值。

时间复杂度 $O(n\times \log n)$。其中 $n$ 为任务数。忽略排序的空间开销，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def minimumEffort(self, tasks: List[List[int]]) -> int:
        ans = cur = 0
        for a, m in sorted(tasks, key=lambda x: x[0] - x[1]):
            if cur < m:
                ans += m - cur
                cur = m
            cur -= a
        return ans
```


#### TypeScript


```ts
function minimumEffort(tasks: number[][]): number {
    tasks.sort((a, b) => a[0] - a[1] - (b[0] - b[1]));
    let ans = 0;
    let cur = 0;
    for (const [a, m] of tasks) {
        if (cur < m) {
            ans += m - cur;
            cur = m;
        }
        cur -= a;
    }
    return ans;
}
```

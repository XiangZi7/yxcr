## 解法




### 方法一：排序 + 双指针



> **思考**
>
> 每个工人只能做难度不超过其能力的工作，并取其中利润最大者。 $n,m\le 10^4$，对每个工人扫描全部工作偏慢。
>
> 将工人与工作分别按能力、难度排序后双指针推进：能力单调不减，可维护当前可达的最大利润。每个工人 $O(1)$ 取该最大值。



我们可以将工作按照能力升序排列，然后将工作按照难度升序排列。

然后我们遍历工人，对于每个工人，我们找出他能完成的工作中收益最大的那个，然后将这个收益加到答案中。

时间复杂度 $O(n \times \log n + m \times \log m)$，空间复杂度 $O(n)$。其中 $n$ 和 $m$ 分别是数组 `profit` 和 `worker` 的长度。




#### Python3


```python
class Solution:
    def maxProfitAssignment(
        self, difficulty: List[int], profit: List[int], worker: List[int]
    ) -> int:
        worker.sort()
        jobs = sorted(zip(difficulty, profit))
        ans = mx = i = 0
        for w in worker:
            while i < len(jobs) and jobs[i][0] <= w:
                mx = max(mx, jobs[i][1])
                i += 1
            ans += mx
        return ans
```


#### TypeScript


```ts
function maxProfitAssignment(difficulty: number[], profit: number[], worker: number[]): number {
    const n = profit.length;
    worker.sort((a, b) => a - b);
    const jobs = Array.from({ length: n }, (_, i) => [difficulty[i], profit[i]]);
    jobs.sort((a, b) => a[0] - b[0]);
    let [ans, mx, i] = [0, 0, 0];
    for (const w of worker) {
        while (i < n && jobs[i][0] <= w) {
            mx = Math.max(mx, jobs[i++][1]);
        }
        ans += mx;
    }
    return ans;
}
```








### 方法二：动态规划



> **思考**
>
> 双指针需要排序。难度上限为 $10^5$，也可用数组 $f[d]$ 记录难度恰为 $d$ 的最大利润，再前缀取最大值，得到「能力不超过 $i$ 时的最佳利润」。
>
> 每个工人直接查表，省去对工人排序，适合难度范围不大的情形。



我们不妨记 $m = \max(\textit{difficulty})$，定义一个长度为 $m + 1$ 的数组 $f$，其中 $f[i]$ 表示难度小于等于 $i$ 的工作中收益的最大值，初始时 $f[i] = 0$。

然后我们遍历工作，对于每个工作 $(d, p)$，我们更新 $f[d] = \max(f[d], p)$。

接下来，我们从 $1$ 到 $m$ 遍历，对于每个 $i$，我们更新 $f[i] = \max(f[i], f[i - 1])$。

最后，我们遍历工人，对于每个工人 $w$，我们将 $f[\min(w, m)]$ 加到答案中。

时间复杂度 $O(n + M)$，空间复杂度 $O(M)$。其中 $n$ 是数组 `profit` 的长度，而 $M$ 是数组 `difficulty` 中的最大值。




#### Python3


```python
class Solution:
    def maxProfitAssignment(
        self, difficulty: List[int], profit: List[int], worker: List[int]
    ) -> int:
        m = max(difficulty)
        f = [0] * (m + 1)
        for d, p in zip(difficulty, profit):
            f[d] = max(f[d], p)
        for i in range(1, m + 1):
            f[i] = max(f[i], f[i - 1])
        return sum(f[min(w, m)] for w in worker)
```


#### TypeScript


```ts
function maxProfitAssignment(difficulty: number[], profit: number[], worker: number[]): number {
    const m = Math.max(...difficulty);
    const f = Array(m + 1).fill(0);
    const n = profit.length;
    for (let i = 0; i < n; ++i) {
        const d = difficulty[i];
        f[d] = Math.max(f[d], profit[i]);
    }
    for (let i = 1; i <= m; ++i) {
        f[i] = Math.max(f[i], f[i - 1]);
    }
    return worker.reduce((acc, w) => acc + f[Math.min(w, m)], 0);
}
```

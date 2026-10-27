## 解法




### 方法一：DFS + 剪枝



> **思考**
>
> 把工作分给 $k$ 个工人，最小化最大工作量。工作数很小，可搜索分配，但朴素 $k^n$ 过大。
>
> 当前最大工作量一旦不小于已知答案即可剪枝。先分配耗时更长的工作，能更早触发该剪枝。
>
> 将 $jobs$ 降序排列后 DFS：尝试放入每个工人，回溯；若某工人当前为空则不必再试后续空工人，避免对称重复。



本题与 [2305. 公平分发饼干](https://github.com/doocs/leetcode/blob/main/solution/2300-2399/2305.Fair%20Distribution%20of%20Cookies/README.md) 基本一致，不同的地方仅在于 $k$ 值的大小。

剪枝优化：优化分配花费时间较大的工作，因此可以先对 $jobs$ 按照降序排列。




#### Python3


```python
class Solution:
    def minimumTimeRequired(self, jobs: List[int], k: int) -> int:
        def dfs(i):
            nonlocal ans
            if i == len(jobs):
                ans = min(ans, max(cnt))
                return
            for j in range(k):
                if cnt[j] + jobs[i] >= ans:
                    continue
                cnt[j] += jobs[i]
                dfs(i + 1)
                cnt[j] -= jobs[i]
                if cnt[j] == 0:
                    break

        cnt = [0] * k
        jobs.sort(reverse=True)
        ans = inf
        dfs(0)
        return ans
```

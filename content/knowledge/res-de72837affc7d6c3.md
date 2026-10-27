## 解法




### 方法一：记忆化搜索 + 二分查找



> **思考**
>
> 出行日必须被 $1/7/30$ 日票覆盖，求最少花费。在第 $i$ 次出行买哪种票，下一次未覆盖的出行可用二分定位。 $dfs(i)$ 对三种票取最小，出行次数 $\le 365$，记忆化即可。



我们定义一个函数 $\textit{dfs(i)}$，表示从第 $i$ 次出行开始到最后一次出行结束所需的最小花费。那么答案为 $\textit{dfs(0)}$。

函数 $\textit{dfs(i)}$ 的执行过程如下：

- 如果 $i \geq n$，表示所有出行已经结束，返回 $0$；
- 否则，我们需要考虑三种购买方式，分别是购买 $1$ 天通行证、购买 $7$ 天通行证和购买 $30$ 天通行证。我们分别计算这三种购买方式的花费，并且利用二分查找，找到下一次出行的下标 $j$，然后递归调用 $\textit{dfs(j)}$，最后返回这三种购买方式的最小花费。

为了避免重复计算，我们使用记忆化搜索，将已经计算过的结果保存起来。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 表示出行的次数。




#### Python3


```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        @cache
        def dfs(i: int) -> int:
            if i >= n:
                return 0
            ans = inf
            for c, v in zip(costs, valid):
                j = bisect_left(days, days[i] + v)
                ans = min(ans, c + dfs(j))
            return ans

        n = len(days)
        valid = [1, 7, 30]
        return dfs(0)
```


#### TypeScript


```ts
function mincostTickets(days: number[], costs: number[]): number {
    const n = days.length;
    const f: number[] = Array(n).fill(0);
    const valid: number[] = [1, 7, 30];
    const search = (x: number): number => {
        let [l, r] = [0, n];
        while (l < r) {
            const mid = (l + r) >> 1;
            if (days[mid] >= x) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        return l;
    };
    const dfs = (i: number): number => {
        if (i >= n) {
            return 0;
        }
        if (f[i]) {
            return f[i];
        }
        f[i] = Infinity;
        for (let k = 0; k < 3; ++k) {
            const j = search(days[i] + valid[k]);
            f[i] = Math.min(f[i], dfs(j) + costs[k]);
        }
        return f[i];
    };
    return dfs(0);
}
```








### 方法二：动态规划



> **思考**
>
> 按出行下标搜索需要二分。也可按日历日递推： $f[i]$ 为到第 $i$ 天的最少花费，非出行日等于 $f[i-1]$，出行日则在三种票的起点取 $\min$。日期上界为 $365$。



我们不妨记 $\textit{days}$ 数组中的最后一天为 $m$，那么我们可以定义一个长度为 $m + 1$ 的数组 $f$，其中 $f[i]$ 表示从第 $1$ 天到第 $i$ 天的最小花费。

我们可以按照 $\textit{days}$ 数组中的日期递增的顺序，从第 $1$ 天开始，依次计算 $f[i]$ 的值。如果第 $i$ 天是出行的日期，那么我们可以考虑三种购买方式，分别是购买 $1$ 天通行证、购买 $7$ 天通行证和购买 $30$ 天通行证。我们分别计算这三种购买方式的花费，并且取这三种购买方式的最小花费作为 $f[i]$ 的值。如果第 $i$ 天不是出行的日期，那么 $f[i] = f[i - 1]$。

最终答案为 $f[m]$。

时间复杂度 $O(m)$，空间复杂度 $O(m)$。其中 $m$ 表示出行的最后一天。




#### Python3


```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        m = days[-1]
        f = [0] * (m + 1)
        valid = [1, 7, 30]
        j = 0
        for i in range(1, m + 1):
            if i == days[j]:
                f[i] = inf
                for c, v in zip(costs, valid):
                    f[i] = min(f[i], f[max(0, i - v)] + c)
                j += 1
            else:
                f[i] = f[i - 1]
        return f[m]
```


#### TypeScript


```ts
function mincostTickets(days: number[], costs: number[]): number {
    const m = days.at(-1)!;
    const f: number[] = Array(m).fill(0);
    const valid: number[] = [1, 7, 30];
    for (let i = 1, j = 0; i <= m; ++i) {
        if (i === days[j]) {
            f[i] = Infinity;
            for (let k = 0; k < 3; ++k) {
                const [c, v] = [costs[k], valid[k]];
                f[i] = Math.min(f[i], f[Math.max(0, i - v)] + c);
            }
            ++j;
        } else {
            f[i] = f[i - 1];
        }
    }
    return f[m];
}
```

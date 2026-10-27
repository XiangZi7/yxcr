## 解法




### 方法一：记忆化搜索



> **思考**
>
> 可从下标 $0$ 或 $1$ 出发，每步跨一或两级并支付当前阶费用。 $n\le 1000$，朴素递归会重复计算同一台阶。
>
> 从 $i$ 出发的最小花费只依赖 $i+1$ 与 $i+2$，越过顶端代价为 $0$。记忆化后每个下标算一次。
>
> 答案为 $\min(dfs(0), dfs(1))$。时间与空间 $O(n)$。



我们设计一个函数 $\textit{dfs}(i)$，表示从第 $i$ 个阶梯开始爬楼梯所需要的最小花费。那么答案为 $\min(\textit{dfs}(0), \textit{dfs}(1))$。

函数 $\textit{dfs}(i)$ 的执行过程如下：

- 如果 $i \ge \textit{len(cost)}$，表示当前位置已经超过了楼梯顶部，不需要再爬楼梯，返回 $0$；
- 否则，我们可以选择爬 $1$ 级楼梯，花费为 $\textit{cost}[i]$，然后递归调用 $\textit{dfs}(i + 1)$；也可以选择爬 $2$ 级楼梯，花费为 $\textit{cost}[i]$，然后递归调用 $\textit{dfs}(i + 2)$；
- 返回两种方案中的最小花费。

为了避免重复计算，我们使用记忆化搜索的方法，将已经计算过的结果保存在数组或哈希表中。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是数组 $\textit{cost}$ 的长度。




#### Python3


```python
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        @cache
        def dfs(i: int) -> int:
            if i >= len(cost):
                return 0
            return cost[i] + min(dfs(i + 1), dfs(i + 2))

        return min(dfs(0), dfs(1))
```


#### TypeScript


```ts
function minCostClimbingStairs(cost: number[]): number {
    const n = cost.length;
    const f: number[] = Array(n).fill(-1);
    const dfs = (i: number): number => {
        if (i >= n) {
            return 0;
        }
        if (f[i] < 0) {
            f[i] = cost[i] + Math.min(dfs(i + 1), dfs(i + 2));
        }
        return f[i];
    };
    return Math.min(dfs(0), dfs(1));
}
```


### 方法二：动态规划



> **思考**
>
> 方法一已经从楼顶向下填好离开每一级的花费。这里的 $f[i]$ 改成到达位置 $i$ 的最小花费，只依赖 $i-1$ 与 $i-2$，因此按 $i$ 从小到大填写，$f[n]$ 就是楼顶。



我们定义 $f[i]$ 表示到达第 $i$ 个阶梯所需要的最小花费，初始时 $f[0] = f[1] = 0$，答案即为 $f[n]$。

当 $i \ge 2$ 时，我们可以从第 $i - 1$ 个阶梯使用 $1$ 步直接到达第 $i$ 个阶梯，或者从第 $i - 2$ 个阶梯使用 $2$ 步到达第 $i$ 个阶梯，因此我们有状态转移方程：

$$
f[i] = \min(f[i - 1] + cost[i - 1], f[i - 2] + cost[i - 2])
$$

最终的答案即为 $f[n]$。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是数组 $\textit{cost}$ 的长度。




#### Python3


```python
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        n = len(cost)
        f = [0] * (n + 1)
        for i in range(2, n + 1):
            f[i] = min(f[i - 2] + cost[i - 2], f[i - 1] + cost[i - 1])
        return f[n]
```


#### TypeScript


```ts
function minCostClimbingStairs(cost: number[]): number {
    const n = cost.length;
    const f: number[] = Array(n + 1).fill(0);
    for (let i = 2; i <= n; ++i) {
        f[i] = Math.min(f[i - 1] + cost[i - 1], f[i - 2] + cost[i - 2]);
    }
    return f[n];
}
```


### 方法三：动态规划（空间优化）



> **思考**
>
> $f[i]$ 只依赖前两项，两个变量滚动即可，空间 $O(1)$。



我们注意到，状态转移方程中的 $f[i]$ 只和 $f[i - 1]$ 与 $f[i - 2]$ 有关，因此我们可以使用两个变量 $f$ 和 $g$ 交替地记录 $f[i - 2]$ 和 $f[i - 1]$ 的值，这样空间复杂度可以优化到 $O(1)$。




#### Python3


```python
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        f = g = 0
        for i in range(2, len(cost) + 1):
            f, g = g, min(f + cost[i - 2], g + cost[i - 1])
        return g
```


#### TypeScript


```ts
function minCostClimbingStairs(cost: number[]): number {
    let [f, g] = [0, 0];
    for (let i = 1; i < cost.length; ++i) {
        [f, g] = [g, Math.min(f + cost[i - 1], g + cost[i])];
    }
    return g;
}
```


### 方法四：动态规划



> **思考**
>
> 展开每一步的一阶和两阶，路径数是指数级的。台阶数可以到 $1000$，而第一次递归总是走到下一阶，调用深度就是 $n$。离开台阶 $i$ 的最小花费只依赖 $i+1$ 和 $i+2$，越过顶端为 $0$。令 $f[i] = \textit{cost}[i] + \min(f[i+1], f[i+2])$，从 $i = n-1$ 降到 $0$ 填写。答案是 $\min(f[0], f[1])$。



我们令 $f[i]$ 表示从第 $i$ 个阶梯出发爬到楼顶的最小花费。当 $i \ge n$ 时，$f[i] = 0$。对于 $i < n$，

$$
f[i] = \textit{cost}[i] + \min(f[i + 1], f[i + 2])
$$

按 $i$ 从 $n - 1$ 递减到 $0$ 计算。答案为 $\min(f[0], f[1])$。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是数组 $\textit{cost}$ 的长度。




#### Python3


```python
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        n = len(cost)
        f = [0] * (n + 2)
        for i in range(n - 1, -1, -1):
            f[i] = cost[i] + min(f[i + 1], f[i + 2])
        return min(f[0], f[1])
```


#### TypeScript


```ts
function minCostClimbingStairs(cost: number[]): number {
    const n = cost.length;
    const f: number[] = Array(n + 2).fill(0);
    for (let i = n - 1; i >= 0; --i) {
        f[i] = cost[i] + Math.min(f[i + 1], f[i + 2]);
    }
    return Math.min(f[0], f[1]);
}
```

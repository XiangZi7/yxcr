## 解法




### 方法一：记忆化搜索



> **思考**
>
> 相邻房屋不能都偷，求最大金额。枚举子集要检查相邻约束，房屋数虽不大，重叠子问题很多。从第 $i$ 间出发：偷则跳到 $i+2$，不偷则到 $i+1$，取较大者。记忆化后每个下标只算一次。



我们设计一个函数 $\textit{dfs}(i)$，表示从第 $i$ 间房屋开始偷窃能够得到的最高金额。那么答案即为 $\textit{dfs}(0)$。

函数 $\textit{dfs}(i)$ 的执行过程如下：

- 如果 $i \ge \textit{len}(\textit{nums})$，表示所有房屋都被考虑过了，直接返回 $0$；
- 否则，考虑偷窃第 $i$ 间房屋，那么 $\textit{dfs}(i) = \textit{nums}[i] + \textit{dfs}(i+2)$；不偷窃第 $i$ 间房屋，那么 $\textit{dfs}(i) = \textit{dfs}(i+1)$。
- 返回 $\max(\textit{nums}[i] + \textit{dfs}(i+2), \textit{dfs}(i+1))$。

为了避免重复计算，我们使用记忆化搜索的方法，将 $\textit{dfs}(i)$ 的结果保存在一个数组或哈希表中，每次计算前先查询是否已经计算过，如果计算过直接返回结果。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是数组长度。




#### Python3


```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        @cache
        def dfs(i: int) -> int:
            if i >= len(nums):
                return 0
            return max(nums[i] + dfs(i + 2), dfs(i + 1))

        return dfs(0)
```


#### TypeScript


```ts
function rob(nums: number[]): number {
    const n = nums.length;
    const f: number[] = Array(n).fill(-1);
    const dfs = (i: number): number => {
        if (i >= n) {
            return 0;
        }
        if (f[i] < 0) {
            f[i] = Math.max(nums[i] + dfs(i + 2), dfs(i + 1));
        }
        return f[i];
    };
    return dfs(0);
}
```


### 方法二：动态规划



> **思考**
>
> 方法一是递归。 $f[i]$ 表示前 $i$ 间的最大金额，转移只看「偷第 $i$ 间则加 $f[i-2]$，否则继承 $f[i-1]$」，自底向上填表。



我们定义 $f[i]$ 表示前 $i$ 间房屋能偷窃到的最高总金额，初始时 $f[0]=0$, $f[1]=nums[0]$。

考虑 $i \gt 1$ 的情况，第 $i$ 间房屋有两个选项：

- 不偷窃第 $i$ 间房屋，偷窃总金额为 $f[i-1]$；
- 偷窃第 $i$ 间房屋，偷窃总金额为 $f[i-2]+nums[i-1]$；

因此，我们可以得到状态转移方程：

$$
f[i]=
\begin{cases}
0, & i=0 \\
nums[0], & i=1 \\
\max(f[i-1],f[i-2]+nums[i-1]), & i \gt 1
\end{cases}
$$

最终的答案即为 $f[n]$，其中 $n$ 是数组的长度。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是数组长度。




#### Python3


```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        n = len(nums)
        f = [0] * (n + 1)
        f[1] = nums[0]
        for i in range(2, n + 1):
            f[i] = max(f[i - 1], f[i - 2] + nums[i - 1])
        return f[n]
```


#### TypeScript


```ts
function rob(nums: number[]): number {
    const n = nums.length;
    const f: number[] = Array(n + 1).fill(0);
    f[1] = nums[0];
    for (let i = 2; i <= n; ++i) {
        f[i] = Math.max(f[i - 1], f[i - 2] + nums[i - 1]);
    }
    return f[n];
}
```


### 方法三：动态规划（空间优化）



> **思考**
>
> 方法二的 $f[i]$ 只依赖前两项，两个变量滚动即可，空间降为 $O(1)$。



我们注意到，当 $i \gt 2$ 时， $f[i]$ 只和 $f[i-1]$ 与 $f[i-2]$ 有关，因此我们可以使用两个变量代替数组，将空间复杂度降到 $O(1)$。




#### Python3


```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        f = g = 0
        for x in nums:
            f, g = max(f, g), f + x
        return max(f, g)
```


#### TypeScript


```ts
function rob(nums: number[]): number {
    let [f, g] = [0, 0];
    for (const x of nums) {
        [f, g] = [Math.max(f, g), f + x];
    }
    return Math.max(f, g);
}
```

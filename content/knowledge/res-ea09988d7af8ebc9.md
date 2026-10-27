## 解法




### 方法一：记忆化搜索



> **思考**
>
> 凸多边形的三角剖分方案数是卡特兰数， $n\le 50$ 时不能枚举整棵剖分树。任意剖分都包含一条以边 $(i,j)$ 为底、第三点为 $k$ 的三角形，两侧是规模更小的子多边形。
>
> 子问题只依赖端点对 $(i,j)$，用记忆化 $\textit{dfs}(i,j)$ 枚举 $k\in(i,j)$，代价为两侧答案加上 $values[i]\cdot values[k]\cdot values[j]$。相邻顶点无法剖分，返回 $0$。
>
> 入口为 $\textit{dfs}(0,n-1)$。



我们设计一个函数 $\text{dfs}(i, j)$，表示将多边形的顶点 $i$ 到 $j$ 进行三角剖分后的最低分数。那么答案就是 $\text{dfs}(0, n - 1)$。

函数 $\text{dfs}(i, j)$ 的计算过程如下：

如果 $i + 1 = j$，说明多边形只有两个顶点，无法进行三角剖分，返回 $0$；

否则，我们枚举 $i$ 和 $j$ 之间的一个顶点 $k$，即 $i \lt k \lt j$，将多边形的顶点 $i$ 到 $j$ 进行三角剖分，可以分为两个子问题：将多边形的顶点 $i$ 到 $k$ 进行三角剖分，以及将多边形的顶点 $k$ 到 $j$ 进行三角剖分。这两个子问题的最低分数分别为 $\text{dfs}(i, k)$ 和 $\text{dfs}(k, j)$，而顶点 $i$, $j$ 和 $k$ 构成的三角形的分数为 $\text{values}[i] \times \text{values}[k] \times \text{values}[j]$。那么，此次三角剖分的最低分数为 $\text{dfs}(i, k) + \text{dfs}(k, j) + \text{values}[i] \times \text{values}[k] \times \text{values}[j]$，我们取所有可能的最小值，即为 $\text{dfs}(i, j)$ 的值。

为了避免重复计算，我们可以使用记忆化搜索，即使用哈希表或者数组来存储已经计算过的函数值。

最后，我们返回 $\text{dfs}(0, n - 1)$ 即可。

时间复杂度 $O(n^3)$，空间复杂度 $O(n^2)$。其中 $n$ 为多边形的顶点数。




#### Python3


```python
class Solution:
    def minScoreTriangulation(self, values: List[int]) -> int:
        @cache
        def dfs(i: int, j: int) -> int:
            if i + 1 == j:
                return 0
            return min(
                dfs(i, k) + dfs(k, j) + values[i] * values[k] * values[j]
                for k in range(i + 1, j)
            )

        return dfs(0, len(values) - 1)
```


#### TypeScript


```ts
function minScoreTriangulation(values: number[]): number {
    const n = values.length;
    const f: number[][] = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
    const dfs = (i: number, j: number): number => {
        if (i + 1 === j) {
            return 0;
        }
        if (f[i][j] > 0) {
            return f[i][j];
        }
        let ans = 1 << 30;
        for (let k = i + 1; k < j; ++k) {
            ans = Math.min(ans, dfs(i, k) + dfs(k, j) + values[i] * values[k] * values[j]);
        }
        f[i][j] = ans;
        return ans;
    };
    return dfs(0, n - 1);
}
```








### 方法二：动态规划



> **思考**
>
> 记忆化仍有递归开销，且状态依赖关系是区间包含。同一转移写成自底向上：较短区间先算完，较长区间才能取到子区间的值。
>
> 按左端点递减、右端点递增填 $f[i][j]$，枚举 $k$ 的式子与搜索相同，答案为 $f[0][n-1]$。



我们可以将方法一中的记忆化搜索改为动态规划。

定义 $f[i][j]$ 表示将多边形的顶点 $i$ 到 $j$ 进行三角剖分后的最低分数。初始时 $f[i][j]=0$，答案为 $f[0][n-1]$。

对于 $f[i][j]$（这里要求 $i + 1 \lt j$），我们先将 $f[i][j]$ 初始化为 $\infty$。

我们枚举 $i$ 和 $j$ 之间的一个顶点 $k$，即 $i \lt k \lt j$，将多边形的顶点 $i$ 到 $j$ 进行三角剖分，可以分为两个子问题：将多边形的顶点 $i$ 到 $k$ 进行三角剖分，以及将多边形的顶点 $k$ 到 $j$ 进行三角剖分。这两个子问题的最低分数分别为 $f[i][k]$ 和 $f[k][j]$，而顶点 $i$, $j$ 和 $k$ 构成的三角形的分数为 $\text{values}[i] \times \text{values}[k] \times \text{values}[j]$。那么，此次三角剖分的最低分数为 $f[i][k] + f[k][j] + \text{values}[i] \times \text{values}[k] \times \text{values}[j]$，我们取所有可能的最小值，即为 $f[i][j]$ 的值。

综上，我们可以得到状态转移方程：

$$
f[i][j]=
\begin{cases}
0, & i+1=j \\
\infty, & i+1<j \\
\min_{i<k<j} \{f[i][k]+f[k][j]+\text{values}[i] \times \text{values}[k] \times \text{values}[j]\}, & i+1<j
\end{cases}
$$

注意，在枚举 $i$ 和 $j$ 时，我们可以有两种枚举方式：

1. 从大到小枚举 $i$，从小到大枚举 $j$，这样可以保证在计算状态 $f[i][j]$ 时，状态 $f[i][k]$ 和 $f[k][j]$ 都已经计算过了；
1. 从小到大枚举区间长度 $l$，其中 $3 \leq l \leq n$，然后枚举区间左端点 $i$，那么可以得到右端点 $j=i + l - 1$，这样也可以保证在计算较大区间 $f[i][j]$ 时，较小区间 $f[i][k]$ 和 $f[k][j]$ 都已经计算过了。

最后，我们返回 $f[0][n-1]$ 即可。

时间复杂度 $O(n^3)$，空间复杂度 $O(n^2)$。其中 $n$ 为多边形的顶点数。

相似题目：

- [1312. 让字符串成为回文串的最少插入次数](https://github.com/doocs/leetcode/blob/main/solution/1300-1399/1312.Minimum%20Insertion%20Steps%20to%20Make%20a%20String%20Palindrome/README.md)




#### Python3


```python
class Solution:
    def minScoreTriangulation(self, values: List[int]) -> int:
        n = len(values)
        f = [[0] * n for _ in range(n)]
        for i in range(n - 3, -1, -1):
            for j in range(i + 2, n):
                f[i][j] = min(
                    f[i][k] + f[k][j] + values[i] * values[k] * values[j]
                    for k in range(i + 1, j)
                )
        return f[0][-1]
```


#### TypeScript


```ts
function minScoreTriangulation(values: number[]): number {
    const n = values.length;
    const f: number[][] = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
    for (let i = n - 3; i >= 0; --i) {
        for (let j = i + 2; j < n; ++j) {
            f[i][j] = 1 << 30;
            for (let k = i + 1; k < j; ++k) {
                f[i][j] = Math.min(f[i][j], f[i][k] + f[k][j] + values[i] * values[k] * values[j]);
            }
        }
    }
    return f[0][n - 1];
}
```








### 方法三：动态规划（另一种实现方式）



> **思考**
>
> 方法二按端点嵌套循环，需小心保证子区间已计算。按区间长度 $l$ 从 $3$ 增到 $n$ 枚举，左端 $i$、右端 $j=i+l-1$，则两侧长度更短，自然已经填好。
>
> 转移式不变，只是枚举顺序换成「先长度后位置」。



方法二中，我们提到了两种枚举方式。这里我们使用第二种方式，从小到大枚举区间长度 $l$，其中 $3 \leq l \leq n$，然后枚举区间左端点 $i$，那么可以得到右端点 $j=i + l - 1$。

时间复杂度 $O(n^3)$，空间复杂度 $O(n^2)$。其中 $n$ 为多边形的顶点数。




#### Python3


```python
class Solution:
    def minScoreTriangulation(self, values: List[int]) -> int:
        n = len(values)
        f = [[0] * n for _ in range(n)]
        for l in range(3, n + 1):
            for i in range(n - l + 1):
                j = i + l - 1
                f[i][j] = min(
                    f[i][k] + f[k][j] + values[i] * values[k] * values[j]
                    for k in range(i + 1, j)
                )
        return f[0][-1]
```


#### TypeScript


```ts
function minScoreTriangulation(values: number[]): number {
    const n = values.length;
    const f: number[][] = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
    for (let l = 3; l <= n; ++l) {
        for (let i = 0; i + l - 1 < n; ++i) {
            const j = i + l - 1;
            f[i][j] = 1 << 30;
            for (let k = i + 1; k < j; ++k) {
                f[i][j] = Math.min(f[i][j], f[i][k] + f[k][j] + values[i] * values[k] * values[j]);
            }
        }
    }
    return f[0][n - 1];
}
```

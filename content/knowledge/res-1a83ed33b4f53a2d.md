## 解法




### 方法一：动态规划



> **思考**
>
> 等和划分即能否选出一个子集，其和为总和的一半。总和为奇数则不可能。子集枚举在 $n\le 200$ 时不可行。
>
> 这是容量为 $m=s/2$ 的 $0$-$1$ 背包：令 $f[i][j]$ 表示前 $i$ 个数能否凑出 $j$，转移为选或不选 $x$。 $n$ 与 $m$ 的乘积可接受。
>
> 先判奇偶再填表，空集对应 $f[0][0]=\textit{true}$，保证转移有起点。



我们先计算出数组的总和 $s$，如果总和是奇数，那么一定不能分割成两个和相等的子集，直接返回 $false$。如果总和是偶数，我们记目标子集的和为 $m = \frac{s}{2}$，那么问题就转化成了：是否存在一个子集，使得其元素的和为 $m$。

我们定义 $f[i][j]$ 表示前 $i$ 个数中选取若干个数，使得其元素的和恰好为 $j$。初始时 $f[0][0] = true$，其余 $f[i][j] = false$。答案为 $f[n][m]$。

考虑 $f[i][j]$，如果我们选取了第 $i$ 个数 $x$，那么 $f[i][j] = f[i - 1][j - x]$；如果我们没有选取第 $i$ 个数 $x$，那么 $f[i][j] = f[i - 1][j]$。因此状态转移方程为：

$$
f[i][j] = f[i - 1][j] \textit{ or } f[i - 1][j - x] \textit{ if } j \geq x
$$

最终答案为 $f[n][m]$。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别为数组的总和的一半和数组的长度。




#### Python3


```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        m, mod = divmod(sum(nums), 2)
        if mod:
            return False
        n = len(nums)
        f = [[False] * (m + 1) for _ in range(n + 1)]
        f[0][0] = True
        for i, x in enumerate(nums, 1):
            for j in range(m + 1):
                f[i][j] = f[i - 1][j] or (j >= x and f[i - 1][j - x])
        return f[n][m]
```


#### TypeScript


```ts
function canPartition(nums: number[]): boolean {
    const s = nums.reduce((a, b) => a + b, 0);
    if (s % 2 === 1) {
        return false;
    }
    const n = nums.length;
    const m = s >> 1;
    const f: boolean[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(false));
    f[0][0] = true;
    for (let i = 1; i <= n; ++i) {
        const x = nums[i - 1];
        for (let j = 0; j <= m; ++j) {
            f[i][j] = f[i - 1][j] || (j >= x && f[i - 1][j - x]);
        }
    }
    return f[n][m];
}
```


### 方法二：动态规划（空间优化）



> **思考**
>
> $f[i][j]$ 只依赖上一行，且同一物品不能用两次，因此将 $j$ 倒序更新并压成一维数组，空间从 $O(nm)$ 降到 $O(m)$。



我们注意到，方法一中 $f[i][j]$ 只与 $f[i - 1][\cdot]$ 有关，因此我们可以将二维数组压缩成一维数组。

时间复杂度 $O(n \times m)$，空间复杂度 $O(m)$。其中 $n$ 是数组的长度，而 $m$ 是数组的总和的一半。




#### Python3


```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        m, mod = divmod(sum(nums), 2)
        if mod:
            return False
        f = [True] + [False] * m
        for x in nums:
            for j in range(m, x - 1, -1):
                f[j] = f[j] or f[j - x]
        return f[m]
```


#### TypeScript


```ts
function canPartition(nums: number[]): boolean {
    const s = nums.reduce((a, b) => a + b, 0);
    if (s % 2 === 1) {
        return false;
    }
    const m = s >> 1;
    const f: boolean[] = Array(m + 1).fill(false);
    f[0] = true;
    for (const x of nums) {
        for (let j = m; j >= x; --j) {
            f[j] = f[j] || f[j - x];
        }
    }
    return f[m];
}
```

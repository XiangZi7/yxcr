## 解法




### 方法一：动态规划



> **思考**
>
> 戳气球的顺序会改变两侧相邻关系，直接按戳破次序搜索会重复子区间。两端各补 $1$ 后，区间边界成为固定乘数。
>
> 若 $k$ 是开区间 $(i,j)$ 中最后戳破的气球，则左右子区间互不干扰，得分多出 $arr[i]\cdot arr[k]\cdot arr[j]$。为此定义 $f[i][j]$ 为戳完 $(i,j)$ 内全部气球的最大得分，按区间长度递增（代码中 $i$ 降序、 $j$ 升序）填表，答案为 $f[0][n+1]$。



我们记数组 $nums$ 的长度为 $n$。根据题目描述，我们可以在数组 $nums$ 的左右两端各添加一个 $1$，记为 $arr$。

然后，我们定义 $f[i][j]$ 表示戳破区间 $[i, j]$ 内的所有气球能得到的最多硬币数，那么答案即为 $f[0][n+1]$。

对于 $f[i][j]$，我们枚举区间 $[i, j]$ 内的所有位置 $k$，假设 $k$ 是最后一个戳破的气球，那么我们可以得到如下状态转移方程：

$$
f[i][j] = \max(f[i][j], f[i][k] + f[k][j] + arr[i] \times arr[k] \times arr[j])
$$

在实现上，由于 $f[i][j]$ 的状态转移方程中涉及到 $f[i][k]$ 和 $f[k][j]$，其中 $i < k < j$，因此我们需要从大到小地遍历 $i$，从小到大地遍历 $j$，这样才能保证当计算 $f[i][j]$ 时 $f[i][k]$ 和 $f[k][j]$ 已经被计算出来。

最后，我们返回 $f[0][n+1]$ 即可。

时间复杂度 $O(n^3)$，空间复杂度 $O(n^2)$。其中 $n$ 为数组 $nums$ 的长度。




#### Python3


```python
class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        n = len(nums)
        arr = [1] + nums + [1]
        f = [[0] * (n + 2) for _ in range(n + 2)]
        for i in range(n - 1, -1, -1):
            for j in range(i + 2, n + 2):
                for k in range(i + 1, j):
                    f[i][j] = max(f[i][j], f[i][k] + f[k][j] + arr[i] * arr[k] * arr[j])
        return f[0][-1]
```


#### TypeScript


```ts
function maxCoins(nums: number[]): number {
    const n = nums.length;
    const arr = Array(n + 2).fill(1);
    for (let i = 0; i < n; i++) {
        arr[i + 1] = nums[i];
    }

    const f: number[][] = Array.from({ length: n + 2 }, () => Array(n + 2).fill(0));
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 2; j <= n + 1; j++) {
            for (let k = i + 1; k < j; k++) {
                f[i][j] = Math.max(f[i][j], f[i][k] + f[k][j] + arr[i] * arr[k] * arr[j]);
            }
        }
    }
    return f[0][n + 1];
}
```

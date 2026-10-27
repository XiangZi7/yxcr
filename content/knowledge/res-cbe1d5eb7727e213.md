## 解法




### 方法一：动态规划



> **思考**
>
> 求两个数组的最长公共连续子数组。长度均为 $1000$，枚举起点再匹配最坏 $O(n^3)$，不能接受；公共子序列的 DP 也不要求连续。
>
> 连续意味着只有在两端字符相等时，长度才能由「去掉末元后的公共后缀」加一得到，否则这段后缀长度为 $0$。
>
> 令 $f[i][j]$ 为以 $nums1[i-1]$、 $nums2[j-1]$ 结尾的公共后缀长，相等则 $f[i-1][j-1]+1$，否则为 $0$。遍历取全局最大。时间 $O(mn)$。



我们定义 $f[i][j]$ 表示以 $nums1[i - 1]$ 和 $nums2[j - 1]$ 结尾的最长公共子数组的长度，那么我们可以得到状态转移方程：

$$
f[i][j]=
\begin{cases}
0, & nums1[i - 1] \neq nums2[j - 1] \\
f[i - 1][j - 1] + 1, & nums1[i - 1] = nums2[j - 1]
\end{cases}
$$

最终的答案即为所有 $f[i][j]$ 中的最大值。

时间复杂度 $O(m \times n)$，空间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别是数组 $nums1$ 和 $nums2$ 的长度。




#### Python3


```python
class Solution:
    def findLength(self, nums1: List[int], nums2: List[int]) -> int:
        m, n = len(nums1), len(nums2)
        f = [[0] * (n + 1) for _ in range(m + 1)]
        ans = 0
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if nums1[i - 1] == nums2[j - 1]:
                    f[i][j] = f[i - 1][j - 1] + 1
                    ans = max(ans, f[i][j])
        return ans
```


#### TypeScript


```ts
function findLength(nums1: number[], nums2: number[]): number {
    const m = nums1.length;
    const n = nums2.length;
    const f = Array.from({ length: m + 1 }, _ => new Array(n + 1).fill(0));
    let ans = 0;
    for (let i = 1; i <= m; ++i) {
        for (let j = 1; j <= n; ++j) {
            if (nums1[i - 1] == nums2[j - 1]) {
                f[i][j] = f[i - 1][j - 1] + 1;
                ans = Math.max(ans, f[i][j]);
            }
        }
    }
    return ans;
}
```

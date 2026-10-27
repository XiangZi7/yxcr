## 解法




### 方法一：二维前缀和 + 二分查找



> **思考**
>
> 正方形区域和随边长增大而增大（元素非负），存在单调性。 $m,n \le 300$，枚举边长再扫左上角若每次求和为 $O(k^2)$ 则过慢。二维前缀和使任意正方形求和 $O(1)$，再对边长二分。
>
> 判定函数枚举左上角，用前缀和比较阈值。二分找最大可行边长。



我们可以先预处理得到二维前缀和数组 $s$，其中 $s[i + 1][j + 1]$ 表示矩阵 $mat$ 中从 $(0, 0)$ 到 $(i, j)$ 的元素和，那么对于任意的正方形区域，我们都可以在 $O(1)$ 的时间内得到其元素和。

接下来，我们可以使用二分查找的方法得到最大的边长。我们枚举正方形的边长 $k$，然后枚举正方形的左上角位置 $(i, j)$，那么我们可以得到正方形的元素和 $v$，如果 $v \leq threshold$，那么说明存在边长为 $k$ 的正方形区域的元素和小于或等于阈值，否则不存在。

时间复杂度 $O(m \times n \times \log \min(m, n))$，空间复杂度 $O(m \times n)$。




#### Python3


```python
class Solution:
    def maxSideLength(self, mat: List[List[int]], threshold: int) -> int:
        def check(k: int) -> bool:
            for i in range(m - k + 1):
                for j in range(n - k + 1):
                    v = s[i + k][j + k] - s[i][j + k] - s[i + k][j] + s[i][j]
                    if v <= threshold:
                        return True
            return False

        m, n = len(mat), len(mat[0])
        s = [[0] * (n + 1) for _ in range(m + 1)]
        for i, row in enumerate(mat, 1):
            for j, x in enumerate(row, 1):
                s[i][j] = s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1] + x
        l, r = 0, min(m, n)
        while l < r:
            mid = (l + r + 1) >> 1
            if check(mid):
                l = mid
            else:
                r = mid - 1
        return l
```


#### TypeScript


```ts
function maxSideLength(mat: number[][], threshold: number): number {
    const m = mat.length;
    const n = mat[0].length;
    const s: number[][] = Array(m + 1)
        .fill(0)
        .map(() => Array(n + 1).fill(0));
    for (let i = 1; i <= m; ++i) {
        for (let j = 1; j <= n; ++j) {
            s[i][j] = s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1] + mat[i - 1][j - 1];
        }
    }
    const check = (k: number): boolean => {
        for (let i = 0; i < m - k + 1; ++i) {
            for (let j = 0; j < n - k + 1; ++j) {
                if (s[i + k][j + k] - s[i + k][j] - s[i][j + k] + s[i][j] <= threshold) {
                    return true;
                }
            }
        }
        return false;
    };

    let l = 0;
    let r = Math.min(m, n);
    while (l < r) {
        const mid = (l + r + 1) >> 1;
        if (check(mid)) {
            l = mid;
        } else {
            r = mid - 1;
        }
    }
    return l;
}
```

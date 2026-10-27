## 解法




### 方法一：数学 + 枚举



> **思考**
>
> 表达式含两层绝对值，直接枚举 $i,j$ 为平方级。去掉绝对值后， $|x_i-x_j|+|y_i-y_j|+|i-j|$ 化为四种符号组合下 $(a x+b y+\textit{下标})$ 的极差。
>
> 对 $a,b\in\{\pm 1\}$ 各扫一遍维护最大最小，答案取所有极差的最大者，线性即可。



我们不妨令 $x_i = arr1[i]$, $y_i = arr2[i]$，由于 $i$ 和 $j$ 的大小关系不影响表达式的值，我们不妨假设 $i \ge j$，那么表达式可以变为：

$$
| x_i - x_j | + | y_i - y_j | + i - j = \max \begin{cases} (x_i + y_i) - (x_j + y_j) \\ (x_i - y_i) - (x_j - y_j) \\ (-x_i + y_i) - (-x_j + y_j) \\ (-x_i - y_i) - (-x_j - y_j) \end{cases} + i - j\\
= \max \begin{cases} (x_i + y_i + i) - (x_j + y_j + j) \\ (x_i - y_i + i) - (x_j - y_j + j) \\ (-x_i + y_i + i) - (-x_j + y_j + j) \\ (-x_i - y_i + i) - (-x_j - y_j + j) \end{cases}
$$

因此，我们只要求出 $a \times x_i + b \times y_i + i$ 的最大值 $mx$，以及最小值 $mi$，其中 $a, b \in \{-1, 1\}$。那么答案就是所有 $mx - mi$ 中的最大值。

时间复杂度 $O(n)$，其中 $n$ 是数组长度。空间复杂度 $O(1)$。

相似题目：

- [1330. 翻转子数组得到最大的数组值](https://github.com/doocs/leetcode/blob/main/solution/1300-1399/1330.Reverse%20Subarray%20To%20Maximize%20Array%20Value/README.md)




#### Python3


```python
class Solution:
    def maxAbsValExpr(self, arr1: List[int], arr2: List[int]) -> int:
        dirs = (1, -1, -1, 1, 1)
        ans = -inf
        for a, b in pairwise(dirs):
            mx, mi = -inf, inf
            for i, (x, y) in enumerate(zip(arr1, arr2)):
                mx = max(mx, a * x + b * y + i)
                mi = min(mi, a * x + b * y + i)
                ans = max(ans, mx - mi)
        return ans
```


#### TypeScript


```ts
function maxAbsValExpr(arr1: number[], arr2: number[]): number {
    const dirs = [1, -1, -1, 1, 1];
    const inf = 1 << 30;
    let ans = -inf;
    for (let k = 0; k < 4; ++k) {
        const [a, b] = [dirs[k], dirs[k + 1]];
        let mx = -inf;
        let mi = inf;
        for (let i = 0; i < arr1.length; ++i) {
            const [x, y] = [arr1[i], arr2[i]];
            mx = Math.max(mx, a * x + b * y + i);
            mi = Math.min(mi, a * x + b * y + i);
            ans = Math.max(ans, mx - mi);
        }
    }
    return ans;
}
```

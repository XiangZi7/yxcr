## 解法




### 方法一：动态规划



> **思考**
>
> 位置 $i$ 能接的雨水量等于 $\min(\textit{leftMax}, \textit{rightMax}) - height[i]$。若对每个 $i$ 都向左右重新扫描最高柱，时间复杂度为 $O(n^2)$。 $n \le 2 \times 10^4$，容易超时。
>
> 左侧最高只取决于 $i$ 及其左边，右侧最高只取决于 $i$ 及其右边，都可以线性预处理。用两个数组分别记录每个位置「含自身」的左侧最高柱与右侧最高柱，再对每个位置取两侧最小值减去自身高度并求和。



我们定义 $left[i]$ 表示下标 $i$ 位置及其左边的最高柱子的高度，定义 $right[i]$ 表示下标 $i$ 位置及其右边的最高柱子的高度。那么下标 $i$ 位置能接的雨水量为 $\min(left[i], right[i]) - height[i]$。我们遍历数组，计算出 $left[i]$ 和 $right[i]$，最后答案为 $\sum_{i=0}^{n-1} \min(left[i], right[i]) - height[i]$。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为数组的长度。




#### Python3


```python
class Solution:
    def trap(self, height: List[int]) -> int:
        n = len(height)
        left = [height[0]] * n
        right = [height[-1]] * n
        for i in range(1, n):
            left[i] = max(left[i - 1], height[i])
            right[n - i - 1] = max(right[n - i], height[n - i - 1])
        return sum(min(l, r) - h for l, r, h in zip(left, right, height))
```


#### TypeScript


```ts
function trap(height: number[]): number {
    const n = height.length;
    const left: number[] = new Array(n).fill(height[0]);
    const right: number[] = new Array(n).fill(height[n - 1]);
    for (let i = 1; i < n; ++i) {
        left[i] = Math.max(left[i - 1], height[i]);
        right[n - i - 1] = Math.max(right[n - i], height[n - i - 1]);
    }
    let ans = 0;
    for (let i = 0; i < n; ++i) {
        ans += Math.min(left[i], right[i]) - height[i];
    }
    return ans;
}
```

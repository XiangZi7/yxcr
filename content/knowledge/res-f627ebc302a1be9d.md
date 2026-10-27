## 解法




### 方法一：双指针



> **思考**
>
> 统计乘积严格小于 $k$ 的连续子数组个数。数组长度可达 $3\times 10^4$，枚举左右端点再求积为 $O(n^2)$，偏紧。
>
> 元素均为正整数，窗口乘积随右端扩张而单调不减。一旦乘积达到 $k$，必须右移左端才能恢复合法，因此每个端点至多移动一次。
>
> 维护乘积 $p$ 与左端 $l$：右端纳入 $x$ 后，若 $p\ge k$ 则不断除掉 $\textit{nums}[l]$。此时以 $r$ 结尾的合法子数组个数为 $r-l+1$。一遍扫描即可。



我们可以用双指针维护一个滑动窗口，窗口内所有元素的乘积小于 $k$。

定义两个指针 $l$ 和 $r$ 分别指向滑动窗口的左右边界，初始时 $l = r = 0$。我们用一个变量 $p$ 记录窗口内所有元素的乘积，初始时 $p = 1$。

每次，我们将 $r$ 右移一位，将 $r$ 指向的元素 $x$ 加入窗口，更新 $p = p \times x$。然后，如果 $p \geq k$，我们循环地将 $l$ 右移一位，并更新 $p = p \div \text{nums}[l]$，直到 $p < k$ 或者 $l \gt r$ 为止。这样，以 $r$ 结尾的、乘积小于 $k$ 的连续子数组的个数即为 $r - l + 1$。然后我们将答案加上这个数量，并继续移动 $r$，直到 $r$ 到达数组的末尾。

时间复杂度 $O(n)$，其中 $n$ 为数组的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        ans = l = 0
        p = 1
        for r, x in enumerate(nums):
            p *= x
            while l <= r and p >= k:
                p //= nums[l]
                l += 1
            ans += r - l + 1
        return ans
```


#### TypeScript


```ts
function numSubarrayProductLessThanK(nums: number[], k: number): number {
    const n = nums.length;
    let [ans, l, p] = [0, 0, 1];
    for (let r = 0; r < n; ++r) {
        p *= nums[r];
        while (l <= r && p >= k) {
            p /= nums[l++];
        }
        ans += r - l + 1;
    }
    return ans;
}
```

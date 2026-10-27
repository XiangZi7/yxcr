## 解法




### 方法一：遍历



> **思考**
>
> 判断唯一最大值是否至少是其余元素的两倍。长度不超过 $50$，找出最大与次大比较即可。
>
> 最大值唯一，故只需 $x\ge 2y$。取最大的两个数，再用 $\textit{index}$ 找回 $x$ 的下标。



我们可以遍历数组 $nums$，找到数组中的最大值 $x$ 和第二大的值 $y$，如果 $x \ge 2y$，则返回 $x$ 的下标，否则返回 $-1$。

我们也可以先找到数组中的最大值 $x$，同时找到最大值 $x$ 的下标 $k$。然后再遍历一次数组，如果发现 $k$ 以外的元素 $y$ 满足 $x < 2y$，则返回 $-1$。否则遍历结束后返回 $k$。

时间复杂度 $O(n)$，其中 $n$ 是数组 $nums$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def dominantIndex(self, nums: List[int]) -> int:
        x, y = nlargest(2, nums)
        return nums.index(x) if x >= 2 * y else -1
```


#### TypeScript


```ts
function dominantIndex(nums: number[]): number {
    let k = 0;
    for (let i = 0; i < nums.length; ++i) {
        if (nums[i] > nums[k]) {
            k = i;
        }
    }
    for (let i = 0; i < nums.length; ++i) {
        if (i !== k && nums[k] < nums[i] * 2) {
            return -1;
        }
    }
    return k;
}
```

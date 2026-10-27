## 解法




### 方法一：二分查找



> **思考**
>
> 枚举全部分割点组合，段数与长度都会爆炸。观察到：子数组和的上限越大，所需段数越少，可行性关于上限单调。
>
> 对上限 $\textit{mid}$ 二分，贪心从左累加，超过 $\textit{mid}$ 就新开一段，判断段数是否不超过 $k$。左界为 $\max(\textit{nums})$，右界为总和。
>
> 二分找最小可行上限，把组合搜索换成线性校验。



我们注意到，当子数组的和的最大值越大，子数组的个数越少，当存在一个满足条件的子数组和的最大值时，那么比这个最大值更大的子数组和的最大值一定也满足条件。也就是说，我们可以对子数组和的最大值进行二分查找，找到满足条件的最小值。

我们定义二分查找的左边界 $left = \max(nums)$，右边界 $right = sum(nums)$，然后对于二分查找的每一步，我们取中间值 $mid = \lfloor \frac{left + right}{2} \rfloor$，然后判断是否存在一个分割方式，使得子数组的和的最大值不超过 $mid$，如果存在，则说明 $mid$ 可能是满足条件的最小值，因此我们将右边界调整为 $mid$，否则我们将左边界调整为 $mid + 1$。

我们如何判断是否存在一个分割方式，使得子数组的和的最大值不超过 $mid$ 呢？我们可以使用贪心的方法，从左到右遍历数组，将数组中的元素依次加入到子数组中，如果当前子数组的和大于 $mid$，则我们将当前元素加入到下一个子数组中。如果我们能够将数组分割成不超过 $k$ 个子数组，且每个子数组的和的最大值不超过 $mid$，则说明 $mid$ 是满足条件的最小值，否则 $mid$ 不是满足条件的最小值。

时间复杂度 $O(n \times \log m)$，空间复杂度 $O(1)$。其中 $n$ 和 $m$ 分别是数组的长度和数组所有元素的和。




#### Python3


```python
class Solution:
    def splitArray(self, nums: List[int], k: int) -> int:
        def check(mx):
            s, cnt = inf, 0
            for x in nums:
                s += x
                if s > mx:
                    s = x
                    cnt += 1
            return cnt <= k

        left, right = max(nums), sum(nums)
        return left + bisect_left(range(left, right + 1), True, key=check)
```


#### TypeScript


```ts
function splitArray(nums: number[], k: number): number {
    let l = Math.max(...nums);
    let r = nums.reduce((a, b) => a + b);

    const check = (mx: number) => {
        let [s, cnt] = [0, 0];
        for (const x of nums) {
            s += x;
            if (s > mx) {
                s = x;
                if (++cnt === k) return false;
            }
        }
        return true;
    };

    while (l < r) {
        const mid = (l + r) >> 1;
        if (check(mid)) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return l;
}
```

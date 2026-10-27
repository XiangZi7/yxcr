## 解法




### 方法一：排序 + 动态规划



> **思考**
>
> 最大子集须任意两数互相整除。无序时整除关系不构成链。排序后只需看较大数是否整除较小数，转移与 LIS 相同。
>
> $f[i]$ 为以 $nums[i]$ 为最大元的最长整除子集。 $nums[i]\% nums[j]=0$ 则可接 $f[j]+1$。记下最大 $f$ 的下标，再倒序按长度递减还原元素。



我们先对数组进行排序，这样可以保证对于任意的 $i \lt j$，如果 $nums[i]$ 可以整除 $nums[j]$，那么 $nums[i]$ 一定在 $nums[j]$ 的左边。

接下来，我们定义 $f[i]$ 表示以 $nums[i]$ 为最大元素的最大整除子集的大小，初始时 $f[i]=1$。

对于每一个 $i$，我们从左往右枚举 $j$，如果 $nums[i]$ 可以被 $nums[j]$ 整除，那么 $f[i]$ 可以从 $f[j]$ 转移而来，我们更新 $f[i]=max(f[i], f[j]+1)$。过程中，我们记录 $f[i]$ 的最大值的下标 $k$ 以及对应的子集大小 $m$。

最后，我们从 $k$ 开始倒序遍历，如果 $nums[k]$ 可以被 $nums[i]$ 整除，且 $f[i]=m$，那么 $nums[i]$ 就是一个整除子集的元素，我们将 $nums[i]$ 加入答案，并将 $m$ 减 $1$，同时更新 $k=i$。继续倒序遍历，直到 $m=0$。

时间复杂度 $O(n^2)$，空间复杂度 $O(n)$。其中 $n$ 是数组的长度。




#### Python3


```python
class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        nums.sort()
        n = len(nums)
        f = [1] * n
        k = 0
        for i in range(n):
            for j in range(i):
                if nums[i] % nums[j] == 0:
                    f[i] = max(f[i], f[j] + 1)
            if f[k] < f[i]:
                k = i
        m = f[k]
        i = k
        ans = []
        while m:
            if nums[k] % nums[i] == 0 and f[i] == m:
                ans.append(nums[i])
                k, m = i, m - 1
            i -= 1
        return ans
```


#### TypeScript


```ts
function largestDivisibleSubset(nums: number[]): number[] {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const f: number[] = Array(n).fill(1);
    let k = 0;

    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < i; ++j) {
            if (nums[i] % nums[j] === 0) {
                f[i] = Math.max(f[i], f[j] + 1);
            }
        }
        if (f[k] < f[i]) {
            k = i;
        }
    }

    let m = f[k];
    const ans: number[] = [];
    for (let i = k; m > 0; --i) {
        if (nums[k] % nums[i] === 0 && f[i] === m) {
            ans.push(nums[i]);
            k = i;
            --m;
        }
    }

    return ans;
}
```

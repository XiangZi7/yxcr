## 解法




### 方法一：滑动窗口



> **思考**
>
> 三个长度为 $k$、互不重叠的子数组要总和最大，并返回字典序最小的起点。枚举三个起点是立方级。
>
> 三个定长窗口同步右移：维护「目前最好的第一段」以及「最好的前两段」，再与当前第三段相加。窗口顺序保证不重叠且起点偏左。



滑动窗口，枚举第三个子数组的位置，同时维护前两个无重叠子数组的最大和及其位置。

时间复杂度 $O(n)$，其中 $n$ 是数组 $nums$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def maxSumOfThreeSubarrays(self, nums: List[int], k: int) -> List[int]:
        s = s1 = s2 = s3 = 0
        mx1 = mx12 = 0
        idx1, idx12 = 0, ()
        ans = []
        for i in range(k * 2, len(nums)):
            s1 += nums[i - k * 2]
            s2 += nums[i - k]
            s3 += nums[i]
            if i >= k * 3 - 1:
                if s1 > mx1:
                    mx1 = s1
                    idx1 = i - k * 3 + 1
                if mx1 + s2 > mx12:
                    mx12 = mx1 + s2
                    idx12 = (idx1, i - k * 2 + 1)
                if mx12 + s3 > s:
                    s = mx12 + s3
                    ans = [*idx12, i - k + 1]
                s1 -= nums[i - k * 3 + 1]
                s2 -= nums[i - k * 2 + 1]
                s3 -= nums[i - k + 1]
        return ans
```


#### TypeScript


```ts
function maxSumOfThreeSubarrays(nums: number[], k: number): number[] {
    const n: number = nums.length;
    const s: number[] = Array(n + 1).fill(0);

    for (let i = 0; i < n; ++i) {
        s[i + 1] = s[i] + nums[i];
    }

    const pre: number[][] = Array(n)
        .fill([])
        .map(() => new Array(2).fill(0));
    const suf: number[][] = Array(n)
        .fill([])
        .map(() => new Array(2).fill(0));

    for (let i = 0, t = 0, idx = 0; i < n - k + 1; ++i) {
        const cur: number = s[i + k] - s[i];
        if (cur > t) {
            pre[i + k - 1] = [cur, i];
            t = cur;
            idx = i;
        } else {
            pre[i + k - 1] = [t, idx];
        }
    }

    for (let i = n - k, t = 0, idx = 0; i >= 0; --i) {
        const cur: number = s[i + k] - s[i];
        if (cur >= t) {
            suf[i] = [cur, i];
            t = cur;
            idx = i;
        } else {
            suf[i] = [t, idx];
        }
    }

    let ans: number[] = [];
    for (let i = k, t = 0; i < n - 2 * k + 1; ++i) {
        const cur: number = s[i + k] - s[i] + pre[i - 1][0] + suf[i + k][0];
        if (cur > t) {
            ans = [pre[i - 1][1], i, suf[i + k][1]];
            t = cur;
        }
    }

    return ans;
}
```








### 方法二：预处理前后缀 + 枚举中间子数组



> **思考**
>
> 滑动窗口把三端捆在一起，实现要紧。也可预处理：前缀和加 $pre[i]$（左侧最佳 $k$ 段）与 $suf[i]$（右侧最佳 $k$ 段），再枚举中间段起点，和与下标一次取出。



我们可以预处理得到数组 $nums$ 的前缀和数组 $s$，其中 $s[i] = \sum_{j=0}^{i-1} nums[j]$，那么对于任意的 $i$， $j$， $s[j] - s[i]$ 就是子数组 $[i, j)$ 的和。

接下来，我们使用动态规划的方法，维护两个长度为 $n$ 的数组 $pre$ 和 $suf$，其中 $pre[i]$ 表示 $[0, i]$ 范围内长度为 $k$ 的子数组的最大和及其起始位置， $suf[i]$ 表示 $[i, n)$ 范围内长度为 $k$ 的子数组的最大和及其起始位置。

然后，我们枚举中间子数组的起始位置 $i$，那么三个子数组的和就是 $pre[i-1][0] + suf[i+k][0] + (s[i+k] - s[i])$，其中 $pre[i-1][0]$ 表示 $[0, i-1]$ 范围内长度为 $k$ 的子数组的最大和， $suf[i+k][0]$ 表示 $[i+k, n)$ 范围内长度为 $k$ 的子数组的最大和， $(s[i+k] - s[i])$ 表示 $[i, i+k)$ 范围内长度为 $k$ 的子数组的和。我们找出和的最大值对应的三个子数组的起始位置即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是数组 $nums$ 的长度。




#### Python3


```python
class Solution:
    def maxSumOfThreeSubarrays(self, nums: List[int], k: int) -> List[int]:
        n = len(nums)
        s = list(accumulate(nums, initial=0))
        pre = [[] for _ in range(n)]
        suf = [[] for _ in range(n)]
        t = idx = 0
        for i in range(n - k + 1):
            if (cur := s[i + k] - s[i]) > t:
                pre[i + k - 1] = [cur, i]
                t, idx = pre[i + k - 1]
            else:
                pre[i + k - 1] = [t, idx]
        t = idx = 0
        for i in range(n - k, -1, -1):
            if (cur := s[i + k] - s[i]) >= t:
                suf[i] = [cur, i]
                t, idx = suf[i]
            else:
                suf[i] = [t, idx]
        t = 0
        ans = []
        for i in range(k, n - 2 * k + 1):
            if (cur := s[i + k] - s[i] + pre[i - 1][0] + suf[i + k][0]) > t:
                ans = [pre[i - 1][1], i, suf[i + k][1]]
                t = cur
        return ans
```

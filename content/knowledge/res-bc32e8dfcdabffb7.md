## 解法




### 方法一：哈希表 + 前缀和



> **思考**
>
> 每次只能删左右端点，使删除之和为 $x$ 且次数最少，等价于中间留下和为 $\sum nums-x$ 的最长子数组。 $n$ 达 $10^5$，需要线性查找该子数组。
>
> 前缀和哈希：记下和第一次出现的下标，当 $t-s$ 已出现则更新最长长度，答案为 $n$ 减该长度。



根据题目描述，我们需要移除数组 $nums$ 左右两端的元素，使得移除的元素和等于 $x$，且移除的元素个数最少。我们可以将问题转化为：找到数组 $nums$ 中最长的连续子数组，使得子数组的和 $s = \sum_{i=0}^{n} nums[i] - x$。这样，我们就可以将问题转化为求解数组 $nums$ 中和为 $s$ 的最长连续子数组的长度 $mx$，答案即为 $n - mx$。

我们初始化 $mx = -1$，然后使用哈希表 $vis$ 来存储前缀和，键为前缀和，值为前缀和对应的下标。

遍历数组 $nums$，对于当前元素 $nums[i]$，计算前缀和 $t$，如果 $t$ 不在哈希表中，则将 $t$ 加入哈希表；如果 $t - s$ 在哈希表中，则更新 $mx = \max(mx, i - vis[t - s])$。

最后，如果 $mx = -1$，则返回 $-1$，否则返回 $n - mx$。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为数组 $nums$ 的长度。




#### Python3


```python
class Solution:
    def minOperations(self, nums: List[int], x: int) -> int:
        s = sum(nums) - x
        vis = {0: -1}
        mx, t = -1, 0
        for i, v in enumerate(nums):
            t += v
            if t not in vis:
                vis[t] = i
            if t - s in vis:
                mx = max(mx, i - vis[t - s])
        return -1 if mx == -1 else len(nums) - mx
```


#### TypeScript


```ts
function minOperations(nums: number[], x: number): number {
    const s = nums.reduce((acc, cur) => acc + cur, -x);
    const vis: Map<number, number> = new Map([[0, -1]]);
    let [mx, t] = [-1, 0];
    const n = nums.length;
    for (let i = 0; i < n; ++i) {
        t += nums[i];
        if (!vis.has(t)) {
            vis.set(t, i);
        }
        if (vis.has(t - s)) {
            mx = Math.max(mx, i - vis.get(t - s)!);
        }
    }
    return ~mx ? n - mx : -1;
}
```


### 方法二：双指针



> **思考**
>
> 方法一用哈希表。元素均为正，前缀和严格递增，可用双指针把窗口和压到 $s$，省掉额外空间。



基于方法一的分析，我们需要求解数组 $nums$ 中和为 $s$ 的最长连续子数组的长度 $mx$。由于数组 $nums$ 中的元素都是正整数，数组的前缀和只会单调递增，因此我们可以使用双指针来求解。

我们初始化指针 $j = 0$，前缀和 $t = 0$，最长连续子数组的长度 $mx = -1$。

遍历数组 $nums$，对于当前元素 $nums[i]$，计算前缀和 $t += nums[i]$，如果 $t > s$，则移动指针 $j$，直到 $t \leq s$。如果 $t = s$，则更新 $mx = \max(mx, i - j + 1)$。

最后，如果 $mx = -1$，则返回 $-1$，否则返回 $n - mx$。

时间复杂度 $O(n)$，其中 $n$ 为数组 $nums$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def minOperations(self, nums: List[int], x: int) -> int:
        s = sum(nums) - x
        j = t = 0
        mx = -1
        for i, x in enumerate(nums):
            t += x
            while j <= i and t > s:
                t -= nums[j]
                j += 1
            if t == s:
                mx = max(mx, i - j + 1)
        return -1 if mx == -1 else len(nums) - mx
```


#### TypeScript


```ts
function minOperations(nums: number[], x: number): number {
    const s = nums.reduce((acc, cur) => acc + cur, -x);
    let [mx, t] = [-1, 0];
    const n = nums.length;
    for (let i = 0, j = 0; i < n; ++i) {
        t += nums[i];
        while (t > s) {
            t -= nums[j++];
        }
        if (t === s) {
            mx = Math.max(mx, i - j + 1);
        }
    }
    return ~mx ? n - mx : -1;
}
```

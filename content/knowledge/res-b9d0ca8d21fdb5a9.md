## 解法




### 方法一：数组或哈希表 + 前缀和



> **思考**
>
> 求元素互异的连续子数组的最大和。 $n$ 达 $10^5$，用上次出现位置把左端 $j$ 推到重复点之后，前缀和给出区间和。
>
> 数组 $d$ 记下每个值最近下标，扫到 $v$ 时 $j=\max(j,d[v])$，用 $s[i]-s[j]$ 更新答案。



我们用数组或哈希表 $\text{d}$ 记录每个数字最后一次出现的位置，用前缀和数组 $\text{s}$ 记录从起点到当前位置的和。我们用变量 $j$ 记录当前不重复子数组的左端点。

遍历数组，对于每个数字 $v$，如果 $\text{d}[v]$ 存在，那么我们更新 $j$ 为 $\max(j, \text{d}[v])$，这样就保证了当前不重复子数组不包含 $v$。然后我们更新答案为 $\max(\text{ans}, \text{s}[i] - \text{s}[j])$，最后更新 $\text{d}[v]$ 为 $i$。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为数组 $\text{nums}$ 的长度。




#### Python3


```python
class Solution:
    def maximumUniqueSubarray(self, nums: List[int]) -> int:
        d = [0] * (max(nums) + 1)
        s = list(accumulate(nums, initial=0))
        ans = j = 0
        for i, v in enumerate(nums, 1):
            j = max(j, d[v])
            ans = max(ans, s[i] - s[j])
            d[v] = i
        return ans
```


#### TypeScript


```ts
function maximumUniqueSubarray(nums: number[]): number {
    const m = Math.max(...nums);
    const n = nums.length;
    const s: number[] = Array.from({ length: n + 1 }, () => 0);
    for (let i = 1; i <= n; ++i) {
        s[i] = s[i - 1] + nums[i - 1];
    }
    const d = Array.from({ length: m + 1 }, () => 0);
    let [ans, j] = [0, 0];
    for (let i = 1; i <= n; ++i) {
        j = Math.max(j, d[nums[i - 1]]);
        ans = Math.max(ans, s[i] - s[j]);
        d[nums[i - 1]] = i;
    }
    return ans;
}
```


### 方法二：双指针（滑动窗口）



> **思考**
>
> 方法一用前缀和与下标表。也可用滑动窗口维护当前互异段的和：右端纳入时若重复则左端弹出，省掉前缀数组。



题目实际上是让我们找出一个最长的子数组，该子数组中所有元素都不相同。我们可以用两个指针 $i$ 和 $j$ 分别指向子数组的左右边界，初始时 $i = 0$, $j = 0$。另外，我们用一个哈希表 $\text{vis}$ 记录子数组中的元素。

遍历数组，对于每个数字 $x$，如果 $x$ 在 $\text{vis}$ 中，那么我们不断地将 $\text{nums}[i]$ 从 $\text{vis}$ 中移除，直到 $x$ 不在 $\text{vis}$ 中为止。这样我们就找到了一个不包含重复元素的子数组。我们将 $x$ 加入 $\text{vis}$，并更新子数组的和 $s$，然后更新答案 $\text{ans} = \max(\text{ans}, s)$。

遍历结束后，我们就可以得到最大的子数组和。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为数组 $\text{nums}$ 的长度。




#### Python3


```python
class Solution:
    def maximumUniqueSubarray(self, nums: List[int]) -> int:
        vis = set()
        ans = s = i = 0
        for x in nums:
            while x in vis:
                y = nums[i]
                s -= y
                vis.remove(y)
                i += 1
            vis.add(x)
            s += x
            ans = max(ans, s)
        return ans
```


#### TypeScript


```ts
function maximumUniqueSubarray(nums: number[]): number {
    const vis: Set<number> = new Set();
    let [ans, s, i] = [0, 0, 0];
    for (const x of nums) {
        while (vis.has(x)) {
            s -= nums[i];
            vis.delete(nums[i++]);
        }
        vis.add(x);
        s += x;
        ans = Math.max(ans, s);
    }
    return ans;
}
```

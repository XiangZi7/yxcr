## 解法




### 方法一：枚举



> **思考**
>
> 必须删恰好一个元素，答案是删去位置两侧连续 $1$ 的长度之和。 $n\le 10^5$，预处理以 $i$ 结尾、以 $i$ 开头的连续 $1$ 个数，枚举删除下标取最大。



我们可以枚举每个删除的位置 $i$，然后计算左侧和右侧的连续 1 的个数，最后取最大值。

具体地，我们使用两个长度为 $n+1$ 的数组 $left$ 和 $right$，其中 $left[i]$ 表示以 $nums[i-1]$ 结尾的连续 $1$ 的个数，而 $right[i]$ 表示以 $nums[i]$ 开头的连续 $1$ 的个数。

最终答案即为 $\max_{0 \leq i < n} \{left[i] + right[i+1]\}$。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为数组 $nums$ 的长度。




#### Python3


```python
class Solution:
    def longestSubarray(self, nums: List[int]) -> int:
        n = len(nums)
        left = [0] * (n + 1)
        right = [0] * (n + 1)
        for i, x in enumerate(nums, 1):
            if x:
                left[i] = left[i - 1] + 1
        for i in range(n - 1, -1, -1):
            if nums[i]:
                right[i] = right[i + 1] + 1
        return max(left[i] + right[i + 1] for i in range(n))
```


#### TypeScript


```ts
function longestSubarray(nums: number[]): number {
    const n = nums.length;
    const left: number[] = Array(n + 1).fill(0);
    const right: number[] = Array(n + 1).fill(0);
    for (let i = 1; i <= n; ++i) {
        if (nums[i - 1]) {
            left[i] = left[i - 1] + 1;
        }
    }
    for (let i = n - 1; ~i; --i) {
        if (nums[i]) {
            right[i] = right[i + 1] + 1;
        }
    }
    let ans = 0;
    for (let i = 0; i < n; ++i) {
        ans = Math.max(ans, left[i] + right[i + 1]);
    }
    return ans;
}
```


### 方法二：双指针



> **思考**
>
> 方法一用了 $O(n)$ 额外数组。问题等价于最长且至多一个 $0$ 的窗口，删掉这个 $0$（或任意一个 $1$）后的长度。右端扩张、零的个数超过 $1$ 时收缩左端，窗口长度减一即答案。



题目实际上是让我们找出一个最长的子数组，该子数组中最多只包含一个 $0$，删掉该子数组中的其中一个元素后，剩余的长度即为答案。

因此，我们可以用两个指针 $j$ 和 $i$ 分别指向子数组的左右边界，初始时 $j = 0$, $i = 0$。另外，我们用一个变量 $cnt$ 记录子数组中 $0$ 的个数。

接下来，我们移动右指针 $i$，如果 $nums[i] = 0$，则 $cnt$ 加 $1$。当 $cnt > 1$ 时，我们需要移动左指针 $j$，直到 $cnt \leq 1$。然后，我们更新答案，即 $ans = \max(ans, i - j)$。继续移动右指针 $i$，直到 $i$ 到达数组的末尾。

时间复杂度 $O(n)$，其中 $n$ 为数组 $nums$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def longestSubarray(self, nums: List[int]) -> int:
        ans = 0
        cnt = j = 0
        for i, x in enumerate(nums):
            cnt += x ^ 1
            while cnt > 1:
                cnt -= nums[j] ^ 1
                j += 1
            ans = max(ans, i - j)
        return ans
```


#### TypeScript


```ts
function longestSubarray(nums: number[]): number {
    let [ans, cnt, j] = [0, 0, 0];
    for (let i = 0; i < nums.length; ++i) {
        cnt += nums[i] ^ 1;
        while (cnt > 1) {
            cnt -= nums[j++] ^ 1;
        }
        ans = Math.max(ans, i - j);
    }
    return ans;
}
```


### 方法三：双指针（优化）



> **思考**
>
> 方法二在零过多时会把窗口缩短。求的是最大长度，左端每次只需右移一格与右端同步前进，窗口单调不缩，最后长度为 $n-l-1$。



方法二中，我们每次会循环移动左指针，直到 $cnt \leq 1$。由于题目求的是最长子数组，意味着我们不需要缩小子数组的长度，因此，如果 $\textit{cnt} \gt 1$，我们只移动左指针一次，右指针也继续向右移动。这样可以保证子数组的长度不会减小。

最后，我们返回的答案即为 $n - l - 1$，其中 $l$ 为左指针的位置。

时间复杂度 $O(n)$，其中 $n$ 为数组 $nums$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def longestSubarray(self, nums: List[int]) -> int:
        cnt = l = 0
        for x in nums:
            cnt += x ^ 1
            if cnt > 1:
                cnt -= nums[l] ^ 1
                l += 1
        return len(nums) - l - 1
```


#### TypeScript


```ts
function longestSubarray(nums: number[]): number {
    let [cnt, l] = [0, 0];
    for (const x of nums) {
        cnt += x ^ 1;
        if (cnt > 1) {
            cnt -= nums[l++] ^ 1;
        }
    }
    return nums.length - l - 1;
}
```

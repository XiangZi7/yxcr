## 解法




### 方法一：前缀和 + 哈希表



> **思考**
>
> 需要长度至少为 $2$ 且和为 $k$ 的倍数的子数组。枚举两端再求和是 $O(n^2)$，在 $n \le 10^5$ 下过慢。
>
> 前缀和模 $k$ 相同的两个位置，其之间的子数组和能被 $k$ 整除。哈希表记下每个余数首次出现的下标；再次遇到同一余数且间隔大于 $1$ 即可返回。余数 $0$ 预置下标 $-1$，以覆盖从开头出发的合法段。



根据题目描述，如果存在两个前缀和模 $k$ 的余数相同的位置 $i$ 和 $j$（不妨设 $j < i$），那么 $\textit{nums}[j+1..i]$ 这个子数组的和是 $k$ 的倍数。

因此，我们可以使用哈希表存储每个前缀和模 $k$ 的余数第一次出现的位置。初始时，我们在哈希表中存入一对键值对 $(0, -1)$，表示前缀和为 $0$ 的余数 $0$ 出现在位置 $-1$。

遍历数组时，我们计算当前前缀和的模 $k$ 的余数，如果当前前缀和的模 $k$ 的余数没有在哈希表中出现过，我们就将当前前缀和的模 $k$ 的余数和对应的位置存入哈希表中。否则，如果当前前缀和的模 $k$ 的余数在哈希表中已经出现过，位置为 $j$，那么我们就找到了一个满足条件的子数组 $\textit{nums}[j+1..i]$，因此返回 $\textit{True}$。

遍历结束后，如果没有找到满足条件的子数组，我们返回 $\textit{False}$。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是数组 $\textit{nums}$ 的长度。




#### Python3


```python
class Solution:
    def checkSubarraySum(self, nums: List[int], k: int) -> bool:
        d = {0: -1}
        s = 0
        for i, x in enumerate(nums):
            s = (s + x) % k
            if s not in d:
                d[s] = i
            elif i - d[s] > 1:
                return True
        return False
```


#### TypeScript


```ts
function checkSubarraySum(nums: number[], k: number): boolean {
    const d: Record<number, number> = { 0: -1 };
    let s = 0;
    for (let i = 0; i < nums.length; ++i) {
        s = (s + nums[i]) % k;
        if (!d.hasOwnProperty(s)) {
            d[s] = i;
        } else if (i - d[s] > 1) {
            return true;
        }
    }
    return false;
}
```

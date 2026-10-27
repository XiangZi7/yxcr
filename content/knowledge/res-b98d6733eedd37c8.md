## 解法




### 方法一：哈希表



> **思考**
>
> 统计满足 $|a-b|=k$ 的不同数对（值不同，与下标无关）。枚举所有下标对是 $O(n^2)$。
>
> 一边遍历一边把已见过的值放入集合：若 $x-k$ 或 $x+k$ 已出现，则把较小元加入答案集合，避免同一数对重复计数。 $k$ 固定，查找是期望常数。



由于 $k$ 是一个定值，我们可以用一个哈希表 $\textit{ans}$ 记录数对的较小值，就能够确定较大的值。最后返回 $\textit{ans}$ 的大小作为答案。

遍历数组 $\textit{nums}$，当前遍历到的数 $x$，我们用哈希表 $\textit{vis}$ 记录此前遍历到的所有数字。若 $x-k$ 在 $\textit{vis}$ 中，则将 $x-k$ 添加至 $\textit{ans}$；若 $x+k$ 在 $\textit{vis}$ 中，则将 $x$ 添加至 $\textit{ans}$。然后我们将 $x$ 添加至 $\textit{vis}$。继续遍历数组 $\textit{nums}$ 直至遍历结束。

最后返回 $\textit{ans}$ 的大小作为答案。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为数组 $\textit{nums}$ 的长度。




#### Python3


```python
class Solution:
    def findPairs(self, nums: List[int], k: int) -> int:
        ans = set()
        vis = set()
        for x in nums:
            if x - k in vis:
                ans.add(x - k)
            if x + k in vis:
                ans.add(x)
            vis.add(x)
        return len(ans)
```


#### TypeScript


```ts
function findPairs(nums: number[], k: number): number {
    const ans = new Set<number>();
    const vis = new Set<number>();
    for (const x of nums) {
        if (vis.has(x - k)) {
            ans.add(x - k);
        }
        if (vis.has(x + k)) {
            ans.add(x);
        }
        vis.add(x);
    }
    return ans.size;
}
```

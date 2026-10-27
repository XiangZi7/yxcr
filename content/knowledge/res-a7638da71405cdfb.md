## 解法




### 方法一：哈希表



> **思考**
>
> 若枚举所有数对，时间复杂度为 $O(n^2)$。在 $n \le 10^4$ 的数据范围下可以接受，但题目进阶要求更优的算法。
>
> 对当前元素 $x$，我们需要判断此前是否出现过 $target - x$。这是一个查找问题，使用哈希表可以将查找从线性扫描降至期望常数时间。遍历数组的同时，将「值 $\to$ 下标」写入哈希表：遇到 $x$ 时先查询 $target - x$ 是否已经出现，若已出现则返回两个下标，否则再将 $x$ 插入。
>
> 插入的时机需要注意：必须先查询、再插入。若先插入再查询，当 $nums = [3,3]$ 且 $target = 6$ 时，会把同一个下标使用两次。先查后插，配到的一定是更早出现的下标。



我们可以使用一个哈希表 $\textit{d}$ 来存储每个元素及其对应的索引。

遍历数组 $\textit{nums}$，对于当前元素 $\textit{nums}[i]$，我们首先判断 $\textit{target} - \textit{nums}[i]$ 是否在哈希表 $\textit{d}$ 中，如果在 $\textit{d}$ 中，说明 $\textit{target}$ 值已经找到，返回 $\textit{target} - \textit{nums}[i]$ 的索引和 $i$ 即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$，其中 $n$ 为数组 $\textit{nums}$ 的长度。




#### Python3


```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        d = {}
        for i, x in enumerate(nums):
            if (y := target - x) in d:
                return [d[y], i]
            d[x] = i
```


#### TypeScript


```ts
function twoSum(nums: number[], target: number): number[] {
    const d = new Map<number, number>();
    for (let i = 0; ; ++i) {
        const x = nums[i];
        const y = target - x;
        if (d.has(y)) {
            return [d.get(y)!, i];
        }
        d.set(x, i);
    }
}
```

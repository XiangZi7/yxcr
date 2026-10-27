## 解法




### 方法一：哈希表或数组



> **思考**
>
> 两数组的去重交集。双重循环配对数为 $O(nm)$。值域或哈希可 $O(1)$ 查询。
>
> 把一边放入集合，扫另一边并在命中后删除以免重复。代码直接求两集合之交。



我们先用哈希表或者一个长度为 $1001$ 的数组 $s$ 记录数组 $nums1$ 中出现的元素，然后遍历数组 $nums2$ 中每个元素，如果元素 $x$ 在 $s$ 中，那么将 $x$ 加入答案，并且从 $s$ 中移除 $x$。

遍历结束后，返回答案数组即可。

时间复杂度 $O(n+m)$，空间复杂度 $O(n)$。其中 $n$ 和 $m$ 分别是数组 $nums1$ 和 $nums2$ 的长度。




#### Python3


```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        return list(set(nums1) & set(nums2))
```


#### TypeScript


```ts
function intersection(nums1: number[], nums2: number[]): number[] {
    const s = new Set(nums1);
    return [...new Set(nums2.filter(x => s.has(x)))];
}
```

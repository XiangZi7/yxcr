## 解法




### 方法一：哈希表



> **思考**
>
> 交集须保留出现次数，取两边的较小频次。相对 349，不能去重到一次。
>
> 统计 $nums1$ 的频次，扫 $nums2$：尚有余额则写入答案并减一。输出长度等于各值 $\min$ 次数之和。



我们可以用一个哈希表 $\textit{cnt}$ 统计数组 $\textit{nums1}$ 中每个元素出现的次数，然后遍历数组 $\textit{nums2}$，如果元素 $x$ 在 $\textit{cnt}$ 中，并且 $x$ 的出现次数大于 $0$，那么将 $x$ 加入答案，然后将 $x$ 的出现次数减一。

遍历结束后，返回答案数组即可。

时间复杂度 $O(m + n)$，空间复杂度 $O(m)$。其中 $m$ 和 $n$ 分别是数组 $\textit{nums1}$ 和 $\textit{nums2}$ 的长度。




#### Python3


```python
class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        cnt = Counter(nums1)
        ans = []
        for x in nums2:
            if cnt[x]:
                ans.append(x)
                cnt[x] -= 1
        return ans
```


#### TypeScript


```ts
function intersect(nums1: number[], nums2: number[]): number[] {
    const cnt: Record<number, number> = {};
    for (const x of nums1) {
        cnt[x] = (cnt[x] || 0) + 1;
    }
    const ans: number[] = [];
    for (const x of nums2) {
        if (cnt[x]-- > 0) {
            ans.push(x);
        }
    }
    return ans;
}
```

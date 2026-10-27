## 解法




### 方法一：哈希表 + 枚举



> **思考**
>
> 函数 $func$ 是子数组的按位与，要求它与 $target$ 的绝对差最小。子数组有 $O(n^2)$ 个， $n\le 10^5$，全部求出不可行。
>
> 从固定右端向左延伸时，按位与只减不增，且不同值至多 $O(\log A)$ 个，因为每次变化至少少掉一个 $1$ 比特。用集合维护「以当前下标为右端的所有与值」，由上一列的与值再与 $arr[i]$ 得到，同时更新与 $target$ 的最小偏差。



根据题目描述，我们知道，函数 $func(arr, l, r)$ 实际上就是数组 $arr$ 下标 $l$ 到 $r$ 的元素的按位与运算的结果，即 $arr[l] \& arr[l + 1] \& \cdots \& arr[r]$。

如果我们每次固定右端点 $r$，那么左端点 $l$ 的范围是 $[0, r]$。由于按位与之和随着 $l$ 的减小而单调递减，并且 $arr[i]$ 的值不超过 $10^6$，因此区间 $[0, r]$ 最多只有 $20$ 种不同的值。因此，我们可以用一个集合来维护所有的 $arr[l] \& arr[l + 1] \& \cdots \& arr[r]$ 的值。当我们从 $r$ 遍历到 $r+1$ 时，以 $r+1$ 为右端点的值，就是集合中每个值与 $arr[r + 1]$ 进行按位与运算得到的值，再加上 $arr[r + 1]$ 本身。因此，我们只需要枚举集合中的每个值，与 $arr[r]$ 进行按位与运算，就可以得到以 $r$ 为右端点的所有值，将每个值与 $target$ 相减后取绝对值，就可以得到以 $r$ 为右端点的所有值与 $target$ 的差的绝对值，其中的最小值就是答案。

时间复杂度 $O(n \times \log M)$，空间复杂度 $O(\log M)$。其中 $n$ 和 $M$ 分别是数组 $arr$ 的长度和数组 $arr$ 中的最大值。

相似题目：

- [3171. 找到按位与最接近 K 的子数组](https://github.com/doocs/leetcode/blob/main/solution/3100-3199/3171.Find%20Subarray%20With%20Bitwise%20AND%20Closest%20to%20K/README.md)




#### Python3


```python
class Solution:
    def closestToTarget(self, arr: List[int], target: int) -> int:
        ans = abs(arr[0] - target)
        s = {arr[0]}
        for x in arr:
            s = {x & y for y in s} | {x}
            ans = min(ans, min(abs(y - target) for y in s))
        return ans
```


#### TypeScript


```ts
function closestToTarget(arr: number[], target: number): number {
    let ans = Math.abs(arr[0] - target);
    let pre = new Set<number>();
    pre.add(arr[0]);
    for (const x of arr) {
        const cur = new Set<number>();
        cur.add(x);
        for (const y of pre) {
            cur.add(x & y);
        }
        for (const y of cur) {
            ans = Math.min(ans, Math.abs(y - target));
        }
        pre = cur;
    }
    return ans;
}
```

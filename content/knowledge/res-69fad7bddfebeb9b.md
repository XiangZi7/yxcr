## 解法




### 方法一：维护前缀最值



> **思考**
>
> 环形最大子段和有两种形态：不跨越端点时即普通最大子段；跨越时等于总和减去最小子段。一次扫描同时维护前缀最小与前缀最大，分别得到这两种量，最后取 $ans$ 与 $s-smi$ 的较大者。



求环形子数组的最大和，可以分为两种情况：

- 情况一：最大和的子数组不包含环形部分，即为普通的最大子数组和；
- 情况二：最大和的子数组包含环形部分，我们可以转换为：求数组总和减去最小子数组和。

因此，我们维护以下几个变量：

- 前缀和最小值 $pmi$，初始值为 $0$；
- 前缀和最大值 $pmx$，初始值为 $-\infty$；
- 前缀和 $s$，初始值为 $0$；
- 最小子数组和 $smi$，初始值为 $\infty$；
- 答案 $ans$，初始值为 $-\infty$。

接下来，我们只需要遍历数组 $nums$，对于当前遍历到的元素 $x$，我们做以下更新操作：

- 更新前缀和 $s = s + x$；
- 更新答案 $ans = \max(ans, s - pmi)$，即为情况一的答案（前缀和 $s$ 减去最小前缀和 $pmi$，可以得到最大子数组和）；
- 更新 $smi = \min(smi, s - pmx)$，即为情况二的最小子数组和；
- 更新 $pmi = \min(pmi, s)$，即为最小前缀和；
- 更新 $pmx = \max(pmx, s)$，即为最大前缀和。

遍历结束，我们取 $ans$ 以及 $s - smi$ 的最大值作为答案返回即可。

时间复杂度 $O(n)$，其中 $n$ 为数组长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        pmi, pmx = 0, -inf
        ans, s, smi = -inf, 0, inf
        for x in nums:
            s += x
            ans = max(ans, s - pmi)
            smi = min(smi, s - pmx)
            pmi = min(pmi, s)
            pmx = max(pmx, s)
        return max(ans, s - smi)
```


#### TypeScript


```ts
function maxSubarraySumCircular(nums: number[]): number {
    let [pmi, pmx] = [0, -Infinity];
    let [ans, s, smi] = [-Infinity, 0, Infinity];
    for (const x of nums) {
        s += x;
        ans = Math.max(ans, s - pmi);
        smi = Math.min(smi, s - pmx);
        pmi = Math.min(pmi, s);
        pmx = Math.max(pmx, s);
    }
    return Math.max(ans, s - smi);
}
```

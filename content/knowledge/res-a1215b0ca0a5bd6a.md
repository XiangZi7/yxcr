## 解法




### 方法一



> **思考**
>
> 两条递增数组可在相同数值处切换，得分是路径上数值之和（公共值只计一次）。 $n\le 10^5$，枚举所有切换方案不可行。
>
> 公共值把路径切成若干段，两段之间只能走完其中一条。用双指针同步推进：较小的一侧累加到自己的路径和；相等时两边都加上该值并取至此较大的路径和作为新的共同起点。扫完后取两条路径和的较大者。






#### Python3


```python
class Solution:
    def maxSum(self, nums1: List[int], nums2: List[int]) -> int:
        mod = 10**9 + 7
        m, n = len(nums1), len(nums2)
        i = j = 0
        f = g = 0
        while i < m or j < n:
            if i == m:
                g += nums2[j]
                j += 1
            elif j == n:
                f += nums1[i]
                i += 1
            elif nums1[i] < nums2[j]:
                f += nums1[i]
                i += 1
            elif nums1[i] > nums2[j]:
                g += nums2[j]
                j += 1
            else:
                f = g = max(f, g) + nums1[i]
                i += 1
                j += 1
        return max(f, g) % mod
```


#### TypeScript


```ts
function maxSum(nums1: number[], nums2: number[]): number {
    const mod = 1e9 + 7;
    const m = nums1.length;
    const n = nums2.length;
    let [f, g] = [0, 0];
    let [i, j] = [0, 0];
    while (i < m || j < n) {
        if (i === m) {
            g += nums2[j++];
        } else if (j === n) {
            f += nums1[i++];
        } else if (nums1[i] < nums2[j]) {
            f += nums1[i++];
        } else if (nums1[i] > nums2[j]) {
            g += nums2[j++];
        } else {
            f = g = Math.max(f, g) + nums1[i];
            i++;
            j++;
        }
    }
    return Math.max(f, g) % mod;
}
```

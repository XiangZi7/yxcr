## 解法




### 方法一：动态规划



> **思考**
>
> 每个下标可选择交换或不交换，穷举全部 $2^n$ 方案在 $n\le 10^5$ 时不可行。某一位置能否保持两条序列严格递增，只取决于它与前一位置在交换后的相对大小。
>
> 为此记录做到当前位置且「本位置不换 / 本位置交换」的最少次数。转移按与前一位是否已经递增、以及交叉后是否仍递增分情况讨论；转移只依赖上一位置的两个状态，滚动两个变量即可。



定义 $a$, $b$ 分别表示使得下标 $[0..i]$ 的元素序列严格递增，且第 $i$ 个元素不交换、交换的最小交换次数。下标从 $0$ 开始。

当 $i=0$ 时，有 $a = 0$, $b=1$。

当 $i\gt 0$ 时，我们先将此前 $a$, $b$ 的值保存在 $x$, $y$ 中，然后分情况讨论：

如果 $nums1[i - 1] \ge nums1[i]$ 或者 $nums2[i - 1] \ge nums2[i]$，为了使得两个序列均严格递增，下标 $i-1$ 和 $i$ 对应的元素的相对位置必须发生变化。也就是说，如果前一个位置交换了，那么当前位置不交换，因此有 $a = y$；如果前一个位置没有交换，那么当前位置必须交换，因此有 $b = x + 1$。

否则，下标 $i-1$ 和 $i$ 对应的元素的相对位置可以不发生变化，那么有 $b = y + 1$。另外，如果满足 $nums1[i - 1] \lt nums2[i]$ 并且 $nums2[i - 1] \lt nums1[i]$，那么下标 $i-1$ 和 $i$ 对应的元素的相对位置可以发生变化，此时 $a$ 和 $b$ 可以取较小值，因此有 $a = \min(a, y)$ 和 $b = \min(b, x + 1)$。

最后，返回 $a$ 和 $b$ 中较小值即可。

时间复杂度 $O(n)$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def minSwap(self, nums1: List[int], nums2: List[int]) -> int:
        a, b = 0, 1
        for i in range(1, len(nums1)):
            x, y = a, b
            if nums1[i - 1] >= nums1[i] or nums2[i - 1] >= nums2[i]:
                a, b = y, x + 1
            else:
                b = y + 1
                if nums1[i - 1] < nums2[i] and nums2[i - 1] < nums1[i]:
                    a, b = min(a, y), min(b, x + 1)
        return min(a, b)
```


#### TypeScript


```ts
function minSwap(nums1: number[], nums2: number[]): number {
    let [a, b] = [0, 1];
    for (let i = 1; i < nums1.length; ++i) {
        let x = a,
            y = b;
        if (nums1[i - 1] >= nums1[i] || nums2[i - 1] >= nums2[i]) {
            a = y;
            b = x + 1;
        } else {
            b = y + 1;
            if (nums1[i - 1] < nums2[i] && nums2[i - 1] < nums1[i]) {
                a = Math.min(a, y);
                b = Math.min(b, x + 1);
            }
        }
    }
    return Math.min(a, b);
}
```

## 解法




### 方法一：摩尔投票法



> **思考**
>
> 多数元素出现次数超过 $\lfloor n/2\rfloor$，题目保证存在。哈希计数或排序都能做，进阶要 $O(n)$ 时间、 $O(1)$ 空间。 $n\le 5\times 10^4$。
>
> 摩尔投票把不同元素两两抵消：计数器归零就换候选人。多数元素无法被完全抵消，一趟结束后的候选人即答案，无需第二趟确认。



摩尔投票法的基本步骤如下：

初始化元素 $m$，并初始化计数器 $cnt=0$。接下来，对于输入列表中每一个元素 $x$：

1. 如果 $cnt=0$，那么 $m=x$ 并且 $cnt=1$；
1. 否则，如果 $m=x$，那么 $cnt = cnt + 1$，否则 $cnt = cnt - 1$。

一般而言，摩尔投票法需要对输入的列表进行**两次遍历**。在第一次遍历中，我们生成候选值 $m$，如果存在多数，那么该候选值就是多数值。在第二次遍历中，只需要简单地计算候选值的频率，以确认是否是多数值。由于本题已经明确说明存在多数值，所以第一次遍历结束后，直接返回 $m$ 即可，无需二次遍历确认是否是多数值。

时间复杂度 $O(n)$，其中 $n$ 是数组 $nums$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        cnt = m = 0
        for x in nums:
            if cnt == 0:
                m, cnt = x, 1
            else:
                cnt += 1 if m == x else -1
        return m
```


#### TypeScript


```ts
function majorityElement(nums: number[]): number {
    let cnt: number = 0;
    let m: number = 0;
    for (const x of nums) {
        if (cnt === 0) {
            m = x;
            cnt = 1;
        } else {
            cnt += m === x ? 1 : -1;
        }
    }
    return m;
}
```

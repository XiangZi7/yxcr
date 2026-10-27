## 解法




### 方法一：排序



> **思考**
>
> 蛋糕被切成网格，最大块面积等于最大相邻水平间距乘最大相邻竖直间距。 $h,w$ 很大但切口至多 $10^5$，对切口排序并补上边界 $0$ 与 $h$、 $w$，取相邻差的最大值相乘，再模 $10^9+7$。



我们先分别对 `horizontalCuts` 和 `verticalCuts` 排序，然后分别遍历两个数组，计算相邻两个元素的最大差值，分别记为 $x$ 和 $y$，最后返回 $x \times y$ 即可。

注意要考虑边界情况，即 `horizontalCuts` 和 `verticalCuts` 的首尾元素。

时间复杂度 $O(m\log m + n\log n)$，空间复杂度 $O(\log m + \log n)$。其中 $m$ 和 $n$ 分别为 `horizontalCuts` 和 `verticalCuts` 的长度。




#### Python3


```python
class Solution:
    def maxArea(
        self, h: int, w: int, horizontalCuts: List[int], verticalCuts: List[int]
    ) -> int:
        horizontalCuts.extend([0, h])
        verticalCuts.extend([0, w])
        horizontalCuts.sort()
        verticalCuts.sort()
        x = max(b - a for a, b in pairwise(horizontalCuts))
        y = max(b - a for a, b in pairwise(verticalCuts))
        return (x * y) % (10**9 + 7)
```


#### TypeScript


```ts
function maxArea(h: number, w: number, horizontalCuts: number[], verticalCuts: number[]): number {
    const mod = 1e9 + 7;
    horizontalCuts.push(0, h);
    verticalCuts.push(0, w);
    horizontalCuts.sort((a, b) => a - b);
    verticalCuts.sort((a, b) => a - b);
    let [x, y] = [0, 0];
    for (let i = 1; i < horizontalCuts.length; i++) {
        x = Math.max(x, horizontalCuts[i] - horizontalCuts[i - 1]);
    }
    for (let i = 1; i < verticalCuts.length; i++) {
        y = Math.max(y, verticalCuts[i] - verticalCuts[i - 1]);
    }
    return Number((BigInt(x) * BigInt(y)) % BigInt(mod));
}
```

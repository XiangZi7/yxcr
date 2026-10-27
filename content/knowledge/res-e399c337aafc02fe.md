## 解法




### 方法一：排序 + 贪心



> **思考**
>
> 一支箭射穿所有覆盖该点的气球，求最少箭数。这与「用最少点刺穿所有区间」相同。
>
> 按右端升序：当前箭钉在上一个被射中气球的右端；下一个左端若超过该点，必须新射一箭并更新钉点。
>
> 钉在已选区间的右端，能覆盖尽可能多的后续气球；按右端排序保证这一贪心最优。



我们可以将所有气球按照右端点升序排序，然后从左到右遍历气球，维护当前的箭所能覆盖的最右端点 $last$，如果当前气球的左端点 $a$ 大于 $last$，说明当前箭无法覆盖当前气球，需要额外射出一支箭，那么答案加一，同时更新 $last$ 为当前气球的右端点 $b$。

遍历结束后，即可得到答案。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(\log n)$。其中 $n$ 为气球的数量。

相似题目：

- [757. 设置交集大小至少为 2](https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0757.Set%20Intersection%20Size%20At%20Least%20Two/README.md)




#### Python3


```python
class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        ans, last = 0, -inf
        for a, b in sorted(points, key=lambda x: x[1]):
            if a > last:
                ans += 1
                last = b
        return ans
```


#### TypeScript


```ts
function findMinArrowShots(points: number[][]): number {
    points.sort((a, b) => a[1] - b[1]);
    let ans = 0;
    let last = -Infinity;
    for (const [a, b] of points) {
        if (last < a) {
            ans++;
            last = b;
        }
    }
    return ans;
}
```

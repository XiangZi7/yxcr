## 解法




### 方法一：分类讨论



> **思考**
>
> 三枚石子位置互异，状态空间虽可搜索，但每一步的最优选择只取决于排序后的间距，不必模拟过程。
>
> 记 $x<y<z$。三点已相邻则无需移动。否则若 $y$ 与某一端间隔不超过 $2$，一次即可填入空隙；其余情况两端各靠一次，最少为 $2$。最多步数是两端逐步向中间空位移动，共 $z-x-2$ 次。
>
> 排序后按上述分类直接给出 $[\textit{mi},\textit{mx}]$。



我们先将 $a, b, c$ 排序，记为 $x, y, z$，即 $x \lt y \lt z$。

接下来分情况讨论：

1. 如果 $z - x \leq 2$，说明 $3$ 个数已经相邻，不用移动，结果为 $[0, 0]$；
1. 否则，如果 $y - x \lt 3$，或者 $z - y \lt 3$，说明有两个数只间隔一个位置，我们只需要把另一个数移动到这两个数的中间，最小移动次数为 $1$；其他情况，最小移动次数为 $2$；
1. 最大移动次数就是两边的数字逐个往中间靠，最多移动 $z - x - 2$ 次。

时间复杂度 $O(1)$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def numMovesStones(self, a: int, b: int, c: int) -> List[int]:
        x, z = min(a, b, c), max(a, b, c)
        y = a + b + c - x - z
        mi = mx = 0
        if z - x > 2:
            mi = 1 if y - x < 3 or z - y < 3 else 2
            mx = z - x - 2
        return [mi, mx]
```


#### TypeScript


```ts
function numMovesStones(a: number, b: number, c: number): number[] {
    const x = Math.min(a, Math.min(b, c));
    const z = Math.max(a, Math.max(b, c));
    const y = a + b + c - x - z;
    let mi = 0,
        mx = 0;
    if (z - x > 2) {
        mi = y - x < 3 || z - y < 3 ? 1 : 2;
        mx = z - x - 2;
    }
    return [mi, mx];
}
```

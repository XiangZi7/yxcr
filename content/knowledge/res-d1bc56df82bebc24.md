## 解法




### 方法一：数学



> **思考**
>
> 枚举矩形内的格点或仅检查四个顶点，既可能漏掉边、内部与圆相交的情形，也与连续几何判定无关。坐标范围达 $10^4$，需要一次精确的几何判断。
>
> 圆与矩形相交，当且仅当矩形上距圆心最近的点落入圆内（含边界）。该最近点的横、纵坐标可分别在区间 $[x_1,x_2]$、 $[y_1,y_2]$ 上独立夹取。
>
> 若圆心投影落在对应区间内，则该维距离为 $0$；否则取到较近端点的距离。两维平方和与 $radius^2$ 比较即可，避免开方。



对于一个点 $(x, y)$，它到圆心 $(xCenter, yCenter)$ 的最短距离为 $\sqrt{(x - xCenter)^2 + (y - yCenter)^2}$，如果这个距离小于等于半径 $radius$，那么这个点就在圆内（包括边界）。

而对于矩形内（包括边界）的点，它们的横坐标 $x$ 满足 $x_1 \leq x \leq x_2$，纵坐标 $y$ 满足 $y_1 \leq y \leq y_2$。要判断圆和矩形是否有重叠的部分，相当于在矩形内找到一个点 $(x, y)$，使得 $a = |x - xCenter|$ 和 $b = |y - yCenter|$ 都取到最小值，此时若 $a^2 + b^2 \leq radius^2$，则说明圆和矩形有重叠的部分。

因此，问题转化为求 $x \in [x_1, x_2]$ 时 $a = |x - xCenter|$ 的最小值，以及 $y \in [y_1, y_2]$ 时 $b = |y - yCenter|$ 的最小值。

对于 $x \in [x_1, x_2]$：

- 如果 $x_1 \leq xCenter \leq x_2$，那么 $|x - xCenter|$ 的最小值为 $0$；
- 如果 $xCenter \lt x_1$，那么 $|x - xCenter|$ 的最小值为 $x_1 - xCenter$；
- 如果 $xCenter \gt x_2$，那么 $|x - xCenter|$ 的最小值为 $xCenter - x_2$。

同理，我们可以求出 $y \in [y_1, y_2]$ 时 $|y - yCenter|$ 的最小值。以上我们可以统一用函数 $f(i, j, k)$ 来处理。

即 $a = f(x_1, x_2, xCenter)$, $b = f(y_1, y_2, yCenter)$，如果 $a^2 + b^2 \leq radius^2$，则说明圆和矩形有重叠的部分。




#### Python3


```python
class Solution:
    def checkOverlap(
        self,
        radius: int,
        xCenter: int,
        yCenter: int,
        x1: int,
        y1: int,
        x2: int,
        y2: int,
    ) -> bool:
        def f(i: int, j: int, k: int) -> int:
            if i <= k <= j:
                return 0
            return i - k if k < i else k - j

        a = f(x1, x2, xCenter)
        b = f(y1, y2, yCenter)
        return a * a + b * b <= radius * radius
```


#### TypeScript


```ts
function checkOverlap(
    radius: number,
    xCenter: number,
    yCenter: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
): boolean {
    const f = (i: number, j: number, k: number) => {
        if (i <= k && k <= j) {
            return 0;
        }
        return k < i ? i - k : k - j;
    };
    const a = f(x1, x2, xCenter);
    const b = f(y1, y2, yCenter);
    return a * a + b * b <= radius * radius;
}
```

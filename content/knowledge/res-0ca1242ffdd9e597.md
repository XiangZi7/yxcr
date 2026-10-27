## 解法




### 方法一：数学



> **思考**
>
> 时钟上时针、分针的较小夹角。时针同时受小时与分钟影响：每小时 $30^\circ$，每分钟再偏 $0.5^\circ$；分针每分钟 $6^\circ$。两者差的绝对值与 $360^\circ$ 减去该差取较小者，即为劣角。



时针每小时移动 30 度，每分钟移动 0.5 度。分针每分钟移动 6 度。如果指针之间的夹角大于 180 度，则取其与 360 度的差值，以确保获得最小的夹角。

时间复杂度 $O(1)$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def angleClock(self, hour: int, minutes: int) -> float:
        h = 30 * hour + 0.5 * minutes
        m = 6 * minutes
        diff = abs(h - m)
        return min(diff, 360 - diff)
```


#### TypeScript


```ts
function angleClock(hour: number, minutes: number): number {
    const h = 30 * hour + 0.5 * minutes;
    const m = 6 * minutes;
    const diff = Math.abs(h - m);
    return Math.min(diff, 360 - diff);
}
```

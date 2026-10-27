## 解法




### 方法一：模拟



> **思考**
>
> 车站成环，两点间只有顺时针与逆时针两条弧。累加总长 $s$，再沿一侧从 $start$ 走到 $destination$ 得 $t$，另一侧为 $s-t$，取较小者。不必建图。



我们可以先统计出公交车的总行驶距离 $s$，然后模拟公交车的行驶过程，从出发点开始，每次向右移动一站，直到到达目的地为止，记录下这个过程中的行驶距离 $t$，最后返回 $t$ 和 $s - t$ 中的最小值即可。

时间复杂度 $O(n)$，其中 $n$ 是数组 $\textit{distance}$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def distanceBetweenBusStops(
        self, distance: List[int], start: int, destination: int
    ) -> int:
        s = sum(distance)
        t, n = 0, len(distance)
        while start != destination:
            t += distance[start]
            start = (start + 1) % n
        return min(t, s - t)
```


#### TypeScript


```ts
function distanceBetweenBusStops(distance: number[], start: number, destination: number): number {
    const s = distance.reduce((a, b) => a + b, 0);
    const n = distance.length;
    let t = 0;
    while (start !== destination) {
        t += distance[start];
        start = (start + 1) % n;
    }
    return Math.min(t, s - t);
}
```

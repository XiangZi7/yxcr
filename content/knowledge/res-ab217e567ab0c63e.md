## 解法




### 方法一：直接比较前两条边的点



> **思考**
>
> 星图中心与其余所有点相连，因此任意两条边都经过中心。不必建图。
>
> 看第一条边的两个端点，哪个出现在第二条边里，那个就是中心。



中心点的特点是，它与其他所有点都相连，因此只要比较前两条边的点，如果有相同的点，那么这个点就是中心点。

时间复杂度 $O(1)$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def findCenter(self, edges: List[List[int]]) -> int:
        return edges[0][0] if edges[0][0] in edges[1] else edges[0][1]
```


#### TypeScript


```ts
function findCenter(edges: number[][]): number {
    for (let num of edges[0]) {
        if (edges[1].includes(num)) {
            return num;
        }
    }
}
```

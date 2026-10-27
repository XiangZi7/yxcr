## 解法




### 方法一



> **思考**
>
> $n\le 100$，先求出当前最大值 $mx$，再判断每个孩子加上额外糖果后是否不小于 $mx$。不必模拟真正分配。






#### Python3


```python
class Solution:
    def kidsWithCandies(self, candies: List[int], extraCandies: int) -> List[bool]:
        mx = max(candies)
        return [candy + extraCandies >= mx for candy in candies]
```


#### TypeScript


```ts
function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
    const max = candies.reduce((r, v) => Math.max(r, v));
    return candies.map(v => v + extraCandies >= max);
}
```

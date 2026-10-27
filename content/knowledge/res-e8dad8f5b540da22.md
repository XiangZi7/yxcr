## 解法




### 方法一：哈希表



> **思考**
>
> Alice 只能拿一半糖果，希望种类尽量多。种类数超过 $n/2$ 时，多出来的种类也拿不到。
>
> 用集合（或哈希表）统计不同种类数，答案为 $\min(\textit{种类数},\ n/2)$。不必真正模拟分配。



我们用一个哈希表来存储糖果的种类，如果糖果的种类数小于 $n / 2$，那么 Alice 最多可以吃到的糖果种类数就是糖果的种类数；否则，Alice 最多可以吃到的糖果种类数就是 $n / 2$。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为糖果的数量。




#### Python3


```python
class Solution:
    def distributeCandies(self, candyType: List[int]) -> int:
        return min(len(candyType) >> 1, len(set(candyType)))
```


#### TypeScript


```ts
function distributeCandies(candyType: number[]): number {
    const s = new Set(candyType);
    return Math.min(s.size, candyType.length >> 1);
}
```

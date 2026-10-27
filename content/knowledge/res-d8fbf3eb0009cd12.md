## 解法




### 方法一：模拟



> **思考**
>
> 喝完的空瓶可按 $numExchange$ 个兑换一瓶新酒，问总共能喝多少瓶。数值上限不大，按轮次模拟兑换即可，无需闭式。
>
> 先喝掉手上的 $numBottles$ 瓶。每当空瓶数不少于兑换阈值，就拿出 $numExchange$ 个空瓶换回一瓶，喝完后又多一个空瓶，净减少 $numExchange-1$ 个空瓶并给答案加一。直到不够兑换为止。



我们可以直接模拟整个过程。

初始时，我们有 `numBottles` 瓶水，因此可以喝到 `ans = numBottles` 瓶水，然后得到 `numBottles` 个空瓶子。

接下来，如果我们有 `numExchange` 个空瓶子，那么我们可以用它们兑换一瓶水并喝掉，此时我们剩余的空瓶子数量为 `numBottles - numExchange + 1`，然后我们累加喝到的水的数量，即 $ans = ans + 1$。

最后，返回 `ans` 即可。

时间复杂度 $O(\frac{numBottles}{numExchange})$，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def numWaterBottles(self, numBottles: int, numExchange: int) -> int:
        ans = numBottles
        while numBottles >= numExchange:
            numBottles -= numExchange - 1
            ans += 1
        return ans
```


#### TypeScript


```ts
function numWaterBottles(numBottles: number, numExchange: number): number {
    let ans = numBottles;
    for (; numBottles >= numExchange; ++ans) {
        numBottles -= numExchange - 1;
    }
    return ans;
}
```

## 解法




### 方法一：排序 + 贪心



> **思考**
>
> 用硬币的子集和去覆盖从 $0$ 起的一段连续整数，求这段能延伸到多长。若能做出 $[0,ans)$，再加入 $v\le ans$ 的硬币可将区间扩到 $[0,ans+v)$。
>
> 硬币排序后从小到大吃进：一旦 $v>ans$ 出现空洞，停止。最终 $ans$ 即为从 $0$ 起连续可构造的个数。



我们先对数组进行排序。然后定义 $ans$ 表示当前能够构造的连续整数的个数，初始化为 $1$。

遍历数组，对于当前遍历到的元素 $v$，如果 $v \gt ans$，说明无法构造出 $ans+1$ 个连续的整数，因此直接跳出循环，返回 $ans$ 即可。否则，说明可以构造出 $ans+v$ 个连续的整数，因此更新 $ans$ 为 $ans+v$。

最后返回 $ans$ 即可。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(\log n)$。其中 $n$ 为数组的长度。




#### Python3


```python
class Solution:
    def getMaximumConsecutive(self, coins: List[int]) -> int:
        ans = 1
        for v in sorted(coins):
            if v > ans:
                break
            ans += v
        return ans
```


#### TypeScript


```ts
function getMaximumConsecutive(coins: number[]): number {
    coins.sort((a, b) => a - b);
    let ans = 1;
    for (const v of coins) {
        if (v > ans) {
            break;
        }
        ans += v;
    }
    return ans;
}
```

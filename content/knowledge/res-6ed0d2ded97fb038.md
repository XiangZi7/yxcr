## 解法




### 方法一：动态规划



> **思考**
>
> 最多两笔交易，方法二那种「无限次」状态不够用。若三维 DP 记下天数、已完成交易次数与是否持有，空间偏大。注意到合法顺序是「买一、卖一、买二、卖二」，四个变量按这个顺序更新：每一天用已经算好的上一阶段利润转移。同一天买了再卖利润为 $0$，不影响最优。



我们定义以下几个变量，其中：

- `f1` 表示第一次买入股票后的最大利润；
- `f2` 表示第一次卖出股票后的最大利润；
- `f3` 表示第二次买入股票后的最大利润；
- `f4` 表示第二次卖出股票后的最大利润。

遍历过程中，直接使用 `f1`, `f2`, `f3`, `f4` 计算，考虑的是在同一天买入和卖出时，收益是 $0$，不会对答案产生影响。

最后返回 `f4` 即可。

时间复杂度 $O(n)$，其中 $n$ 为数组 `prices` 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # 第一次买入，第一次卖出，第二次买入，第二次卖出
        f1, f2, f3, f4 = -prices[0], 0, -prices[0], 0
        for price in prices[1:]:
            f1 = max(f1, -price)
            f2 = max(f2, f1 + price)
            f3 = max(f3, f2 - price)
            f4 = max(f4, f3 + price)
        return f4
```


#### TypeScript


```ts
function maxProfit(prices: number[]): number {
    let [f1, f2, f3, f4] = [-prices[0], 0, -prices[0], 0];
    for (let i = 1; i < prices.length; ++i) {
        f1 = Math.max(f1, -prices[i]);
        f2 = Math.max(f2, f1 + prices[i]);
        f3 = Math.max(f3, f2 - prices[i]);
        f4 = Math.max(f4, f3 + prices[i]);
    }
    return f4;
}
```

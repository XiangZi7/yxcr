## 解法




### 方法一：枚举子集和 + 排序 + 二分查找



> **思考**
>
> 基料必选一种，每种配料 $0/1/2$ 份，成本和尽量接近 $\textit{target}$。配料种数很小，可枚举配料子集和。
>
> 把配料复制一份后 DFS 得到所有可达和并排序。枚举基料与一半子集和，在另一半里二分最接近 $\textit{target}$ 的补齐，并列时取较小成本。



每种类型的配料最多可以选两份，因此，我们可以复制一份配料，然后利用 `DFS` 枚举子集之和。在实现上，我们可以只枚举一半的配料的所有子集和，然后在另一半配料子集和中，利用二分查找找到最接近的配料。

时间复杂度 $O(n \times 2^m \times \log {2^m})$。

相似题目：

- [1755. 最接近目标值的子序列和](https://github.com/doocs/leetcode/blob/main/solution/1700-1799/1755.Closest%20Subsequence%20Sum/README.md)




#### Python3


```python
class Solution:
    def closestCost(
        self, baseCosts: List[int], toppingCosts: List[int], target: int
    ) -> int:
        def dfs(i, t):
            if i >= len(toppingCosts):
                arr.append(t)
                return
            dfs(i + 1, t)
            dfs(i + 1, t + toppingCosts[i])

        arr = []
        dfs(0, 0)
        arr.sort()
        d = ans = inf

        # 选择一种冰激淋基料
        for x in baseCosts:
            # 枚举子集和
            for y in arr:
                # 二分查找
                i = bisect_left(arr, target - x - y)
                for j in (i, i - 1):
                    if 0 <= j < len(arr):
                        t = abs(x + y + arr[j] - target)
                        if d > t or (d == t and ans > x + y + arr[j]):
                            d = t
                            ans = x + y + arr[j]
        return ans
```


#### JavaScript


```js
const closestCost = function (baseCosts, toppingCosts, target) {
    let closestDessertCost = -Infinity;
    function dfs(dessertCost, j) {
        const tarCurrDiff = Math.abs(target - dessertCost);
        const tarCloseDiff = Math.abs(target - closestDessertCost);
        if (tarCurrDiff < tarCloseDiff) {
            closestDessertCost = dessertCost;
        } else if (tarCurrDiff === tarCloseDiff && dessertCost < closestDessertCost) {
            closestDessertCost = dessertCost;
        }
        if (dessertCost > target) return;
        if (j === toppingCosts.length) return;
        for (let count = 0; count <= 2; count++) {
            dfs(dessertCost + count * toppingCosts[j], j + 1);
        }
    }
    for (let i = 0; i < baseCosts.length; i++) {
        dfs(baseCosts[i], 0);
    }
    return closestDessertCost;
};
```

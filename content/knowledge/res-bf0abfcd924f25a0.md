## 解法




### 方法一：哈希表 + 模拟



> **思考**
>
> 一笔交易无效当且仅当金额超过 $1000$，或同名不同城且时间差不超过 $60$。按姓名分组记录 $(\textit{time},\textit{city},\textit{index})$，新交易与同组已有记录比较即可标出双方。金额条件单独判定。 $n$ 不大，组内两两检查可接受。



遍历交易列表，对于每笔交易，如果金额大于 1000，或者同名且城市不同且时间间隔不超过 60 分钟，则将其加入答案。

具体地，我们使用哈希表 `d` 记录每个交易，其中键为交易名称，值为一个列表，列表中的每个元素为一个三元组 `(time, city, index)`，表示在 `time` 时刻在 `city` 城市进行了编号为 `index` 的交易。同时，我们使用哈希表 `idx` 记录答案中的交易编号。

遍历交易列表，对于每笔交易，我们首先将其加入哈希表 `d` 中，然后判断其金额是否大于 1000，如果是，则将其编号加入答案中。然后我们遍历哈希表 `d` 中的交易，如果交易名称相同且城市不同且时间间隔不超过 60 分钟，则将其编号加入答案中。

最后，我们遍历答案中的交易编号，将其对应的交易加入答案即可。

时间复杂度 $O(n^2)$，空间复杂度 $O(n)$。其中 $n$ 为交易列表的长度。




#### Python3


```python
class Solution:
    def invalidTransactions(self, transactions: List[str]) -> List[str]:
        d = defaultdict(list)
        idx = set()
        for i, x in enumerate(transactions):
            name, time, amount, city = x.split(",")
            time, amount = int(time), int(amount)
            d[name].append((time, city, i))
            if amount > 1000:
                idx.add(i)
            for t, c, j in d[name]:
                if c != city and abs(time - t) <= 60:
                    idx.add(i)
                    idx.add(j)
        return [transactions[i] for i in idx]
```

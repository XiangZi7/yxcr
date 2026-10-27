## 解法




### 方法一：哈希表 + 排序



> **思考**
>
> 点菜单给出的是零散三元组，输出却要求按桌号升序、菜名字典序排成二维表。 $n\le 5\times 10^4$，先聚合再排序即可，不必在读取时维护有序结构。
>
> 用哈希表按桌收集菜名，用集合记下全部菜品。菜名排序后作为表头，再按桌号遍历，对每桌计数并按表头填数量。



我们可以用一个哈希表 $\textit{tables}$ 来存储每张餐桌点的菜品，用一个集合 $\textit{items}$ 来存储所有的菜品。

遍历 $\textit{orders}$，将每张餐桌点的菜品存入 $\textit{tables}$ 和 $\textit{items}$ 中。

然后我们将 $\textit{items}$ 排序，得到 $\textit{sortedItems}$。

接下来，我们构建答案数组 $\textit{ans}$，首先将标题行 $\textit{header}$ 加入 $\textit{ans}$，然后遍历排序后的 $\textit{tables}$，对于每张餐桌，我们用一个计数器 $\textit{cnt}$ 来统计每种菜品的数量，然后构建一行 $\textit{row}$，将其加入 $\textit{ans}$。

最后返回 $\textit{ans}$。

时间复杂度 $O(n + m \times \log m + k \times \log k + m \times k)$，空间复杂度 $O(n + m + k)$。其中 $n$ 是数组 $\textit{orders}$ 的长度，而 $m$ 和 $k$ 分别表示菜品种类数和餐桌数。




#### Python3


```python
class Solution:
    def displayTable(self, orders: List[List[str]]) -> List[List[str]]:
        tables = defaultdict(list)
        items = set()
        for _, table, foodItem in orders:
            tables[int(table)].append(foodItem)
            items.add(foodItem)
        sorted_items = sorted(items)
        ans = [["Table"] + sorted_items]
        for table in sorted(tables):
            cnt = Counter(tables[table])
            row = [str(table)] + [str(cnt[item]) for item in sorted_items]
            ans.append(row)
        return ans
```


#### TypeScript


```ts
function displayTable(orders: string[][]): string[][] {
    const tables: Record<number, Record<string, number>> = {};
    const items: Set<string> = new Set();
    for (const [_, table, foodItem] of orders) {
        const t = +table;
        if (!tables[t]) {
            tables[t] = {};
        }
        if (!tables[t][foodItem]) {
            tables[t][foodItem] = 0;
        }
        tables[t][foodItem]++;
        items.add(foodItem);
    }
    const sortedItems = Array.from(items).sort();
    const ans: string[][] = [];
    const header: string[] = ['Table', ...sortedItems];
    ans.push(header);
    const sortedTableNumbers = Object.keys(tables)
        .map(Number)
        .sort((a, b) => a - b);
    for (const table of sortedTableNumbers) {
        const row: string[] = [table.toString()];
        for (const item of sortedItems) {
            row.push((tables[table][item] || 0).toString());
        }
        ans.push(row);
    }
    return ans;
}
```

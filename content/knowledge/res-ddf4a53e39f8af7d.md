## 解法




### 方法一：贪心 + 二分查找



> **思考**
>
> $n\le 10^5$，同一湖泊第二次下雨前必须抽干，否则洪水。晴天应留给「最近将再次下雨且尚未抽干」的湖，且抽干日必须在上次下雨之后。
>
> 有序集合保存晴天下标，哈希表记下每湖上次下雨日。再次下雨时在晴天中二分出第一次晚于该日的空档；没有则失败。未使用的晴天填 $1$。



我们将所有晴天都存入 $sunny$ 数组或者有序集合中，使用哈希表 $rainy$ 记录每个湖泊最近一次下雨的日期。初始化答案数组 $ans$ 每个元素为 $-1$。

接下来，我们遍历 $rains$ 数组。对于每个下雨的日期 $i$，如果 $rainy[rains[i]]$ 存在，说明该湖泊在之前下过雨，那么我们需要找到 $sunny$ 数组中第一个大于 $rainy[rains[i]]$ 的日期，将其替换为下雨的日期，否则说明无法阻止洪水，返回空数组。对于没下雨的日期 $i$，我们将 $i$ 存入 $sunny$ 数组中，并且将 $ans[i]$ 置为 $1$。

遍历结束，返回答案数组。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 为 $rains$ 数组的长度。




#### Python3


```python
class Solution:
    def avoidFlood(self, rains: List[int]) -> List[int]:
        n = len(rains)
        ans = [-1] * n
        sunny = SortedList()
        rainy = {}
        for i, v in enumerate(rains):
            if v:
                if v in rainy:
                    idx = sunny.bisect_right(rainy[v])
                    if idx == len(sunny):
                        return []
                    ans[sunny[idx]] = v
                    sunny.discard(sunny[idx])
                rainy[v] = i
            else:
                sunny.add(i)
                ans[i] = 1
        return ans
```


#### TypeScript


```ts
import { AvlTree } from 'datastructures-js';

function avoidFlood(rains: number[]): number[] {
    const n = rains.length;
    const ans = Array(n).fill(-1);
    const sunny = new AvlTree<number>((a, b) => a - b);
    const rainy = new Map<number, number>();

    for (let i = 0; i < n; ++i) {
        const v = rains[i];
        if (v > 0) {
            if (rainy.has(v)) {
                const last = rainy.get(v)!;
                const node = sunny.ceil(last + 1);
                if (!node) return [];
                const t = node.getValue();
                ans[t] = v;
                sunny.remove(t);
            }
            rainy.set(v, i);
        } else {
            sunny.insert(i);
            ans[i] = 1;
        }
    }
    return ans;
}
```

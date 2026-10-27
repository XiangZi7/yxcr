## 解法




### 方法一：贪心 + 排序 + 哈希表



> **思考**
>
> 子集大小不超过 $\textit{numWanted}$，同一标签至多 $\textit{useLimit}$ 次，要值和最大。应优先取数值大的项，并用计数卡住标签配额。 $n\le 2\times 10^4$，排序后线性挑选即可。
>
> 把 $(value,label)$ 按值降序，扫描时若该标签未达上限则选入，直到选满 $\textit{numWanted}$。
>
> 哈希表 $cnt$ 记录各标签已用次数。



根据题目描述，我们需要从 $n$ 个元素的集合中选出一个子集，子集元素个数不超过 $numWanted$，且子集中最多有相同标签的 $useLimit$ 项，使得子集的值之和最大。因此，我们应该贪心地选择集合中值较大的元素，同时记录每个标签出现的次数，当某个标签出现的次数达到 $useLimit$ 时，我们就不能再选择该标签对应的元素了。

具体地，我们先将集合中的元素按照值从大到小进行排序，然后从前向后遍历排序后的元素。在遍历的过程中，我们使用一个哈希表 $cnt$ 记录每个标签出现的次数，如果某个标签出现的次数达到了 $useLimit$，那么我们就跳过该元素，否则我们就将该元素的值加到最终的答案中，并将该标签出现的次数加 $1$。同时，我们用一个变量 $num$ 记录当前子集中的元素个数，当 $num$ 达到 $numWanted$ 时，我们就可以结束遍历了。

遍历结束后，我们就得到了最大的分数。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 是集合中的元素个数。




#### Python3


```python
class Solution:
    def largestValsFromLabels(
        self, values: List[int], labels: List[int], numWanted: int, useLimit: int
    ) -> int:
        ans = num = 0
        cnt = Counter()
        for v, l in sorted(zip(values, labels), reverse=True):
            if cnt[l] < useLimit:
                cnt[l] += 1
                num += 1
                ans += v
                if num == numWanted:
                    break
        return ans
```


#### TypeScript


```ts
function largestValsFromLabels(
    values: number[],
    labels: number[],
    numWanted: number,
    useLimit: number,
): number {
    const n = values.length;
    const pairs = new Array(n);
    for (let i = 0; i < n; ++i) {
        pairs[i] = [values[i], labels[i]];
    }
    pairs.sort((a, b) => b[0] - a[0]);
    const cnt: Map<number, number> = new Map();
    let ans = 0;
    for (let i = 0, num = 0; i < n && num < numWanted; ++i) {
        const [v, l] = pairs[i];
        if ((cnt.get(l) || 0) < useLimit) {
            cnt.set(l, (cnt.get(l) || 0) + 1);
            ++num;
            ans += v;
        }
    }
    return ans;
}
```

## 解法




### 方法一：排序



> **思考**
>
> 名次由分数从高到低决定，前三名要换成奖牌字符串。直接对分数排序会丢失下标，无法写回原顺序。
>
> 为此对下标按分数降序排序，再按排名填入对应位置：前三名用固定奖牌，其余写成名次数字。一次排序即可同时得到名次与原下标。



我们使用一个数组 $\textit{idx}$ 存储 $0$ 到 $n-1$ 的下标，然后对 $\textit{idx}$ 进行排序，排序规则为：按照 $\textit{score}$ 的值从大到小排序。

然后我们定义一个数组 $\textit{top3} = [\text{Gold Medal}, \text{Silver Medal}, \text{Bronze Medal}]$，遍历 $\textit{idx}$，对于每个下标 $j$，如果 $j$ 小于 $3$，则 $\textit{ans}[j]$ 为 $\textit{top3}[j]$，否则为 $j+1$。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 为数组 $\textit{score}$ 的长度。




#### Python3


```python
class Solution:
    def findRelativeRanks(self, score: List[int]) -> List[str]:
        n = len(score)
        idx = list(range(n))
        idx.sort(key=lambda x: -score[x])
        top3 = ["Gold Medal", "Silver Medal", "Bronze Medal"]
        ans = [None] * n
        for i, j in enumerate(idx):
            ans[j] = top3[i] if i < 3 else str(i + 1)
        return ans
```


#### TypeScript


```ts
function findRelativeRanks(score: number[]): string[] {
    const n = score.length;
    const idx = Array.from({ length: n }, (_, i) => i);
    idx.sort((a, b) => score[b] - score[a]);
    const top3 = ['Gold Medal', 'Silver Medal', 'Bronze Medal'];
    const ans: string[] = Array(n);
    for (let i = 0; i < n; i++) {
        if (i < 3) {
            ans[idx[i]] = top3[i];
        } else {
            ans[idx[i]] = (i + 1).toString();
        }
    }
    return ans;
}
```

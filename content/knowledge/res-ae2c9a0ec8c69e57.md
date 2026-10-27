## 解法




### 方法一：哈希表 + 排序



> **思考**
>
> 要频率最高的 $k$ 个词，频率相同按字典序。堆可以 $O(n\log k)$，词数不大时全排序更直接。
>
> 计数后按 $(-次数, 单词)$ 排序，取前 $k$ 个键。



我们可以用一个哈希表 $\textit{cnt}$ 记录每一个单词出现的次数，然后对哈希表中的键值对按照值进行排序，如果值相同，按照键进行排序。

最后取出前 $k$ 个键即可。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 为单词的个数。




#### Python3


```python
class Solution:
    def topKFrequent(self, words: List[str], k: int) -> List[str]:
        cnt = Counter(words)
        return sorted(cnt, key=lambda x: (-cnt[x], x))[:k]
```


#### TypeScript


```ts
function topKFrequent(words: string[], k: number): string[] {
    const cnt: Map<string, number> = new Map();
    for (const w of words) {
        cnt.set(w, (cnt.get(w) || 0) + 1);
    }
    const ans: string[] = Array.from(cnt.keys());
    ans.sort((a, b) => {
        return cnt.get(a) === cnt.get(b) ? a.localeCompare(b) : cnt.get(b)! - cnt.get(a)!;
    });
    return ans.slice(0, k);
}
```

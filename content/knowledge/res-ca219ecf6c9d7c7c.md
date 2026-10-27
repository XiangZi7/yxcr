## 解法




### 方法一：哈希表



> **思考**
>
> 只在一句中出现一次、且另一句中不出现的单词。句子很短，合并计数后筛出频次为 $1$ 的词即可。
>
> 两句拆词后加到同一个计数器，值为 $1$ 的键即答案。



根据题目描述，只要单词出现一次，就符合题目要求。因此，我们用哈希表 $cnt$ 记录所有单词以及出现的次数。

然后遍历哈希表，取出所有出现次数为 $1$ 的字符串即可。

时间复杂度 $O(m + n)$，空间复杂度 $O(m + n)$。其中 $m$ 和 $n$ 分别是字符串 $s1$ 和 $s2$ 的长度。




#### Python3


```python
class Solution:
    def uncommonFromSentences(self, s1: str, s2: str) -> List[str]:
        cnt = Counter(s1.split()) + Counter(s2.split())
        return [s for s, v in cnt.items() if v == 1]
```


#### TypeScript


```ts
function uncommonFromSentences(s1: string, s2: string): string[] {
    const cnt: Map<string, number> = new Map();
    for (const s of [...s1.split(' '), ...s2.split(' ')]) {
        cnt.set(s, (cnt.get(s) || 0) + 1);
    }
    const ans: Array<string> = [];
    for (const [s, v] of cnt.entries()) {
        if (v == 1) {
            ans.push(s);
        }
    }
    return ans;
}
```

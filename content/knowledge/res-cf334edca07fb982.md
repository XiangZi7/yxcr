## 解法




### 方法一：二进制枚举



> **思考**
>
> 单词至多 $14$ 个，子集 $2^{14}$ 可枚举。一组单词合法当且仅当所用字母不超过 $letters$ 的存量。
>
> 先统计字母表，再对每个非空掩码拼接被选单词并核对计数，合法则按 $score$ 计分取最大。二进制枚举穷尽选择，计数比较落实字母约束。



我们注意到题目的数据范围不大，因此对于给定的单词表，我们可以使用二进制枚举的方法，枚举出所有的单词组合，然后判断每个单词组合是否满足题目要求，如果满足则计算其得分，最后取得分最大的单词组合。

我们首先用哈希表或数组 $cnt$ 记录字母表 $letters$ 中每个字母出现的次数。

接下来，我们使用二进制枚举的方法，枚举出所有的单词组合。二进制的每一位表示单词表中的每一个单词是否被选中，如果第 $i$ 位为 $1$，则表示第 $i$ 个单词被选中，否则表示第 $i$ 个单词没有被选中。

然后我们统计当前单词组合中每个字母出现的次数，记录在哈希表或数组 $cur$ 中。如果 $cur$ 中的每个字母的出现次数都不大于 $cnt$ 中的对应字母的出现次数，则说明当前单词组合满足题目要求，我们计算当前单词组合的得分，取得分最大的单词组合。

时间复杂度 $O(2^n \times n \times M)$，空间复杂度 $O(C)$。其中 $n$ 和 $M$ 分别为单词集合中单词的个数和单词的最大长度；而 $C$ 为字母表中字母的个数，本题中 $C=26$。




#### Python3


```python
class Solution:
    def maxScoreWords(
        self, words: List[str], letters: List[str], score: List[int]
    ) -> int:
        cnt = Counter(letters)
        n = len(words)
        ans = 0
        for i in range(1 << n):
            cur = Counter(''.join([words[j] for j in range(n) if i >> j & 1]))
            if all(v <= cnt[c] for c, v in cur.items()):
                t = sum(v * score[ord(c) - ord('a')] for c, v in cur.items())
                ans = max(ans, t)
        return ans
```

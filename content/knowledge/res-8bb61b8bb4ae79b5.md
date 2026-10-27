## 解法




### 方法一：分桶



> **思考**
>
> $s$ 长 $5\times 10^4$，对每个词在 $s$ 上双指针可能反复扫 $s$。把词按「下一个待匹配字母」分到 $26$ 个桶，扫 $s$ 时只推进当前字母的桶。
>
> 词匹配完则计数，否则把剩余后缀丢进新首字母的桶。每个词的每个字符只处理一次。



题目中字符串 $s$ 的数据规模最高达到 $5 \times 10^4$，如果暴力枚举 $words$ 中的每个字符串 $w$，判断其是否为 $s$ 的子序列，很有可能会超时。

我们不妨将 $words$ 中的所有单词根据首字母来分桶，即：把所有单词按照首字母分到 $26$ 个桶中，每个桶中存储的是所有以该字母开头的所有单词。

比如对于 `words = ["a", "bb", "acd", "ace"]`，我们得到以下的分桶结果：

```text
a: ["a", "acd", "ace"]
b: ["bb"]
```

然后我们从 $s$ 的第一个字符开始遍历，假设当前字符为 `'a'`，我们从 `'a'` 开头的桶中取出所有单词。对于取出的每个单词，如果此时单词长度为 $1$，说明该单词已经匹配完毕，我们将答案加 $1$；否则我们将单词的首字母去掉，然后放入下一个字母开头的桶中，比如对于单词 `"acd"`，去掉首字母 `'a'` 后，我们将其放入 `'c'` 开头的桶中。这一轮结束后，分桶结果变为：

```text
c: ["cd", "ce"]
b: ["bb"]
```

遍历完 $s$ 后，我们就得到了答案。

实际上，每个桶可以只存储单词的下标 $i$ 以及该单词当前匹配到的位置 $j$，这样可以节省空间。

时间复杂度 $O(n + \sum_{i=0}^{m-1} |w_i|)$，空间复杂度 $O(m)$。其中 $n$ 和 $m$ 分别为 $s$ 和 $words$ 的长度，而 $|w_i|$ 为 $words[i]$ 的长度。




#### Python3


```python
class Solution:
    def numMatchingSubseq(self, s: str, words: List[str]) -> int:
        d = defaultdict(deque)
        for w in words:
            d[w[0]].append(w)
        ans = 0
        for c in s:
            for _ in range(len(d[c])):
                t = d[c].popleft()
                if len(t) == 1:
                    ans += 1
                else:
                    d[t[1]].append(t[1:])
        return ans
```


### 方法二：分桶（下标指针）



> **思考**
>
> 方法一切片后缀会产生新串。改为存 $(词下标,已匹配长度)$，语义相同、少分配。



按当前待匹配字符把单词下标放进队列，扫 $s$ 时推进指针。




#### Python3


```python
class Solution:
    def numMatchingSubseq(self, s: str, words: List[str]) -> int:
        d = defaultdict(deque)
        for i, w in enumerate(words):
            d[w[0]].append((i, 0))
        ans = 0
        for c in s:
            for _ in range(len(d[c])):
                i, j = d[c].popleft()
                j += 1
                if j == len(words[i]):
                    ans += 1
                else:
                    d[words[i][j]].append((i, j))
        return ans
```


### 方法三：二分查找



> **思考**
>
> 分桶要同时挂起所有词。也可预处理 $s$ 中每个字母的下标列表，对每个词在列表上二分找下一个更大下标。
>
> 单次判断 $O(|w|\log n)$，实现更简单，不必维护队列。



先用数组或哈希表 $d$ 存放字符串 $s$ 每个字符的下标，即 $d[c]$ 为 $s$ 中所有字符 $c$ 的下标组成的数组。

然后我们遍历 $words$ 中的每个单词 $w$，通过二分查找判断 $w$ 是否为 $s$ 的子序列，是则答案加 $1$。判断逻辑如下：

1. 定义指针 $i$ 表示当前指向字符串 $s$ 的第 $i$ 个字符，初始化为 $-1$。
1. 遍历字符串 $w$ 中的每个字符 $c$，在 $d[c]$ 中二分查找第一个大于 $i$ 的位置 $j$，如果不存在，则说明 $w$ 不是 $s$ 的子序列，直接跳出循环；否则，将 $i$ 更新为 $d[c][j]$，继续遍历下一个字符。
1. 如果遍历完 $w$ 中的所有字符，说明 $w$ 是 $s$ 的子序列。

时间复杂度 $O(\sum_{i=0}^{m-1} |w_i| \times \log n)$，空间复杂度 $O(m)$。其中 $n$ 和 $m$ 分别为 $s$ 和 $words$ 的长度，而 $|w_i|$ 为 $words[i]$ 的长度。




#### Python3


```python
class Solution:
    def numMatchingSubseq(self, s: str, words: List[str]) -> int:
        def check(w):
            i = -1
            for c in w:
                j = bisect_right(d[c], i)
                if j == len(d[c]):
                    return False
                i = d[c][j]
            return True

        d = defaultdict(list)
        for i, c in enumerate(s):
            d[c].append(i)
        return sum(check(w) for w in words)
```

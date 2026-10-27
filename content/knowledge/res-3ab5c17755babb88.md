## 解法




### 方法一：计数



> **思考**
>
> `balloon` 各字母需求为 $b,a,l\times 2,o\times 2,n$。统计 `text` 频次后把 $l$、 $o$ 折半，再在 $b,a,l,o,n$ 上取最小，即最多能拼出的单词数。不必反复从串中删除。



我们统计字符串 `text` 中每个字母出现的次数，然后将其中字母 `'o'` 和 `'l'` 的出现次数分别除以 2，这是因为单词 `balloon` 中字母 `'o'` 和 `'l'` 都出现了 2 次。

接着，我们遍历单词 `balon` 中的每个字母，统计每个字母在字符串 `text` 中出现的次数的最小值，这个最小值就是单词 `balloon` 在字符串 `text` 中出现的最大次数。

时间复杂度 $O(n)$，空间复杂度 $O(C)$。其中 $n$ 为字符串 `text` 的长度；而 $C$ 为字符集大小，本题中 $C = 26$。




#### Python3


```python
class Solution:
    def maxNumberOfBalloons(self, text: str) -> int:
        cnt = Counter(text)
        cnt['o'] >>= 1
        cnt['l'] >>= 1
        return min(cnt[c] for c in 'balon')
```


#### TypeScript


```ts
function maxNumberOfBalloons(text: string): number {
    const cnt = new Array(26).fill(0);
    for (const c of text) {
        cnt[c.charCodeAt(0) - 97]++;
    }
    return Math.min(cnt[0], cnt[1], cnt[11] >> 1, cnt[14] >> 1, cnt[13]);
}
```

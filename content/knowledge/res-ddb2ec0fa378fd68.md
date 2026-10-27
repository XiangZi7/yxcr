## 解法




### 方法一：计数



> **思考**
>
> 单词需覆盖车牌中的字母（忽略大小写与非字母），并在满足条件者中取最短、先出现的。词数 $1000$、词长短，计数比较即可。
>
> 先统计车牌字母频次，再扫单词：更长或同样长的跳过（以保留更早的最短词），再用计数判断是否覆盖。
>
> 字母表大小为 $26$，单次判断线性于词长。



我们先用哈希表或者一个长度为 $26$ 的数组 $cnt$ 统计字符串 `licensePlate` 中每个字母出现的次数，注意这里我们统一将字母转换为小写进行计数。

然后，我们遍历数组 `words` 中的每个单词 $w$，如果单词 $w$ 的长度比答案 $ans$ 的长度长，那么我们直接跳过该单词。否则，我们再用哈希表或者一个长度为 $26$ 的数组 $t$ 统计单词 $w$ 中每个字母出现的次数。如果对于任意一个字母， $t$ 中该字母出现的次数小于 $cnt$ 中该字母出现的次数，那么我们也可以直接跳过该单词。否则，我们就找到了一个满足条件的单词，我们更新答案 $ans$ 为当前单词 $w$。

时间复杂度 $O(n \times |\Sigma|)$，空间复杂度 $O(|\Sigma|)$，其中 $n$ 是数组 `words` 的长度，而 $\Sigma$ 是字符集，这里字符集为所有小写字母，因此 $|\Sigma| = 26$。




#### Python3


```python
class Solution:
    def shortestCompletingWord(self, licensePlate: str, words: List[str]) -> str:
        cnt = Counter(c.lower() for c in licensePlate if c.isalpha())
        ans = None
        for w in words:
            if ans and len(w) >= len(ans):
                continue
            t = Counter(w)
            if all(v <= t[c] for c, v in cnt.items()):
                ans = w
        return ans
```


#### TypeScript


```ts
function shortestCompletingWord(licensePlate: string, words: string[]): string {
    const cnt: number[] = Array(26).fill(0);
    for (const c of licensePlate) {
        const i = c.toLowerCase().charCodeAt(0) - 97;
        if (0 <= i && i < 26) {
            ++cnt[i];
        }
    }
    let ans = '';
    for (const w of words) {
        if (ans.length && ans.length <= w.length) {
            continue;
        }
        const t = Array(26).fill(0);
        for (const c of w) {
            ++t[c.charCodeAt(0) - 97];
        }
        let ok = true;
        for (let i = 0; i < 26; ++i) {
            if (t[i] < cnt[i]) {
                ok = false;
                break;
            }
        }
        if (ok) {
            ans = w;
        }
    }
    return ans;
}
```

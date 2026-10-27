## 解法




### 方法一：计算每个字符的贡献



> **思考**
>
> 子串数量达 $O(n^2)$， $n\le 10^5$ 时不能枚举。一个字符在某个子串中「唯一」当且仅当该子串覆盖它、且不覆盖同字母的相邻两次出现。
>
> 对每种字母记下出现下标，两端补哨兵。第 $i$ 次出现可与左侧空档、右侧空档独立组合，贡献为相邻间隔之积。对所有字母求和。



对于字符串 $s$ 的每个字符 $c_i$，当它在某个子字符串中仅出现一次时，它会对这个子字符串统计唯一字符时有贡献。

因此，我们只需要对每个字符 $c_i$，计算有多少子字符串仅包含该字符一次即可。

我们用一个哈希表或者长度为 $26$ 的数组 $d$，按照下标顺序存储每个字符在 $s$ 中所有出现的位置。

对于每个字符 $c_i$，我们遍历 $d[c_i]$ 中的每个位置 $p$，找出左侧相邻的位置 $l$ 和右侧相邻的位置 $r$，那么从位置 $p$ 向左右两边扩散，满足要求的子字符串的数量就是 $(p - l) \times (r - p)$。我们对每个字符都进行这样的操作，累加所有字符的贡献，即可得到答案。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串 $s$ 的长度。




#### Python3


```python
class Solution:
    def uniqueLetterString(self, s: str) -> int:
        d = defaultdict(list)
        for i, c in enumerate(s):
            d[c].append(i)
        ans = 0
        for v in d.values():
            v = [-1] + v + [len(s)]
            for i in range(1, len(v) - 1):
                ans += (v[i] - v[i - 1]) * (v[i + 1] - v[i])
        return ans
```


#### TypeScript


```ts
function uniqueLetterString(s: string): number {
    const d: number[][] = Array.from({ length: 26 }, () => [-1]);
    for (let i = 0; i < s.length; ++i) {
        d[s.charCodeAt(i) - 'A'.charCodeAt(0)].push(i);
    }
    let ans = 0;
    for (const v of d) {
        v.push(s.length);

        for (let i = 1; i < v.length - 1; ++i) {
            ans += (v[i] - v[i - 1]) * (v[i + 1] - v[i]);
        }
    }
    return ans;
}
```

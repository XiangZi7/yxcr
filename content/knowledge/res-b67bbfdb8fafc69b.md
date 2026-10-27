## 解法




### 方法一：两次遍历



> **思考**
>
> 对每个位置求到最近字符 $c$ 的距离。若对每个下标向两侧扫描， $n\le 10^4$ 时平方级偏慢。注意到最近的 $c$ 只可能来自左侧或右侧。
>
> 从左向右记录最近的 $c$ 下标，再从右向左扫一遍取更近者。两遍线性扫描即可填满答案数组。



我们先创建一个长度为 $n$ 的答案数组 $ans$。

接下来，我们从左到右遍历字符串 $s$，记录最近出现的字符 $c$ 的位置 $pre$，那么对于位置 $i$，答案就是 $i - pre$，即 $ans[i] = i - pre$。

然后，我们从右到左遍历字符串 $s$，记录最近出现的字符 $c$ 的位置 $suf$，那么对于位置 $i$，答案就是 $suf - i$，即 $ans[i] = \min(ans[i], suf - i)$。

最后返回答案数组 $ans$ 即可。

时间复杂度 $O(n)$，其中 $n$ 是字符串 $s$ 的长度。忽略答案数组的空间消耗，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def shortestToChar(self, s: str, c: str) -> List[int]:
        n = len(s)
        ans = [n] * n
        pre = -inf
        for i, ch in enumerate(s):
            if ch == c:
                pre = i
            ans[i] = min(ans[i], i - pre)
        suf = inf
        for i in range(n - 1, -1, -1):
            if s[i] == c:
                suf = i
            ans[i] = min(ans[i], suf - i)
        return ans
```


#### TypeScript


```ts
function shortestToChar(s: string, c: string): number[] {
    const n = s.length;
    const inf = 1 << 30;
    const ans: number[] = new Array(n).fill(inf);
    for (let i = 0, pre = -inf; i < n; ++i) {
        if (s[i] === c) {
            pre = i;
        }
        ans[i] = i - pre;
    }
    for (let i = n - 1, suf = inf; i >= 0; --i) {
        if (s[i] === c) {
            suf = i;
        }
        ans[i] = Math.min(ans[i], suf - i);
    }
    return ans;
}
```

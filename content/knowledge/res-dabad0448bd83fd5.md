## 解法




### 方法一：模拟



> **思考**
>
> 多组替换同时生效，且只有 $\textit{source}$ 与 $s$ 在给定下标精确匹配才替换。从左扫描时若立即改写，后续下标会错位。
>
> 先在原串下标上标记哪些位置匹配成功，再从左到右拼接：命中则写入 $\textit{target}$ 并跳过 $\textit{source}$ 长度，否则抄原字符。



我们遍历每个替换操作，对于当前第 $k$ 个替换操作 $(i, \text{src})$，如果 $s[i..i+|\text{src}|-1]$ 与 $\text{src}$ 相等，此时我们记录下标 $i$ 处需要替换的是 $\text{targets}$ 的第 $k$ 个字符串，否则不需要替换。

接下来，我们只需要遍历原字符串 $s$，根据记录的信息进行替换即可。

时间复杂度 $O(L)$，空间复杂度 $O(n)$。其中 $L$ 是所有字符串的长度之和，而 $n$ 是字符串 $s$ 的长度。




#### Python3


```python
class Solution:
    def findReplaceString(
        self, s: str, indices: List[int], sources: List[str], targets: List[str]
    ) -> str:
        n = len(s)
        d = [-1] * n
        for k, (i, src) in enumerate(zip(indices, sources)):
            if s.startswith(src, i):
                d[i] = k
        ans = []
        i = 0
        while i < n:
            if ~d[i]:
                ans.append(targets[d[i]])
                i += len(sources[d[i]])
            else:
                ans.append(s[i])
                i += 1
        return "".join(ans)
```


#### TypeScript


```ts
function findReplaceString(
    s: string,
    indices: number[],
    sources: string[],
    targets: string[],
): string {
    const n = s.length;
    const d: number[] = Array(n).fill(-1);
    for (let k = 0; k < indices.length; ++k) {
        const [i, src] = [indices[k], sources[k]];
        if (s.startsWith(src, i)) {
            d[i] = k;
        }
    }
    const ans: string[] = [];
    for (let i = 0; i < n;) {
        if (d[i] >= 0) {
            ans.push(targets[d[i]]);
            i += sources[d[i]].length;
        } else {
            ans.push(s[i++]);
        }
    }
    return ans.join('');
}
```

## 解法




### 方法一：模拟



> **思考**
>
> 字母宽度已知、每行宽度固定为 $100$，需要模拟书写过程得到行数与最后一行占用宽度。字符串长度有限，按字母依次累加即可。
>
> 若当前行剩余宽度放不下该字母，则换行并把该字母作为新行的起始宽度。最后返回行数与最后一行的宽度。



我们定义两个变量 `lines` 和 `last`，分别表示行数和最后一行的宽度，初始时 `lines = 1`，`last = 0`。

遍历字符串 $s$，对于每个字符 $c$，计算其宽度 $w$，如果 $last + w \leq 100$，则将 $w$ 加到 `last` 上，否则行数 `lines` 加一，并且 `last` 重置为 $w$。

最后返回 `lines` 和 `last` 构成的数组。

时间复杂度 $O(n)$，其中 $n$ 为字符串 $s$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def numberOfLines(self, widths: List[int], s: str) -> List[int]:
        lines, last = 1, 0
        for w in map(lambda c: widths[ord(c) - ord("a")], s):
            if last + w <= 100:
                last += w
            else:
                lines += 1
                last = w
        return [lines, last]
```


#### TypeScript


```ts
function numberOfLines(widths: number[], s: string): number[] {
    let [lines, last] = [1, 0];
    for (const c of s) {
        const w = widths[c.charCodeAt(0) - 'a'.charCodeAt(0)];
        if (last + w <= 100) {
            last += w;
        } else {
            ++lines;
            last = w;
        }
    }
    return [lines, last];
}
```

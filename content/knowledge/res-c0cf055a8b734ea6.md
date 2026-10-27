## 解法




### 方法一：动态规划



> **思考**
>
> 每本书可单独开一层，或与前面若干本同层，决策随层划分指数增长。 $n\le 1000$，可用 $O(n^2)$ 动态规划。
>
> 令 $f[i]$ 为摆放前 $i$ 本书的最小总高度。最后一层以 $books[i-1]$ 结尾，自后向前扩张同层书籍并累加宽度，一旦超过 $shelfWidth$ 即可停止；层高取这些书的最大高度，再接上 $f[j-1]$。从后往前枚举同时保证宽度单调增加。



我们定义 $f[i]$ 表示前 $i$ 本书摆放的最小高度，初始时 $f[0] = 0$，答案为 $f[n]$。

考虑 $f[i]$，最后一本书为 $books[i - 1]$，其厚度为 $w$，高度为 $h$。

- 如果这本书单独摆放在新的一层，那么有 $f[i] = f[i - 1] + h$；
- 如果这本书可以与前面的最后几本书摆放在同一层，我们从后往前枚举同一层的第一本书 $boos[j-1]$，其中 $j \in [1, i - 1]$，将书的厚度累积到 $w$，如果 $w \gt shelfWidth$，说明此时的 $books[j-1]$ 已经无法与 $books[i-1]$ 摆放在同一层，停止枚举；否则我们更新当前层的最大高度 $h = \max(h, books[j-1][1])$，那么此时有 $f[i] = \min(f[i], f[j - 1] + h)$。

最终的答案即为 $f[n]$。

时间复杂度 $O(n^2)$，空间复杂度 $O(n)$。其中 $n$ 为数组 $books$ 的长度。




#### Python3


```python
class Solution:
    def minHeightShelves(self, books: List[List[int]], shelfWidth: int) -> int:
        n = len(books)
        f = [0] * (n + 1)
        for i, (w, h) in enumerate(books, 1):
            f[i] = f[i - 1] + h
            for j in range(i - 1, 0, -1):
                w += books[j - 1][0]
                if w > shelfWidth:
                    break
                h = max(h, books[j - 1][1])
                f[i] = min(f[i], f[j - 1] + h)
        return f[n]
```


#### TypeScript


```ts
function minHeightShelves(books: number[][], shelfWidth: number): number {
    const n = books.length;
    const f = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; ++i) {
        let [w, h] = books[i - 1];
        f[i] = f[i - 1] + h;
        for (let j = i - 1; j > 0; --j) {
            w += books[j - 1][0];
            if (w > shelfWidth) {
                break;
            }
            h = Math.max(h, books[j - 1][1]);
            f[i] = Math.min(f[i], f[j - 1] + h);
        }
    }
    return f[n];
}
```

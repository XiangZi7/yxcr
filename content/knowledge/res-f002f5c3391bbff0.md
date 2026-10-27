## 解法




### 方法一：贪心



> **思考**
>
> 操作是翻转某个后缀，要把全 $0$ 变成 $target$。 $n\le 10^5$，不能对每个后缀模拟。当前缀已经与 $target$ 一致时，下一次翻转只应发生在下一个与当前状态不同的位置。
>
> 从左到右扫描：翻转次数的奇偶决定该位当前值。若与 $target[i]$ 不同，必须在 $i$ 处再翻一次后缀。这样每次翻转都修正在此之前无法改写的最左错误位，次数最少。



我们从左到右遍历字符串 $\textit{target}$，用变量 $\textit{ans}$ 记录翻转次数。 当遍历到下标 $i$ 时，如果当前的翻转次数 $\textit{ans}$ 的奇偶性与 $\textit{target}[i]$ 不同，则需要在下标 $i$ 处进行一次翻转操作，将 $\textit{ans}$ 加 $1$。

时间复杂度 $O(n)$，其中 $n$ 是字符串的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def minFlips(self, target: str) -> int:
        ans = 0
        for v in target:
            if (ans & 1) ^ int(v):
                ans += 1
        return ans
```


#### TypeScript


```ts
function minFlips(target: string): number {
    let ans = 0;
    for (const c of target) {
        if (ans % 2 !== +c) {
            ++ans;
        }
    }
    return ans;
}
```

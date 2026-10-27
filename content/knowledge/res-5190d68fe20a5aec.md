## 解法




### 方法一：自定义排序



> **思考**
>
> 区间 $[lo,hi]$ 按「变成 $1$ 的步数」排序，步数相同按数值，取第 $k$ 个。区间长度不超过 $1000$，直接对每个数模拟 Collatz 步数即可；记忆化避免重复计算。自定义键 $f$ 后取下标 $k-1$。



我们先定义一个函数 $\textit{f}(x)$，表示将数字 $x$ 变成 $1$ 所需要的步数，也即是数字 $x$ 的权重。

然后我们将区间 $[\textit{lo}, \textit{hi}]$ 内的所有数字按照权重升序排序，如果权重相同，按照数字自身的数值升序排序。

最后返回排序后的第 $k$ 个数字。

时间复杂度 $O(n \times \log n \times M)$，空间复杂度 $O(n)$。其中 $n$ 是区间 $[\textit{lo}, \textit{hi}]$ 内的数字个数，而 $M$ 是 $f(x)$ 的最大值，本题中 $M$ 最大为 $178$。




#### Python3


```python
@cache
def f(x: int) -> int:
    ans = 0
    while x != 1:
        if x % 2 == 0:
            x //= 2
        else:
            x = 3 * x + 1
        ans += 1
    return ans


class Solution:
    def getKth(self, lo: int, hi: int, k: int) -> int:
        return sorted(range(lo, hi + 1), key=f)[k - 1]
```


#### TypeScript


```ts
function getKth(lo: number, hi: number, k: number): number {
    const f = (x: number): number => {
        let ans = 0;
        for (; x !== 1; ++ans) {
            if (x % 2 === 0) {
                x >>= 1;
            } else {
                x = x * 3 + 1;
            }
        }
        return ans;
    };
    const nums = new Array(hi - lo + 1).fill(0).map((_, i) => i + lo);
    nums.sort((a, b) => {
        const fa = f(a),
            fb = f(b);
        return fa === fb ? a - b : fa - fb;
    });
    return nums[k - 1];
}
```

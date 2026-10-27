## 解法




### 方法一：统计余数



> **思考**
>
> 两数之和能被 $k$ 整除当且仅当余数之和为 $0$ 或 $k$。 $n\le 10^5$，统计 $x\bmod k$ 的频次：余数 $0$ 必须成对，其余 $i$ 与 $k-i$ 个数须相等（ $k$ 为偶数时 $k/2$ 亦须成对，等式同样覆盖）。



两个数 $a$ 和 $b$ 的和能被 $k$ 整除，当且仅当这两个数分别对 $k$ 取模的结果之和能被 $k$ 整除。

因此，我们可以统计数组中每个数对 $k$ 取模的结果，即余数，记录在数组 $\textit{cnt}$ 中。然后我们遍历数组 $\textit{cnt}$，对于范围在 $[1,..k-1]$ 的每个数 $i$，如果 $\textit{cnt}[i]$ 和 $\textit{cnt}[k-i]$ 的值不相等，说明无法将数组中的数字分为 $n/2$ 对，使得每对数字的和都能被 $k$ 整除。如果 $\textit{cnt}[0]$ 的值不是偶数，也说明无法将数组中的数字分为 $n/2$ 对，使得每对数字的和都能被 $k$ 整除。

时间复杂度 $O(n)$，其中 $n$ 为数组 $\textit{arr}$ 的长度。空间复杂度 $O(k)$。




#### Python3


```python
class Solution:
    def canArrange(self, arr: List[int], k: int) -> bool:
        cnt = Counter(x % k for x in arr)
        return cnt[0] % 2 == 0 and all(cnt[i] == cnt[k - i] for i in range(1, k))
```


#### TypeScript


```ts
function canArrange(arr: number[], k: number): boolean {
    const cnt: number[] = Array(k).fill(0);
    for (const x of arr) {
        ++cnt[((x % k) + k) % k];
    }
    for (let i = 1; i < k; ++i) {
        if (cnt[i] !== cnt[k - i]) {
            return false;
        }
    }
    return cnt[0] % 2 === 0;
}
```

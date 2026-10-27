## 解法




### 方法一：遍历求和



> **思考**
>
> 枚举两处切割点使三段和相等需要 $O(n^2)$，数组长度通常达 $10^4$ 量级，应当避免双重扫描。三段相等当且仅当总和能被 $3$ 整除，且存在至少三段各自累加到 $s=\textit{sum}/3$。
>
> 从左到右累加，每达到一次 $s$ 就重置并计数。多出来的段可以并入最后一部分，因此计数不少于 $3$ 即可，而不必恰好切在两个固定下标。
>
> 先判断总和模 $3$，再用一次遍历维护当前段和与段数。



我们先求出整个数组的和，然后判断和是否能被 3 整除，如果不能，直接返回 $\textit{false}$。

否则，我们记 $\textit{s}$ 表示每部分的和，用一个变量 $\textit{cnt}$ 记录当前已经找到的部分数，另一个变量 $\textit{t}$ 记录当前部分的和。初始时 $\textit{cnt} = 0$, $t = 0$。

然后我们遍历数组，对于每个元素 $x$，我们将 $t$ 加上 $x$，如果 $t$ 等于 $s$，说明找到了一部分，将 $\textit{cnt}$ 加一，然后将 $t$ 置为 0。

最后判断 $\textit{cnt}$ 是否大于等于 3 即可。

时间复杂度 $O(n)$，其中 $n$ 是数组 $\textit{arr}$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def canThreePartsEqualSum(self, arr: List[int]) -> bool:
        s, mod = divmod(sum(arr), 3)
        if mod:
            return False
        cnt = t = 0
        for x in arr:
            t += x
            if t == s:
                cnt += 1
                t = 0
        return cnt >= 3
```


#### TypeScript


```ts
function canThreePartsEqualSum(arr: number[]): boolean {
    let s = arr.reduce((a, b) => a + b);
    if (s % 3) {
        return false;
    }
    s = (s / 3) | 0;
    let [cnt, t] = [0, 0];
    for (const x of arr) {
        t += x;
        if (t == s) {
            cnt++;
            t = 0;
        }
    }
    return cnt >= 3;
}
```

## 解法




### 方法一：前缀和 + 计数器



> **思考**
>
> 统计子数组和为奇数的个数。子数组有 $O(n^2)$ 个， $n\le 10^5$，直接求和不可行。子数组和的奇偶等于两端前缀和之差的奇偶。
>
> 前缀和为奇当且仅当此前偶数前缀的个数可与之配对（奇减偶为奇），偶前缀则与已有奇前缀配对。扫描时维护奇、偶前缀计数，每走一步按当前前缀奇偶累加配对并更新计数，最后对 $10^9+7$ 取模。



我们定义一个长度为 $2$ 的数组 $\textit{cnt}$ 作为计数器，其中 $\textit{cnt}[0]$ 和 $\textit{cnt}[1]$ 分别表示前缀和为偶数和奇数的子数组的个数。初始时 $\textit{cnt}[0] = 1$，而 $\textit{cnt}[1] = 0$。

接下来，我们维护当前的前缀和 $s$，初始时 $s = 0$。

遍历数组 $\textit{arr}$，对于遍历到的每个元素 $x$，我们将 $s$ 的值加上 $x$，然后根据 $s$ 的奇偶性，将 $\textit{cnt}[s \mod 2 \oplus 1]$ 的值累加到答案中，然后我们将 $\textit{cnt}[s \mod 2]$ 的值加 $1$。

遍历结束后，我们即可得到答案。注意答案的取模运算。

时间复杂度 $O(n)$，其中 $n$ 为数组 $\textit{arr}$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def numOfSubarrays(self, arr: List[int]) -> int:
        mod = 10**9 + 7
        cnt = [1, 0]
        ans = s = 0
        for x in arr:
            s += x
            ans = (ans + cnt[s & 1 ^ 1]) % mod
            cnt[s & 1] += 1
        return ans
```


#### TypeScript


```ts
function numOfSubarrays(arr: number[]): number {
    let ans = 0;
    let s = 0;
    const cnt: number[] = [1, 0];
    const mod = 1e9 + 7;
    for (const x of arr) {
        s += x;
        ans = (ans + cnt[(s & 1) ^ 1]) % mod;
        cnt[s & 1]++;
    }
    return ans;
}
```

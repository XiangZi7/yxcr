## 解法




### 方法一：哈希表



> **思考**
>
> 统计所有子数组按位或的不同结果。 $n\le 5\cdot 10^4$，枚举子数组是平方级。以 $i$ 结尾的或值集合，等于「上一结尾集合中每个值或上 $arr[i]$」再并上 $\{arr[i]\}$。
>
> 或运算只增不减，以 $i$ 结尾的不同或值至多 $O(\log A)$ 个。用集合滚动这些值，并入全局集合后取其大小。



题目求的是子数组按位或操作的结果的数量，如果我们枚举子数组的结束位置 $i$，那么以 $i-1$ 结尾的子数组按位或操作的结果的数量最多不超过 $32$ 个。这是因为，按位或是一个单调递增的操作。

因此，我们用一个哈希表 $ans$ 记录所有子数组按位或操作的结果，用一个哈希表 $s$ 记录以当前元素结尾的子数组按位或操作的结果，初始时 $s$ 只包含一个元素 $0$。

接下来，我们枚举子数组的结束位置 $i$，那么以 $i$ 结尾的子数组按位或操作的结果，是以 $i-1$ 结尾的子数组按位或操作的结果与 $a[i]$ 进行按位或操作的结果的集合，再加上 $a[i]$ 本身。我们用一个哈希表 $t$ 记录以 $i$ 结尾的子数组按位或操作的结果，然后我们更新 $s = t$，并将 $t$ 中的所有元素加入 $ans$。

最终，我们返回哈希表 $ans$ 中元素的数量即可。

时间复杂度 $O(n \times \log M)$，空间复杂度 $O(n \times \log M)$。其中 $n$ 和 $M$ 分别为数组长度和数组中元素的最大值。




#### Python3


```python
class Solution:
    def subarrayBitwiseORs(self, arr: List[int]) -> int:
        ans = set()
        s = set()
        for x in arr:
            s = {x | y for y in s} | {x}
            ans |= s
        return len(ans)
```


#### TypeScript


```ts
function subarrayBitwiseORs(arr: number[]): number {
    const ans: Set<number> = new Set();
    const s: Set<number> = new Set();
    for (const x of arr) {
        const t: Set<number> = new Set([x]);
        for (const y of s) {
            t.add(x | y);
        }
        s.clear();
        for (const y of t) {
            ans.add(y);
            s.add(y);
        }
    }
    return ans.size;
}
```

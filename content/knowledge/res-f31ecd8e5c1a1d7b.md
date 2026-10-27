## 解法




### 方法一：排序 + 贪心



> **思考**
>
> 数对链要求严格递增，类似最长递增子序列，DP 为 $O(n^2)$，对数可达 $10^3$ 以上时希望更快。
>
> 按右端点排序后，能接就接：右端越小越容易再接后面的对。一次扫描即得多条链的最大长度。



我们将所有数对按照第二个数的升序排序，用一个变量 $\textit{pre}$ 维护已经选择的数对的第二个数的最大值。

遍历排序后的数对，如果当前数对的第一个数大于 $\textit{pre}$，那么我们可以贪心地选择当前数对，答案加一，并将 $\textit{pre}$ 更新为当前数对的第二个数。

遍历结束后，返回答案即可。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(\log n)$。其中 $n$ 为数对的数量。




#### Python3


```python
class Solution:
    def findLongestChain(self, pairs: List[List[int]]) -> int:
        pairs.sort(key=lambda x: x[1])
        ans, pre = 0, -inf
        for a, b in pairs:
            if pre < a:
                ans += 1
                pre = b
        return ans
```


#### TypeScript


```ts
function findLongestChain(pairs: number[][]): number {
    pairs.sort((a, b) => a[1] - b[1]);
    let [ans, pre] = [0, -Infinity];
    for (const [a, b] of pairs) {
        if (pre < a) {
            ++ans;
            pre = b;
        }
    }
    return ans;
}
```

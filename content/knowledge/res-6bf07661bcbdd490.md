## 解法




### 方法一：贪心



> **思考**
>
> 用 $0..n$ 各一次构造排列，使 `'I'`/`'D'` 对应相邻升降。 $n\le 10^5$，不能回溯。遇 `'I'` 放当前最小剩余，遇 `'D'` 放当前最大剩余，最后补上剩下的那个数，贪心即可满足所有相邻关系。



我们可以使用两个指针 `low` 和 `high` 分别表示当前的最小值和最大值，然后遍历字符串 `s`，如果当前字符是 `I`，那么我们就将 `low` 加入到结果数组中，并且 `low` 自增 1；如果当前字符是 `D`，那么我们就将 `high` 加入到结果数组中，并且 `high` 自减 1。

最后，我们将 `low` 加入到结果数组中，返回结果数组即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串 `s` 的长度。




#### Python3


```python
class Solution:
    def diStringMatch(self, s: str) -> List[int]:
        low, high = 0, len(s)
        ans = []
        for c in s:
            if c == "I":
                ans.append(low)
                low += 1
            else:
                ans.append(high)
                high -= 1
        ans.append(low)
        return ans
```


#### TypeScript


```ts
function diStringMatch(s: string): number[] {
    const ans: number[] = [];
    let [low, high] = [0, s.length];
    for (const c of s) {
        if (c === 'I') {
            ans.push(low++);
        } else {
            ans.push(high--);
        }
    }
    ans.push(low);
    return ans;
}
```

## 解法




### 方法一：二分查找



> **思考**
>
> 在非递减的字母数组中找严格大于 $\textit{target}$ 的最小字符，并环形回到开头。 $n\le 10^4$，有序故可二分。
>
> 这是上界查找：第一个大于目标的位置。若该位置等于 $n$，则应取 $letters[0]$，对下标取模即可。
>
> 对码值做 $\textit{bisect\_right}$，返回 $letters[i\bmod n]$。时间 $O(\log n)$。



由于 $\textit{letters}$ 是按照非递减顺序排序的，所以我们可以使用二分查找来找到大于 $\textit{target}$ 的最小字符。

我们定义二分查找的左边界 $l = 0$，右边界 $r = n$。对于每一次二分查找，我们计算中间位置 $mid = (l + r) / 2$，如果 $letters[mid] > \textit{target}$，则说明我们需要在左半部分继续查找，即 $r = mid$；否则我们需要在右半部分继续查找，即 $l = mid + 1$。

最后我们返回 $letters[l \bmod n]$ 即可。

时间复杂度 $O(\log n)$，其中 $n$ 是 $\textit{letters}$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def nextGreatestLetter(self, letters: List[str], target: str) -> str:
        i = bisect_right(letters, ord(target), key=lambda c: ord(c))
        return letters[i % len(letters)]
```


#### TypeScript


```ts
function nextGreatestLetter(letters: string[], target: string): string {
    const idx = _.sortedIndex(letters, target + '\0');
    return letters[idx % letters.length];
}
```

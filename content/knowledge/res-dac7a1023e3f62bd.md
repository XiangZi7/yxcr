## 解法




### 方法一：哈希表



> **思考**
>
> 排序后扫连续段是 $O(n\log n)$，题目要求 $O(n)$。 $n \le 10^5$。放入哈希集合后，从每个尚未删除的 $x$ 向右延伸，直到断掉，并把这段长度记在起点上，供更早的起点拼接。每个数进出集合一次。



我们可以用一个哈希表 $\textit{s}$ 存储数组中所有的元素，用一个变量 $\textit{ans}$ 记录最长连续序列的长度，用一个哈希表 $\textit{d}$ 记录每个元素 $x$ 所在的连续序列的长度。

接下来，我们遍历数组中每个元素 $x$，用一个临时变量 $y$ 记录当前连续序列的最大值，初始时 $y = x$。然后，我们不断尝试匹配 $y+1, y+2, y+3, \dots$，直到匹配不到为止，过程中将匹配到的元素从哈希表 $\textit{s}$ 中移除。那么，当前元素 $x$ 所在的连续序列的长度即为 $d[x] = d[y] + y - x$，然后更新答案 $\textit{ans} = \max(\textit{ans}, d[x])$。

遍历结束后，返回答案 $\textit{ans}$ 即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是数组 $\textit{nums}$ 的长度。




#### Python3


```python
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        s = set(nums)
        ans = 0
        d = defaultdict(int)
        for x in nums:
            y = x
            while y in s:
                s.remove(y)
                y += 1
            d[x] = d[y] + y - x
            ans = max(ans, d[x])
        return ans
```


#### TypeScript


```ts
function longestConsecutive(nums: number[]): number {
    const s = new Set(nums);
    let ans = 0;
    const d = new Map<number, number>();
    for (const x of nums) {
        let y = x;
        while (s.has(y)) {
            s.delete(y++);
        }
        d.set(x, (d.get(y) || 0) + (y - x));
        ans = Math.max(ans, d.get(x)!);
    }
    return ans;
}
```


### 方法二：哈希表（优化）



> **思考**
>
> 方法一额外用哈希表记下每段长度以便拼接。若只从「 $x-1$ 不在集合中」的位置开始向右数，则 $x$ 一定是某段起点，不必再保存 $d$。实现更短，仍保证每个数被访问常数次。



与方法一类似，我们用一个哈希表 $\textit{s}$ 存储数组中所有的元素，用一个变量 $\textit{ans}$ 记录最长连续序列的长度。但是，我们不再使用哈希表 $\textit{d}$ 记录每个元素 $x$ 所在的连续序列的长度，在遍历的过程中，跳过那些 $x-1$ 也在哈希表 $\textit{s}$ 中的元素，如果 $x-1$ 在哈希表 $\textit{s}$ 中，那么 $x$ 一定不是连续序列的起点，因此我们可以直接跳过 $x$。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是数组 $\textit{nums}$ 的长度。




#### Python3


```python
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        s = set(nums)
        ans = 0
        for x in s:
            if x - 1 not in s:
                y = x + 1
                while y in s:
                    y += 1
                ans = max(ans, y - x)
        return ans
```


#### TypeScript


```ts
function longestConsecutive(nums: number[]): number {
    const s = new Set<number>(nums);
    let ans = 0;
    for (const x of s) {
        if (!s.has(x - 1)) {
            let y = x + 1;
            while (s.has(y)) {
                y++;
            }
            ans = Math.max(ans, y - x);
        }
    }
    return ans;
}
```

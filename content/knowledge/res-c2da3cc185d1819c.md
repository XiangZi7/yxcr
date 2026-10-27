## 解法




### 方法一：排序 + 贪心



> **思考**
>
> 每次只能把某个数加一，使最终互不相同，求最少次数。排序后应让每个数不小于“当前已占用的下一个空位” $y$。令 $y\leftarrow\max(y+1,x)$，增量 $y-x$ 累加即为代价。



我们首先对数组 $\textit{nums}$ 进行排序，用一个变量 $\textit{y}$ 记录当前的最大值，初始时 $\textit{y} = -1$。

然后遍历数组 $\textit{nums}$，对于每个元素 $x$，我们将 $y$ 更新为 $\max(y + 1, x)$，并将操作次数 $y - x$ 累加到结果中。

遍历完成后，返回结果即可。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(\log n)$。其中 $n$ 是数组 $\textit{nums}$ 的长度。




#### Python3


```python
class Solution:
    def minIncrementForUnique(self, nums: List[int]) -> int:
        nums.sort()
        ans, y = 0, -1
        for x in nums:
            y = max(y + 1, x)
            ans += y - x
        return ans
```


#### TypeScript


```ts
function minIncrementForUnique(nums: number[]): number {
    nums.sort((a, b) => a - b);
    let [ans, y] = [0, -1];
    for (const x of nums) {
        y = Math.max(y + 1, x);
        ans += y - x;
    }
    return ans;
}
```








### 方法二：计数 + 贪心



> **思考**
>
> 排序需要 $O(n\log n)$。值域加上长度后上界为 $m$，可用计数：从低到高，多余的 $cnt[i]-1$ 个 $i$ 全部挪到 $i+1$，线性扫完值域。



根据题目描述，结果数组的最大值 $m = \max(\textit{nums}) + \textit{len}(\textit{nums})$，我们可以使用一个计数数组 $\textit{cnt}$ 来记录每个元素出现的次数。

然后从 $0$ 到 $m - 1$ 遍历，对于每个元素 $i$，如果它出现的次数 $\textit{cnt}[i]$ 大于 $1$，那么我们将 $\textit{cnt}[i] - 1$ 个元素增加到 $i + 1$，并将操作次数累加到结果中。

遍历完成后，返回结果即可。

时间复杂度 $O(m)$，空间复杂度 $O(m)$。其中 $m$ 是数组 $\textit{nums}$ 的长度加上数组的最大值。




#### Python3


```python
class Solution:
    def minIncrementForUnique(self, nums: List[int]) -> int:
        m = max(nums) + len(nums)
        cnt = Counter(nums)
        ans = 0
        for i in range(m - 1):
            if (diff := cnt[i] - 1) > 0:
                cnt[i + 1] += diff
                ans += diff
        return ans
```


#### TypeScript


```ts
function minIncrementForUnique(nums: number[]): number {
    const m = Math.max(...nums) + nums.length;
    const cnt: number[] = Array(m).fill(0);
    for (const x of nums) {
        cnt[x]++;
    }
    let ans = 0;
    for (let i = 0; i < m - 1; ++i) {
        const diff = cnt[i] - 1;
        if (diff > 0) {
            cnt[i + 1] += diff;
            ans += diff;
        }
    }
    return ans;
}
```

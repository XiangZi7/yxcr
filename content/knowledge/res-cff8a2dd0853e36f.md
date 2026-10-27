## 解法




### 方法一：排序



> **思考**
>
> 不在位的学生数等于原序列与非降序排列在对应位置上不同的个数。 $n\le 100$，排序后逐位比较即可。
>
> 复制一份排序得到 $\textit{expected}$，统计与 $\textit{heights}$ 不等的下标个数。



我们可以先对学生的高度进行排序，然后比较排序后的高度和原始高度，统计不同的位置即可。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 是学生的数量。




#### Python3


```python
class Solution:
    def heightChecker(self, heights: List[int]) -> int:
        expected = sorted(heights)
        return sum(a != b for a, b in zip(heights, expected))
```


#### TypeScript


```ts
function heightChecker(heights: number[]): number {
    const expected = [...heights].sort((a, b) => a - b);
    return heights.reduce((acc, cur, i) => acc + (cur !== expected[i] ? 1 : 0), 0);
}
```








### 方法二：计数排序



> **思考**
>
> 比较排序需要 $O(n\log n)$ 与额外数组。高度只有 $1$ 到 $100$，计数排序能在线性时间内生成应有序列。
>
> 统计每个高度的次数，再按高度从小到大展开，与原数组并行扫描，遇不同则累加。



由于题目中学生高度不超过 $100$，因此可以使用计数排序。这里我们用一个长度 $101$ 的数组 $cnt$ 统计每个高度 $h_i$ 出现的次数。

时间复杂度 $O(n + M)$，空间复杂度 $O(M)$。其中 $n$ 是学生的数量，而 $M$ 是学生的最大高度，本题中 $M = 101$。




#### Python3


```python
class Solution:
    def heightChecker(self, heights: List[int]) -> int:
        cnt = [0] * 101
        for h in heights:
            cnt[h] += 1
        ans = i = 0
        for j in range(1, 101):
            while cnt[j]:
                cnt[j] -= 1
                if heights[i] != j:
                    ans += 1
                i += 1
        return ans
```


#### TypeScript


```ts
function heightChecker(heights: number[]): number {
    const cnt = Array(101).fill(0);
    for (const i of heights) {
        cnt[i]++;
    }
    let ans = 0;
    for (let j = 1, i = 0; j < 101; j++) {
        while (cnt[j]--) {
            if (heights[i++] !== j) {
                ans++;
            }
        }
    }
    return ans;
}
```

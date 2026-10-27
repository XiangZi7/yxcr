## 解法




### 方法一：直接遍历



> **思考**
>
> $flips$ 是 $1..n$ 的排列，第 $i$ 步把第 $flips[i]$ 位翻成 $1$，问有多少时刻前缀 $[1..i]$ 全为 $1$。这等价于前 $i$ 次翻转的最大值恰好为 $i$。维护扫描过的最大值 $mx$，当 $mx=i$ 时计入一次。



我们可以遍历数组 $flips$，记录当前遍历过的元素的最大值 $mx$，若 $mx$ 等于当前遍历到的下标 $i$，则说明前 $i$ 个元素都被翻转过了，即前缀一致，答案累加。

遍历结束后，返回答案即可。

时间复杂度 $O(n)$，其中 $n$ 为数组 $flips$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def numTimesAllBlue(self, flips: List[int]) -> int:
        ans = mx = 0
        for i, x in enumerate(flips, 1):
            mx = max(mx, x)
            ans += mx == i
        return ans
```


#### TypeScript


```ts
function numTimesAllBlue(flips: number[]): number {
    let ans = 0;
    let mx = 0;
    for (let i = 1; i <= flips.length; ++i) {
        mx = Math.max(mx, flips[i - 1]);
        if (mx === i) {
            ++ans;
        }
    }
    return ans;
}
```

## 解法




### 方法一：贪心



> **思考**
>
> 每个水龙头覆盖一段 $[i-r_i,i+r_i]$，要覆盖 $[0,n]$ 的最少个数。枚举子集， $n \le 10^4$ 不可行。覆盖同一左端点时，右端更远者更优，问题与跳跃游戏相同：把每个区间改写成「从左端能跳到的最远右端」 $\textit{last}[l]$。
>
> 再沿位置推进，维护当前能到的最远 $mx$ 与上一段终点 $\textit{pre}$；走到 $\textit{pre}$ 就新开一个水龙头。若某点 $mx \le i$，则无法覆盖。



我们注意到，对于所有能覆盖某个左端点的水龙头，选择能覆盖最远右端点的那个水龙头是最优的。

因此，我们可以先预处理数组 $ranges$，对于第 $i$ 个水龙头，它能覆盖的左端点 $l = \max(0, i - ranges[i])$，右端点 $r = i + ranges[i]$，我们算出所有能覆盖左端点 $l$ 的水龙头中，右端点最大的那个位置，记录在数组 $last[i]$ 中。

然后我们定义以下三个变量，其中：

- 变量 $ans$ 表示最终答案，即最少水龙头数目；
- 变量 $mx$ 表示当前能覆盖的最远右端点；
- 变量 $pre$ 表示上一个水龙头覆盖的最远右端点。

我们在 $[0,...n-1]$ 的范围内遍历所有位置，对于当前位置 $i$，我们用 $last[i]$ 更新 $mx$，即 $mx = \max(mx, last[i])$。

- 如果 $mx \leq i$，说明无法覆盖下一个位置，返回 $-1$。
- 如果 $pre = i$，说明需要使用一个新的子区间，因此我们将 $ans$ 加 $1$，并且更新 $pre = mx$。

遍历结束后，返回 $ans$ 即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为花园的长度。

相似题目：

- [45. 跳跃游戏 II](https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0045.Jump%20Game%20II/README.md)
- [55. 跳跃游戏](https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0055.Jump%20Game/README.md)
- [1024. 视频拼接](https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1024.Video%20Stitching/README.md)




#### Python3


```python
class Solution:
    def minTaps(self, n: int, ranges: List[int]) -> int:
        last = [0] * (n + 1)
        for i, x in enumerate(ranges):
            l, r = max(0, i - x), i + x
            last[l] = max(last[l], r)

        ans = mx = pre = 0
        for i in range(n):
            mx = max(mx, last[i])
            if mx <= i:
                return -1
            if pre == i:
                ans += 1
                pre = mx
        return ans
```


#### TypeScript


```ts
function minTaps(n: number, ranges: number[]): number {
    const last = new Array(n + 1).fill(0);
    for (let i = 0; i < n + 1; ++i) {
        const l = Math.max(0, i - ranges[i]);
        const r = i + ranges[i];
        last[l] = Math.max(last[l], r);
    }
    let ans = 0;
    let mx = 0;
    let pre = 0;
    for (let i = 0; i < n; ++i) {
        mx = Math.max(mx, last[i]);
        if (mx <= i) {
            return -1;
        }
        if (pre == i) {
            ++ans;
            pre = mx;
        }
    }
    return ans;
}
```

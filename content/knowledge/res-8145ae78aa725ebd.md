## 解法




### 方法一：两次遍历



> **思考**
>
> 相邻评分更高的人必须拿更多糖，求最少总数。 $n\le 5\times 10^4$，按评分排序再分配可以，但要小心相等评分。左右约束互相独立：从左扫一遍满足「比左边高则多一颗」，从右再扫一遍满足右边，每人取两侧要求的较大值，两边的递增链都不会被破坏。



我们初始化两个数组 $left$ 和 $right$，其中 $left[i]$ 表示当前孩子比左边孩子评分高时，当前孩子至少应该获得的糖果数，而 $right[i]$ 表示当前孩子比右边孩子评分高时，当前孩子至少应该获得的糖果数。初始时 $left[i]=1$, $right[i]=1$。

我们从左到右遍历一遍，如果当前孩子比左边孩子评分高，则 $left[i]=left[i-1]+1$；同理，我们从右到左遍历一遍，如果当前孩子比右边孩子评分高，则 $right[i]=right[i+1]+1$。

最后，我们遍历一遍评分数组，每个孩子至少应该获得的糖果数为 $left[i]$ 和 $right[i]$ 中的最大值，将它们累加起来即为答案。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是评分数组的长度。




#### Python3


```python
class Solution:
    def candy(self, ratings: List[int]) -> int:
        n = len(ratings)
        left = [1] * n
        right = [1] * n
        for i in range(1, n):
            if ratings[i] > ratings[i - 1]:
                left[i] = left[i - 1] + 1
        for i in range(n - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                right[i] = right[i + 1] + 1
        return sum(max(a, b) for a, b in zip(left, right))
```


#### TypeScript


```ts
function candy(ratings: number[]): number {
    const n = ratings.length;
    const left = new Array(n).fill(1);
    const right = new Array(n).fill(1);
    for (let i = 1; i < n; ++i) {
        if (ratings[i] > ratings[i - 1]) {
            left[i] = left[i - 1] + 1;
        }
    }
    for (let i = n - 2; i >= 0; --i) {
        if (ratings[i] > ratings[i + 1]) {
            right[i] = right[i + 1] + 1;
        }
    }
    let ans = 0;
    for (let i = 0; i < n; ++i) {
        ans += Math.max(left[i], right[i]);
    }
    return ans;
}
```

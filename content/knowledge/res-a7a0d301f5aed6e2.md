## 解法




### 方法一：哈希表 + 滑动窗口



> **思考**
>
> 所求为至多含两种水果的最长子数组。 $n\le 10^5$，枚举左右端点再统计种类不可行。右端每纳入一种水果，种类超过 $2$ 时必须右移左端。
>
> 用计数表维护窗口内各水果个数，种类由哈希表大小给出；每当种类大于 $2$ 就弹出左端，并记录窗口长度的最大值。



我们用哈希表 $\textit{cnt}$ 维护当前窗口内的水果种类以及对应的数量，用双指针 $j$ 和 $i$ 维护窗口的左右边界。

遍历数组 $\textit{fruits}$，将当前水果 $x$ 加入窗口，即 $\textit{cnt}[x]++$，然后判断当前窗口内的水果种类是否超过了 $2$ 种，如果超过了 $2$ 种，就需要将窗口的左边界 $j$ 右移，直到窗口内的水果种类不超过 $2$ 种为止。然后更新答案，即 $\textit{ans} = \max(\textit{ans}, i - j + 1)$。

遍历结束后，即可得到最终的答案。

```
1 2 3 2 2 1 4
^   ^
j   i


1 2 3 2 2 1 4
  ^ ^
  j i


1 2 3 2 2 1 4
  ^     ^
  j     i
```

时间复杂度 $O(n)$，其中 $n$ 为数组 $\textit{fruits}$ 的长度。空间复杂度 $O(1)$，因为哈希表 $\textit{cnt}$ 中的键值对数量最多为 $2$。




#### Python3


```python
class Solution:
    def totalFruit(self, fruits: List[int]) -> int:
        cnt = Counter()
        ans = j = 0
        for i, x in enumerate(fruits):
            cnt[x] += 1
            while len(cnt) > 2:
                y = fruits[j]
                cnt[y] -= 1
                if cnt[y] == 0:
                    cnt.pop(y)
                j += 1
            ans = max(ans, i - j + 1)
        return ans
```


#### TypeScript


```ts
function totalFruit(fruits: number[]): number {
    const n = fruits.length;
    const cnt: Map<number, number> = new Map();
    let ans = 0;
    for (let i = 0, j = 0; i < n; ++i) {
        cnt.set(fruits[i], (cnt.get(fruits[i]) || 0) + 1);
        for (; cnt.size > 2; ++j) {
            cnt.set(fruits[j], cnt.get(fruits[j])! - 1);
            if (!cnt.get(fruits[j])) {
                cnt.delete(fruits[j]);
            }
        }
        ans = Math.max(ans, i - j + 1);
    }
    return ans;
}
```


### 方法二：单调变长滑动窗口



> **思考**
>
> 方法一在种类超限时缩小窗口并反复更新答案，但题目只要最大长度，历史更短的窗口不必保留。窗口只增不减：种类超过 $2$ 时左端同步前进一步，遍历结束时 $n-j$ 即为最大可行窗口。



在方法一中，我们发现，窗口大小会时而变大，时而变小，这就需要我们每一次更新答案。

但本题实际上求的是水果的最大数目，也就是“最大”的窗口，我们没有必要缩小窗口，只需要让窗口单调增大。于是代码就少了每次更新答案的操作，只需要在遍历结束后将此时的窗口大小作为答案返回即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为数组 $\textit{fruits}$ 的长度。




#### Python3


```python
class Solution:
    def totalFruit(self, fruits: List[int]) -> int:
        cnt = Counter()
        j = 0
        for x in fruits:
            cnt[x] += 1
            if len(cnt) > 2:
                y = fruits[j]
                cnt[y] -= 1
                if cnt[y] == 0:
                    cnt.pop(y)
                j += 1
        return len(fruits) - j
```


#### TypeScript


```ts
function totalFruit(fruits: number[]): number {
    const n = fruits.length;
    const cnt: Map<number, number> = new Map();
    let j = 0;
    for (const x of fruits) {
        cnt.set(x, (cnt.get(x) || 0) + 1);
        if (cnt.size > 2) {
            cnt.set(fruits[j], cnt.get(fruits[j])! - 1);
            if (!cnt.get(fruits[j])) {
                cnt.delete(fruits[j]);
            }
            ++j;
        }
    }
    return n - j;
}
```

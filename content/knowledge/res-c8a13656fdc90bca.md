## 解法




### 方法一：计数 + 枚举



> **思考**
>
> 求三元组之和等于 $target$ 的方案数，值域 $[0,100]$， $n\le 3000$。枚举三个下标为立方级，偏紧。先计数，再枚举 $i<j$，第三个数 $c=target-a-b$ 必须在 $j$ 之后。
>
> 枚举 $j$ 时先把当前 $b$ 从计数中减掉，再用表 $O(1)$ 取右侧 $c$ 的个数。



我们可以用一个哈希表或者一个长度为 $101$ 的数组 $cnt$ 统计数组 $arr$ 中每个元素的出现次数。

然后，我们枚举数组 $arr$ 中的每个元素 $arr[j]$，先将 $cnt[arr[j]]$ 减一，然后再枚举 $arr[j]$ 之前的元素 $arr[i]$，计算 $c = target - arr[i] - arr[j]$，如果 $c$ 在 $[0, 100]$ 的范围内，那么答案就加上 $cnt[c]$，最后返回答案。

注意，这里的答案可能会超过 ${10}^9 + 7$，所以在每次加法操作后都要取模。

时间复杂度 $O(n^2)$，其中 $n$ 为数组 $arr$ 的长度。空间复杂度 $O(C)$，其中 $C$ 为数组 $arr$ 中元素的最大值，本题中 $C = 100$。




#### Python3


```python
class Solution:
    def threeSumMulti(self, arr: List[int], target: int) -> int:
        mod = 10**9 + 7
        cnt = Counter(arr)
        ans = 0
        for j, b in enumerate(arr):
            cnt[b] -= 1
            for a in arr[:j]:
                c = target - a - b
                ans = (ans + cnt[c]) % mod
        return ans
```


#### TypeScript


```ts
function threeSumMulti(arr: number[], target: number): number {
    const mod = 10 ** 9 + 7;
    const cnt: number[] = Array(101).fill(0);
    for (const x of arr) {
        ++cnt[x];
    }
    let ans = 0;
    const n = arr.length;
    for (let j = 0; j < n; ++j) {
        --cnt[arr[j]];
        for (let i = 0; i < j; ++i) {
            const c = target - arr[i] - arr[j];
            if (c >= 0 && c < cnt.length) {
                ans = (ans + cnt[c]) % mod;
            }
        }
    }
    return ans;
}
```

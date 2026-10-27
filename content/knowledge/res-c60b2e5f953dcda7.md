## 解法




### 方法一：贪心



> **思考**
>
> 通过交换相邻行，使第 $i$ 行在对角线右侧全为 $0$。只关心每行最右一个 $1$ 的位置：该位置 $\le i$ 时第 $i$ 行才合法。 $n\le 200$，可按行贪心。
>
> 对每个 $i$，在尚未使用的行中找第一个最右 $1$ 下标 $\le i$ 的行 $k$，再通过相邻交换把它换到第 $i$ 行，代价为 $k-i$。若不存在这样的行则无解。先满足更靠上的行不会妨碍后面，因为后面需要的尾零更少。



我们逐行处理，对于第 $i$ 行，最后一个 $1$ 所在的位置必须小于等于 $i$，我们在 $[i, n)$ 中找到第一个满足条件的行，记为 $k$。然后从第 $k$ 行开始，依次向上交换相邻的两行，直到第 $i$ 行。

时间复杂度 $O(n^2)$，空间复杂度 $O(n)$。其中 $n$ 是网格的边长。




#### Python3


```python
class Solution:
    def minSwaps(self, grid: List[List[int]]) -> int:
        n = len(grid)
        pos = [-1] * n
        for i in range(n):
            for j in range(n - 1, -1, -1):
                if grid[i][j] == 1:
                    pos[i] = j
                    break
        ans = 0
        for i in range(n):
            k = -1
            for j in range(i, n):
                if pos[j] <= i:
                    ans += j - i
                    k = j
                    break
            if k == -1:
                return -1
            while k > i:
                pos[k], pos[k - 1] = pos[k - 1], pos[k]
                k -= 1
        return ans
```


#### TypeScript


```ts
function minSwaps(grid: number[][]): number {
    const n = grid.length;
    const pos: number[] = Array(n).fill(-1);
    for (let i = 0; i < n; ++i) {
        for (let j = n - 1; ~j; --j) {
            if (grid[i][j] === 1) {
                pos[i] = j;
                break;
            }
        }
    }
    let ans = 0;
    for (let i = 0; i < n; ++i) {
        let k = -1;
        for (let j = i; j < n; ++j) {
            if (pos[j] <= i) {
                ans += j - i;
                k = j;
                break;
            }
        }
        if (k === -1) {
            return -1;
        }
        for (; k > i; --k) {
            [pos[k], pos[k - 1]] = [pos[k - 1], pos[k]];
        }
    }
    return ans;
}
```

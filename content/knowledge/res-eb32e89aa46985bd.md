## 解法




### 方法一：定点遍历



> **思考**
>
> 按对角线来回遍历矩阵。模拟方向并处理撞边，边界分支较多。对角线条数为 $m+n-1$，每条的起点可以闭式给出。
>
> 第 $k$ 条从右上往左下收进临时数组，起点为 $k<n$ 时 $(0,k)$，否则 $(k-n+1,n-1)$。 $k$ 为偶数再反转，以符合题目的往返方向。
>
> 先统一往左下走，再用奇偶决定是否翻转，省去在边界上切换方向向量。



对于每一轮 $k$，我们固定从右上方开始往左下方遍历，得到 $t$。如果 $k$ 为偶数，再将 $t$ 逆序。然后将 $t$ 添加到结果数组 $\textit{ans}$ 中。

问题的关键在于确定轮数以及每一轮的起始坐标点 $(i, j)$。

时间复杂度 $O(m \times n)$。其中 $m$ 和 $n$ 分别为矩阵的行数和列数。忽略答案的空间消耗，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def findDiagonalOrder(self, mat: List[List[int]]) -> List[int]:
        m, n = len(mat), len(mat[0])
        ans = []
        for k in range(m + n - 1):
            t = []
            i = 0 if k < n else k - n + 1
            j = k if k < n else n - 1
            while i < m and j >= 0:
                t.append(mat[i][j])
                i += 1
                j -= 1
            if k % 2 == 0:
                t = t[::-1]
            ans.extend(t)
        return ans
```


#### TypeScript


```ts
function findDiagonalOrder(mat: number[][]): number[] {
    const m = mat.length;
    const n = mat[0].length;
    const ans: number[] = [];
    for (let k = 0; k < m + n - 1; k++) {
        const t: number[] = [];
        let i = k < n ? 0 : k - n + 1;
        let j = k < n ? k : n - 1;
        while (i < m && j >= 0) {
            t.push(mat[i][j]);
            i++;
            j--;
        }
        if (k % 2 === 0) {
            t.reverse();
        }
        ans.push(...t);
    }
    return ans;
}
```

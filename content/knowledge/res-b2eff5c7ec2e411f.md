## 解法




### 方法一：模拟



> **思考**
>
> 重塑只是按行优先把元素重新切成 $r \times c$。元素总数对不上则无法重塑，返回原矩阵。
>
> 二维下标与一维序号一一对应：新位置 $i$ 来自原矩阵的 $i//n,\ i\% n$，写入 $i//c,\ i\% c$。一次线性搬运即可。



我们先获取原矩阵的行数和列数，分别记为 $m$ 和 $n$。如果 $m \times n \neq r \times c$，则无法重塑矩阵，直接返回原矩阵。

否则，我们创建一个新矩阵，新矩阵的行数为 $r$，列数为 $c$。我们从原矩阵的第一个元素开始，按照行优先的顺序遍历原矩阵的所有元素，将遍历到的元素按顺序放入新矩阵中。

遍历完原矩阵的所有元素后，我们即可得到答案。

时间复杂度 $O(m \times n)$，其中 $m$ 和 $n$ 分别是原矩阵的行数和列数。忽略答案的空间消耗，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def matrixReshape(self, mat: List[List[int]], r: int, c: int) -> List[List[int]]:
        m, n = len(mat), len(mat[0])
        if m * n != r * c:
            return mat
        ans = [[0] * c for _ in range(r)]
        for i in range(m * n):
            ans[i // c][i % c] = mat[i // n][i % n]
        return ans
```


#### TypeScript


```ts
function matrixReshape(mat: number[][], r: number, c: number): number[][] {
    let m = mat.length,
        n = mat[0].length;
    if (m * n != r * c) return mat;
    let ans = Array.from({ length: r }, v => new Array(c).fill(0));
    let k = 0;
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            ans[Math.floor(k / c)][k % c] = mat[i][j];
            ++k;
        }
    }
    return ans;
}
```


### 方法二



> **思考**
>
> 方法一已经用线性下标完成映射。方法二把同一公式写在目标矩阵的循环里，只是遍历顺序从「原下标」换成「新下标」，没有新的渐近改进。
>
> 实现语言不同，对应关系不变。






#### TypeScript


```ts
function matrixReshape(mat: number[][], r: number, c: number): number[][] {
    const m = mat.length;
    const n = mat[0].length;
    if (m * n !== r * c) {
        return mat;
    }
    const ans = Array.from({ length: r }, () => new Array(c).fill(0));
    for (let i = 0; i < r * c; i++) {
        ans[Math.floor(i / c)][i % c] = mat[Math.floor(i / n)][i % n];
    }
    return ans;
}
```

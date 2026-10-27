## 解法




### 方法一：模拟



> **思考**
>
> 与螺旋读取相对，本题要把 $1$ 到 $n^2$ 按同样顺序填入方阵。若按层填充、每层四条边分别赋值再收缩边界， $n \le 20$ 可以通过，但边界同样容易写错。
>
> 沿当前方向前进，下一步越界或已填则右转。空白格子为 $0$，已填非零，因此不必另开访问数组。
>
> 用方向数组循环四种走法，依次填入即可。



我们可以直接模拟螺旋矩阵的生成过程。

定义一个二维数组 $\textit{ans}$，用于存储螺旋矩阵。用 $i$ 和 $j$ 分别表示当前位置的行号和列号，用 $k$ 表示当前的方向编号， $\textit{dirs}$ 表示方向编号与方向的对应关系。

从 $1$ 开始，依次填入矩阵中的每个位置。每次填入一个位置后，计算下一个位置的行号和列号，如果下一个位置不在矩阵中或者已经被填过，则改变方向，再计算下一个位置的行号和列号。

时间复杂度 $O(n^2)$，其中 $n$ 是矩阵的边长。忽略答案数组的空间消耗，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        ans = [[0] * n for _ in range(n)]
        dirs = (0, 1, 0, -1, 0)
        i = j = k = 0
        for v in range(1, n * n + 1):
            ans[i][j] = v
            x, y = i + dirs[k], j + dirs[k + 1]
            if x < 0 or x >= n or y < 0 or y >= n or ans[x][y]:
                k = (k + 1) % 4
            i, j = i + dirs[k], j + dirs[k + 1]
        return ans
```


#### TypeScript


```ts
function generateMatrix(n: number): number[][] {
    const ans: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    const dirs = [0, 1, 0, -1, 0];
    let [i, j, k] = [0, 0, 0];
    for (let v = 1; v <= n * n; v++) {
        ans[i][j] = v;
        const [x, y] = [i + dirs[k], j + dirs[k + 1]];
        if (x < 0 || x >= n || y < 0 || y >= n || ans[x][y] !== 0) {
            k = (k + 1) % 4;
        }
        i += dirs[k];
        j += dirs[k + 1];
    }
    return ans;
}
```

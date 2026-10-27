## 解法




### 方法一



> **思考**
>
> 从给定起点按东、南、西、北螺旋走遍网格。步长模式为 $1,1,2,2,3,3,\ldots$，网格至多 $100\times 100$，模拟即可。
>
> 按方向与当前步长前进，落在界内则记录。走完东南后步长加一，走完西北后再加一。收集满 $rows\cdot cols$ 个点即停。






#### Python3


```python
class Solution:
    def spiralMatrixIII(
        self, rows: int, cols: int, rStart: int, cStart: int
    ) -> List[List[int]]:
        ans = [[rStart, cStart]]
        if rows * cols == 1:
            return ans
        k = 1
        while True:
            for dr, dc, dk in [[0, 1, k], [1, 0, k], [0, -1, k + 1], [-1, 0, k + 1]]:
                for _ in range(dk):
                    rStart += dr
                    cStart += dc
                    if 0 <= rStart < rows and 0 <= cStart < cols:
                        ans.append([rStart, cStart])
                        if len(ans) == rows * cols:
                            return ans
            k += 2
```


#### TypeScript


```ts
function spiralMatrixIII(rows: number, cols: number, rStart: number, cStart: number): number[][] {
    // prettier-ignore
    const dir = [[1,0],[0,1],[-1,0],[0,-1]];
    let [x, y, i, size] = [cStart, rStart, 0, 0];
    const ans: number[][] = [[y, x]];
    const total = rows * cols;

    while (ans.length < total) {
        if (i % 2 === 0) size++;

        for (let j = 0; ans.length < total && j < size; j++) {
            x += dir[i][0];
            y += dir[i][1];

            if (0 <= x && x < cols && 0 <= y && y < rows) {
                ans.push([y, x]);
            }
        }

        i = (i + 1) % 4;
    }

    return ans;
}
```

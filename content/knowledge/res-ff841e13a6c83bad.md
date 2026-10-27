## 解法




### 方法一：递推



> **思考**
>
> 只要第 $r$ 行，不必保存整个三角形。进阶还要求 $O(r)$ 空间。从后往前把 $f[j]$ 累加 $f[j-1]$，右侧已是新行、左侧仍是旧行，一行数组即可滚动到 $\textit{rowIndex}$。



我们创建一个长度为 $rowIndex + 1$ 的数组 $f$，初始时所有元素均为 $1$。

接下来，我们从第 $2$ 行开始，从后往前计算当前行的第 $j$ 个元素的值 $f[j] = f[j] + f[j - 1]$，其中 $j \in [1, i - 1]$。

最后返回 $f$ 即可。

时间复杂度 $O(n^2)$，空间复杂度 $O(n)$。其中 $n$ 是给定的行数。




#### Python3


```python
class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        f = [1] * (rowIndex + 1)
        for i in range(2, rowIndex + 1):
            for j in range(i - 1, 0, -1):
                f[j] += f[j - 1]
        return f
```


#### TypeScript


```ts
function getRow(rowIndex: number): number[] {
    const f: number[] = Array(rowIndex + 1).fill(1);
    for (let i = 2; i < rowIndex + 1; ++i) {
        for (let j = i - 1; j; --j) {
            f[j] += f[j - 1];
        }
    }
    return f;
}
```

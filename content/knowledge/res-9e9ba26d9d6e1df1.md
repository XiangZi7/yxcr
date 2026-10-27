## 解法




### 方法一：模拟



> **思考**
>
> 第 $i$ 行由上一行相邻两项相加得到，两端为 $1$。 $\textit{numRows}\le 30$，按行模拟即可。每一行只依赖上一行，依次生成并保存。



我们先创建一个答案数组 $f$，然后将 $f$ 的第一行元素设为 $[1]$。接下来，我们从第二行开始，每一行的开头和结尾元素都是 $1$，其它 $f[i][j] = f[i - 1][j - 1] + f[i - 1][j]$。

时间复杂度 $O(n^2)$，其中 $n$ 为给定的行数。忽略答案的空间消耗，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        f = [[1]]
        for i in range(numRows - 1):
            g = [1] + [a + b for a, b in pairwise(f[-1])] + [1]
            f.append(g)
        return f
```


#### TypeScript


```ts
function generate(numRows: number): number[][] {
    const f: number[][] = [[1]];
    for (let i = 0; i < numRows - 1; ++i) {
        const g: number[] = [1];
        for (let j = 1; j < f[i].length; ++j) {
            g.push(f[i][j - 1] + f[i][j]);
        }
        g.push(1);
        f.push(g);
    }
    return f;
}
```

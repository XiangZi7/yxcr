## 解法




### 方法一：动态规划



> **思考**
>
> 长度为 $n$ 的元音串须满足邻接规则， $n$ 达 $2\times 10^4$，不能逐串枚举。只须记录以各元音结尾的方案数：下一字母的合法前驱是固定的五种转移。
>
> 用长度为 $5$ 的数组 $f$ 表示当前长度下各结尾的个数，按前驱关系滚到下一长度，共 $n-1$ 轮。状态只依赖上一长度，模 $10^9+7$ 防止溢出。



根据题目描述，我们先列出每个元音字母的后一个字母：

```
a [e]
e [a|i]
i [a|e|o|u]
o [i|u]
u [a]
```

那么我们可以推出每个元音字母的前一个字母：

```
[e|i|u]	a
[a|i]	e
[e|o]	i
[i]	o
[i|o]	u
```

我们定义 $f[i]$ 表示当前长度以第 $i$ 个元音字母结尾的字符串的个数，如果长度为 $1$，那么 $f[i]=1$。

当长度大于 $1$ 时，我们定义 $g[i]$ 表示当前长度以第 $i$ 个元音字母结尾的字符串的个数，那么 $g[i]$ 可以由 $f$ 转移而来，即：

$$
g[i]=
\begin{cases}
f[1]+f[2]+f[4] & i=0 \\
f[0]+f[2] & i=1 \\
f[1]+f[3] & i=2 \\
f[2] & i=3 \\
f[2]+f[3] & i=4
\end{cases}
$$

最终答案为 $\sum_{i=0}^{4}f[i]$。注意由于答案可能会很大，所以需要对 $10^9+7$ 取模。

时间复杂度 $O(n)$，空间复杂度 $O(C)$。其中 $n$ 是字符串的长度，而 $C$ 是元音字母的个数。本题中 $C=5$。




#### Python3


```python
class Solution:
    def countVowelPermutation(self, n: int) -> int:
        f = [1] * 5
        mod = 10**9 + 7
        for _ in range(n - 1):
            g = [0] * 5
            g[0] = (f[1] + f[2] + f[4]) % mod
            g[1] = (f[0] + f[2]) % mod
            g[2] = (f[1] + f[3]) % mod
            g[3] = f[2]
            g[4] = (f[2] + f[3]) % mod
            f = g
        return sum(f) % mod
```


#### TypeScript


```ts
function countVowelPermutation(n: number): number {
    const f: number[] = Array(5).fill(1);
    const mod = 1e9 + 7;
    for (let i = 1; i < n; ++i) {
        const g: number[] = Array(5).fill(0);
        g[0] = (f[1] + f[2] + f[4]) % mod;
        g[1] = (f[0] + f[2]) % mod;
        g[2] = (f[1] + f[3]) % mod;
        g[3] = f[2];
        g[4] = (f[2] + f[3]) % mod;
        f.splice(0, 5, ...g);
    }
    return f.reduce((a, b) => (a + b) % mod);
}
```


### 方法二：矩阵快速幂加速递推



> **思考**
>
> 方法一按长度递推需 $O(n)$ 次常数量更新。五种状态的转移是常系数线性关系，写成 $5\times 5$ 矩阵后可用快速幂在 $O(\log n)$ 次矩阵乘法内得到第 $n$ 项，当 $n$ 更大时更有利。



时间复杂度 $O(C^3 \times \log n)$，空间复杂度 $O(C^2)$，其中 $C$ 是元音字母的个数，本题中 $C=5$。




#### Python3


```python
import numpy as np


class Solution:
    def countVowelPermutation(self, n: int) -> int:
        mod = 10**9 + 7
        factor = np.asmatrix(
            [
                (0, 1, 0, 0, 0),
                (1, 0, 1, 0, 0),
                (1, 1, 0, 1, 1),
                (0, 0, 1, 0, 1),
                (1, 0, 0, 0, 0),
            ],
            np.dtype("O"),
        )
        res = np.asmatrix([(1, 1, 1, 1, 1)], np.dtype("O"))
        n -= 1
        while n:
            if n & 1:
                res = res * factor % mod
            factor = factor * factor % mod
            n >>= 1
        return res.sum() % mod
```


#### TypeScript


```ts
const mod = 1e9 + 7;

function countVowelPermutation(n: number): number {
    const a: number[][] = [
        [0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0],
    ];
    const res = pow(a, n - 1);
    return res[0].reduce((a, b) => (a + b) % mod);
}

function mul(a: number[][], b: number[][]): number[][] {
    const [m, n] = [a.length, b[0].length];
    const c = Array.from({ length: m }, () => Array.from({ length: n }, () => 0));
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            for (let k = 0; k < b.length; ++k) {
                c[i][j] =
                    (c[i][j] + Number((BigInt(a[i][k]) * BigInt(b[k][j])) % BigInt(mod))) % mod;
            }
        }
    }
    return c;
}

function pow(a: number[][], n: number): number[][] {
    let res: number[][] = [[1, 1, 1, 1, 1]];
    while (n) {
        if (n & 1) {
            res = mul(res, a);
        }
        a = mul(a, a);
        n >>>= 1;
    }
    return res;
}
```

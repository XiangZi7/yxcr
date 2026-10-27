## 解法




### 方法一：动态规划



> **思考**
>
> 泰波那契由三项递推定义， $n\le 37$ 时线性递推足够。用三个变量滚动保存最近三项，循环 $n$ 次后返回第一项，空间为常数。



根据题目中给出的递推式，我们可以使用动态规划求解。

我们定义三个变量 $a$, $b$, $c$，分别表示 $T_{n-3}$, $T_{n-2}$, $T_{n-1}$，初始值分别为 $0$, $1$, $1$。

然后从 $n$ 减小到 $0$，每次更新 $a$, $b$, $c$ 的值，直到 $n$ 为 $0$ 时，答案即为 $a$。

时间复杂度 $O(n)$，空间复杂度 $O(1)$。其中 $n$ 为给定的整数。




#### Python3


```python
class Solution:
    def tribonacci(self, n: int) -> int:
        a, b, c = 0, 1, 1
        for _ in range(n):
            a, b, c = b, c, a + b + c
        return a
```


#### TypeScript


```ts
function tribonacci(n: number): number {
    let [a, b, c] = [0, 1, 1];
    while (n--) {
        let d = a + b + c;
        a = b;
        b = c;
        c = d;
    }
    return a;
}
```


### 方法二：矩阵快速幂加速递推



> **思考**
>
> 方法一为 $O(n)$。将递推写成 $1\times 3$ 状态乘 $3\times 3$ 转移矩阵后，可用快速幂在 $O(\log n)$ 次矩阵乘法得到 $T_n$，适合 $n$ 更大的情形。



我们设 $Tib(n)$ 表示一个 $1 \times 3$ 的矩阵 $\begin{bmatrix} T_n & T_{n - 1} & T_{n - 2} \end{bmatrix}$，其中 $T_n$, $T_{n - 1}$ 和 $T_{n - 2}$ 分别表示第 $n$ 个、第 $n - 1$ 个和第 $n - 2$ 个泰波那契数。

我们希望根据 $Tib(n-1) = \begin{bmatrix} T_{n - 1} & T_{n - 2} & T_{n - 3} \end{bmatrix}$ 推出 $Tib(n)$。也即是说，我们需要一个矩阵 $base$，使得 $Tib(n - 1) \times base = Tib(n)$，即：

$$
\begin{bmatrix}
T_{n - 1} & T_{n - 2} & T_{n - 3}
\end{bmatrix} \times base = \begin{bmatrix} T_n & T_{n - 1} & T_{n - 2} \end{bmatrix}
$$

由于 $T_n = T_{n - 1} + T_{n - 2} + T_{n - 3}$，所以矩阵 $base$ 为：

$$
\begin{bmatrix}
 1 & 1 & 0 \\
 1 & 0 & 1 \\
 1 & 0 & 0
\end{bmatrix}
$$

我们定义初始矩阵 $res = \begin{bmatrix} 1 & 1 & 0 \end{bmatrix}$，那么 $T_n$ 等于 $res$ 乘以 $base^{n - 3}$ 的结果矩阵中所有元素之和。使用矩阵快速幂求解即可。

时间复杂度 $O(\log n)$，空间复杂度 $O(1)$。




#### Python3


```python
import numpy as np


class Solution:
    def tribonacci(self, n: int) -> int:
        if n == 0:
            return 0
        if n < 3:
            return 1
        factor = np.asmatrix([(1, 1, 0), (1, 0, 1), (1, 0, 0)], np.dtype("O"))
        res = np.asmatrix([(1, 1, 0)], np.dtype("O"))
        n -= 3
        while n:
            if n & 1:
                res *= factor
            factor *= factor
            n >>= 1
        return res.sum()
```


#### TypeScript


```ts
function tribonacci(n: number): number {
    if (n === 0) {
        return 0;
    }
    if (n < 3) {
        return 1;
    }
    const a = [
        [1, 1, 0],
        [1, 0, 1],
        [1, 0, 0],
    ];
    return pow(a, n - 3)[0].reduce((a, b) => a + b);
}

function mul(a: number[][], b: number[][]): number[][] {
    const [m, n] = [a.length, b[0].length];
    const c = Array.from({ length: m }, () => Array.from({ length: n }, () => 0));
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            for (let k = 0; k < b.length; ++k) {
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return c;
}

function pow(a: number[][], n: number): number[][] {
    let res = [[1, 1, 0]];
    while (n) {
        if (n & 1) {
            res = mul(res, a);
        }
        a = mul(a, a);
        n >>= 1;
    }
    return res;
}
```

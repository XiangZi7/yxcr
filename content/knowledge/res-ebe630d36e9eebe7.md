## 解法




### 方法一：状态压缩动态规划 + 子集枚举



> **思考**
>
> 顾客至多 $10$ 人，每种数的存量要完整分给若干顾客。子集分配可用 $2^m$ 表示谁已被满足。
>
> 先把频次收成 $arr$，并预处理顾客子集的需求之和 $s[j]$。 $f[i][j]$ 表示前 $i$ 种数字能否满足顾客集合 $j$。
>
> 枚举 $j$ 的子集 $k$ 分给第 $i$ 种数，当 $s[k]\le arr[i]$ 且剩余集合已被前 $i-1$ 种满足时转移。答案是 $f[n-1][2^m-1]$。



我们先统计数组 $nums$ 中每个数字出现的次数，记录在哈希表 $cnt$ 中，然后将哈希表中的值存入数组 $arr$ 中，我们记数组 $arr$ 的长度为 $n$。

注意到数组 $quantity$ 的长度不超过 $10$，因此，我们可以用一个二进制数表示 $quantity$ 中的一个子集，即数字 $j$ 表示 $quantity$ 中的一个子集，其中 $j$ 的二进制表示中的第 $i$ 位为 $1$ 表示 $quantity$ 中的第 $i$ 个数字被选中，为 $0$ 表示第 $i$ 个数字未被选中。

我们可以预处理出数组 $s$，其中 $s[j]$ 表示 $quantity$ 中子集 $j$ 中所有数字的和。

接下来，我们定义 $f[i][j]$ 表示数组 $arr[0,..i-1]$ 中的数字能否成功分配给 $quantity$ 中的子集 $j$，其中 $i$ 的取值范围为 $[0,..n-1]$，而 $j$ 的取值范围为 $[0,2^m-1]$，其中 $m$ 为 $quantity$ 的长度。

考虑 $f[i][j]$，如果子集 $j$ 中存在一个子集 $k$，使得 $s[k] \leq arr[i]$，并且 $f[i-1][j \oplus k]$ 为真，那么 $f[i][j]$ 为真，否则 $f[i][j]$ 为假。

答案为 $f[n-1][2^m-1]$。

时间复杂度 $O(n \times 3^m)$，空间复杂度 $O(n \times 2^m)$。其中 $n$ 是数组 $nums$ 中不同整数的个数；而 $m$ 是数组 $quantity$ 的长度。




#### Python3


```python
class Solution:
    def canDistribute(self, nums: List[int], quantity: List[int]) -> bool:
        m = len(quantity)
        s = [0] * (1 << m)
        for i in range(1, 1 << m):
            for j in range(m):
                if i >> j & 1:
                    s[i] = s[i ^ (1 << j)] + quantity[j]
                    break
        cnt = Counter(nums)
        arr = list(cnt.values())
        n = len(arr)
        f = [[False] * (1 << m) for _ in range(n)]
        for i in range(n):
            f[i][0] = True
        for i, x in enumerate(arr):
            for j in range(1, 1 << m):
                if i and f[i - 1][j]:
                    f[i][j] = True
                    continue
                k = j
                while k:
                    ok1 = j == k if i == 0 else f[i - 1][j ^ k]
                    ok2 = s[k] <= x
                    if ok1 and ok2:
                        f[i][j] = True
                        break
                    k = (k - 1) & j
        return f[-1][-1]
```


#### TypeScript


```ts
function canDistribute(nums: number[], quantity: number[]): boolean {
    const m = quantity.length;
    const s: number[] = new Array(1 << m).fill(0);
    for (let i = 1; i < 1 << m; ++i) {
        for (let j = 0; j < m; ++j) {
            if ((i >> j) & 1) {
                s[i] = s[i ^ (1 << j)] + quantity[j];
                break;
            }
        }
    }
    const cnt: Map<number, number> = new Map();
    for (const x of nums) {
        cnt.set(x, (cnt.get(x) || 0) + 1);
    }
    const n = cnt.size;
    const arr: number[] = [];
    for (const [_, v] of cnt) {
        arr.push(v);
    }
    const f: boolean[][] = new Array(n).fill(false).map(() => new Array(1 << m).fill(false));
    for (let i = 0; i < n; ++i) {
        f[i][0] = true;
    }
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < 1 << m; ++j) {
            if (i > 0 && f[i - 1][j]) {
                f[i][j] = true;
                continue;
            }
            for (let k = j; k > 0; k = (k - 1) & j) {
                const ok1: boolean = (i == 0 && j == k) || (i > 0 && f[i - 1][j ^ k]);
                const ok2: boolean = s[k] <= arr[i];
                if (ok1 && ok2) {
                    f[i][j] = true;
                    break;
                }
            }
        }
    }
    return f[n - 1][(1 << m) - 1];
}
```

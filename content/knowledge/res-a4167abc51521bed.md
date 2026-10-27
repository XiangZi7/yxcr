## 解法




### 方法一：剪枝 + 回溯（两种方式）



> **思考**
>
> 从 $1$ 到 $9$ 中选 $k$ 个数使其和为 $n$，全集很小，可以全部枚举。按数字递增决策“选或不选”，并在剩余和、已选个数或数字越界时剪枝。
>
> 函数 $dfs(i,s)$ 表示当前考虑到 $i$、剩余和为 $s$，选 $i$ 则递归 $dfs(i+1,s-i)$，否则 $dfs(i+1,s)$。



我们设计一个函数 $dfs(i, s)$，表示当前枚举到数字 $i$，还剩下和为 $s$ 的数字需要枚举，当前搜索路径为 $t$，答案为 $ans$。

函数 $dfs(i, s)$ 的执行逻辑如下：

方式一：

- 如果 $s = 0$，且当前搜索路径 $t$ 的长度为 $k$，说明找到了一组答案，将 $t$ 加入 $ans$ 中，然后返回。
- 如果 $i \gt 9$ 或者 $i \gt s$ 或者当前搜索路径 $t$ 的长度大于 $k$，说明当前搜索路径不可能是答案，直接返回。
- 否则，我们可以选择将数字 $i$ 加入搜索路径 $t$ 中，然后继续搜索，即执行 $dfs(i + 1, s - i)$，搜索完成后，将 $i$ 从搜索路径 $t$ 中移除；我们也可以选择不将数字 $i$ 加入搜索路径 $t$ 中，直接执行 $dfs(i + 1, s)$。




#### Python3


```python
class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        def dfs(i: int, s: int):
            if s == 0:
                if len(t) == k:
                    ans.append(t[:])
                return
            if i > 9 or i > s or len(t) >= k:
                return
            t.append(i)
            dfs(i + 1, s - i)
            t.pop()
            dfs(i + 1, s)

        ans = []
        t = []
        dfs(1, n)
        return ans
```


#### TypeScript


```ts
function combinationSum3(k: number, n: number): number[][] {
    const ans: number[][] = [];
    const t: number[] = [];
    const dfs = (i: number, s: number) => {
        if (s === 0) {
            if (t.length === k) {
                ans.push(t.slice());
            }
            return;
        }
        if (i > 9 || i > s || t.length >= k) {
            return;
        }
        t.push(i);
        dfs(i + 1, s - i);
        t.pop();
        dfs(i + 1, s);
    };
    dfs(1, n);
    return ans;
}
```


#### Python3


```python
class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        def dfs(i: int, s: int):
            if s == 0:
                if len(t) == k:
                    ans.append(t[:])
                return
            if i > 9 or i > s or len(t) >= k:
                return
            for j in range(i, 10):
                t.append(j)
                dfs(j + 1, s - j)
                t.pop()

        ans = []
        t = []
        dfs(1, n)
        return ans
```


#### TypeScript


```ts
function combinationSum3(k: number, n: number): number[][] {
    const ans: number[][] = [];
    const t: number[] = [];
    const dfs = (i: number, s: number) => {
        if (s === 0) {
            if (t.length === k) {
                ans.push(t.slice());
            }
            return;
        }
        if (i > 9 || i > s || t.length >= k) {
            return;
        }
        for (let j = i; j <= 9; ++j) {
            t.push(j);
            dfs(j + 1, s - j);
            t.pop();
        }
    };
    dfs(1, n);
    return ans;
}
```


### 方法二：二进制枚举



> **思考**
>
> 回溯依赖递归栈。 $1$ 到 $9$ 只有 $2^9$ 个子集，可用长度为 $9$ 的二进制掩码枚举。
>
> 若掩码中 $1$ 的个数为 $k$ 且对应数字之和为 $n$，则收集该子集。



我们可以用一个长度为 $9$ 的二进制整数表示数字 $1$ 到 $9$ 的选取情况，其中二进制整数的第 $i$ 位表示数字 $i + 1$ 是否被选取，如果第 $i$ 位为 $1$，则表示数字 $i + 1$ 被选取，否则表示数字 $i + 1$ 没有被选取。

我们在 $[0, 2^9)$ 范围内枚举二进制整数，对于当前枚举到的二进制整数 $mask$，如果 $mask$ 的二进制表示中 $1$ 的个数为 $k$，且 $mask$ 的二进制表示中 $1$ 所对应的数字之和为 $n$，则说明 $mask$ 对应的数字选取方案是一组答案。我们将 $mask$ 对应的数字选取方案加入答案即可。

时间复杂度 $O(2^9 \times 9)$，空间复杂度 $O(k)$。

相似题目：

- [39. 组合总和](https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0039.Combination%20Sum/README.md)
- [40. 组合总和 II](https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0040.Combination%20Sum%20II/README.md)
- [77. 组合](https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0077.Combinations/README.md)




#### Python3


```python
class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        ans = []
        for mask in range(1 << 9):
            if mask.bit_count() == k:
                t = [i + 1 for i in range(9) if mask >> i & 1]
                if sum(t) == n:
                    ans.append(t)
        return ans
```


#### TypeScript


```ts
function combinationSum3(k: number, n: number): number[][] {
    const ans: number[][] = [];
    for (let mask = 0; mask < 1 << 9; ++mask) {
        if (bitCount(mask) === k) {
            const t: number[] = [];
            let s = 0;
            for (let i = 0; i < 9; ++i) {
                if (mask & (1 << i)) {
                    t.push(i + 1);
                    s += i + 1;
                }
            }
            if (s === n) {
                ans.push(t);
            }
        }
    }
    return ans;
}

function bitCount(i: number): number {
    i = i - ((i >>> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
    i = (i + (i >>> 4)) & 0x0f0f0f0f;
    i = i + (i >>> 8);
    i = i + (i >>> 16);
    return i & 0x3f;
}
```

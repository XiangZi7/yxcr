## 解法




### 方法一：回溯（两种方式）



> **思考**
>
> 若先枚举 $\{1,\ldots,n\}$ 的全部 $2^n$ 个子集，再留下长度为 $k$ 的，则大量长度不符的子集被白白生成。 $n \le 20$，时间上可以接受，但搜索可以更早剪枝。
>
> 组合与顺序无关，每个数字只决定选或不选，路径长度达到 $k$ 即可停止。因此设计 $dfs(i)$ 处理数字 $i$：先将其放入路径再递归 $i+1$，回溯后走「不选」分支。另一种写法是在剩余数字中枚举下一个 $j$，两种搜索树形状不同，答案相同；下面代码采用前一种。



我们设计一个函数 $dfs(i)$，表示从数字 $i$ 开始搜索，当前搜索路径为 $t$，答案为 $ans$。

函数 $dfs(i)$ 的执行逻辑如下：

- 如果当前搜索路径 $t$ 的长度等于 $k$，则将当前搜索路径加入答案，然后返回。
- 如果 $i \gt n$，则说明搜索已经结束，返回。
- 否则，我们可以选择将数字 $i$ 加入搜索路径 $t$，然后继续搜索，即执行 $dfs(i + 1)$，然后将数字 $i$ 从搜索路径 $t$ 中移除；或者不将数字 $i$ 加入搜索路径 $t$，直接执行 $dfs(i + 1)$。

以上做法实际上是枚举当前数字选或者不选，然后递归地搜索下一个数字。我们也可以枚举下一个要选择的数字 $j$，其中 $i \leq j \leq n$，如果下一个要选择的数字是 $j$，那么我们将数字 $j$ 加入搜索路径 $t$，然后继续搜索，即执行 $dfs(j + 1)$，接着将数字 $j$ 从搜索路径 $t$ 中移除。

在主函数中，我们从数字 $1$ 开始搜索，即执行 $dfs(1)$。

时间复杂度 $O(C_n^k \times k)$，空间复杂度 $O(k)$。其中 $C_n^k$ 表示组合数。

相似题目：

- [39. 组合总和](https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0039.Combination%20Sum/README.md)
- [40. 组合总和 II](https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0040.Combination%20Sum%20II/README.md)
- [216. 组合总和 III](https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0216.Combination%20Sum%20III/README.md)




#### Python3


```python
class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        def dfs(i: int):
            if len(t) == k:
                ans.append(t[:])
                return
            if i > n:
                return
            t.append(i)
            dfs(i + 1)
            t.pop()
            dfs(i + 1)

        ans = []
        t = []
        dfs(1)
        return ans
```


#### TypeScript


```ts
function combine(n: number, k: number): number[][] {
    const ans: number[][] = [];
    const t: number[] = [];
    const dfs = (i: number) => {
        if (t.length === k) {
            ans.push(t.slice());
            return;
        }
        if (i > n) {
            return;
        }
        t.push(i);
        dfs(i + 1);
        t.pop();
        dfs(i + 1);
    };
    dfs(1);
    return ans;
}
```


### 方法二



> **思考**
>
> 方法一按「选或不选」走到深度 $n$，不选的那一支仍会把后面的数字走完。
>
> 方法二改为枚举下一个被选中的 $j \in [i, n]$，递归深度等于已经选出的个数，搜索树更贴近长度为 $k$ 的组合。答案不变，只是把剩余候选用循环展开。






#### Python3


```python
class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        def dfs(i: int):
            if len(t) == k:
                ans.append(t[:])
                return
            if i > n:
                return
            for j in range(i, n + 1):
                t.append(j)
                dfs(j + 1)
                t.pop()

        ans = []
        t = []
        dfs(1)
        return ans
```


#### TypeScript


```ts
function combine(n: number, k: number): number[][] {
    const ans: number[][] = [];
    const t: number[] = [];
    const dfs = (i: number) => {
        if (t.length === k) {
            ans.push(t.slice());
            return;
        }
        if (i > n) {
            return;
        }
        for (let j = i; j <= n; ++j) {
            t.push(j);
            dfs(j + 1);
            t.pop();
        }
    };
    dfs(1);
    return ans;
}
```

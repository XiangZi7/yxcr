## 解法




### 方法一：动态规划



> **思考**
>
> 每次可将一段连续下标同时加一，要把全零数组变成 $target$。 $n$ 与 $target[i]$ 均可达 $10^5$，不能按高度一层层模拟。
>
> 一次覆盖 $[i,j]$ 的操作，对前缀 $target[0..i]$ 而言，等价于在更短前缀的最优方案上，仅当 $target[i]$ 高于左侧时才多出高度差这么多次。因此 $f[i]=f[i-1]+\max(0,target[i]-target[i-1])$，而 $f[0]=target[0]$。递推只用到前一项，压缩成一次相邻差扫描即可。



我们定义 $f[i]$ 表示得到 $target[0,..i]$ 的最少操作次数，初始时 $f[0] = target[0]$。

对于 $target[i]$，如果 $target[i] \leq target[i-1]$，则 $f[i] = f[i-1]$；否则 $f[i] = f[i-1] + target[i] - target[i-1]$。

最终答案即为 $f[n-1]$。

我们注意到 $f[i]$ 只与 $f[i-1]$ 有关，因此可以只用一个变量来维护操作次数。

时间复杂度 $O(n)$，其中 $n$ 为数组 $target$ 的长度。空间复杂度 $O(1)$。

相似题目：

- [3229. 使数组等于目标数组所需的最少操作次数](https://github.com/doocs/leetcode/blob/main/solution/3200-3299/3229.Minimum%20Operations%20to%20Make%20Array%20Equal%20to%20Target/README.md)




#### Python3


```python
class Solution:
    def minNumberOperations(self, target: List[int]) -> int:
        return target[0] + sum(max(0, b - a) for a, b in pairwise(target))
```


#### TypeScript


```ts
function minNumberOperations(target: number[]): number {
    let f = target[0];
    for (let i = 1; i < target.length; ++i) {
        if (target[i] > target[i - 1]) {
            f += target[i] - target[i - 1];
        }
    }
    return f;
}
```

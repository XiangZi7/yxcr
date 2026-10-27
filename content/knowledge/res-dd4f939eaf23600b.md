## 解法




### 方法一：模拟



> **思考**
>
> 区间上界为 $10^4$，判断一个数是否能被自己的每一位整除只需拆位。线性枚举区间内每个数完全可行。
>
> 含 $0$ 的数无法整除对应位，应直接排除。其余位则检查 $x$ 能否被该位整除。
>
> 对每个 $x$ 用 $y$ 逐位取末位，遇 $0$ 或不能整除则否，全部通过则收入答案。



我们定义一个函数 $\textit{check}(x)$，用来判断 $x$ 是否是自除数。函数的实现思路如下：

我们用 $y$ 来记录 $x$ 的值，然后不断地对 $y$ 除以 $10$，直到 $y$ 为 $0$。在这个过程中，我们判断 $y$ 的末位是否为 $0$，或者 $x$ 是否不能被 $y$ 的末位整除，如果满足这两个条件中的任意一个，那么 $x$ 就不是自除数，返回 $\text{false}$。否则遍历完所有的位数后，返回 $\text{true}$。

最后，我们遍历区间 $[\textit{left}, \textit{right}]$ 中的所有数，对每个数调用 $\textit{check}(x)$，如果返回 $\text{true}$，那么我们就将这个数加入答案数组中。

时间复杂度 $O(n \times \log_{10} M)$，其中 $n$ 是区间 $[\textit{left}, \textit{right}]$ 中的元素个数，而 $M = \textit{right}$，表示区间中的最大值。




#### Python3


```python
class Solution:
    def selfDividingNumbers(self, left: int, right: int) -> List[int]:
        def check(x: int) -> bool:
            y = x
            while y:
                if y % 10 == 0 or x % (y % 10):
                    return False
                y //= 10
            return True

        return [x for x in range(left, right + 1) if check(x)]
```


#### TypeScript


```ts
function selfDividingNumbers(left: number, right: number): number[] {
    const check = (x: number): boolean => {
        for (let y = x; y; y = Math.floor(y / 10)) {
            if (y % 10 === 0 || x % (y % 10) !== 0) {
                return false;
            }
        }
        return true;
    };
    return Array.from({ length: right - left + 1 }, (_, i) => i + left).filter(check);
}
```

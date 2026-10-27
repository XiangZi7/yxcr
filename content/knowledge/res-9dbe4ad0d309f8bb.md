## 解法




### 方法一：模拟



> **思考**
>
> 每个前缀对应的整数可直接算出再判断能否被 $5$ 整除，但 $n\le 10^5$ 时数值高达 $2^{10^5}$，不能真的保存。可整除性只需要模 $5$。
>
> 新前缀等于旧值左移一位再或上当前位，即 $x\leftarrow (2x+v)\bmod 5$。
>
> 按此递推每个前缀的余数，余数为 $0$ 则该前缀合法。



我们用一个变量 $x$ 来表示当前的二进制前缀，然后遍历数组 $nums$，对于每个元素 $v$，我们将 $x$ 左移一位，然后加上 $v$，再对 $5$ 取模，判断是否等于 $0$，如果等于 $0$，则说明当前的二进制前缀可以被 $5$ 整除，我们将 $\textit{true}$ 加入答案数组，否则将 $\textit{false}$ 加入答案数组。

时间复杂度 $O(n)$，忽略答案数组的空间消耗，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def prefixesDivBy5(self, nums: List[int]) -> List[bool]:
        ans = []
        x = 0
        for v in nums:
            x = (x << 1 | v) % 5
            ans.append(x == 0)
        return ans
```


#### TypeScript


```ts
function prefixesDivBy5(nums: number[]): boolean[] {
    const ans: boolean[] = [];
    let x = 0;
    for (const v of nums) {
        x = ((x << 1) | v) % 5;
        ans.push(x === 0);
    }
    return ans;
}
```

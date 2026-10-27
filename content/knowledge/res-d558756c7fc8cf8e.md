## 解法




### 方法一：拒绝采样



> **思考**
>
> 用均匀的 $rand7$ 造均匀的 $rand10$。直接 $\textit{rand7}\bmod 10$ 会偏斜。两次调用可生成 $[1,49]$ 的均匀整数。
>
> 拒绝采样：保留 $[1,40]$，映射为 $x\bmod 10+1$；落在 $41$– $49$ 则重来。 $40$ 能被 $10$ 整除，十个残差各出现四次，因而均匀。
>
> 期望调用次数为常数。拒绝区间保证每个结果概率相同。



我们可以使用拒绝采样的方法实现等概率生成任意区间的随机数。拒绝采样的思路是如果生成的随机数落在我们希望的区间内，那么就返回该随机数，否则会不断生成直到生成一个落在区间内的随机数为止。

对于本题，我们可以通过调用 $rand7()$ 两次来实现生成 $[1,10]$ 以内的随机数，具体如下：

我们生成一个大于等于 $1$ 且小于等于 $40$ 的整数 $x$，其中等概率生成的方式为 $x = (rand7() - 1) \times 7 + rand7()$，然后，我们返回 $x \bmod 10 + 1$ 即可。

期望时间复杂度为 $O(1)$，但是最坏情况下会达到无穷大的时间复杂度。空间复杂度为 $O(1)$。




#### Python3


```python
# The rand7() API is already defined for you.
# def rand7():
# @return a random integer in the range 1 to 7


class Solution:
    def rand10(self):
        """
        :rtype: int
        """
        while 1:
            i = rand7() - 1
            j = rand7()
            x = i * 7 + j
            if x <= 40:
                return x % 10 + 1
```


#### TypeScript


```ts
/**
 * The rand7() API is already defined for you.
 * function rand7(): number {}
 * @return a random integer in the range 1 to 7
 */

function rand10(): number {
    while (true) {
        const i = rand7() - 1;
        const j = rand7();
        const x = i * 7 + j;
        if (x <= 40) {
            return (x % 10) + 1;
        }
    }
}
```

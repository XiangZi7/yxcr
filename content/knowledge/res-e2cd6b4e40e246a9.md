## 解法




### 方法一：位运算



> **思考**
>
> 补数是在不含前导零的二进制长度内按位取反。直接取反会连高位的 $0$ 一起翻成 $1$。
>
> 用 $2^{\textit{bit\_length}}-1$ 做掩码，与原数异或，只翻转有效位。
>
> 掩码长度恰好等于最高位 $1$ 的位置，前导零不会进入结果。



根据题目描述，我们可以通过异或运算来实现取反的操作，步骤如下：

我们首先找到 $\textit{num}$ 的二进制表示中最高位的 $1$，位置记为 $k$。

然后，构造一个二进制数，第 $k$ 位为 $0$，其余低位为 $1$，即 $2^k - 1$；

最后，将 $\textit{num}$ 与上述构造的二进制数进行异或运算，即可得到答案。

时间复杂度 $O(\log \textit{num})$，其中 $\textit{num}$ 为输入的整数。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def findComplement(self, num: int) -> int:
        return num ^ ((1 << num.bit_length()) - 1)
```


#### TypeScript


```ts
function findComplement(num: number): number {
    return num ^ (2 ** num.toString(2).length - 1);
}
```


### 方法二：位运算（取反+按位与）



> **思考**
>
> 方法一用异或。也可以先按位取反，再与同样的低位全 $1$ 掩码相与，只保留有效宽度。实现语言不同，语义一致。






#### TypeScript


```ts
function findComplement(num: number): number {
    return ~num & (2 ** num.toString(2).length - 1);
}
```

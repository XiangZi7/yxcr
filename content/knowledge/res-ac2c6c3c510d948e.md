## 解法




### 方法一：模拟



> **思考**
>
> 负二进制加法与普通加法一样从低位进位，但基为 $-2$，进位规则不同： $2\times(-2)^i=-(-2)^{i+1}$， $-1\times(-2)^i=(-2)^i+(-2)^{i+1}$。长度 $\le 1000$，按位模拟即可。
>
> 从右往左取 $a+b+c$。和 $\ge 2$ 则减 $2$ 并向高位进 $-1$；和为 $-1$ 则写 $1$ 并进 $1$。
>
> 结果低位在前，去掉多余前导 $0$ 后反转。



我们遍历两个数组，从最低位开始，记两个数组当前位的数字为 $a$ 和 $b$，进位为 $c$，三个数相加的结果为 $x$。

- 先将进位 $c$ 置为 $0$。
- 如果 $x \geq 2$，由于 $(-2)^{i} + (-2)^{i} = -(-2)^{i+1}$，所以我们可以将 $x$ 减去 $2$，并向高位进位 $-1$。
- 如果 $x = -1$，由于 $-(-2)^{i} = (-2)^{i} + (-2)^{i+1}$，所以我们可以将 $x$ 置为 $1$，并向高位进位 $1$。

然后，我们将 $x$ 加入到答案数组中，然后继续处理下一位。

遍历结束后，去除答案数组中末尾的 $0$，并将数组反转，即可得到最终的答案。

时间复杂度 $O(\max(n, m))$，其中 $n$ 和 $m$ 分别是两个数组的长度。忽略答案的空间消耗，空间复杂度 $O(1)$。

相似题目：

- [1017. 负二进制转换](https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1017.Convert%20to%20Base%20-2/README.md)




#### Python3


```python
class Solution:
    def addNegabinary(self, arr1: List[int], arr2: List[int]) -> List[int]:
        i, j = len(arr1) - 1, len(arr2) - 1
        c = 0
        ans = []
        while i >= 0 or j >= 0 or c:
            a = 0 if i < 0 else arr1[i]
            b = 0 if j < 0 else arr2[j]
            x = a + b + c
            c = 0
            if x >= 2:
                x -= 2
                c -= 1
            elif x == -1:
                x = 1
                c += 1
            ans.append(x)
            i, j = i - 1, j - 1
        while len(ans) > 1 and ans[-1] == 0:
            ans.pop()
        return ans[::-1]
```


#### TypeScript


```ts
function addNegabinary(arr1: number[], arr2: number[]): number[] {
    let i = arr1.length - 1,
        j = arr2.length - 1;
    const ans: number[] = [];
    for (let c = 0; i >= 0 || j >= 0 || c; --i, --j) {
        const a = i < 0 ? 0 : arr1[i];
        const b = j < 0 ? 0 : arr2[j];
        let x = a + b + c;
        c = 0;
        if (x >= 2) {
            x -= 2;
            c -= 1;
        } else if (x === -1) {
            x = 1;
            c += 1;
        }
        ans.push(x);
    }
    while (ans.length > 1 && ans[ans.length - 1] === 0) {
        ans.pop();
    }
    return ans.reverse();
}
```

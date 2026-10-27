## 解法




### 方法一：贪心



> **思考**
>
> $num\le 10^8$，数位很少。一次替换会改写所有相同数字，要让差值最大，应分别构造替换后的最大数与最小数。
>
> 最大数：从高位找到第一个不是 $9$ 的数字，把它全部换成 $9$。最小数：若首位不是 $1$，把该数字全换成 $1$；否则在后续位找一个不是 $0$ 或 $1$ 的数字换成 $0$，以免出现前导零或与首位冲突。



要想得到最大差值，那么我们应该拿到最大值与最小值，这样差值最大。

因此，我们先从高到低枚举 $\textit{nums}$ 每个位置上的数，如果数字不为 `9`，就将所有该数字替换为 `9`，得到最大整数 $a$。

接下来，我们再从高到低枚举 $\textit{nums}$ 每个位置上的数，首位不能为 `0`，因此如果首位不为 `1`，我们将其替换为 `1`；如果非首位，且数字不与首位相同，我们将其替换为 `0`，得到最大整数 $b$。

答案为差值 $a - b$。

时间复杂度 $O(\log \textit{num})$，空间复杂度 $O(\log \textit{num})$。其中 $\textit{nums}$ 为给定整数。




#### Python3


```python
class Solution:
    def maxDiff(self, num: int) -> int:
        a, b = str(num), str(num)
        for c in a:
            if c != "9":
                a = a.replace(c, "9")
                break
        if b[0] != "1":
            b = b.replace(b[0], "1")
        else:
            for c in b[1:]:
                if c not in "01":
                    b = b.replace(c, "0")
                    break
        return int(a) - int(b)
```


#### TypeScript


```ts
function maxDiff(num: number): number {
    let a = num.toString();
    let b = a;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== '9') {
            a = a.split(a[i]).join('9');
            break;
        }
    }
    if (b[0] !== '1') {
        b = b.split(b[0]).join('1');
    } else {
        for (let i = 1; i < b.length; ++i) {
            if (b[i] !== '0' && b[i] !== '1') {
                b = b.split(b[i]).join('0');
                break;
            }
        }
    }
    return +a - +b;
}
```

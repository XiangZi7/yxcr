## 解法




### 方法一：枚举



> **思考**
>
> 完美数要求真因子之和等于自身。枚举 $1$ 到 $num-1$ 的因子在 $num \le 10^8$ 时过慢。
>
> 因子成对出现：若 $i$ 整除 $num$，则 $num/i$ 也是因子，枚举上界可收到 $\sqrt{num}$。 $1$ 的真因子之和为 $0$，需单独排除。累加全部真因子后与 $num$ 比较即可。



我们首先判断 $\textit{num}$ 是否为 1，如果为 1，则 $\textit{num}$ 不是完美数，返回 $\text{false}$。

然后，我们从 2 开始枚举 $\textit{num}$ 的所有正因子，如果 $\textit{num}$ 能被 $\textit{num}$ 的某个正因子 $i$ 整除，那么我们将 $i$ 加入到答案 $\textit{s}$ 中。如果 $\textit{num}$ 除以 $i$ 得到的商不等于 $i$，我们也将 $\textit{num}$ 除以 $i$ 得到的商加入到答案 $\textit{s}$ 中。

最后，我们判断 $\textit{s}$ 是否等于 $\textit{num}$ 即可。

时间复杂度 $O(\sqrt{n})$，其中 $n$ 为 $\textit{num}$ 的大小。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def checkPerfectNumber(self, num: int) -> bool:
        if num == 1:
            return False
        s, i = 1, 2
        while i <= num // i:
            if num % i == 0:
                s += i
                if i != num // i:
                    s += num // i
            i += 1
        return s == num
```


#### TypeScript


```ts
function checkPerfectNumber(num: number): boolean {
    if (num <= 1) {
        return false;
    }
    let s = 1;
    for (let i = 2; i <= num / i; ++i) {
        if (num % i === 0) {
            s += i;
            if (i * i !== num) {
                s += num / i;
            }
        }
    }
    return s === num;
}
```

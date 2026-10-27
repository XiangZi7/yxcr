## 解法




### 方法一



> **思考**
>
> 将数字串切成若干属于 $[1,k]$ 且无前导零的整数， $n\le 10^5$，枚举所有切法不可行。 $k\le 10^9$，从某一位置向后延伸的合法数字长度不超过 $10$。
>
> 定义 $f(i)$ 为后缀 $s[i:]$ 的恢复方案数：若 $s[i]='0'$ 则无法开始；否则枚举结束位置 $j$，在数值 $\le k$ 时累加 $f(j+1)$。对 $f(i)$ 记忆化或改写成从右向左的线性 DP。



从右往左计算 $f(i)$， $f(n)=1$。 $s[i]='0'$ 时 $f(i)=0$；否则从下标 $i$ 起向右拼数，数值一旦大于 $k$ 就停止，并把每个合法切点后的 $f(j+1)$ 累加进 $f(i)$。答案是 $f(0)$，对 $10^9+7$ 取模。

时间复杂度 $O(n \times d)$，空间复杂度 $O(n)$。其中 $n$ 是 $s$ 的长度， $d$ 是 $k$ 的十进制位数，不超过 $10$。




#### Python3


```python
class Solution:
    def numberOfArrays(self, s: str, k: int) -> int:
        mod = 10**9 + 7
        n = len(s)
        f = [0] * (n + 1)
        f[n] = 1
        for i in range(n - 1, -1, -1):
            if s[i] == '0':
                continue
            x = 0
            for j in range(i, n):
                x = x * 10 + int(s[j])
                if x > k:
                    break
                f[i] = (f[i] + f[j + 1]) % mod
        return f[0]
```


### 方法二：环形数组优化空间



> **思考**
>
> 方法一为每个后缀都保存一个状态，但从某个位置开始的数字最多只有 $d$ 位，其中 $d$ 是 $k$ 的十进制位数。我们从右向左计算时，当前状态只会读取后面 $d$ 个后缀的答案。因此可以用长度为 $d+1$ 的环形数组保留这些状态：当前位置对应的槽位不会覆盖接下来还要读取的值。转移保持不变，空间不再随字符串长度增长。



设 $f(i)$ 为后缀 $s[i:]$ 的合法拆分数，初始 $f(n)=1$。若 $s[i]$ 为 `0`，则 $f(i)=0$；否则从位置 $i$ 起取至多 $d$ 位，只要数值不超过 $k$，就把对应的 $f(j+1)$ 加入答案，并对 $10^9+7$ 取模。

把 $f(i)$ 存在下标 $i \bmod (d+1)$。计算它时只读取下标在 $[i+1,i+d]$ 的状态，这些状态都不会占用 $i$ 的槽位。时间复杂度与方法一相同，为 $O(nd)$；辅助空间从 $O(n)$ 降为 $O(d)$，且这里 $d\le 10$。




#### Python3


```python
class Solution:
    def numberOfArrays(self, s: str, k: int) -> int:
        mod = 10**9 + 7
        n = len(s)
        d = len(str(k))
        f = [0] * (d + 1)
        f[n % (d + 1)] = 1
        for i in range(n - 1, -1, -1):
            ways = 0
            if s[i] != '0':
                value = 0
                for j in range(i, min(n, i + d)):
                    value = value * 10 + int(s[j])
                    if value > k:
                        break
                    ways = (ways + f[(j + 1) % (d + 1)]) % mod
            f[i % (d + 1)] = ways
        return f[0]
```


#### TypeScript


```ts
function numberOfArrays(s: string, k: number): number {
    const mod = 1e9 + 7;
    const n = s.length;
    const d = String(k).length;
    const f = Array(d + 1).fill(0);
    f[n % (d + 1)] = 1;
    for (let i = n - 1; i >= 0; --i) {
        let ways = 0;
        if (s[i] !== '0') {
            let value = 0;
            for (let j = i; j < n && j < i + d; ++j) {
                value = value * 10 + s.charCodeAt(j) - 48;
                if (value > k) {
                    break;
                }
                ways = (ways + f[(j + 1) % (d + 1)]) % mod;
            }
        }
        f[i % (d + 1)] = ways;
    }
    return f[0];
}
```

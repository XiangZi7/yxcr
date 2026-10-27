## 解法




### 方法一：预处理 + 枚举



> **思考**
>
> 超级回文数 $x=p^2$ 落在 $[L,R]\subseteq[1,10^{18})$。若枚举区间内每个平方再判回文，范围过大。 $p$ 本身必须是回文且 $p<10^9$，其前半部分至多 $10^5$ 量级。
>
> 预处理所有由前半拼接（含或不含中间位）得到的回文 $p$，再检验 $p^2$ 是否落在 $[L,R]$ 且为回文。



根据题目描述，我们假设超级回文数 $x = p^2 \in [1, 10^{18})$，其中 $p$ 是回文数，那么 $p \in [1, 10^9)$。我们可以枚举回文数 $p$ 的前半部分，然后将其翻转后拼接，得到所有的回文数，记录在数组 $ps$ 中。

接下来，我们遍历数组 $ps$，对于每个 $p$，我们计算 $p^2$，判断是否在区间 $[L, R]$ 中，同时判断 $p^2$ 是否是回文数，若是，答案加一。

遍历结束后，返回答案即可。

时间复杂度 $O(M^{\frac{1}{4}} \times \log M)$，空间复杂度 $O(M^{\frac{1}{4}})$。其中 $M$ 是 $L$ 和 $R$ 的上界，本题中 $M \leq 10^{18}$。

相似题目：

- [2967. 使数组成为等数数组的最小代价](https://github.com/doocs/leetcode/blob/main/solution/2900-2999/2967.Minimum%20Cost%20to%20Make%20Array%20Equalindromic/README.md)




#### Python3


```python
ps = []
for i in range(1, 10**5 + 1):
    s = str(i)
    t1 = s[::-1]
    t2 = s[:-1][::-1]
    ps.append(int(s + t1))
    ps.append(int(s + t2))


class Solution:
    def superpalindromesInRange(self, left: str, right: str) -> int:
        def is_palindrome(x: int) -> bool:
            y, t = 0, x
            while t:
                y = y * 10 + t % 10
                t //= 10
            return x == y

        l, r = int(left), int(right)
        return sum(l <= x <= r and is_palindrome(x) for x in map(lambda x: x * x, ps))
```


#### TypeScript


```ts
const ps = Array(2e5).fill(0);

const init = (() => {
    for (let i = 1; i <= 1e5; ++i) {
        const s: string = i.toString();
        const t1: string = s.split('').reverse().join('');
        const t2: string = s.slice(0, -1).split('').reverse().join('');
        ps[2 * i - 2] = parseInt(s + t1, 10);
        ps[2 * i - 1] = parseInt(s + t2, 10);
    }
})();

function superpalindromesInRange(left: string, right: string): number {
    const l = BigInt(left);
    const r = BigInt(right);
    const isPalindrome = (x: bigint): boolean => {
        const s: string = x.toString();
        return s === s.split('').reverse().join('');
    };
    let ans = 0;
    for (const p of ps) {
        const x = BigInt(p) * BigInt(p);
        if (x >= l && x <= r && isPalindrome(x)) {
            ++ans;
        }
    }
    return ans;
}
```

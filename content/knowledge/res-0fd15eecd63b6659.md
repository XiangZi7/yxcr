## 解法




### 方法一：计数



> **思考**
>
> $n\le 500$，对每个切点分别数左右 $0$、 $1$ 可行，但会重复扫描。分数是左段 $0$ 的个数加右段 $1$ 的个数。
>
> 先统计全串的 $1$ 作为右段初值，再从左到右移动切点：遇 $0$ 则左计数加一，遇 $1$ 则右计数减一，维护 $l+r$ 的最大值。最后一位不能切开。



我们用两个变量 $l$ 和 $r$ 分别记录左子字符串中 $0$ 的数量和右子字符串中 $1$ 的数量。初始时 $l = 0$，而 $r$ 则等于字符串 $s$ 中 $1$ 的数量。

遍历字符串 $s$ 的前 $n - 1$ 个字符，对于每一个位置 $i$，如果 $s[i] = 0$，则 $l$ 自增 $1$，否则 $r$ 自减 $1$。然后我们更新答案为 $l + r$ 的最大值。

时间复杂度 $O(n)$，其中 $n$ 为字符串 $s$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def maxScore(self, s: str) -> int:
        l, r = 0, s.count("1")
        ans = 0
        for x in s[:-1]:
            l += int(x) ^ 1
            r -= int(x)
            ans = max(ans, l + r)
        return ans
```


#### TypeScript


```ts
function maxScore(s: string): number {
    let [l, r] = [0, 0];
    for (const c of s) {
        r += c === '1' ? 1 : 0;
    }
    let ans = 0;
    for (let i = 0; i < s.length - 1; ++i) {
        if (s[i] === '0') {
            ++l;
        } else {
            --r;
        }
        ans = Math.max(ans, l + r);
    }
    return ans;
}
```

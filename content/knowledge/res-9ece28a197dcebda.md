## 解法




### 方法一：计数



> **思考**
>
> 若枚举将 $s$ 划分成 $k$ 段并逐段验证回文，划分方案数随 $n$ 指数增长。 $n,k\le 10^5$，因此只能依据回文的计数性质直接判定可否构造。
>
> 每个回文串至多有一个出现奇数次的字符作为中心，其余字符必须成对出现。 $k$ 个回文串至多消耗 $k$ 个奇数字符；同时每个回文至少占用一个字符，故 $|s|<k$ 时必然不可行。
>
> 为此先比较长度与 $k$，再用哈希表统计各字符频次，判断奇数频次的个数是否不超过 $k$。偶对可任意拆分到各串中，不必真正构造。



我们先判断字符串 $s$ 的长度是否小于 $k$，如果是，那么一定无法构造出 $k$ 个回文串，可以直接返回 `false`。

否则，我们用一个哈希表或数组 $cnt$ 统计字符串 $s$ 中每个字符出现的次数。最后，我们只需要统计 $cnt$ 中奇数次数的字符个数 $x$，如果 $x$ 大于 $k$，那么一定无法构造出 $k$ 个回文串，返回 `false`；否则，返回 `true`。

时间复杂度 $O(n)$，空间复杂度 $O(C)$。其中 $n$ 是字符串 $s$ 的长度；而 $C$ 是字符集大小，这里 $C=26$。




#### Python3


```python
class Solution:
    def canConstruct(self, s: str, k: int) -> bool:
        if len(s) < k:
            return False
        cnt = Counter(s)
        return sum(v & 1 for v in cnt.values()) <= k
```


#### TypeScript


```ts
function canConstruct(s: string, k: number): boolean {
    if (s.length < k) {
        return false;
    }
    const cnt: number[] = new Array(26).fill(0);
    for (const c of s) {
        ++cnt[c.charCodeAt(0) - 'a'.charCodeAt(0)];
    }
    let x = 0;
    for (const v of cnt) {
        x += v & 1;
    }
    return x <= k;
}
```

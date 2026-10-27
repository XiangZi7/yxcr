## 解法




### 方法一：贪心



> **思考**
>
> 对应位置相同则无需交换。错位只有 $xy$ 与 $yx$ 两种。两次同类错位一次交换即可对调；一奇一偶的一对需要两次交换；总数为奇数则无解。
>
> 统计两类个数，奇偶性不合法返回 $-1$，否则答案为各自折半再加上至多一对跨类交换。贪心配对不依赖具体位置。



根据题目描述，两个字符串 $s_1$ 和 $s_2$ 都只包含字符 $x$ 和 $y$，且长度相同，因此可以将 $s_1$ 和 $s_2$ 中的字符一一对应起来，即 $s_1[i]$ 和 $s_2[i]$。

如果 $s_1[i] = s_2[i]$，则不需要交换，直接跳过即可。如果 $s_1[i] \neq s_2[i]$，则需要交换，我们统计 $s_1[i]$ 和 $s_2[i]$ 的组合情况，即 $s_1[i] = x$ 且 $s_2[i] = y$ 的情况，记为 $xy$，对于 $s_1[i] = y$ 且 $s_2[i] = x$ 的情况，记为 $yx$。

如果 $xy + yx$ 为奇数，则无法完成交换，返回 $-1$。如果 $xy + yx$ 为偶数，则需要交换的次数为 $\left \lfloor \frac{x}{2} \right \rfloor$ + $\left \lfloor \frac{y}{2} \right \rfloor$ + $xy \bmod{2}$ + $yx \bmod{2}$。

时间复杂度 $O(n)$，其中 $n$ 为字符串 $s_1$ 和 $s_2$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def minimumSwap(self, s1: str, s2: str) -> int:
        xy = yx = 0
        for a, b in zip(s1, s2):
            xy += a < b
            yx += a > b
        if (xy + yx) % 2:
            return -1
        return xy // 2 + yx // 2 + xy % 2 + yx % 2
```


#### TypeScript


```ts
function minimumSwap(s1: string, s2: string): number {
    let xy = 0,
        yx = 0;

    for (let i = 0; i < s1.length; ++i) {
        const a = s1[i],
            b = s2[i];
        xy += a < b ? 1 : 0;
        yx += a > b ? 1 : 0;
    }

    if ((xy + yx) % 2 !== 0) {
        return -1;
    }

    return Math.floor(xy / 2) + Math.floor(yx / 2) + (xy % 2) + (yx % 2);
}
```

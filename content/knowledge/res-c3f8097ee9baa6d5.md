## 解法




### 方法一：计数 + 模拟



> **思考**
>
> 若干青蛙的 `croak` 交错出现，长度为 $10^5$，不能回溯匹配每一只青蛙。五个字母必须按 $c\to r\to o\to a\to k$ 的顺序推进。
>
> 用长度为 $5$ 的计数表示当前停在各阶段的叫声。遇到 $c$ 表示新开一只未完成的青蛙；遇到后续字母必须消耗前一阶段，否则非法。 $k$ 完成一只，并发数减一。
>
> 答案是过程中未完成青蛙数的最大值；结束时若仍有未完成者，或长度不是 $5$ 的倍数，则返回 $-1$。



我们注意到，如果字符串 `croakOfFrogs` 是由若干有效的 `"croak"` 字符混合而成，那么它的长度一定是 $5$ 的倍数。因此，如果字符串的长度不是 $5$ 的倍数，可以直接返回 $-1$。

接下来，我们将 `'c'`, `'r'`, `'o'`, `'a'`, `'k'` 这 $5$ 个字母分别对应下标 $0$ 到 $4$，用一个长度为 $5$ 的数组 $cnt$ 记录字符串 `croakOfFrogs` 中每个字母出现的次数，其中 $cnt[i]$ 表示当前下标为 $i$ 的字母出现的次数。另外，我们定义一个整数变量 $x$ 表示当前未完成蛙鸣的青蛙的数目，需要的青蛙的最少数目 $ans$ 即为 $x$ 的最大值。

我们遍历字符串 `croakOfFrogs` 中的每个字母 $c$，找到 $c$ 对应的下标 $i$，然后将 $cnt[i]$ 加 $1$。接下来，根据 $i$ 值的不同，我们分别进行如下操作：

- 如果 $i=0$，那么当前有一个新的青蛙开始蛙鸣，因此令 $x$ 的值加 $1$，然后我们更新 $ans = \max(ans, x)$；
- 否则，如果 $cnt[i-1]=0$，那么表示当前没有青蛙可以发出字母 $c$，无法完成蛙鸣，返回 $-1$，否则我们令 $cnt[i-1]$ 减 $1$。如果 $i=4$，那么表示青蛙已经完成了一个蛙鸣，因此令 $x$ 的值减 $1$。

遍历结束后，如果 $x=0$，那么说明青蛙已经完成了所有的蛙鸣，返回 $ans$，否则返回 $-1$。

时间复杂度 $O(n)$，空间复杂度 $O(C)$。其中 $n$ 是字符串 `croakOfFrogs` 的长度；而 $C$ 是字符集的大小，本题中 $C=26$。




#### Python3


```python
class Solution:
    def minNumberOfFrogs(self, croakOfFrogs: str) -> int:
        if len(croakOfFrogs) % 5 != 0:
            return -1
        idx = {c: i for i, c in enumerate('croak')}
        cnt = [0] * 5
        ans = x = 0
        for i in map(idx.get, croakOfFrogs):
            cnt[i] += 1
            if i == 0:
                x += 1
                ans = max(ans, x)
            else:
                if cnt[i - 1] == 0:
                    return -1
                cnt[i - 1] -= 1
                if i == 4:
                    x -= 1
        return -1 if x else ans
```


#### TypeScript


```ts
function minNumberOfFrogs(croakOfFrogs: string): number {
    const n = croakOfFrogs.length;
    if (n % 5 !== 0) {
        return -1;
    }
    const idx = (c: string): number => 'croak'.indexOf(c);
    const cnt: number[] = [0, 0, 0, 0, 0];
    let ans = 0;
    let x = 0;
    for (const c of croakOfFrogs) {
        const i = idx(c);
        ++cnt[i];
        if (i === 0) {
            ans = Math.max(ans, ++x);
        } else {
            if (--cnt[i - 1] < 0) {
                return -1;
            }
            if (i === 4) {
                --x;
            }
        }
    }
    return x > 0 ? -1 : ans;
}
```

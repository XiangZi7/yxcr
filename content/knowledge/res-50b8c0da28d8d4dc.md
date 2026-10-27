## 解法




### 方法一：哈希表或数组



> **思考**
>
> 同构要求 $s$ 与 $t$ 的字符一一对应；仅记录单向映射无法发现多对一。两串等长且字符集有限，一遍扫描即可判定。
>
> 为此维护 $d_1,d_2$ 分别记录 $s\to t$ 与 $t\to s$，一旦与已有映射冲突则返回否，否则更新后继续。



我们可以用两个哈希表或数组 $d_1$ 和 $d_2$ 记录 $s$ 和 $t$ 中字符的映射关系。

遍历 $s$ 和 $t$，如果 $d_1$ 和 $d_2$ 中对应的字符映射关系不同，则返回 `false`，否则更新 $d_1$ 和 $d_2$ 中对应的字符映射关系。遍历结束，说明 $s$ 和 $t$ 是同构的，返回 `true`。

时间复杂度 $O(n)$，空间复杂度 $O(C)$。其中 $n$ 为字符串 $s$ 的长度；而 $C$ 为字符集大小，本题中 $C = 256$。




#### Python3


```python
class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        d1 = {}
        d2 = {}
        for a, b in zip(s, t):
            if (a in d1 and d1[a] != b) or (b in d2 and d2[b] != a):
                return False
            d1[a] = b
            d2[b] = a
        return True
```


#### TypeScript


```ts
function isIsomorphic(s: string, t: string): boolean {
    const d1: number[] = new Array(256).fill(0);
    const d2: number[] = new Array(256).fill(0);
    for (let i = 0; i < s.length; ++i) {
        const a = s.charCodeAt(i);
        const b = t.charCodeAt(i);
        if (d1[a] !== d2[b]) {
            return false;
        }
        d1[a] = i + 1;
        d2[b] = i + 1;
    }
    return true;
}
```


### 方法二



> **思考**
>
> 方法一的两张表语义正确，哈希实现带常数开销。字符集大小固定为 $256$，可用数组代替。
>
> 把“上次出现的位置”写成同一时间戳：若两字符已记录的下标不同，则映射不一致。






#### Python3


```python
class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        d1, d2 = [0] * 256, [0] * 256
        for i, (a, b) in enumerate(zip(s, t), 1):
            a, b = ord(a), ord(b)
            if d1[a] != d2[b]:
                return False
            d1[a] = d2[b] = i
        return True
```

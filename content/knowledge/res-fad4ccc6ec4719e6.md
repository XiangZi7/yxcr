## 解法




### 方法一：哈希表



> **思考**
>
> 模式与单词须一一对应，长度不等则否。与同构字符串相同，用两张表分别记录字符到单词、单词到字符。
>
> 一旦与已有映射冲突则失败。



我们先将字符串 $s$ 按照空格分割成单词数组 $ws$，如果 $pattern$ 和 $ws$ 的长度不相等，直接返回 `false`。否则，我们使用两个哈希表 $d_1$ 和 $d_2$，分别记录 $pattern$ 和 $ws$ 中每个字符和单词的对应关系。

接下来，我们遍历 $pattern$ 和 $ws$，对于每个字符 $a$ 和单词 $b$，如果 $d_1$ 中存在 $a$ 的映射，且映射的单词不是 $b$，或者 $d_2$ 中存在 $b$ 的映射，且映射的字符不是 $a$，则返回 `false`。否则，我们将 $a$ 和 $b$ 的映射分别加入 $d_1$ 和 $d_2$ 中。

遍历结束后，返回 `true`。

时间复杂度 $O(m + n)$，空间复杂度 $O(m + n)$。其中 $m$ 和 $n$ 分别是 $pattern$ 和字符串 $s$ 的长度。




#### Python3


```python
class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        ws = s.split()
        if len(pattern) != len(ws):
            return False
        d1 = {}
        d2 = {}
        for a, b in zip(pattern, ws):
            if (a in d1 and d1[a] != b) or (b in d2 and d2[b] != a):
                return False
            d1[a] = b
            d2[b] = a
        return True
```


#### TypeScript


```ts
function wordPattern(pattern: string, s: string): boolean {
    const ws = s.split(' ');
    if (pattern.length !== ws.length) {
        return false;
    }
    const d1 = new Map<string, string>();
    const d2 = new Map<string, string>();
    for (let i = 0; i < pattern.length; ++i) {
        const a = pattern[i];
        const b = ws[i];
        if (d1.has(a) && d1.get(a) !== b) {
            return false;
        }
        if (d2.has(b) && d2.get(b) !== a) {
            return false;
        }
        d1.set(a, b);
        d2.set(b, a);
    }
    return true;
}
```


### 方法二：哈希表的另一种写法



> **思考**
>
> 两张表可换成：先要求模式中不同字符个数等于不同单词个数，再维护单向映射即可发现一对多。






#### TypeScript


```ts
function wordPattern(pattern: string, s: string): boolean {
    const hash: Record<string, string> = Object.create(null);
    const arr = s.split(/\s+/);

    if (pattern.length !== arr.length || new Set(pattern).size !== new Set(arr).size) {
        return false;
    }

    for (let i = 0; i < pattern.length; i++) {
        hash[pattern[i]] ??= arr[i];
        if (hash[pattern[i]] !== arr[i]) {
            return false;
        }
    }

    return true;
}
```

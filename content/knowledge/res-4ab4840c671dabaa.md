## 解法




### 方法一：双指针



> **思考**
>
> 判断 $\textit{typed}$ 是否由 $\textit{name}$ 经长按得到，即每一段连续相同字符只能变长、不能变短或换字母。长度至多 $1000$，按段比较即可。
>
> 双指针同时扫两串：当前字符必须相同，再各自数完这一段；若 $\textit{name}$ 该段更长则失败。两串都恰好走完才合法。



我们利用两个指针 $i$ 和 $j$ 分别指向字符串 $\textit{typed}$ 和 $\textit{name}$ 的第一个字符，然后开始遍历，如果 $\textit{typed}[j] \neq \textit{name}[i]$，说明两个字符串不匹配，直接返回 $\textit{False}$。否则，我们找到连续相同的字符的下一个位置，分别记为 $x$ 和 $y$，如果 $x - i > y - j$，说明 $\textit{typed}$ 中的字符个数小于 $\textit{name}$ 中的字符个数，直接返回 $\textit{False}$。否则，我们将 $i$ 和 $j$ 更新为 $x$ 和 $y$，继续遍历，直到 $i$ 和 $j$ 分别遍历完 $\textit{name}$ 和 $\textit{typed}$，返回 $\textit{True}$。

时间复杂度 $O(m + n)$，其中 $m$ 和 $n$ 分别是字符串 $\textit{name}$ 和 $\textit{typed}$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def isLongPressedName(self, name: str, typed: str) -> bool:
        m, n = len(name), len(typed)
        i = j = 0
        while i < m and j < n:
            if name[i] != typed[j]:
                return False
            x = i + 1
            while x < m and name[x] == name[i]:
                x += 1
            y = j + 1
            while y < n and typed[y] == typed[j]:
                y += 1
            if x - i > y - j:
                return False
            i, j = x, y
        return i == m and j == n
```


#### TypeScript


```ts
function isLongPressedName(name: string, typed: string): boolean {
    const [m, n] = [name.length, typed.length];
    let i = 0;
    let j = 0;
    while (i < m && j < n) {
        if (name[i] !== typed[j]) {
            return false;
        }
        let x = i + 1;
        while (x < m && name[x] === name[i]) {
            x++;
        }
        let y = j + 1;
        while (y < n && typed[y] === typed[j]) {
            y++;
        }
        if (x - i > y - j) {
            return false;
        }
        i = x;
        j = y;
    }
    return i === m && j === n;
}
```

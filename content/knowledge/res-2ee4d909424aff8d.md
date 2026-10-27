## 解法




### 方法一：双指针



> **思考**
>
> 退格后两串是否相等。若先构造退格后的新串，额外线性空间即可；题目更希望在原串上比较。
>
> 从右向左扫，用计数器消化 `#` 及其左侧应删字符，再比较当前有效字符。一侧先结束而另一侧仍有字符则不等。



我们用双指针 $i$ 和 $j$ 分别指向字符串 $s$ 和 $t$ 的末尾。

每次向前移动一个字符，如果当前字符是退格符，则跳过当前字符，同时退格符的数量加一，如果当前字符不是退格符，则判断退格符的数量，如果退格符的数量大于 $0$，则跳过当前字符，同时退格符的数量减一，如果退格符的数量等于 $0$，那么该字符需要进行比较。

我们每次找到两个字符串中需要比较的字符，然后进行比较，如果两个字符不相等，则返回 $false$，如果遍历完两个字符串，都没有发现不相等的字符，则返回 $true$。

时间复杂度 $O(m + n)$，空间复杂度 $O(1)$。其中 $m$ 和 $n$ 分别是字符串 $s$ 和 $t$ 的长度。




#### Python3


```python
class Solution:
    def backspaceCompare(self, s: str, t: str) -> bool:
        i, j, skip1, skip2 = len(s) - 1, len(t) - 1, 0, 0
        while i >= 0 or j >= 0:
            while i >= 0:
                if s[i] == '#':
                    skip1 += 1
                    i -= 1
                elif skip1:
                    skip1 -= 1
                    i -= 1
                else:
                    break
            while j >= 0:
                if t[j] == '#':
                    skip2 += 1
                    j -= 1
                elif skip2:
                    skip2 -= 1
                    j -= 1
                else:
                    break
            if i >= 0 and j >= 0:
                if s[i] != t[j]:
                    return False
            elif i >= 0 or j >= 0:
                return False
            i, j = i - 1, j - 1
        return True
```


#### TypeScript


```ts
function backspaceCompare(s: string, t: string): boolean {
    let i = s.length - 1;
    let j = t.length - 1;
    while (i >= 0 || j >= 0) {
        let skip = 0;
        while (i >= 0) {
            if (s[i] === '#') {
                skip++;
            } else if (skip !== 0) {
                skip--;
            } else {
                break;
            }
            i--;
        }
        skip = 0;
        while (j >= 0) {
            if (t[j] === '#') {
                skip++;
            } else if (skip !== 0) {
                skip--;
            } else {
                break;
            }
            j--;
        }
        if (s[i] !== t[j]) {
            return false;
        }
        i--;
        j--;
    }
    return true;
}
```

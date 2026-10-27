## 解法




### 方法一：双指针



> **思考**
>
> 判断忽略大小写与非字母数字后的串是否回文。先筛出合法字符再反转比较， $n \le 2\times 10^5$ 时间可以，但要额外 $O(n)$ 空间。
>
> 回文只需对称位置相等。两端指针同时向中间走：遇到非法字符就跳过，合法字符则忽略大小写比较。一次扫描、常数空间即可。



我们用双指针 $i$ 和 $j$ 分别指向字符串 $s$ 的两端，接下来循环以下过程，直至 $i \geq j$：

1. 如果 $s[i]$ 不是字母或数字，指针 $i$ 右移一位，继续下一次循环；
1. 如果 $s[j]$ 不是字母或数字，指针 $j$ 左移一位，继续下一次循环；
1. 如果 $s[i]$ 和 $s[j]$ 的小写形式不相等，返回 `false`；
1. 否则，指针 $i$ 右移一位，指针 $j$ 左移一位，继续下一次循环。

循环结束，返回 `true`。

时间复杂度 $O(n)$，其中 $n$ 是字符串 $s$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        i, j = 0, len(s) - 1
        while i < j:
            if not s[i].isalnum():
                i += 1
            elif not s[j].isalnum():
                j -= 1
            elif s[i].lower() != s[j].lower():
                return False
            else:
                i, j = i + 1, j - 1
        return True
```


#### TypeScript


```ts
function isPalindrome(s: string): boolean {
    let i = 0;
    let j = s.length - 1;
    while (i < j) {
        if (!/[a-zA-Z0-9]/.test(s[i])) {
            ++i;
        } else if (!/[a-zA-Z0-9]/.test(s[j])) {
            --j;
        } else if (s[i].toLowerCase() !== s[j].toLowerCase()) {
            return false;
        } else {
            ++i;
            --j;
        }
    }
    return true;
}
```

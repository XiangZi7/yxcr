## 解法




### 方法一：双指针



> **思考**
>
> 只反转字母，其他字符留在原位。另开数组收集字母再倒填可行，双指针可一次完成。首尾相向跳过非字母后交换，字符串不可变故先转为数组。



我们用两个指针 $i$ 和 $j$ 分别指向字符串的头部和尾部。当 $i < j$ 时，我们不断地移动 $i$ 和 $j$，直到 $i$ 指向一个英文字母，并且 $j$ 指向一个英文字母，然后交换 $s[i]$ 和 $s[j]$。最后返回字符串即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串的长度。




#### Python3


```python
class Solution:
    def reverseOnlyLetters(self, s: str) -> str:
        cs = list(s)
        i, j = 0, len(cs) - 1
        while i < j:
            while i < j and not cs[i].isalpha():
                i += 1
            while i < j and not cs[j].isalpha():
                j -= 1
            if i < j:
                cs[i], cs[j] = cs[j], cs[i]
                i, j = i + 1, j - 1
        return "".join(cs)
```


#### TypeScript


```ts
function reverseOnlyLetters(s: string): string {
    const cs = [...s];
    let [i, j] = [0, cs.length - 1];
    while (i < j) {
        while (!/[a-zA-Z]/.test(cs[i]) && i < j) {
            i++;
        }
        while (!/[a-zA-Z]/.test(cs[j]) && i < j) {
            j--;
        }
        [cs[i], cs[j]] = [cs[j], cs[i]];
        i++;
        j--;
    }
    return cs.join('');
}
```

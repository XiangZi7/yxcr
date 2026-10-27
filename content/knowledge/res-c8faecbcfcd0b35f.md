## 解法




### 方法一：模拟



> **思考**
>
> 将字符串中的大写字母改为小写，长度不超过 $100$。直接调用库函数即可，也可以按 ASCII 自行转换。
>
> 大写与对应小写恰好相差 $32$，在二进制上等价于把第 $5$ 位置 $1$。对大写字母做按位或 $32$ 便得到小写，其余字符保持不变。
>
> 遍历每个字符，若为大写则 $\operatorname{ord}(c)\,|\,32$，再拼回字符串。时间 $O(n)$。



我们可以遍历字符串，对于每个大写字母，将其转换为小写字母。最后返回转换后的字符串即可。

时间复杂度 $O(n)$，其中 $n$ 为字符串的长度。忽略答案的空间消耗，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def toLowerCase(self, s: str) -> str:
        return "".join([chr(ord(c) | 32) if c.isupper() else c for c in s])
```


#### TypeScript


```ts
function toLowerCase(s: string): string {
    return s.toLowerCase();
}
```


### 方法二



> **思考**
>
> 方法一先判断是否大写再转换。ASCII 中小写字母本身已含第 $5$ 位，对其再或 $32$ 结果不变，因此可以对每个字符统一做一次按位或。
>
> TypeScript 写法对全部字符执行 $|\,32$；Rust 仍只处理 $A$– $Z$，避免改动非字母。二者都不再依赖语言提供的大小写 API。






#### TypeScript


```ts
function toLowerCase(s: string): string {
    return [...s].map(c => String.fromCharCode(c.charCodeAt(0) | 32)).join('');
}
```

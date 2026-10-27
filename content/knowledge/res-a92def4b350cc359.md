## 解法




### 方法一：直接替换



> **思考**
>
> 题目只要求把每个 `.` 换成 `[.]`，并不需要校验或拆分各段。一次线性替换（或库函数 `replace`）即可，时间与地址长度成正比。



我们直接将字符串中的 `'.'` 替换为 `'[.]'` 即可。

时间复杂度 $O(n)$，其中 $n$ 为字符串的长度。忽略答案的空间消耗，空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def defangIPaddr(self, address: str) -> str:
        return address.replace('.', '[.]')
```


#### TypeScript


```ts
function defangIPaddr(address: string): string {
    return address.split('.').join('[.]');
}
```

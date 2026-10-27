## 解法




### 方法一：贪心



> **思考**
>
> 只能把 $6$ 改成 $9$，改一处后要让数值最大。高位的提升大于低位，因此把最左边的 $6$ 换成 $9$ 即可；若没有 $6$，原数已是最大。字符串上只替换首次出现的 `'6'` 与这一观察一致。



我们将数组转换为字符串，然后从左到右遍历字符串，找到第一个出现的 $6$，将其替换为 $9$，然后返回转换后的字符串对应的整数即可。

时间复杂度 $O(\log \textit{num})$，空间复杂度 $O(\log \textit{num})$。其中 $\textit{num}$ 为给定的整数。




#### Python3


```python
class Solution:
    def maximum69Number(self, num: int) -> int:
        return int(str(num).replace("6", "9", 1))
```


#### TypeScript


```ts
function maximum69Number(num: number): number {
    return Number((num + '').replace('6', '9'));
}
```

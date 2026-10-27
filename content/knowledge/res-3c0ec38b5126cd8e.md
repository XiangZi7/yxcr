## 解法




### 方法一：贪心算法



> **思考**
>
> 删除 $k$ 位后希望剩下的数字最小。相同位数的大小由最高不同位决定，因此应从高位起尽量丢掉左侧偏大的数字。
>
> 从左到右维护单调不降栈：当前位更小则弹出栈顶，相当于删掉更高位的大数，并消耗一次删除额度。删满 $k$ 位后截取剩余长度，再去掉前导零。
>
> 扫描必须自左向右：只有先删掉左侧较大数字，右侧较小数字才能进入更高位。



前置知识：两个相同位数的数字大小关系取决于第一个不同位的数的大小。

基本的思路如下：

- 从左到右遍历数组元素；
- 对于遍历到的当前元素，选择保留；
- 但可以选择性丢弃前面的相邻元素，丢弃与否取决于当前元素和前面相邻元素的大小；
- 根据前置知识可知当当前元素小于前面相邻元素时可以移除前面相邻的元素。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。




#### Python3


```python
class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        stk = []
        remain = len(num) - k
        for c in num:
            while k and stk and stk[-1] > c:
                stk.pop()
                k -= 1
            stk.append(c)
        return ''.join(stk[:remain]).lstrip('0') or '0'
```


#### TypeScript


```ts
function removeKdigits(num: string, k: number): string {
    const stk: string[] = [];
    for (const c of num) {
        while (k && stk.length > 0 && stk[stk.length - 1] > c) {
            stk.pop();
            k--;
        }
        stk.push(c);
    }
    while (k--) {
        stk.pop();
    }
    return stk.join('').replace(/^0*/g, '') || '0';
}
```

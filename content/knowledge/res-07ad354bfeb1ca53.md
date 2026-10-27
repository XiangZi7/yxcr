## 解法




### 方法一：模拟



> **思考**
>
> $n \le 500$，把每个数转成十进制字符串看长度奇偶即可。位数也可反复除 $10$ 得到，字符串写法更短。



我们遍历数组 $\textit{nums}$ 中的每个元素，对于当前遍历到的元素 $x$，我们直接将其转换为字符串，然后判断其长度是否为偶数即可。若是则将答案加一。

遍历结束后，我们返回答案即可。

时间复杂度 $O(n \times \log M)$，空间复杂度 $O(\log M)$。其中 $n$ 是数组 $\textit{nums}$ 的长度，而 $M$ 是数组 $\textit{nums}$ 中的元素的最大值。




#### Python3


```python
class Solution:
    def findNumbers(self, nums: List[int]) -> int:
        return sum(len(str(x)) % 2 == 0 for x in nums)
```


#### TypeScript


```ts
function findNumbers(nums: number[]): number {
    return nums.filter(x => x.toString().length % 2 === 0).length;
}
```

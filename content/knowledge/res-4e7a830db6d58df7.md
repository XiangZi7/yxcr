## 解法




### 方法一：遍历



> **思考**
>
> 有序数组中必有元素出现超过 $25\%$，即跨度至少 $\lfloor n/4 \rfloor$。若 $arr[i]=arr[i+\lfloor n/4 \rfloor]$，该值已覆盖足够长度。从左扫描第一次命中即可，利用有序把计数变成下标比较。



我们从头开始遍历数组 $\textit{arr}$，对于每个元素 $\textit{arr}[i]$，我们检查 $\textit{arr}[i]$ 是否等于 $\textit{arr}[i + \left\lfloor \frac{n}{4} \right\rfloor]$，其中 $n$ 是数组的长度。如果等于，那么 $\textit{arr}[i]$ 就是我们要找的元素，直接返回即可。

时间复杂度 $O(n)$，其中 $n$ 是数组 $\textit{arr}$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def findSpecialInteger(self, arr: List[int]) -> int:
        n = len(arr)
        for i, x in enumerate(arr):
            if x == arr[(i + (n >> 2))]:
                return x
```


#### TypeScript


```ts
function findSpecialInteger(arr: number[]): number {
    const n = arr.length;
    for (let i = 0; ; ++i) {
        if (arr[i] === arr[i + (n >> 2)]) {
            return arr[i];
        }
    }
}
```

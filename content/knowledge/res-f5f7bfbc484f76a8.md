## 解法




### 方法一：双指针



> **思考**
>
> 要把 $0$ 移到末尾且保持非零相对次序，可用双指针： $k$ 指向下一个非零应放的位置。
>
> 遇到非零就与 $nums[k]$ 交换并右移 $k$，则前 $k$ 位为原相对顺序的非零。



我们用一个指针 $k$ 记录当前待插入的位置，初始时 $k = 0$。

然后我们遍历数组 $\textit{nums}$，每次遇到一个非零数，就将其与 $\textit{nums}[k]$ 交换，同时将 $k$ 的值加 $1$。

这样我们就可以保证 $\textit{nums}$ 的前 $k$ 个元素都是非零的，且它们的相对顺序与原数组一致。

时间复杂度 $O(n)$，其中 $n$ 是数组 $\textit{nums}$ 的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        k = 0
        for i, x in enumerate(nums):
            if x:
                nums[k], nums[i] = nums[i], nums[k]
                k += 1
```


#### TypeScript


```ts
/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
    let k = 0;
    for (let i = 0; i < nums.length; ++i) {
        if (nums[i]) {
            [nums[i], nums[k]] = [nums[k], nums[i]];
            ++k;
        }
    }
}
```

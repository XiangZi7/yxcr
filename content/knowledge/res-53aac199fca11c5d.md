## 解法




### 方法一：三次翻转



> **思考**
>
> 右旋 $k$ 步。开新数组再拷回是 $O(n)$ 空间； $n\le 10^5$，进阶要原地。右旋 $k$ 位等于「后 $k$ 个移到前面」。整体反转后，前 $k$ 与后 $n-k$ 再各自反转，三段翻转完成轮换，只交换元素。



我们不妨记数组长度为 $n$，然后将 $k$ 对 $n$ 取模，得到实际需要旋转的步数 $k$。

接下来，我们进行三次翻转，即可得到最终结果：

1. 将整个数组翻转
2. 将前 $k$ 个元素翻转
3. 将后 $n - k$ 个元素翻转

举个例子，对于数组 $[1, 2, 3, 4, 5, 6, 7]$, $k = 3$, $n = 7$, $k \bmod n = 3$。

1. 第一次翻转，将整个数组翻转，得到 $[7, 6, 5, 4, 3, 2, 1]$。
2. 第二次翻转，将前 $k$ 个元素翻转，得到 $[5, 6, 7, 4, 3, 2, 1]$。
3. 第三次翻转，将后 $n - k$ 个元素翻转，得到 $[5, 6, 7, 1, 2, 3, 4]$，即为最终结果。

时间复杂度 $O(n)$，其中 $n$ 为数组长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        def reverse(i: int, j: int):
            while i < j:
                nums[i], nums[j] = nums[j], nums[i]
                i, j = i + 1, j - 1

        n = len(nums)
        k %= n
        reverse(0, n - 1)
        reverse(0, k - 1)
        reverse(k, n - 1)
```


#### TypeScript


```ts
/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
    const n: number = nums.length;
    k %= n;
    const reverse = (i: number, j: number): void => {
        for (; i < j; ++i, --j) {
            const t: number = nums[i];
            nums[i] = nums[j];
            nums[j] = t;
        }
    };
    reverse(0, n - 1);
    reverse(0, k - 1);
    reverse(k, n - 1);
}
```

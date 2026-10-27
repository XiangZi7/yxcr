## 解法




### 方法一：暴力枚举



> **思考**
>
> $n\le 500$，枚举所有无序对计算 $(a-1)(b-1)$ 的最大值即可。



双重循环，枚举所有的下标对，求出 $(nums[i]-1) \times (nums[j]-1)$ 的最大值。其中 $i \neq j$。

时间复杂度 $O(n^2)$。




#### Python3


```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        ans = 0
        for i, a in enumerate(nums):
            for b in nums[i + 1 :]:
                ans = max(ans, (a - 1) * (b - 1))
        return ans
```


#### TypeScript


```ts
function maxProduct(nums: number[]): number {
    const n = nums.length;
    for (let i = 0; i < 2; i++) {
        let maxIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (nums[j] > nums[maxIdx]) {
                maxIdx = j;
            }
        }
        [nums[i], nums[maxIdx]] = [nums[maxIdx], nums[i]];
    }
    return (nums[0] - 1) * (nums[1] - 1);
}
```


### 方法二：排序



> **思考**
>
> 方法一平方级。乘积随两数增大而增大，排序后取最大的两个即可。



对 $nums$ 进行排序，取最后两个元素，计算乘积 $(nums[n-1]-1) \times (nums[n-2]-1)$ 即可。

时间复杂度 $O(nlogn)$。




#### Python3


```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        nums.sort()
        return (nums[-1] - 1) * (nums[-2] - 1)
```


#### TypeScript


```ts
function maxProduct(nums: number[]): number {
    let max = 0;
    let submax = 0;
    for (const num of nums) {
        if (num > max) {
            submax = max;
            max = num;
        } else if (num > submax) {
            submax = num;
        }
    }
    return (max - 1) * (submax - 1);
}
```








### 方法三：一次遍历



> **思考**
>
> 方法二仍需排序。一遍扫描维护最大值与次大值，即可在线性时间内得到同样的两个数。



遍历 $nums$，维护最大值 $a$ 和次大值 $b$。遍历结束，返回 $(a-1) \times (b-1)$。




#### Python3


```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        a = b = 0
        for v in nums:
            if v > a:
                a, b = v, a
            elif v > b:
                b = v
        return (a - 1) * (b - 1)
```

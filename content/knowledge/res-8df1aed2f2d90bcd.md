## 解法




### 方法一：数组或哈希表



> **思考**
>
> 值域为 $[1,n]$，缺的是集合差。哈希集合记录出现过的数，再扫一遍 $1..n$。线性时间，额外 $O(n)$ 空间。
>
> 进阶要求常数空间，这一解先保证正确。



我们可以使用数组或哈希表记录数组中的数字，然后遍历 `[1, n]` 区间内的数字，若数字不存在于数组或哈希表中，则说明数组中缺失该数字，将其添加到结果列表中。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为数组长度。




#### Python3


```python
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        s = set(nums)
        return [x for x in range(1, len(nums) + 1) if x not in s]
```


#### TypeScript


```ts
function findDisappearedNumbers(nums: number[]): number[] {
    const n = nums.length;
    const s: boolean[] = new Array(n + 1).fill(false);
    for (const x of nums) {
        s[x] = true;
    }
    const ans: number[] = [];
    for (let i = 1; i <= n; ++i) {
        if (!s[i]) {
            ans.push(i);
        }
    }
    return ans;
}
```








### 方法二：原地修改



> **思考**
>
> 方法一多用一个集合。值 $x$ 可以把下标 $|x|-1$ 标成负数表示「出现过」，最后仍为正的位置 $i$ 对应缺失的 $i+1$。取绝对值再标记，避免把已标记的值再当正下标。



我们可以遍历数组 $nums$，将 $|nums[i]|-1$ 位置的数字标记为负数，表示数组 $nums[i]$ 出现过。最后遍历数组 $nums$，若 $nums[i]$ 为正数，则说明数组中缺失 $i+1$，将其添加到结果列表中。

遍历结束后，返回结果列表即可。

时间复杂度 $O(n)$，空间复杂度 $O(1)$。其中 $n$ 为数组长度。




#### Python3


```python
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        for x in nums:
            i = abs(x) - 1
            if nums[i] > 0:
                nums[i] *= -1
        return [i + 1 for i in range(len(nums)) if nums[i] > 0]
```


#### TypeScript


```ts
function findDisappearedNumbers(nums: number[]): number[] {
    const n = nums.length;
    for (const x of nums) {
        const i = Math.abs(x) - 1;
        if (nums[i] > 0) {
            nums[i] *= -1;
        }
    }
    const ans: number[] = [];
    for (let i = 0; i < n; ++i) {
        if (nums[i] > 0) {
            ans.push(i + 1);
        }
    }
    return ans;
}
```

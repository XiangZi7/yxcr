## 解法




### 方法一：排序



> **思考**
>
> 最短无序子数组排序后应使整个数组有序。把数组排序再与原数组比较，两端第一个不同的位置就是要排序的区间。
>
> $n \le 10^4$，排序可以接受。若两端从未错位则数组已有序，长度为 $0$。



我们可以先对数组进行排序，然后比较排序后的数组和原数组，找到最左边和最右边不相等的位置，它们之间的长度就是我们要找的最短无序连续子数组的长度。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 是数组的长度。




#### Python3


```python
class Solution:
    def findUnsortedSubarray(self, nums: List[int]) -> int:
        arr = sorted(nums)
        l, r = 0, len(nums) - 1
        while l <= r and nums[l] == arr[l]:
            l += 1
        while l <= r and nums[r] == arr[r]:
            r -= 1
        return r - l + 1
```


#### TypeScript


```ts
function findUnsortedSubarray(nums: number[]): number {
    const arr = [...nums];
    arr.sort((a, b) => a - b);
    let [l, r] = [0, arr.length - 1];
    while (l <= r && arr[l] === nums[l]) {
        ++l;
    }
    while (l <= r && arr[r] === nums[r]) {
        --r;
    }
    return r - l + 1;
}
```


### 方法二：维护左侧最大值和右侧最小值



> **思考**
>
> 排序多花了对数因子。从左扫，一旦当前值小于左侧最大值，它就必须落入待排序区间，右端点持续更新；从右扫则用右侧最小值更新左端点。
>
> 两端初值为 $-1$，若右端从未更新则返回 $0$。线性两遍，空间常数。



我们可以从左到右遍历数组，维护一个最大值 $mx$，如果当前值小于 $mx$，说明当前值不在正确的位置上，我们更新右边界 $r$ 为当前位置。同理，我们可以从右到左遍历数组，维护一个最小值 $mi$，如果当前值大于 $mi$，说明当前值不在正确的位置上，我们更新左边界 $l$ 为当前位置。在初始化时，我们将 $l$ 和 $r$ 都初始化为 $-1$，如果 $l$ 和 $r$ 都没有被更新，说明数组已经有序，返回 $0$，否则返回 $r - l + 1$。

时间复杂度 $O(n)$，其中 $n$ 是数组的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def findUnsortedSubarray(self, nums: List[int]) -> int:
        mi, mx = inf, -inf
        l = r = -1
        n = len(nums)
        for i, x in enumerate(nums):
            if mx > x:
                r = i
            else:
                mx = x
            if mi < nums[n - i - 1]:
                l = n - i - 1
            else:
                mi = nums[n - i - 1]
        return 0 if r == -1 else r - l + 1
```


#### TypeScript


```ts
function findUnsortedSubarray(nums: number[]): number {
    let [l, r] = [-1, -1];
    let [mi, mx] = [Infinity, -Infinity];
    const n = nums.length;
    for (let i = 0; i < n; ++i) {
        if (mx > nums[i]) {
            r = i;
        } else {
            mx = nums[i];
        }
        if (mi < nums[n - i - 1]) {
            l = n - i - 1;
        } else {
            mi = nums[n - i - 1];
        }
    }
    return r === -1 ? 0 : r - l + 1;
}
```

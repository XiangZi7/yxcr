## 解法




### 方法一：排序



> **思考**
>
> 有序数组中找与 $x$ 最接近的 $k$ 个数，结果仍要有序。按距离排序再取前 $k$ 个即可，代价是 $O(n\log n)$。
>
> 以 $|v-x|$ 为键排序，截取前 $k$ 个后再按值排序。



将 $arr$ 中的所有元素按照与 $x$ 的距离从小到大进行排列。取前 $k$ 个元素排序后返回。

时间复杂度 $O(nlogn)$。




#### Python3


```python
class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        arr.sort(key=lambda v: abs(v - x))
        return sorted(arr[:k])
```


#### TypeScript


```ts
function findClosestElements(arr: number[], k: number, x: number): number[] {
    arr.sort((a, b) => Math.abs(a - x) - Math.abs(b - x) || a - b);
    return arr.slice(0, k).sort((a, b) => a - b);
}
```


### 方法二：双指针



> **思考**
>
> 答案必是一段连续子数组。两端指针按距离把更远的一侧收进来，直到长度恰为 $k$，线性即可，且结果已有序。



直觉上，有序数组 $arr$ 最靠近 $x$ 的 $k$ 个数必然是一段连续的子数组。

我们可以声明头尾指针，记为 $l$ 和 $r$，然后根据 $x-arr[l]$ 与 $arr[r-1] - x$ 的大小比较结果缩小范围，直到 $r - l = k$。

时间复杂度 $O(n)$。




#### Python3


```python
class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        l, r = 0, len(arr)
        while r - l > k:
            if x - arr[l] <= arr[r - 1] - x:
                r -= 1
            else:
                l += 1
        return arr[l:r]
```


#### TypeScript


```ts
function findClosestElements(arr: number[], k: number, x: number): number[] {
    let l = 0;
    let r = arr.length;
    while (r - l > k) {
        if (x - arr[l] <= arr[r - 1] - x) {
            --r;
        } else {
            ++l;
        }
    }
    return arr.slice(l, r);
}
```


### 方法三：二分查找



> **思考**
>
> 双指针是线性。窗口左端在 $[0,n-k]$ 上单调：比较 $x-arr[mid]$ 与 $arr[mid+k]-x$ 即可二分左端，降到 $O(\log n)$。



在方法二的基础上，我们更进一步，查找大小为 $k$ 的窗口的左边界。

时间复杂度 $O(logn)$。




#### Python3


```python
class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        left, right = 0, len(arr) - k
        while left < right:
            mid = (left + right) >> 1
            if x - arr[mid] <= arr[mid + k] - x:
                right = mid
            else:
                left = mid + 1
        return arr[left : left + k]
```


#### TypeScript


```ts
function findClosestElements(arr: number[], k: number, x: number): number[] {
    let left = 0;
    let right = arr.length - k;
    while (left < right) {
        const mid = (left + right) >> 1;
        if (x - arr[mid] <= arr[mid + k] - x) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return arr.slice(left, left + k);
}
```

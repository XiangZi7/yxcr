## 解法




### 方法一



> **思考**
>
> 数组保证先严格上升再严格下降，求峰下标。线性扫描可行，但 $n\le 10^5$ 且题目暗示对数时间。峰左侧 $arr[i]<arr[i+1]$，右侧相反。
>
> 在 $[1,n-2]$ 上二分：若 $arr[mid]>arr[mid+1]$ 则峰在左半（含 $mid$），否则在右半。收缩后左端点即峰。






#### Python3


```python
class Solution:
    def peakIndexInMountainArray(self, arr: List[int]) -> int:
        left, right = 1, len(arr) - 2
        while left < right:
            mid = (left + right) >> 1
            if arr[mid] > arr[mid + 1]:
                right = mid
            else:
                left = mid + 1
        return left
```


#### TypeScript


```ts
function peakIndexInMountainArray(arr: number[]): number {
    let left = 1,
        right = arr.length - 2;
    while (left < right) {
        const mid = (left + right) >> 1;
        if (arr[mid] > arr[mid + 1]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
```

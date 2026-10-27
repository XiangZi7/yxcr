## 解法




### 方法一：二分查找



> **思考**
>
> 有序正数组中求第 $k$ 个缺失正整数。线性扫描在 $n$ 与 $k$ 同阶时可行，但缺失个数 $arr[i]-i-1$ 随 $i$ 单调，适合二分。
>
> 若 $arr[0]>k$，答案就是 $k$。否则二分第一个「缺失数 $\ge k$」的位置 $left$，其左侧 $arr[left-1]$ 处已缺失 $arr[left-1]-(left-1)-1$ 个，再向后补 $k$ 与该值的差即可。






#### Python3


```python
class Solution:
    def findKthPositive(self, arr: List[int], k: int) -> int:
        if arr[0] > k:
            return k
        left, right = 0, len(arr)
        while left < right:
            mid = (left + right) >> 1
            if arr[mid] - mid - 1 >= k:
                right = mid
            else:
                left = mid + 1
        return arr[left - 1] + k - (arr[left - 1] - (left - 1) - 1)
```

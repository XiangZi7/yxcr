## 解法




### 方法一：模拟



> **思考**
>
> 要把 $[x_1,\ldots,x_n,y_1,\ldots,y_n]$ 交错。`zip` 前半与后半后展平即可。



我们在 $[0, n)$ 的范围内遍历下标 $i$，每次取出 $\textit{nums}[i]$ 和 $\textit{nums}[i+n]$，并将它们依次放入答案数组中。

遍历结束后，返回答案数组即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是数组 $\textit{nums}$ 的长度。




#### Python3


```python
class Solution:
    def shuffle(self, nums: List[int], n: int) -> List[int]:
        return [x for pair in zip(nums[:n], nums[n:]) for x in pair]
```


#### TypeScript


```ts
function shuffle(nums: number[], n: number): number[] {
    const ans: number[] = [];
    for (let i = 0; i < n; ++i) {
        ans.push(nums[i], nums[i + n]);
    }
    return ans;
}
```

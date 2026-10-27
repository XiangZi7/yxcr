## 解法




### 方法一：位运算



> **思考**
>
> 所有数对的汉明距离之和。两两异或再计数是 $O(n^2)$。某一位上的贡献互相独立。
>
> 对第 $i$ 位，统计 $1$ 的个数 $a$，则 $0$ 的个数为 $n-a$，该位贡献 $a(n-a)$。累加 $32$ 位。
>
> 按位拆开后，每对数在该位上是否不同被计数一次，不必枚举数对。



我们在 $[0, 31]$ 的范围内枚举每一位，对于当前枚举的位 $i$，我们统计所有数字中的第 $i$ 位为 $1$ 的个数 $a$，那么这些数字中的第 $i$ 位为 $0$ 的个数就是 $b = n - a$，其中 $n$ 是数组的长度。这样的话，在第 $i$ 位上的汉明距离之和就是 $a \times b$，我们把所有的位的汉明距离相加即为答案。

时间复杂度 $O(n \times \log M)$，其中 $n$ 和 $M$ 分别是数组的长度和数组中的元素的最大值。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def totalHammingDistance(self, nums: List[int]) -> int:
        ans, n = 0, len(nums)
        for i in range(32):
            a = sum(x >> i & 1 for x in nums)
            b = n - a
            ans += a * b
        return ans
```


#### TypeScript


```ts
function totalHammingDistance(nums: number[]): number {
    let ans = 0;
    for (let i = 0; i < 32; ++i) {
        const a = nums.filter(x => (x >> i) & 1).length;
        const b = nums.length - a;
        ans += a * b;
    }
    return ans;
}
```

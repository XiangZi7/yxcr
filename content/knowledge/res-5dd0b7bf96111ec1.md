## 解法




### 方法一：因数分解



> **思考**
>
> 因数恰好四个的数，把其因数和加入答案。 $nums[i] \le 10^5$，对每个数试到 $\sqrt{x}$ 即可枚尽因数。计数与求和同步进行，个数恰为 $4$ 时返回该和，否则贡献 $0$。



我们可以对每个数进行因数分解，如果因数的个数为 $4$ 个，那么这个数就是符合题意的数，我们将其因数累加到答案中即可。

时间复杂度 $O(n \times \sqrt{n})$，其中 $n$ 是数组的长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def sumFourDivisors(self, nums: List[int]) -> int:
        def f(x: int) -> int:
            i = 2
            cnt, s = 2, x + 1
            while i <= x // i:
                if x % i == 0:
                    cnt += 1
                    s += i
                    if i * i != x:
                        cnt += 1
                        s += x // i
                i += 1
            return s if cnt == 4 else 0

        return sum(f(x) for x in nums)
```


#### TypeScript


```ts
function sumFourDivisors(nums: number[]): number {
    const f = (x: number): number => {
        let cnt = 2;
        let s = x + 1;
        for (let i = 2; i * i <= x; ++i) {
            if (x % i === 0) {
                ++cnt;
                s += i;
                if (i * i !== x) {
                    ++cnt;
                    s += Math.floor(x / i);
                }
            }
        }
        return cnt === 4 ? s : 0;
    };
    return nums.reduce((acc, x) => acc + f(x), 0);
}
```

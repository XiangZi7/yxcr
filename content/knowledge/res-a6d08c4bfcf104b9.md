## 解法




### 方法一：位运算



> **思考**
>
> 除两个数各出现一次外其余均出现两次，全部异或得到的是这两个数之异或 $xs$。二者不等，故 $xs$ 至少有一位为 $1$。
>
> 取 $xs$ 的 $\mathrm{lowbit}$ 按该位分组，两个目标数落入不同组；对含该位的一组再异或得到 $a$，则 $b=xs\oplus a$。



异或运算有以下性质：

- 任何数和 $0$ 做异或运算，结果仍然是原来的数，即 $x \oplus 0 = x$；
- 任何数和其自身做异或运算，结果是 $0$，即 $x \oplus x = 0$；

由于数组中除了两个数字之外，其他数字都出现了两次，因此我们对数组中的所有数字进行异或运算，得到的结果即为两个只出现一次的数字的异或结果。

而由于这两个数字不相等，因此异或结果中至少存在一位为 $1$。我们可以通过 `lowbit` 运算找到异或结果中最低位的 $1$，并将数组中的所有数字按照该位是否为 $1$ 分为两组，这样两个只出现一次的数字就被分到了不同的组中。

对两个组分别进行异或运算，即可得到两个只出现一次的数字 $a$ 和 $b$。

时间复杂度 $O(n)$，其中 $n$ 为数组长度。空间复杂度 $O(1)$。




#### Python3


```python
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        xs = reduce(xor, nums)
        a = 0
        lb = xs & -xs
        for x in nums:
            if x & lb:
                a ^= x
        b = xs ^ a
        return [a, b]
```


#### TypeScript


```ts
function singleNumber(nums: number[]): number[] {
    const xs = nums.reduce((a, b) => a ^ b);
    const lb = xs & -xs;
    let a = 0;
    for (const x of nums) {
        if (x & lb) {
            a ^= x;
        }
    }
    const b = xs ^ a;
    return [a, b];
}
```


### 方法二：哈希表



> **思考**
>
> 位运算把空间压到常数。若允许线性额外空间，用集合：第一次出现则加入，第二次则删去，最后剩下的即两个单次出现的数。






#### TypeScript


```ts
function singleNumber(nums: number[]): number[] {
    const set = new Set<number>();

    for (const x of nums) {
        if (set.has(x)) set.delete(x);
        else set.add(x);
    }

    return [...set];
}
```

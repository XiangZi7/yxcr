## 解法




### 方法一：自定义排序



> **思考**
>
> 拼接出一个最大整数。按数值或普通字典序排序都不对： $9$ 应排在 $98$ 前面，因为 $998>989$。 $n\le 100$。比较 $a+b$ 与 $b+a$ 即可决定两串的先后，整体按这个比较排序再拼接；若最高位是 $0$，说明全是 $0$，返回 $\texttt{"0"}$。



先转成字符串列表，再对字符串列表进行字典序降序排列。最后将列表所有字符串拼接即可。




#### Python3


```python
class Solution:
    def largestNumber(self, nums: List[int]) -> str:
        nums = [str(v) for v in nums]
        nums.sort(key=cmp_to_key(lambda a, b: 1 if a + b < b + a else -1))
        return "0" if nums[0] == "0" else "".join(nums)
```


#### TypeScript


```ts
function largestNumber(nums: number[]): string {
    nums.sort((a, b) => {
        const [ab, ba] = [String(a) + String(b), String(b) + String(a)];
        return +ba - +ab;
    });

    return nums[0] ? nums.join('') : '0';
}
```

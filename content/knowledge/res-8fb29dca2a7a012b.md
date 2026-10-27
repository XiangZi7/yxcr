## 解法




### 方法一



> **思考**
>
> 表达式只有除法，加括号改变的是结合顺序。实数除法下，要让结果尽量大，应尽量减小分母。
>
> 长度为 $1$、 $2$ 没有括号可选。更长时，把第一个数当分子、其余全部括成连除，等价于 $a_0 / (a_1/a_2/\cdots)$，分母被除得最小。无需搜索全部加括号方案。






#### Python3


```python
class Solution:
    def optimalDivision(self, nums: List[int]) -> str:
        n = len(nums)
        if n == 1:
            return str(nums[0])
        if n == 2:
            return f'{nums[0]}/{nums[1]}'
        return f'{nums[0]}/({"/".join(map(str, nums[1:]))})'
```


#### TypeScript


```ts
function optimalDivision(nums: number[]): string {
    const n = nums.length;
    const res = nums.join('/');
    if (n > 2) {
        const index = res.indexOf('/') + 1;
        return `${res.slice(0, index)}(${res.slice(index)})`;
    }
    return res;
}
```

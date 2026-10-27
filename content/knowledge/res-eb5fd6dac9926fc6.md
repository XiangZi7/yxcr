## 解法




### 方法一：双指针



> **思考**
>
> 大分组是长度至少为 $3$ 的连续相同字母段。串由小写字母组成，一次扫描找出所有这样的区间即可。
>
> 双指针圈定每一段，长度达到 $3$ 则记下起止下标，然后跳到下一段。



我们用双指针 $i$ 和 $j$ 找到每个分组的起始位置和终止位置，然后判断分组长度是否大于等于 $3$，若是则将其加入结果数组。

时间复杂度 $O(n)$，其中 $n$ 为字符串 $s$ 的长度。




#### Python3


```python
class Solution:
    def largeGroupPositions(self, s: str) -> List[List[int]]:
        i, n = 0, len(s)
        ans = []
        while i < n:
            j = i
            while j < n and s[j] == s[i]:
                j += 1
            if j - i >= 3:
                ans.append([i, j - 1])
            i = j
        return ans
```


#### TypeScript


```ts
function largeGroupPositions(s: string): number[][] {
    const n = s.length;
    const ans: number[][] = [];

    for (let i = 0; i < n;) {
        let j = i;
        while (j < n && s[j] === s[i]) {
            ++j;
        }
        if (j - i >= 3) {
            ans.push([i, j - 1]);
        }
        i = j;
    }

    return ans;
}
```

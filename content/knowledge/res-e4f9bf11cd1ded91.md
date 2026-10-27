## 解法




### 方法一：贪心 + 双指针



> **思考**
>
> 每艘船最多两人且体重和不超过 $\textit{limit}$，求最少船数。 $n\le 5\cdot 10^4$，应让最重者尽量与最轻者同船。
>
> 排序后双指针：两端能同船则两人一起走，否则最重者独自走。每步消耗一艘船，直到指针交错。



排序后，使用双指针分别指向数组首尾，每次取两个指针指向的元素之和与 `limit` 比较，如果小于等于 `limit`，则两个指针同时向中间移动一位，否则只移动右指针。累加答案即可。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(\log n)$。其中 $n$ 为数组 `people` 的长度。




#### Python3


```python
class Solution:
    def numRescueBoats(self, people: List[int], limit: int) -> int:
        people.sort()
        ans = 0
        i, j = 0, len(people) - 1
        while i <= j:
            if people[i] + people[j] <= limit:
                i += 1
            j -= 1
            ans += 1
        return ans
```


#### TypeScript


```ts
function numRescueBoats(people: number[], limit: number): number {
    people.sort((a, b) => a - b);
    let ans = 0;
    for (let i = 0, j = people.length - 1; i <= j; --j) {
        if (people[i] + people[j] <= limit) {
            ++i;
        }
        ++ans;
    }
    return ans;
}
```

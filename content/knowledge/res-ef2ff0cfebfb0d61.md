## 解法




### 方法一：排序 + 双指针



> **思考**
>
> 四重循环枚举后再用集合去重，时间复杂度为 $O(n^4)$。 $n \le 200$，难以通过。固定前两个数之后，问题退化为两数之和，哈希表可以将内层降至线性，但去重较繁琐，也需要额外空间。
>
> 题目要求四元组不重复，并不限定原顺序。先将数组排序，重复元素会相邻，枚举 $i$、 $j$ 时跳过相同值即可；有序之后，剩下的两数之和可以用左右指针在线性时间内完成。因此排序后两层枚举前两个数，在右侧用双指针夹逼，时间降至 $O(n^3)$。



我们注意到，题目中要求找到不重复的四元组，那么我们可以先对数组进行排序，这样就可以方便地跳过重复的元素。

接下来，我们枚举四元组的前两个元素 $nums[i]$ 和 $nums[j]$，其中 $i \lt j$，在枚举的过程中，我们跳过重复的 $nums[i]$ 和 $nums[j]$。然后，我们用两个指针 $k$ 和 $l$ 分别指向 $nums[i]$ 和 $nums[j]$ 后面的两端，令 $x = nums[i] + nums[j] + nums[k] + nums[l]$，我们将 $x$ 与 $target$ 比较，进行如下操作：

- 如果 $x \lt target$，则更新 $k = k + 1$ 以得到更大的 $x$；
- 如果 $x \gt target$，则更新 $l = l - 1$ 以得到更小的 $x$；
- 否则，说明找到了一个四元组 $(nums[i], nums[j], nums[k], nums[l])$，将其加入答案，然后我们更新指针 $k$ 和 $l$，并跳过所有重复的元素，防止答案中包含重复的四元组，继续寻找下一个四元组。

时间复杂度为 $O(n^3)$，空间复杂度为 $O(\log n)$，其中 $n$ 是数组的长度。




#### Python3


```python
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        n = len(nums)
        ans = []
        if n < 4:
            return ans
        nums.sort()
        for i in range(n - 3):
            if i and nums[i] == nums[i - 1]:
                continue
            for j in range(i + 1, n - 2):
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue
                k, l = j + 1, n - 1
                while k < l:
                    x = nums[i] + nums[j] + nums[k] + nums[l]
                    if x < target:
                        k += 1
                    elif x > target:
                        l -= 1
                    else:
                        ans.append([nums[i], nums[j], nums[k], nums[l]])
                        k, l = k + 1, l - 1
                        while k < l and nums[k] == nums[k - 1]:
                            k += 1
                        while k < l and nums[l] == nums[l + 1]:
                            l -= 1
        return ans
```


#### TypeScript


```ts
function fourSum(nums: number[], target: number): number[][] {
    const n = nums.length;
    const ans: number[][] = [];
    if (n < 4) {
        return ans;
    }
    nums.sort((a, b) => a - b);
    for (let i = 0; i < n - 3; ++i) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        for (let j = i + 1; j < n - 2; ++j) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }
            let [k, l] = [j + 1, n - 1];
            while (k < l) {
                const x = nums[i] + nums[j] + nums[k] + nums[l];
                if (x < target) {
                    ++k;
                } else if (x > target) {
                    --l;
                } else {
                    ans.push([nums[i], nums[j], nums[k++], nums[l--]]);
                    while (k < l && nums[k] === nums[k - 1]) {
                        ++k;
                    }
                    while (k < l && nums[l] === nums[l + 1]) {
                        --l;
                    }
                }
            }
        }
    }
    return ans;
}
```

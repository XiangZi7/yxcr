## 解法




### 方法一：排序



> **思考**
>
> 双重循环比较任意一对元素可行，但 $n$ 较大时偏慢。相等元素在排序后必然相邻。
>
> 为此先排序，再检查相邻两项是否相等。



我们先对数组 `nums` 进行排序。

然后遍历数组，如果存在相邻两个元素相同，说明数组中存在重复元素，直接返回 `true`。

否则，遍历结束，返回 `false`。

时间复杂度 $O(n \times \log n)$。其中 $n$ 是数组 `nums` 的长度。




#### Python3


```python
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        return any(a == b for a, b in pairwise(sorted(nums)))
```


#### TypeScript


```ts
function containsDuplicate(nums: number[]): boolean {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    for (let i = 1; i < n; i++) {
        if (nums[i - 1] === nums[i]) {
            return true;
        }
    }
    return false;
}
```


### 方法二：哈希表



> **思考**
>
> 排序改变相对次序且为 $O(n\log n)$。只需判定是否出现过，哈希表一次扫描即可。
>
> 元素第二次进入集合则存在重复。



遍历数组，将出现过的元素记录在哈希表 $s$ 中。若元素第二次出现时，说明数组中存在重复元素，直接返回 `true`。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是数组 `nums` 的长度。




#### Python3


```python
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        return len(set(nums)) < len(nums)
```


#### TypeScript


```ts
function containsDuplicate(nums: number[]): boolean {
    return new Set<number>(nums).size !== nums.length;
}
```

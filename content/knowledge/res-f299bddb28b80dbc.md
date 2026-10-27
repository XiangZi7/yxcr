## 解法




### 方法一



> **思考**
>
> 实现重置与均匀乱序。重置须保留原数组副本。Fisher–Yates 从左到右把 $i$ 与 $[i,n)$ 中随机位置交换，每个排列等概。
>
> `reset` 从副本拷回；`shuffle` 就地洗牌后返回。






#### Python3


```python
class Solution:
    def __init__(self, nums: List[int]):
        self.nums = nums
        self.original = nums.copy()

    def reset(self) -> List[int]:
        self.nums = self.original.copy()
        return self.nums

    def shuffle(self) -> List[int]:
        for i in range(len(self.nums)):
            j = random.randrange(i, len(self.nums))
            self.nums[i], self.nums[j] = self.nums[j], self.nums[i]
        return self.nums


# Your Solution object will be instantiated and called as such:
# obj = Solution(nums)
# param_1 = obj.reset()
# param_2 = obj.shuffle()
```


#### TypeScript


```ts
class Solution {
    private nums: number[];

    constructor(nums: number[]) {
        this.nums = nums;
    }

    reset(): number[] {
        return this.nums;
    }

    shuffle(): number[] {
        const n = this.nums.length;
        const res = [...this.nums];
        for (let i = 0; i < n; i++) {
            const j = Math.floor(Math.random() * n);
            [res[i], res[j]] = [res[j], res[i]];
        }
        return res;
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
```

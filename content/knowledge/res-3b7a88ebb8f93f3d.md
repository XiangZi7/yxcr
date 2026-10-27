## 解法




### 方法一：DFS(回溯)



> **思考**
>
> 每个元素只有选与不选两种可能，子集共 $2^n$ 个。 $n \le 10$，全部列出即可。
>
> 递归可以按元素下标展开这棵决策树：从下标 $i$ 出发，先不选 $nums[i]$，再选中并回溯弹出。当 $i = n$ 时将当前路径拷入答案。题目保证元素互不相同，因此不会产生重复子集。



我们设计一个函数 $dfs(i)$，表示从数组的第 $i$ 个元素开始搜索所有子集。函数 $dfs(i)$ 的执行逻辑如下：

- 如果 $i=n$，表示当前已经搜索结束，将当前得到的子集 $t$ 加入答案数组 $ans$ 中，然后返回；
- 否则，我们可以选择不选择当前元素，直接执行 $dfs(i+1)$；也可以选择当前元素，即把当前元素 $nums[i]$ 加入子集 $t$，然后执行 $dfs(i+1)$，注意要在执行 $dfs(i+1)$ 以后再将 $nums[i]$ 从子集 $t$ 中移除（回溯）。

在主函数中，我们调用 $dfs(0)$，即从数组的第一个元素开始搜索所有子集。最后返回答案数组 $ans$ 即可。

时间复杂度 $O(n\times 2^n)$，空间复杂度 $O(n)$。其中 $n$ 为数组的长度。一共有 $2^n$ 个子集，每个子集需要 $O(n)$ 的时间来构造。




#### Python3


```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        def dfs(i: int):
            if i == len(nums):
                ans.append(t[:])
                return
            dfs(i + 1)
            t.append(nums[i])
            dfs(i + 1)
            t.pop()

        ans = []
        t = []
        dfs(0)
        return ans
```


#### TypeScript


```ts
function subsets(nums: number[]): number[][] {
    const ans: number[][] = [];
    const t: number[] = [];
    const dfs = (i: number) => {
        if (i === nums.length) {
            ans.push(t.slice());
            return;
        }
        dfs(i + 1);
        t.push(nums[i]);
        dfs(i + 1);
        t.pop();
    };
    dfs(0);
    return ans;
}
```


### 方法二：二进制枚举



> **思考**
>
> 方法一依靠递归栈把「选 / 不选」展开，调用开销与递归深度均为 $O(n)$。
>
> $n$ 很小，也可以把每个子集对应成 $[0, 2^n)$ 中的一个掩码：第 $i$ 位为 $1$ 则收入 $nums[i]$。少一层函数调用，时间复杂度同为 $O(n \times 2^n)$。



我们也可以使用二进制枚举的方法得到所有的子集。

我们可以使用 $2^n$ 个二进制数来表示 $n$ 个元素的所有子集，对于当前二进制数 $mask$，如果第 $i$ 位为 $1$，表示选择了第 $i$ 个元素，否则表示不选择第 $i$ 个元素。

时间复杂度 $O(n\times 2^n)$，空间复杂度 $O(n)$。其中 $n$ 为数组的长度。一共有 $2^n$ 个子集，每个子集需要 $O(n)$ 的时间来构造。




#### Python3


```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        ans = []
        for mask in range(1 << len(nums)):
            t = [x for i, x in enumerate(nums) if mask >> i & 1]
            ans.append(t)
        return ans
```


#### TypeScript


```ts
function subsets(nums: number[]): number[][] {
    const n = nums.length;
    const ans: number[][] = [];
    for (let mask = 0; mask < 1 << n; ++mask) {
        const t: number[] = [];
        for (let i = 0; i < n; ++i) {
            if (((mask >> i) & 1) === 1) {
                t.push(nums[i]);
            }
        }
        ans.push(t);
    }
    return ans;
}
```

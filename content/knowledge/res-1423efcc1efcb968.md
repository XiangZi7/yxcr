## 解法




### 方法一：排序 + DFS



> **思考**
>
> 与「子集」一样做选或不选的 DFS，可以直接收集全部子集。存在重复元素时，同一多重集（例如 $[1, 2]$）会出现多次。 $n \le 10$，子集个数本身不多，却不满足「解集不能包含重复子集」。
>
> 相同值的不同下标被当成了不同选择。先排序使相同值相邻；在「不选」的那条分支上跳过后续相等元素，每种多重集便只生成一次。
>
> 排序后的 DFS 先选 $i$，回溯后再跳过所有等于 $\textit{nums}[i]$ 的位置继续。选几个相同值由递归深度决定，不会并列出两份相同子集。



我们可以先对数组 $\textit{nums}$ 进行排序，方便去重。

然后，我们设计一个函数 $\textit{dfs}(i)$，表示当前从第 $i$ 个元素开始搜索子集。函数 $\textit{dfs}(i)$ 的执行逻辑如下：

如果 $i \geq n$，说明已经搜索完所有元素，将当前子集加入答案数组中，递归结束。

如果 $i < n$，将第 $i$ 个元素加入子集，执行 $\textit{dfs}(i + 1)$，然后将第 $i$ 个元素从子集中移除。接下来，我们判断第 $i$ 个元素是否和下一个元素相同，如果相同，则循环跳过该元素，直到找到第一个和第 $i$ 个元素不同的元素，执行 $\textit{dfs}(i + 1)$。

最后，我们只需要调用 $\textit{dfs}(0)$，返回答案数组即可。

时间复杂度 $O(n \times 2^n)$，空间复杂度 $O(n)$。其中 $n$ 是数组 $\textit{nums}$ 的长度。




#### Python3


```python
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        def dfs(i: int):
            if i == len(nums):
                ans.append(t[:])
                return
            t.append(nums[i])
            dfs(i + 1)
            x = t.pop()
            while i + 1 < len(nums) and nums[i + 1] == x:
                i += 1
            dfs(i + 1)

        nums.sort()
        ans = []
        t = []
        dfs(0)
        return ans
```


#### TypeScript


```ts
function subsetsWithDup(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const t: number[] = [];
    const ans: number[][] = [];
    const dfs = (i: number): void => {
        if (i >= n) {
            ans.push([...t]);
            return;
        }
        t.push(nums[i]);
        dfs(i + 1);
        t.pop();
        while (i + 1 < n && nums[i] === nums[i + 1]) {
            i++;
        }
        dfs(i + 1);
    };
    dfs(0);
    return ans;
}
```


### 方法二：排序 + 二进制枚举



> **思考**
>
> 方法一已经去重，但递归依赖调用栈，跳过相同值的逻辑也写在回溯里。 $n \le 10$，也可以直接枚举 $2^n$ 个掩码。
>
> 将「选或不选」改成二进制位： $\textit{mask}$ 的第 $i$ 位表示是否选 $\textit{nums}[i]$。若选了 $i$ 却没选 $i-1$、且两值相同，说明跳过了靠前的相同值，属于重复方案，应丢弃。时间同阶，写成一层循环即可。



与方法一类似，我们先对数组 $\textit{nums}$ 进行排序，方便去重。

接下来，我们在 $[0, 2^n)$ 的范围内枚举一个二进制数 $\textit{mask}$，其中 $\textit{mask}$ 的二进制表示是一个 $n$ 位的位串，如果 $\textit{mask}$ 的第 $i$ 位为 $1$，表示选择 $\textit{nums}[i]$，为 $0$ 表示不选择 $\textit{nums}[i]$。注意，如果 $\textit{mask}$ 的 $i - 1$ 位为 $0$，且 $\textit{nums}[i] = \textit{nums}[i - 1]$，则说明在当前枚举到的方案中，第 $i$ 个元素和第 $i - 1$ 个元素相同，为了避免重复，我们跳过这种情况。否则，我们将 $\textit{mask}$ 对应的子集加入答案数组中。

枚举结束后，我们返回答案数组即可。

时间复杂度 $O(n \times 2^n)$，空间复杂度 $O(n)$。其中 $n$ 是数组 $\textit{nums}$ 的长度。




#### Python3


```python
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        n = len(nums)
        ans = []
        for mask in range(1 << n):
            ok = True
            t = []
            for i in range(n):
                if mask >> i & 1:
                    if i and (mask >> (i - 1) & 1) == 0 and nums[i] == nums[i - 1]:
                        ok = False
                        break
                    t.append(nums[i])
            if ok:
                ans.append(t)
        return ans
```


#### TypeScript


```ts
function subsetsWithDup(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const ans: number[][] = [];
    for (let mask = 0; mask < 1 << n; ++mask) {
        const t: number[] = [];
        let ok: boolean = true;
        for (let i = 0; i < n; ++i) {
            if (((mask >> i) & 1) === 1) {
                if (i && ((mask >> (i - 1)) & 1) === 0 && nums[i] === nums[i - 1]) {
                    ok = false;
                    break;
                }
                t.push(nums[i]);
            }
        }
        if (ok) {
            ans.push(t);
        }
    }
    return ans;
}
```

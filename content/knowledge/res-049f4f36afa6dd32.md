## 解法




### 方法一：DFS + 剪枝



> **思考**
>
> 划分成 $k$ 个等和子集。总和不能被 $k$ 整除则无解。 $n\le 16$ 时回溯可行，但子集装填顺序会重复。
>
> 目标和为 $s$，数组 $cur[0..k)$ 记各桶当前和。数降序放入：超 $s$ 则跳过，相邻桶和相同则跳过以免对称搜索。放完所有数即成功。



根据题意，我们需要将数组 $\textit{nums}$ 划分为 $k$ 个子集，且每个子集的和相等。因此，先累加 $\textit{nums}$ 中所有元素的和，如果不能被 $k$ 整除，说明无法划分为 $k$ 个子集，提前返回 $\textit{false}$。

如果能被 $k$ 整除，不妨将每个子集期望的和记为 $s$，然后创建一个长度为 $k$ 的数组 $\textit{cur}$，表示当前每个子集的和。

对数组 $\textit{nums}$ 进行降序排序（减少搜索次数），然后从第一个元素开始，依次尝试将其加入到 $\textit{cur}$ 的每个子集中。这里如果将 $\textit{nums}[i]$ 加入某个子集 $\textit{cur}[j]$ 后，子集的和超过 $s$，说明无法放入，可以直接跳过；另外，如果 $\textit{cur}[j]$ 与 $\textit{cur}[j - 1]$ 相等，意味着我们在 $\textit{cur}[j - 1]$ 的时候已经完成了搜索，也可以跳过当前的搜索。

如果能将所有元素都加入到 $\textit{cur}$ 中，说明可以划分为 $k$ 个子集，返回 $\textit{true}$。




#### Python3


```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        def dfs(i):
            if i == len(nums):
                return True
            for j in range(k):
                if j and cur[j] == cur[j - 1]:
                    continue
                cur[j] += nums[i]
                if cur[j] <= s and dfs(i + 1):
                    return True
                cur[j] -= nums[i]
            return False

        s, mod = divmod(sum(nums), k)
        if mod:
            return False
        cur = [0] * k
        nums.sort(reverse=True)
        return dfs(0)
```


#### TypeScript


```ts
function canPartitionKSubsets(nums: number[], k: number): boolean {
    const dfs = (i: number): boolean => {
        if (i === nums.length) {
            return true;
        }
        for (let j = 0; j < k; j++) {
            if (j > 0 && cur[j] === cur[j - 1]) {
                continue;
            }
            cur[j] += nums[i];
            if (cur[j] <= s && dfs(i + 1)) {
                return true;
            }
            cur[j] -= nums[i];
        }
        return false;
    };

    let s = nums.reduce((a, b) => a + b, 0);
    const mod = s % k;
    if (mod !== 0) {
        return false;
    }
    s = Math.floor(s / k);
    const cur = Array(k).fill(0);
    nums.sort((a, b) => b - a);
    return dfs(0);
}
```








### 方法二：状态压缩 + 记忆化搜索



> **思考**
>
> 按桶放数仍可能重复同一已选集合。改用二进制 $\textit{state}$ 表示已用元素，当前桶余量 $t$。记忆化 $dfs(\textit{state}, t)$，数升序以便 $t+v>s$ 时整段剪枝。



与方法一相同，我们依然先判断数组 $\textit{nums}$ 是否有可能被划分为 $k$ 个子集。如果不能被 $k$ 整除，直接返回 $\textit{false}$。

我们记 $s$ 为每个子集期望的和，当前元素被划分的情况为 $\textit{state}$。对于第 $i$ 个数，若 $\textit{state}$ 的第 $i$ 位为 $0$，说明第 $i$ 个元素未被划分。

我们的目标是从全部元素中凑出 $k$ 个和为 $s$ 的子集。记当前子集的和为 $t$。在未划分第 $i$ 个元素时：

- 若 $t + \textit{nums}[i] \gt s$，说明第 $i$ 个元素不能被添加到当前子集中，由于我们对 $\textit{nums}$ 数组进行升序排列，因此数组 $\textit{nums}$ 从位置 $i$ 开始的所有元素都不能被添加到当前子集，直接返回 $\textit{false}$。
- 否则，将第 $i$ 个元素添加到当前子集中，状态变为 $\textit{state} | 2^i$，然后继续对未划分的元素进行搜索。需要注意的是，若 $t + \textit{nums}[i] = s$，说明恰好可以得到一个和为 $s$ 的子集，下一步将 $t$ 归零（可以通过 $(t + \textit{nums}[i]) \bmod s$ 实现），并继续划分下一个子集。

为了避免重复搜索，我们使用一个长度为 $2^n$ 的数组 $\textit{f}$ 记录每个状态下的搜索结果。数组 $\textit{f}$ 有三个可能的值：

- `0`：表示当前状态还未搜索过；
- `-1`：表示当前状态下无法划分为 $k$ 个子集；
- `1`：表示当前状态下可以划分为 $k$ 个子集。

时间复杂度 $O(n \times 2^n)$，空间复杂度 $O(2^n)$。其中 $n$ 表示数组 $\textit{nums}$ 的长度。对于每个状态，我们需要遍历数组 $\textit{nums}$，时间复杂度为 $O(n)$；状态总数为 $2^n$，因此总的时间复杂度为 $O(n\times 2^n)$。




#### Python3


```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        @cache
        def dfs(state, t):
            if state == mask:
                return True
            for i, v in enumerate(nums):
                if (state >> i) & 1:
                    continue
                if t + v > s:
                    break
                if dfs(state | 1 << i, (t + v) % s):
                    return True
            return False

        s, mod = divmod(sum(nums), k)
        if mod:
            return False
        nums.sort()
        mask = (1 << len(nums)) - 1
        return dfs(0, 0)
```


#### TypeScript


```ts
function canPartitionKSubsets(nums: number[], k: number): boolean {
    let s = nums.reduce((a, b) => a + b, 0);
    if (s % k !== 0) {
        return false;
    }
    s = Math.floor(s / k);
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const mask = (1 << n) - 1;
    const f = Array(1 << n).fill(0);

    const dfs = (state: number, t: number): boolean => {
        if (state === mask) {
            return true;
        }
        if (f[state] !== 0) {
            return f[state] === 1;
        }
        for (let i = 0; i < n; ++i) {
            if ((state >> i) & 1) {
                continue;
            }
            if (t + nums[i] > s) {
                break;
            }
            if (dfs(state | (1 << i), (t + nums[i]) % s)) {
                f[state] = 1;
                return true;
            }
        }
        f[state] = -1;
        return false;
    };

    return dfs(0, 0);
}
```








### 方法三：动态规划



> **思考**
>
> 记忆化是自顶向下。自底向上 $f[i]$ 表示掩码 $i$ 能否合法填完若干桶， $cur[i]$ 为当前桶已装量。枚举未选 $j$ 转移，避免递归栈。



我们可以使用动态规划的方法求解本题。

我们定义 $f[i]$ 表示当前选取的数字的状态为 $i$ 时，是否存在 $k$ 个子集满足题目要求。初始时 $f[0]= true$，答案为 $f[2^n-1]$。其中 $n$ 表示数组 $nums$ 的长度。另外，我们定义 $cur[i]$ 表示当前选取的数字的状态为 $i$ 时，最后一个子集的和。

我们在 $[0, 2^n]$ 的范围内枚举状态 $i$，对于每个状态 $i$，如果 $f[i]$ 为 $\textit{false}$，我们直接跳过即可。否则，我们枚举 $\textit{nums}$ 数组中的任意一个数 $\textit{nums}[j]$，如果 $\textit{cur}[i] + \textit{nums}[j] > s$，我们直接跳出枚举循环，因为后面的数更大，无法放入当前子集；否则，如果 $i$ 的二进制表示的第 $j$ 位为 $0$，说明当前 $\textit{nums}[j]$ 还没有被选取，我们可以将其放入当前子集中，此时状态变为 $i | 2^j$，并更新 $\textit{cur}[i | 2^j] = (\textit{cur}[i] + \textit{nums}[j]) \bmod s$，并且 $f[i | 2^j] = \textit{true}$。

最后，我们返回 $f[2^n - 1]$ 即可。

时间复杂度 $O(n \times 2^n)$，空间复杂度 $O(2^n)$。其中 $n$ 表示数组 $\textit{nums}$ 的长度。




#### Python3


```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        s = sum(nums)
        if s % k:
            return False
        s //= k
        nums.sort()
        n = len(nums)
        f = [False] * (1 << n)
        cur = [0] * (1 << n)
        f[0] = True
        for i in range(1 << n):
            if not f[i]:
                continue
            for j in range(n):
                if cur[i] + nums[j] > s:
                    break
                if (i >> j & 1) == 0:
                    if not f[i | 1 << j]:
                        cur[i | 1 << j] = (cur[i] + nums[j]) % s
                        f[i | 1 << j] = True
        return f[-1]
```


#### TypeScript


```ts
function canPartitionKSubsets(nums: number[], k: number): boolean {
    let s = nums.reduce((a, b) => a + b);
    if (s % k !== 0) {
        return false;
    }
    s /= k;
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const f: boolean[] = Array(1 << n).fill(false);
    f[0] = true;
    const cur: number[] = Array(n).fill(0);
    for (let i = 0; i < 1 << n; ++i) {
        if (!f[i]) {
            continue;
        }
        for (let j = 0; j < n; ++j) {
            if (cur[i] + nums[j] > s) {
                break;
            }
            if (((i >> j) & 1) === 0) {
                f[i | (1 << j)] = true;
                cur[i | (1 << j)] = (cur[i] + nums[j]) % s;
            }
        }
    }
    return f[(1 << n) - 1];
}
```

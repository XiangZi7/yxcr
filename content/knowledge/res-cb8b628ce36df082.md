## 解法




### 方法一：单调栈



> **思考**
>
> 要找 $i<j<k$ 且 $nums[i]<nums[k]<nums[j]$。枚举三下标是 $O(n^3)$；枚举 $j$ 再左右扫描仍是 $O(n^2)$。
>
> 从右向左维护单调递减栈，并用 $vk$ 记录栈中弹出的、小于当前值的最大数，即目前最好的 $nums[k]$。当前值若小于 $vk$，它就可以当 $nums[i]$。
>
> 栈里是候选的 $nums[j]$（更大的峰）。先更新 $vk$ 再入栈，保证 $k$ 在 $j$ 右侧。



我们可以枚举从右往左枚举整数 $nums[i]$，并维护一个单调栈，栈中的元素从栈底到栈顶单调递减。维护一个变量 $vk$，表示 $nums[i]$ 右侧且小于 $nums[i]$ 的最大值。初始时， $vk$ 的值为 $-\infty$。

我们从右往左遍历数组，对于遍历到的每个元素 $nums[i]$，如果 $nums[i]$ 小于 $vk$，则说明我们找到了一个满足 $nums[i] \lt nums[k] \lt nums[j]$ 的三元组，返回 `true`。否则，如果栈顶元素小于 $nums[i]$，则我们循环将栈顶元素出栈，并且更新 $vk$ 的值为出栈元素，直到栈为空或者栈顶元素大于等于 $nums[i]$。最后，我们将 $nums[i]$ 入栈。

如果遍历结束后仍未找到满足条件的三元组，说明不存在这样的三元组，返回 `false`。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为数组的长度。




#### Python3


```python
class Solution:
    def find132pattern(self, nums: List[int]) -> bool:
        vk = -inf
        stk = []
        for x in nums[::-1]:
            if x < vk:
                return True
            while stk and stk[-1] < x:
                vk = stk.pop()
            stk.append(x)
        return False
```


#### TypeScript


```ts
function find132pattern(nums: number[]): boolean {
    let vk = -Infinity;
    const stk: number[] = [];
    for (let i = nums.length - 1; i >= 0; --i) {
        if (nums[i] < vk) {
            return true;
        }
        while (stk.length && stk[stk.length - 1] < nums[i]) {
            vk = stk.pop()!;
        }
        stk.push(nums[i]);
    }
    return false;
}
```


### 方法二：离散化 + 树状数组



> **思考**
>
> 方法一线性，但依赖从右扫描的栈结构。也可以预处理左侧最小值，从右用树状数组查询「大于 $\textit{left}[i]$ 且小于 $nums[i]$」是否出现过。
>
> 离散化后树状数组维护右侧已扫过的值。渐近多一个对数，实现成区间计数，不依赖单调栈。



我们可以用树状数组维护比某个数小的元素的个数，用一个数组 $left$ 记录 $nums[i]$ 左侧的最小值。

我们从右往左遍历数组，对于遍历到的每个元素 $nums[i]$，我们将 $nums[i]$ 离散化为一个整数 $x$，将 $left[i]$ 离散化为一个整数 $y$，如果此时 $x \gt y$，并且树状数组中存在比 $y$ 大但比 $x$ 小的元素，则说明存在满足 $nums[i] \lt nums[k] \lt nums[j]$ 的三元组，返回 `true`。否则，我们将 $nums[i]$ 的离散化结果 $x$ 更新到树状数组中。

如果遍历结束后仍未找到满足条件的三元组，说明不存在这样的三元组，返回 `false`。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 为数组的长度。




#### Python3


```python
class BinaryIndexedTree:
    def __init__(self, n):
        self.n = n
        self.c = [0] * (n + 1)

    def update(self, x, delta):
        while x <= self.n:
            self.c[x] += delta
            x += x & -x

    def query(self, x):
        s = 0
        while x:
            s += self.c[x]
            x -= x & -x
        return s


class Solution:
    def find132pattern(self, nums: List[int]) -> bool:
        s = sorted(set(nums))
        n = len(nums)
        left = [inf] * (n + 1)
        for i, x in enumerate(nums):
            left[i + 1] = min(left[i], x)
        tree = BinaryIndexedTree(len(s))
        for i in range(n - 1, -1, -1):
            x = bisect_left(s, nums[i]) + 1
            y = bisect_left(s, left[i]) + 1
            if x > y and tree.query(x - 1) > tree.query(y):
                return True
            tree.update(x, 1)
        return False
```


#### TypeScript


```ts
class BinaryIndextedTree {
    n: number;
    c: number[];

    constructor(n: number) {
        this.n = n;
        this.c = new Array(n + 1).fill(0);
    }

    update(x: number, val: number): void {
        while (x <= this.n) {
            this.c[x] += val;
            x += x & -x;
        }
    }

    query(x: number): number {
        let s = 0;
        while (x) {
            s += this.c[x];
            x -= x & -x;
        }
        return s;
    }
}

function find132pattern(nums: number[]): boolean {
    let s: number[] = [...nums];
    s.sort((a, b) => a - b);
    const n = nums.length;
    const left: number[] = new Array(n + 1).fill(1 << 30);
    let m = 0;
    for (let i = 0; i < n; ++i) {
        left[i + 1] = Math.min(left[i], nums[i]);
        if (i == 0 || s[i] != s[i - 1]) {
            s[m++] = s[i];
        }
    }
    s = s.slice(0, m);
    const tree = new BinaryIndextedTree(m);
    for (let i = n - 1; i >= 0; --i) {
        const x = search(s, nums[i]);
        const y = search(s, left[i]);
        if (x > y && tree.query(x - 1) > tree.query(y)) {
            return true;
        }
        tree.update(x, 1);
    }
    return false;
}

function search(nums: number[], x: number): number {
    let l = 0,
        r = nums.length - 1;
    while (l < r) {
        const mid = (l + r) >> 1;
        if (nums[mid] >= x) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return l + 1;
}
```

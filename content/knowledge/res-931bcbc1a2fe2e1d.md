## 解法




### 方法一：动态规划 + 单调队列



> **思考**
>
> 子序列相邻下标差至多为 $k$，求最大和。 $n\le 10^5$，若对每个 $i$ 枚举 $[i-k,i-1]$ 的最优 $f$，则达到 $O(nk)$。
>
> $f[i]=\textit{nums}[i]+\max(0,\max_{i-k\le j<i}f[j])$，即长度为 $k$ 的窗口最大值。单调递减队列按 $f$ 维护下标，队首过期则弹出，转移成为摊还 $O(1)$。
>
> 元素可为负，因此允许「不接前缀」而单独从 $i$ 开始。答案取所有 $f[i]$ 的最大者。



我们定义 $f[i]$ 表示以 $\textit{nums}[i]$ 结尾的满足条件的子序列的最大和。初始时 $f[i] = 0$，答案为 $\max_{0 \leq i \lt n} f(i)$。

我们注意到题目需要我们维护滑动窗口的最大值，这就是一个典型的单调队列应用场景。我们可以使用单调队列来优化动态规划的转移。

我们维护一个从队首到队尾单调递减的单调队列 $q$，队列中存储的是下标 $i$，初始时，我们将一个哨兵 $0$ 加入队列中。

我们遍历 $i$ 从 $0$ 到 $n - 1$，对于每个 $i$，我们执行以下操作：

- 如果队首元素 $q[0]$ 满足 $i - q[0] > k$，说明队首元素已经不在滑动窗口内，我们需要从队首弹出队首元素；
- 然后，我们计算 $f[i] = \max(0, f[q[0]]) + \textit{nums}[i]$，表示我们将 $\textit{nums}[i]$ 加入滑动窗口后的最大子序列和；
- 接下来，我们更新答案 $\textit{ans} = \max(\textit{ans}, f[i])$；
- 最后，我们将 $i$ 加入队列尾部，并且保持队列的单调性，即如果 $f[q[\textit{back}]] \leq f[i]$，我们需要将队尾元素弹出，直到队列为空或者 $f[q[\textit{back}]] > f[i]$。

最终答案即为 $\textit{ans}$。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为数组 $\textit{nums}$ 的长度。




#### Python3


```python
class Solution:
    def constrainedSubsetSum(self, nums: List[int], k: int) -> int:
        q = deque([0])
        n = len(nums)
        f = [0] * n
        ans = -inf
        for i, x in enumerate(nums):
            while i - q[0] > k:
                q.popleft()
            f[i] = max(0, f[q[0]]) + x
            ans = max(ans, f[i])
            while q and f[q[-1]] <= f[i]:
                q.pop()
            q.append(i)
        return ans
```


#### TypeScript


```ts
function constrainedSubsetSum(nums: number[], k: number): number {
    const q = new Deque<number>();
    const n = nums.length;
    q.pushBack(0);
    let ans = nums[0];
    const f: number[] = Array(n).fill(0);
    for (let i = 0; i < n; ++i) {
        while (i - q.frontValue()! > k) {
            q.popFront();
        }
        f[i] = Math.max(0, f[q.frontValue()!]!) + nums[i];
        ans = Math.max(ans, f[i]);
        while (!q.isEmpty() && f[q.backValue()!]! <= f[i]) {
            q.popBack();
        }
        q.pushBack(i);
    }
    return ans;
}

class Node<T> {
    value: T;
    next: Node<T> | null;
    prev: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class Deque<T> {
    private front: Node<T> | null;
    private back: Node<T> | null;
    private size: number;

    constructor() {
        this.front = null;
        this.back = null;
        this.size = 0;
    }

    pushFront(val: T): void {
        const newNode = new Node(val);
        if (this.isEmpty()) {
            this.front = newNode;
            this.back = newNode;
        } else {
            newNode.next = this.front;
            this.front!.prev = newNode;
            this.front = newNode;
        }
        this.size++;
    }

    pushBack(val: T): void {
        const newNode = new Node(val);
        if (this.isEmpty()) {
            this.front = newNode;
            this.back = newNode;
        } else {
            newNode.prev = this.back;
            this.back!.next = newNode;
            this.back = newNode;
        }
        this.size++;
    }

    popFront(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const value = this.front!.value;
        this.front = this.front!.next;
        if (this.front !== null) {
            this.front.prev = null;
        } else {
            this.back = null;
        }
        this.size--;
        return value;
    }

    popBack(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const value = this.back!.value;
        this.back = this.back!.prev;
        if (this.back !== null) {
            this.back.next = null;
        } else {
            this.front = null;
        }
        this.size--;
        return value;
    }

    frontValue(): T | undefined {
        return this.front?.value;
    }

    backValue(): T | undefined {
        return this.back?.value;
    }

    getSize(): number {
        return this.size;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }
}
```

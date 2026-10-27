## 解法




### 方法一：优先队列（大根堆）



> **思考**
>
> $x$ 严格递增， $n\le 10^5$，枚举点对不可行。 $y_i+y_j+|x_i-x_j|=(y_i-x_i)+(x_j+y_j)$，对当前 $j$ 只需窗口 $x_j-x_i\le k$ 内最大的 $y_i-x_i$。
>
> 堆中存 $(x_i-y_i,x_i)$（最小堆即最大 $y-x$），弹出过期点后与当前 $x+y$ 相加。



题目要求 $y_i + y_j + |x_i - x_j|$ 的最大值，其中 $i \lt j$，并且 $|x_i - x_j| \leq k$。由于 $x_i$ 是严格单调递增的，那么：

$$
\begin{aligned}
y_i + y_j + |x_i - x_j| & = y_i + y_j + x_j - x_i \\
& = (y_i - x_i) + (x_j + y_j)
\end{aligned}
$$

因此，对于当前遍历到的点 $(x_j, y_j)$，我们只需要找到前面所有满足 $x_j - x_i \leq k$ 的点 $(x_i, y_i)$ 中 $y_i - x_i$ 的最大值，再加上当前的 $x_j + y_j$ 即可。而 $y_i - x_i$ 的最大值，我们可以使用优先队列（大根堆）来维护。

具体地，我们定义一个优先队列（大根堆） $pq$，堆中每个元素是一个二元组 $(y_i - x_i, x_i)$。

当我们遍历到点 $(x, y)$ 时，如果堆 $pq$ 不为空，并且 $x - pq[0][1] \gt k$，那么循环将堆顶元素弹出，直到堆为空或者满足 $x - pq[0][1] \leq k$。此时，堆顶元素 $(y_i - x_i, x_i)$ 即为所有满足 $x_j - x_i \leq k$ 的点中 $y_i - x_i$ 的最大值，此时更新答案 $ans = \max(ans, x + y + pq[0][0])$。

然后，我们将点 $(x, y)$ 加入堆中，继续遍历下一个点，直到遍历完整个数组 $points$。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(n)$。其中 $n$ 是数组 $points$ 的长度。




#### Python3


```python
class Solution:
    def findMaxValueOfEquation(self, points: List[List[int]], k: int) -> int:
        ans = -inf
        pq = []
        for x, y in points:
            while pq and x - pq[0][1] > k:
                heappop(pq)
            if pq:
                ans = max(ans, x + y - pq[0][0])
            heappush(pq, (x - y, x))
        return ans
```


#### TypeScript


```ts
function findMaxValueOfEquation(points: number[][], k: number): number {
    let ans = -(1 << 30);
    const pq = new Heap<[number, number]>((a, b) => b[0] - a[0]);
    for (const [x, y] of points) {
        while (pq.size() && x - pq.top()[1] > k) {
            pq.pop();
        }
        if (pq.size()) {
            ans = Math.max(ans, x + y + pq.top()[0]);
        }
        pq.push([y - x, x]);
    }
    return ans;
}

type Compare<T> = (lhs: T, rhs: T) => number;

class Heap<T = number> {
    data: Array<T | null>;
    lt: (i: number, j: number) => boolean;
    constructor();
    constructor(data: T[]);
    constructor(compare: Compare<T>);
    constructor(data: T[], compare: Compare<T>);
    constructor(data: T[] | Compare<T>, compare?: (lhs: T, rhs: T) => number);
    constructor(
        data: T[] | Compare<T> = [],
        compare: Compare<T> = (lhs: T, rhs: T) => (lhs < rhs ? -1 : lhs > rhs ? 1 : 0),
    ) {
        if (typeof data === 'function') {
            compare = data;
            data = [];
        }
        this.data = [null, ...data];
        this.lt = (i, j) => compare(this.data[i]!, this.data[j]!) < 0;
        for (let i = this.size(); i > 0; i--) this.heapify(i);
    }

    size(): number {
        return this.data.length - 1;
    }

    push(v: T): void {
        this.data.push(v);
        let i = this.size();
        while (i >> 1 !== 0 && this.lt(i, i >> 1)) this.swap(i, (i >>= 1));
    }

    pop(): T {
        this.swap(1, this.size());
        const top = this.data.pop();
        this.heapify(1);
        return top!;
    }

    top(): T {
        return this.data[1]!;
    }
    heapify(i: number): void {
        while (true) {
            let min = i;
            const [l, r, n] = [i * 2, i * 2 + 1, this.data.length];
            if (l < n && this.lt(l, min)) min = l;
            if (r < n && this.lt(r, min)) min = r;
            if (min !== i) {
                this.swap(i, min);
                i = min;
            } else break;
        }
    }

    clear(): void {
        this.data = [null];
    }

    private swap(i: number, j: number): void {
        const d = this.data;
        [d[i], d[j]] = [d[j], d[i]];
    }
}
```








### 方法二：单调队列



> **思考**
>
> 方法一每次操作 $O(\log n)$。窗口内 $y-x$ 的最大值可用单调递减双端队列在摊还 $O(1)$ 内维护：过期弹队首，队尾不优于当前的弹出后再入队。



这道题实际上需要我们维护的是一个长度为 $k$ 的窗口中 $y-x$ 的最大值，单调队列可以很好地解决这个问题。

具体地，我们定义一个单调队列 $q$，队列中每个元素是一个二元组 $(x_i, y_i)$。

当我们遍历到点 $(x, y)$ 时，如果队列 $q$ 不为空，并且 $x - q[0][0] \gt k$，那么不断弹出队首元素，直到队列为空或者满足 $x - q[0][0] \leq k$。此时，队首元素 $(x_i, y_i)$ 即为所有满足 $x_j - x_i \leq k$ 的点中 $y_i - x_i$ 的最大值，此时更新答案 $ans = \max(ans, x + y + y_i - x_i)$。

接下来，在将点 $(x, y)$ 加入队尾之前，我们将队列中所有 $y_i - x_i \leq y - x$ 的元素 $(x_i, y_i)$ 弹出队列，然后将点 $(x, y)$ 加入队尾。继续遍历下一个点，直到遍历完整个数组 $points$。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是数组 $points$ 的长度。




#### Python3


```python
class Solution:
    def findMaxValueOfEquation(self, points: List[List[int]], k: int) -> int:
        ans = -inf
        q = deque()
        for x, y in points:
            while q and x - q[0][0] > k:
                q.popleft()
            if q:
                ans = max(ans, x + y + q[0][1] - q[0][0])
            while q and y - x >= q[-1][1] - q[-1][0]:
                q.pop()
            q.append((x, y))
        return ans
```


#### TypeScript


```ts
function findMaxValueOfEquation(points: number[][], k: number): number {
    let ans = -(1 << 30);
    const q: number[][] = [];
    for (const [x, y] of points) {
        while (q.length > 0 && x - q[0][0] > k) {
            q.shift();
        }
        if (q.length > 0) {
            ans = Math.max(ans, x + y + q[0][1] - q[0][0]);
        }
        while (q.length > 0 && y - x > q[q.length - 1][1] - q[q.length - 1][0]) {
            q.pop();
        }
        q.push([x, y]);
    }
    return ans;
}
```

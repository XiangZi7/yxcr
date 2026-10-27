## 解法




### 方法一：数组模拟



> **思考**
>
> 循环队列要在定长数组上 $O(1)$ 入队出队，并区分空与满。只用头尾指针时，二者相等会歧义。
>
> 另存 $\textit{size}$：队头为 $\textit{front}$，队尾写在 $(\textit{front}+\textit{size})\bmod k$。空满直接看 $\textit{size}$ 与容量，取尾用 $(\textit{front}+\textit{size}-1)\bmod k$。



我们可以使用一个长度为 $k$ 的数组 $q$ 来模拟循环队列，用一个指针 $\textit{front}$ 记录队首元素的位置，初始时队列为空，而 $\textit{front}$ 为 $0$。另外，我们用一个变量 $\textit{size}$ 记录队列中元素的个数，初始时 $\textit{size}$ 为 $0$。

调用 `enQueue` 方法时，我们首先检查队列是否已满，即 $\textit{size} = k$，如果满了则直接返回 $\textit{false}$。否则，我们将元素插入到 $(\textit{front} + \textit{size}) \bmod k$ 的位置，然后 $\textit{size} = \textit{size} + 1$，表示队列中元素的个数增加了 $1$。最后返回 $\textit{true}$。

调用 `deQueue` 方法时，我们首先检查队列是否为空，即 $\textit{size} = 0$，如果为空则直接返回 $\textit{false}$。否则，我们将 $\textit{front} = (\textit{front} + 1) \bmod k$，表示队首元素出队，然后 $\textit{size} = \textit{size} - 1$，

调用 `Front` 方法时，我们首先检查队列是否为空，即 $\textit{size} = 0$，如果为空则返回 $-1$。否则，返回 $q[\textit{front}]$。

调用 `Rear` 方法时，我们首先检查队列是否为空，即 $\textit{size} = 0$，如果为空则返回 $-1$。否则，返回 $q[(\textit{front} + \textit{size} - 1) \bmod k]$。

调用 `isEmpty` 方法时，我们只需判断 $\textit{size} = 0$ 即可。

调用 `isFull` 方法时，我们只需判断 $\textit{size} = k$ 即可。

时间复杂度方面，以上操作的时间复杂度均为 $O(1)$。空间复杂度为 $O(k)$。




#### Python3


```python
class MyCircularQueue:

    def __init__(self, k: int):
        self.q = [0] * k
        self.size = 0
        self.capacity = k
        self.front = 0

    def enQueue(self, value: int) -> bool:
        if self.isFull():
            return False
        self.q[(self.front + self.size) % self.capacity] = value
        self.size += 1
        return True

    def deQueue(self) -> bool:
        if self.isEmpty():
            return False
        self.front = (self.front + 1) % self.capacity
        self.size -= 1
        return True

    def Front(self) -> int:
        return -1 if self.isEmpty() else self.q[self.front]

    def Rear(self) -> int:
        if self.isEmpty():
            return -1
        return self.q[(self.front + self.size - 1) % self.capacity]

    def isEmpty(self) -> bool:
        return self.size == 0

    def isFull(self) -> bool:
        return self.size == self.capacity


# Your MyCircularQueue object will be instantiated and called as such:
# obj = MyCircularQueue(k)
# param_1 = obj.enQueue(value)
# param_2 = obj.deQueue()
# param_3 = obj.Front()
# param_4 = obj.Rear()
# param_5 = obj.isEmpty()
# param_6 = obj.isFull()
```


#### TypeScript


```ts
class MyCircularQueue {
    private queue: number[];
    private left: number;
    private right: number;
    private capacity: number;

    constructor(k: number) {
        this.queue = new Array(k);
        this.left = 0;
        this.right = 0;
        this.capacity = k;
    }

    enQueue(value: number): boolean {
        if (this.isFull()) {
            return false;
        }
        this.queue[this.right % this.capacity] = value;
        this.right++;
        return true;
    }

    deQueue(): boolean {
        if (this.isEmpty()) {
            return false;
        }
        this.left++;
        return true;
    }

    Front(): number {
        if (this.isEmpty()) {
            return -1;
        }
        return this.queue[this.left % this.capacity];
    }

    Rear(): number {
        if (this.isEmpty()) {
            return -1;
        }
        return this.queue[(this.right - 1) % this.capacity];
    }

    isEmpty(): boolean {
        return this.right - this.left === 0;
    }

    isFull(): boolean {
        return this.right - this.left === this.capacity;
    }
}

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
```
